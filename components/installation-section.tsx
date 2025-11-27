"use client"

import { motion } from "framer-motion"
import { Copy, Check, Terminal, Download } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const installCommands = {
  arch: "sudo pacman -S eigen qt6-base",
  ubuntu: "sudo apt install libeigen3-dev qt6-base-dev",
  build: `git clone https://github.com/creeper5820/creeper-qt
cd creeper-qt
cmake -B build
cmake --build build
cd build && sudo make install`,
  windows: `# 在 MSYS2 终端中
pacman -S mingw-w64-x86_64-toolchain
pacman -S mingw64/mingw-w64-x86_64-qt6
pacman -S mingw-w64-x86_64-eigen3

# 构建
cmake -G "MinGW Makefiles" -B build
cmake --build build
cd build && mingw32-make install`,
}

export function InstallationSection() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="installation" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">安装</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">快速开始</h2>
          <p className="mt-4 text-muted-foreground text-lg">安装依赖并在您的平台上构建库</p>
        </motion.div>

        <motion.div
          className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">快速体验</h3>
              <p className="text-muted-foreground text-sm mt-1">下载预构建的示例程序，无需编译即可体验完整功能</p>
            </div>
            <Link
              href="https://github.com/creeper5820/creeper-qt/releases/tag/nightly-example"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Download className="mr-2 h-4 w-4" />
                下载最新版本
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="linux" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1 h-auto">
              <TabsTrigger
                value="linux"
                className="rounded-full py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Linux
              </TabsTrigger>
              <TabsTrigger
                value="windows"
                className="rounded-full py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Windows (MSYS2)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="linux" className="mt-6 space-y-6">
              {/* Dependencies */}
              <div className="rounded-3xl bg-card border border-border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">安装依赖</span>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Arch Linux</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm font-mono bg-muted px-4 py-3 rounded-xl text-foreground">
                        {installCommands.arch}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => handleCopy("arch", installCommands.arch)}
                      >
                        {copied === "arch" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Ubuntu</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 text-sm font-mono bg-muted px-4 py-3 rounded-xl text-foreground">
                        {installCommands.ubuntu}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => handleCopy("ubuntu", installCommands.ubuntu)}
                      >
                        {copied === "ubuntu" ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Build */}
              <div className="rounded-3xl bg-card border border-border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">构建 & 安装</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={() => handleCopy("build", installCommands.build)}
                  >
                    {copied === "build" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-foreground whitespace-pre">{installCommands.build}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="windows" className="mt-6">
              <div className="rounded-3xl bg-card border border-border overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">MSYS2 安装</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={() => handleCopy("windows", installCommands.windows)}
                  >
                    {copied === "windows" ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="p-4 overflow-x-auto">
                  <code className="text-sm font-mono text-foreground whitespace-pre">{installCommands.windows}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
