"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
  currentDocPath?: string
  isRoot?: boolean
  onDocChange?: (docId: string) => void
}

function CodeBlock({
  language,
  children,
}: {
  language: string | undefined
  children: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-border w-full min-w-0 max-w-full">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-container-high border-b border-border min-w-0">
        <span className="text-xs font-mono text-muted-foreground uppercase truncate">{language || "text"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0 ml-2"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">复制</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-surface-container text-sm min-w-0 max-w-full">
        <code className="font-mono text-foreground whitespace-pre break-words">{children.trim()}</code>
      </pre>
    </div>
  )
}

export function MarkdownRenderer({ content, className, currentDocPath, isRoot, onDocChange }: MarkdownRendererProps) {
  const router = useRouter()
  
  // Helper function to resolve relative links
  const resolveLink = (href: string | undefined): { url: string; docId?: string; isAnchor?: boolean } => {
    if (!href) return { url: "#" }
    
    // External links (http/https) - keep as is
    if (href.startsWith("http://") || href.startsWith("https://")) {
      return { url: href }
    }
    
    // Anchor links (#section) - keep as is
    if (href.startsWith("#")) {
      return { url: href, isAnchor: true }
    }
    
    // Remove query strings and anchors for processing
    const [pathPart, queryAndAnchor] = href.split(/[?#]/)
    const queryAnchor = queryAndAnchor ? `#${queryAndAnchor}` : ""
    
    // Clean the path
    let cleanHref = pathPart.replace(/^\.\//, "").replace(/\/$/, "")
    
    // Handle doc/ prefix (e.g., doc/usage.md)
    if (cleanHref.startsWith("doc/")) {
      cleanHref = cleanHref.replace("doc/", "")
    }
    
    // Check if it's a markdown file that maps to a doc
    if (cleanHref.endsWith(".md")) {
      const fileName = cleanHref.replace(/\.md$/, "").split("/").pop() || ""
      const docMap: Record<string, string> = {
        "readme": "readme",
        "usage": "usage",
        "widgets": "widgets",
        "layout": "layout",
        "theme": "theme",
      }
      
      const docId = docMap[fileName.toLowerCase()]
      if (docId && onDocChange) {
        return { url: `/docs?doc=${docId}${queryAnchor}`, docId }
      }
    }
    
    // For other files, link to GitHub
    const GITHUB_BASE = "https://github.com/creeper5820/creeper-qt/blob/main"
    
    // Determine the correct path based on context
    let url: string
    if (isRoot) {
      // From root, handle relative paths
      if (cleanHref.startsWith("../")) {
        url = `${GITHUB_BASE}/${cleanHref.replace(/^\.\.\//, "")}${queryAnchor}`
      } else {
        url = `${GITHUB_BASE}/${cleanHref}${queryAnchor}`
      }
    } else {
      // From doc directory
      if (cleanHref.startsWith("../")) {
        url = `${GITHUB_BASE}/${cleanHref.replace(/^\.\.\//, "")}${queryAnchor}`
      } else {
        url = `${GITHUB_BASE}/doc/${cleanHref}${queryAnchor}`
      }
    }
    return { url }
  }
  return (
    <div className={cn("markdown-content w-full min-w-0 max-w-full", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          // Headings
          h1: ({ children, id }) => (
            <h1 id={id} className="text-3xl font-bold mt-8 mb-6 text-foreground scroll-mt-20">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2
              id={id}
              className="text-2xl font-bold mt-10 mb-4 pb-2 border-b border-border text-foreground scroll-mt-20"
            >
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="text-xl font-semibold mt-8 mb-4 text-foreground scroll-mt-20">
              {children}
            </h3>
          ),
          h4: ({ children, id }) => (
            <h4 id={id} className="text-lg font-semibold mt-6 mb-3 text-foreground scroll-mt-20">
              {children}
            </h4>
          ),
          h5: ({ children, id }) => (
            <h5 id={id} className="text-base font-semibold mt-4 mb-2 text-foreground scroll-mt-20">
              {children}
            </h5>
          ),
          h6: ({ children, id }) => (
            <h6 id={id} className="text-sm font-semibold mt-4 mb-2 text-muted-foreground scroll-mt-20">
              {children}
            </h6>
          ),

          // Paragraphs
          p: ({ children }) => <p className="leading-relaxed mb-4 text-muted-foreground">{children}</p>,

          // Links
          a: ({ href, children }) => {
            const resolved = resolveLink(href)
            const { url, docId, isAnchor } = resolved
            const isExternal = url.startsWith("http") || url.startsWith("https")
            const isInternal = url.startsWith("/docs") && docId
            
            // Handle internal navigation to docs - use callback instead of routing
            if (isInternal && docId && onDocChange) {
              return (
                <a
                  href={url}
                  onClick={(e) => {
                    e.preventDefault()
                    onDocChange(docId)
                    // Update URL without navigation
                    const urlObj = new URL(window.location.href)
                    urlObj.searchParams.set("doc", docId)
                    window.history.pushState({}, "", urlObj.toString())
                  }}
                  className="text-primary hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  {children}
                </a>
              )
            }
            
            // Handle anchor links
            if (isAnchor) {
              return (
                <a
                  href={url}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(url)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  }}
                  className="text-primary hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                >
                  {children}
                </a>
              )
            }
            
            // Handle external links
            return (
              <a
                href={url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-primary hover:underline inline-flex items-center gap-0.5"
              >
                {children}
                {isExternal && <ExternalLink className="h-3 w-3 ml-0.5" />}
              </a>
            )
          },

          // Lists
          ul: ({ children }) => <ul className="my-4 ml-6 space-y-2 list-disc marker:text-primary">{children}</ul>,
          ol: ({ children }) => <ol className="my-4 ml-6 space-y-2 list-decimal marker:text-primary">{children}</ol>,
          li: ({ children }) => <li className="text-muted-foreground pl-1">{children}</li>,

          // Code
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")
            const isCodeBlock = className?.includes("language-")

            if (isCodeBlock && match) {
              return <CodeBlock language={match[1]}>{String(children)}</CodeBlock>
            }

            return (
              <code
                className="bg-surface-container-high px-1.5 py-0.5 rounded text-sm font-mono text-primary break-words"
                {...props}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => <div className="min-w-0 max-w-full">{children}</div>,

          // Tables
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-container-high border-b border-border">{children}</thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-surface-container/50 transition-colors">{children}</tr>,
          th: ({ children }) => <th className="px-4 py-3 text-left font-semibold text-foreground">{children}</th>,
          td: ({ children }) => <td className="px-4 py-3 text-muted-foreground">{children}</td>,

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="my-4 pl-4 border-l-4 border-primary/50 bg-surface-container/50 py-3 pr-4 rounded-r-xl italic text-muted-foreground">
              {children}
            </blockquote>
          ),

          // Horizontal rule
          hr: () => <hr className="my-8 border-border" />,

          // Images
          img: ({ src, alt }) => (
            <span className="block my-6">
              <img
                src={src || "/placeholder.svg"}
                alt={alt || ""}
                className="rounded-xl max-w-full h-auto border border-border"
              />
              {alt && <span className="block text-center text-sm text-muted-foreground mt-2">{alt}</span>}
            </span>
          ),

          // Strong and emphasis
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,

          // Delete (strikethrough)
          del: ({ children }) => <del className="line-through text-muted-foreground">{children}</del>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
