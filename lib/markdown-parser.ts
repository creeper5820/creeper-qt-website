const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/creeper5820/creeper-qt/main"
const GITHUB_DOC_BASE = `${GITHUB_RAW_BASE}/doc`

export async function fetchGitHubMarkdown(path: string, isRoot: boolean = false): Promise<string | null> {
  try {
    const baseUrl = isRoot ? GITHUB_RAW_BASE : GITHUB_DOC_BASE
    const response = await fetch(`${baseUrl}/${path}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })
    if (!response.ok) return null
    return await response.text()
  } catch (error) {
    console.error("Failed to fetch markdown:", error)
    return null
  }
}

// Extract headings for table of contents
export interface TocItem {
  id: string
  text: string
  level: number
}

export function extractToc(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: TocItem[] = []
  const idCounts: Record<string, number> = {}
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[#`*_[\]]/g, "").trim()
    let baseId = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fa5-]/g, "")

    // Ensure unique IDs by adding suffix for duplicates
    // First occurrence uses baseId, subsequent ones get -1, -2, etc.
    let id = baseId
    if (idCounts[baseId] !== undefined) {
      idCounts[baseId]++
      id = `${baseId}-${idCounts[baseId]}`
    } else {
      idCounts[baseId] = 0
    }

    if (level >= 2 && level <= 4) {
      toc.push({ id, text, level })
    }
  }

  return toc
}
