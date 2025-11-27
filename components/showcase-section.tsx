"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ShowcaseSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.clientWidth * 0.8
      const { scrollLeft, scrollWidth, clientWidth } = container

      if (direction === "left") {
        if (scrollLeft <= 0) {
          // 循环到末尾
          container.scrollTo({
            left: scrollWidth - clientWidth,
            behavior: "smooth",
          })
        } else {
          container.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          })
        }
      } else {
        if (scrollLeft >= scrollWidth - clientWidth - 1) {
          // 循环到开头
          container.scrollTo({
            left: 0,
            behavior: "smooth",
          })
        } else {
          container.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          })
        }
      }
    }
  }
  const images = [
    {
      src: "https://r2.creeper5820.com/creeper-qt/MainWindow-Screenshot-2025-09-29_21-15-30.png",
      alt: "主窗口明亮主题",
      width: 1200,
      height: 750,
    },
    {
      src: "https://r2.creeper5820.com/creeper-qt/MainWindow-Screenshot-2025-09-29_21-15-38.png",
      alt: "主窗口黑暗主题",
      width: 1200,
      height: 750,
    },
    {
      src: "https://r2.creeper5820.com/creeper-qt/blue-style-widgets.png",
      alt: "组件样式展示",
      width: 1600,
      height: 1200,
    },
    {
      src: "https://r2.creeper5820.com/creeper-qt/switch-working.gif",
      alt: "开关动画",
      width: 800,
      height: 800,
      unoptimized: true,
    },
    {
      src: "https://r2.creeper5820.com/creeper-qt/filled-text-field.gif",
      alt: "文本框动画",
      width: 800,
      height: 800,
      unoptimized: true,
    },
  ]

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Text content above the layout */}
        <motion.div
          className="mb-8 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            所有组件遵循 Material Design 3 规范，提供一致的视觉体验。
          </p>
        </motion.div>

        {/* Background Card Container */}
        <div className="relative rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-lg p-4 sm:p-6">
          {/* Navigation Buttons - Inside card but not at edge */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/60 backdrop-blur-xl shadow-lg border border-border/50 hover:bg-background/70 hidden sm:flex items-center justify-center"
            onClick={() => scroll("left")}
            aria-label="向左滚动"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/60 backdrop-blur-xl shadow-lg border border-border/50 hover:bg-background/70 hidden sm:flex items-center justify-center"
            onClick={() => scroll("right")}
            aria-label="向右滚动"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          {/* Horizontal Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02] bg-background/50 backdrop-blur-sm border border-border/50">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-auto object-contain"
                      sizes="(max-width: 640px) 250px, (max-width: 768px) 350px, (max-width: 1024px) 450px, 550px"
                      unoptimized={image.unoptimized}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

