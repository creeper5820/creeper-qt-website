"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  Book,
  Puzzle,
  Layout,
  Palette,
  FileText,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  Home,
  Github,
  Moon,
  Sun,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchGitHubMarkdown, extractToc, type TocItem } from "@/lib/markdown-parser"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { TableOfContents } from "@/components/table-of-contents"
import { useTheme } from "@/lib/use-theme"

const docCategories = [
  {
    id: "readme",
    title: "项目介绍",
    description: "项目概述与快速开始",
    icon: FileText,
    path: "README.md",
    isRoot: true,
  },
  {
    id: "usage",
    title: "使用指南",
    description: "安装、配置与快速开始",
    icon: Book,
    path: "usage.md",
    isRoot: false,
  },
  {
    id: "widgets",
    title: "组件文档",
    description: "完整的组件 API 参考",
    icon: Puzzle,
    path: "widgets.md",
    isRoot: false,
  },
  {
    id: "layout",
    title: "布局系统",
    description: "布局容器与排版",
    icon: Layout,
    path: "layout.md",
    isRoot: false,
  },
  {
    id: "theme",
    title: "主题系统",
    description: "主题管理与自定义配色",
    icon: Palette,
    path: "theme.md",
    isRoot: false,
  },
]

export default function DocsPage() {
  const searchParams = useSearchParams()
  const [selectedDoc, setSelectedDoc] = useState(searchParams.get("doc") || "readme")
  const [content, setContent] = useState<string>("")
  const [toc, setToc] = useState<TocItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    async function loadDoc() {
      setIsLoading(true)
      const doc = docCategories.find((d) => d.id === selectedDoc)
      if (doc) {
        const markdown = await fetchGitHubMarkdown(doc.path, doc.isRoot)
        if (markdown) {
          setContent(markdown)
          setToc(extractToc(markdown))
        } else {
          setContent("## 无法加载文档\n\n请检查网络连接或稍后重试。")
          setToc([])
        }
      }
      setIsLoading(false)
    }
    loadDoc()
  }, [selectedDoc])

  const currentDoc = docCategories.find((d) => d.id === selectedDoc)

  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card fixed h-screen">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Creeper-Qt</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">文档</p>
          {docCategories.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDoc(doc.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                selectedDoc === doc.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <doc.icon
                className={`h-4 w-4 flex-shrink-0 ${
                  selectedDoc === doc.id ? "text-primary-foreground" : "text-primary"
                }`}
              />
              <span className="font-medium text-sm truncate">{doc.title}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="text-sm">返回首页</span>
          </Link>
          <Link
            href="https://github.com/creeper5820/creeper-qt/tree/main/doc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="text-sm">在 GitHub 查看</span>
            <ExternalLink className="h-3 w-3 ml-auto" />
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Creeper-Qt</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {docCategories.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setSelectedDoc(doc.id)
                setIsSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                selectedDoc === doc.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              <doc.icon className={`h-4 w-4 ${selectedDoc === doc.id ? "text-primary-foreground" : "text-primary"}`} />
              <span className="font-medium text-sm">{doc.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="flex items-center justify-between h-14 px-4 lg:px-6 overflow-hidden">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-0 flex-1 overflow-hidden">
                <Link href="/docs" className="hover:text-foreground whitespace-nowrap">
                  文档
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0" />
                <span className="text-foreground font-medium truncate">{currentDoc?.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleTheme}>
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="https://github.com/creeper5820/creeper-qt" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Doc Content with Table of Contents */}
        <div className="flex min-w-0">
          {/* Main Doc Content */}
          <div className="flex-1 max-w-3xl mx-auto px-4 lg:px-8 py-8 min-w-0 w-full">
            <motion.div
              key={selectedDoc}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">加载文档中...</span>
                </div>
              ) : (
                <MarkdownRenderer 
                  content={content} 
                  currentDocPath={currentDoc?.path}
                  isRoot={currentDoc?.isRoot}
                  onDocChange={setSelectedDoc}
                />
              )}

              {/* Edit on GitHub */}
              <div className="mt-12 pt-6 border-t border-border">
                <Link
                  href={`https://github.com/creeper5820/creeper-qt/blob/main/${currentDoc?.isRoot ? "" : "doc/"}${currentDoc?.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />在 GitHub 上编辑此页面
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Table of Contents - Desktop */}
          <aside className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-20 py-8 pr-4">
              {!isLoading && toc.length > 0 && <TableOfContents toc={toc} />}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
