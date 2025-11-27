"use client"

import { motion } from "framer-motion"
import { Play, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GitHubStats } from "@/components/github-stats"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Material Design 3 Components
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-primary">CREEPER-QT</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground">
                基于 Qt 的现代化 UI 包装库
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-pretty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              轻量级 UI 集成库，遵循 Google Material Design 3 规范，支持声明式接口、主题系统、基于 PID
              控制器和弹簧模型的流畅动画
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="https://github.com/creeper5820/creeper-qt/releases/tag/nightly-example"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  <Download className="mr-2 h-4 w-4" />
                  下载示例程序
                </Button>
              </Link>
              <Link href="https://www.bilibili.com/video/BV1GAq5YZEtr/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                  <Play className="mr-2 h-4 w-4" />
                  视频演示
                </Button>
              </Link>
            </motion.div>

            {/* Stats - now using dynamic GitHubStats */}
            <motion.div
              className="mt-12 flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GitHubStats />
            </motion.div>
          </div>

          {/* Right: Mascot Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              <Image
                src="https://r2.creeper5820.com/creeper-qt/creeper-qt.jpg"
                alt="Creeper-Qt 印象设计"
                fill
                className="object-contain rounded-3xl drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
