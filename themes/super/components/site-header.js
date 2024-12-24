import Link from "next/link"
import { Github, Home } from 'lucide-react'
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          
          <nav className="flex items-center rounded-full bg-muted/50 px-4 py-2">
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 hover:text-foreground/80">
              <Home className="h-4 w-4" />
            </Link>
            <Link href="/about" className="px-4 py-2 hover:text-foreground/80">About</Link>
            <Link href="/posts" className="px-4 py-2 hover:text-foreground/80">Posts</Link>
            <Link href="/projects" className="px-4 py-2 hover:text-foreground/80">Projects</Link>
            <Link href="/tags" className="px-4 py-2 hover:text-foreground/80">Tags</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
