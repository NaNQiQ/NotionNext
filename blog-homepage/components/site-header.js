import Link from "next/link"
import { Github, Home } from 'lucide-react'
import ModeToggle from "./mode-toggle"
import Image from "next/image"
import { styles } from "../styles"
import { siteConfig } from "../config"

const SiteHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
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
          
          <nav className={styles.nav}>
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 hover:text-foreground/80">
              <Home className="h-4 w-4" />
            </Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/posts" className={styles.navLink}>Posts</Link>
            <Link href="/projects" className={styles.navLink}>Projects</Link>
            <Link href="/tags" className={styles.navLink}>Tags</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href={siteConfig.social.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader

