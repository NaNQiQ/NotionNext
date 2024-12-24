import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { RecentPosts } from "@/components/recent-posts"
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <HeroSection />
          <RecentPosts />
          <ProjectsSection />
        </div>
      </main>
    </div>
  )
}
