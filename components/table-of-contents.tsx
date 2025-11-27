"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import type { TocItem } from "@/lib/markdown-parser"

interface TableOfContentsProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" },
    )

    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">目录</p>
      {toc.map((item, index) => (
        <a
          key={`${item.id}-${index}`}
          href={`#${item.id}`}
          className={cn(
            "block text-sm py-1 transition-colors hover:text-foreground",
            item.level === 2 && "pl-0",
            item.level === 3 && "pl-3",
            item.level === 4 && "pl-6",
            activeId === item.id ? "text-primary font-medium" : "text-muted-foreground",
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  )
}
