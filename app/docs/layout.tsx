import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "文档 - Creeper-Qt",
  description: "Creeper-Qt 完整文档与 API 参考",
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
