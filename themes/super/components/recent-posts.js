import Link from "next/link"
import { Badge } from "./ui/badge"

const RecentPosts = () => {
  const posts = [
    {
      date: "Aug 18, 2024",
      title: "Markdown Style Guide",
      titleCn: "Markdown 风格指南",
      tags: ["Markdown", "指南", "Guide", "指导"]
    },
    {
      date: "Aug 17, 2024",
      title: "This Post Is Using MDX, Where You Can Embed JSX And Astro Components",
      titleCn: "这篇文章使用 MDX，您可以在其中嵌入 JSX 和 Astro 组件",
      tags: ["Markdown", "指南"]
    }
  ]

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Posts 最近的帖子</h2>
        <Link href="/posts" className="text-sm hover:underline">
          All posts » 所有帖子 »
        </Link>
      </div>
      <div className="mt-8 space-y-8">
        {posts.map((post, index) => (
          <article key={index} className="group relative rounded-lg border p-6 hover:bg-muted">
            <div className="flex flex-col space-y-2">
              <time className="text-sm text-muted-foreground">{post.date}</time>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.titleCn}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RecentPosts

