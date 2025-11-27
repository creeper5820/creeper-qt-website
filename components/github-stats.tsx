"use client"

import { useState, useEffect } from "react"
import { Star, GitFork } from "lucide-react"
import Link from "next/link"

export function GitHubStats() {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("https://api.github.com/repos/creeper5820/creeper-qt")
        if (response.ok) {
          const data = await response.json()
          setStats({
            stars: data.stargazers_count,
            forks: data.forks_count,
          })
        }
      } catch {
        // Fallback values if API fails
        setStats({ stars: 286, forks: 42 })
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex items-center justify-center gap-8">
      <Link
        href="https://github.com/creeper5820/creeper-qt/stargazers"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Star className="h-5 w-5 text-primary" />
        <span className="font-semibold">{stats?.stars ?? "..."}</span>
        <span className="text-sm">Stars</span>
      </Link>
      <Link
        href="https://github.com/creeper5820/creeper-qt/forks"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <GitFork className="h-5 w-5 text-primary" />
        <span className="font-semibold">{stats?.forks ?? "..."}</span>
        <span className="text-sm">Forks</span>
      </Link>
    </div>
  )
}
