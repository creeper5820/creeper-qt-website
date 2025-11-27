"use client"

import { motion } from "framer-motion"
import { Tag, ArrowUpRight, Megaphone, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "版本发布",
    description: "接口设计目前基本稳定，等接口稳定后 release 正式版本，开始迭代版本号。多数修改不会影响下游项目。",
    date: "计划中",
    type: "发布",
    isHighlighted: true,
  },
  {
    id: 2,
    title: "组件完善",
    description: "全组件表格展示、增加更多组件（组件数量仍需扩充）、按钮的禁用效果优化。",
    date: "进行中",
    type: "功能",
    isHighlighted: false,
  },
  {
    id: 3,
    title: "布局容器",
    description: "增加视图容器（原生容器不可用），目前已实现无动画的 Flow 布局。",
    date: "进行中",
    type: "功能",
    isHighlighted: false,
  },
  {
    id: 4,
    title: "高级组件",
    description: "提供日历模组组件、提供设置中心示例等高级功能模块。",
    date: "计划中",
    type: "增强",
    isHighlighted: false,
  },
]

export function EventsSection() {
  return (
    <section id="events" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-primary font-medium">路线图</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">开发动态</h2>
          <p className="mt-4 text-muted-foreground text-lg">关注最新的版本发布、功能更新和社区活动</p>
        </motion.div>

        <div className="mt-12 grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className={`group p-6 rounded-3xl border transition-all duration-300 ${
                event.isHighlighted
                  ? "bg-primary/5 border-primary/30 hover:border-primary/50"
                  : "bg-card border-border hover:border-primary/30"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    event.isHighlighted ? "bg-primary/20" : "bg-muted"
                  }`}
                >
                  {event.isHighlighted ? (
                    <Megaphone className="w-6 h-6 text-primary" />
                  ) : event.date === "进行中" ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Clock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{event.title}</h3>
                    <Badge variant="secondary" className="rounded-full">
                      <Tag className="w-3 h-3 mr-1" />
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span
                    className={`text-sm font-medium ${event.date === "进行中" ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {event.date}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-muted-foreground mb-4">欢迎贡献！期待您的 PR 和 Issue</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" className="rounded-full bg-transparent" asChild>
              <a href="https://github.com/creeper5820/creeper-qt/issues" target="_blank" rel="noopener noreferrer">
                提交 Issue
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <span className="text-muted-foreground text-sm">
              QQ交流群：<span className="text-primary font-medium">885246539</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
