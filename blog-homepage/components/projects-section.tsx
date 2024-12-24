import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectsSection() {
  const projects = [
    {
      title: "Devaradise.com",
      category: "Blog 博客",
      description: "A blog that sharing web development resources and...",
      tags: ["Blog", "博客"]
    },
    {
      title: "Sellercraft App",
      category: "ECommerce 电子商务",
      description: "An Ecommerce omnichannel platform in Southeast Asia...",
      tags: ["ECommerce", "电子商务", "Saas", "药剂"]
    },
    // Add more projects as needed
  ]

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Projects 我的项目</h2>
        <Link href="/projects" className="text-sm hover:underline">
          All projects » 所有项目 »
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <Button variant="outline" className="mt-4 w-full">
                Demo 演示
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

