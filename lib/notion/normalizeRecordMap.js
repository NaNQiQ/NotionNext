/**
 * 兼容 Notion 新版 API 返回格式
 *
 * 背景：Notion 对部分（较新创建的）页面/数据库返回的 recordMap 里，每条记录
 * 被多包了一层，结构从旧版的 { role, value: <记录> } 变成了新版的
 * { value: { value: <记录>, role, spaceId } }。
 *
 * notion-client 6.x 与 NotionNext 都按旧格式读取 record.value.xxx，
 * 因此新格式下会读到 undefined，导致：
 *   - 数据库被判定为 “is not a database”
 *   - 文章渲染报错 e.split is not a function / Cannot read properties of null
 *
 * 这里在拿到原始数据后统一“拆包”，还原成旧格式，让后续逻辑无需改动。
 */

/**
 * 判断某条记录是否为新版双层嵌套格式
 */
function isDoubleWrapped(rec) {
  return (
    rec &&
    typeof rec === 'object' &&
    rec.role === undefined &&
    rec.value &&
    typeof rec.value === 'object' &&
    rec.value.value !== undefined &&
    typeof rec.value.value === 'object'
  )
}

/**
 * 将 recordMap 中所有表的记录归一化为旧格式 { role, value }
 * @param {*} recordMap
 * @returns 原地修改后的 recordMap
 */
export function normalizeRecordMap(recordMap) {
  if (!recordMap || typeof recordMap !== 'object') {
    return recordMap
  }
  // collection_query 是特殊的嵌套结构（collectionId -> viewId -> 结果），不做拆包
  const skipTables = new Set(['collection_query'])
  for (const table of Object.keys(recordMap)) {
    if (skipTables.has(table)) continue
    const records = recordMap[table]
    if (!records || typeof records !== 'object') continue
    for (const key of Object.keys(records)) {
      const rec = records[key]
      if (isDoubleWrapped(rec)) {
        records[key] = {
          role: rec.value.role || 'reader',
          value: rec.value.value
        }
      }
    }
  }
  return recordMap
}

/**
 * 新版格式下，notion-client 常常无法自动填充 collection_query（文章列表为空）。
 * 这里对 recordMap 中的数据库 block 手动补抓集合数据。
 * @param {import('notion-client').NotionAPI} api
 * @param {*} recordMap 已经过 normalizeRecordMap 处理
 */
export async function ensureCollectionQuery(api, recordMap) {
  if (!recordMap?.block) return recordMap
  const collectionQuery =
    recordMap.collection_query || (recordMap.collection_query = {})

  for (const blockId of Object.keys(recordMap.block)) {
    const value = recordMap.block[blockId]?.value
    if (!value) continue
    if (
      value.type !== 'collection_view_page' &&
      value.type !== 'collection_view'
    ) {
      continue
    }

    const collectionId =
      value.collection_id || value.format?.collection_pointer?.id
    const viewIds = value.view_ids || []
    if (!collectionId || viewIds.length === 0) continue

    // 已经有查询结果则跳过，避免重复请求
    if (
      collectionQuery[collectionId] &&
      Object.keys(collectionQuery[collectionId]).length > 0
    ) {
      continue
    }
    collectionQuery[collectionId] = collectionQuery[collectionId] || {}

    for (const viewId of viewIds) {
      try {
        const collectionView = recordMap.collection_view?.[viewId]?.value
        const collData = await api.getCollectionData(
          collectionId,
          viewId,
          collectionView || { type: 'table' }
        )

        // 合并集合返回的记录（同样可能是新格式，需归一化）
        const crm = collData?.recordMap
        if (crm) {
          normalizeRecordMap(crm)
          if (crm.block) {
            Object.assign(recordMap.block, crm.block)
          }
          if (crm.collection) {
            recordMap.collection = Object.assign(
              recordMap.collection || {},
              crm.collection
            )
          }
          if (crm.collection_view) {
            recordMap.collection_view = Object.assign(
              recordMap.collection_view || {},
              crm.collection_view
            )
          }
        }

        // 写入 getAllPageIds 期望的结构：
        // collection_query[collectionId][viewId].collection_group_results.blockIds
        const result =
          collData?.result?.reducerResults || collData?.result || {}
        collectionQuery[collectionId][viewId] = result

        // 只要有一个视图成功拿到文章列表即可，跳过其余视图
        // （board / gallery 等视图可能需要额外分组参数而报错，无需重复尝试）
        const blockIds = result?.collection_group_results?.blockIds
        if (blockIds && blockIds.length > 0) {
          break
        }
      } catch (e) {
        console.warn(
          '[Notion兼容] 补抓collection数据失败:',
          viewId,
          e?.message
        )
      }
    }
  }
  return recordMap
}
