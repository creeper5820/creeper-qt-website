import Link from "next/link"
import { Github, ExternalLink, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Creeper-Qt</span>
          </div>

          {/* Links - Updated links to point to main branch docs */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="https://github.com/creeper5820/creeper-qt/blob/main/doc/usage.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              使用指南
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="https://github.com/creeper5820/creeper-qt/blob/main/doc/widgets.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              组件文档
              <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="https://github.com/creeper5820/creeper-qt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </Link>
            <Link
              href="https://www.bilibili.com/video/BV1GAq5YZEtr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              视频演示
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              QQ群: 885246539
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">© 2025 Creeper-Qt. MIT License.</p>
        </div>
      </div>
    </footer>
  )
}
