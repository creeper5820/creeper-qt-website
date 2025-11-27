"use client"

import { motion } from "framer-motion"
import { Palette, Zap, Layers, Moon, Settings, Code2 } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "现代化设计",
    description: "组件外观遵循 Google Material Design 3 规范，提供一致且美观的视觉体验。",
  },
  {
    icon: Settings,
    title: "声明式接口",
    description: "改造传统命令式调用，组件构造和配置一步完成，代码更简洁易读。",
  },
  {
    icon: Moon,
    title: "主题系统",
    description: "内置主题管理，支持明亮/黑暗模式及多种配色方案，轻松切换视觉风格。",
  },
  {
    icon: Zap,
    title: "流畅动画",
    description: "基于 PID 控制器和弹簧模型的迭代算法，实现丝滑动效和无缝打断。",
  },
  {
    icon: Layers,
    title: "开箱即用",
    description: "提供跨平台示例程序，支持 Linux AppImage 和 Windows 可执行文件。",
  },
  {
    icon: Code2,
    title: "CMake 集成",
    description: "简单的 CMake 配置即可集成到项目中，支持 Linux 和 Windows (MSYS2)。",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">特性</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">项目特点</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Creeper-Qt 提供完整的工具和组件，用于构建现代化 Qt 应用程序
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group p-6 bg-card rounded-3xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
