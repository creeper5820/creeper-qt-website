"use client"

import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const codeExample = `#include < ... >

auto main(int argc, char* argv[]) -> int {
  using namespace creeper;

  // Qt 运行时初始化
  auto application = new QApplication { argc, argv };

  // 创建主题管理器，可以传入主题包
  auto manager = ThemeManager { kGreenThemePack };

  // 和正常 Qt 一致的使用方式也是 OK 的，这里用声明式的方法示例
  creeper::ShowWindow {
    mwpro::MinimumSize { 1080, 720 },
    mwpro::Central {
      capro::ThemeManager { manager },
      capro::Radius { 0 },
      capro::Level { CardLevel::HIGHEST },

      capro::Layout {
        lnpro::Margin { 0 },
        lnpro::Spacing { 0 },

        lnpro::Item {
          // 某些自定义组件
          NavComponent(nav_component_state),
        },
        lnpro::Item {
          lnpro::ContentsMargin { { 15, 15, 5, 15 } },
          lnpro::Item { ListComponent(list_component_state) },
        },
      },
    },
  };

  // 将主题应用到注册过的组件中
  manager.apply_theme();

  return application->exec();
}`

export function CodeShowcase() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="docs" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-medium">Simple API</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">声明式组件构造</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              使用现代化的声明式语法创建和配置组件，告别繁琐的命令式 setter 调用
            </p>
            <ul className="mt-6 space-y-3">
              {["现代 C++ 声明式语法", "基于属性的配置方式", "构造时绑定主题管理器", "Lambda 事件处理"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-3xl bg-card border border-border overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                </div>
                <span className="text-xs text-muted-foreground font-mono">main.cc</span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleCopy}>
                  {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <pre className="p-6 overflow-x-auto text-sm max-h-[500px]">
                <code className="text-foreground font-mono">
                  {codeExample.split("\n").map((line, i) => (
                    <div key={i} className="leading-relaxed">
                      <span className="text-muted-foreground/50 select-none mr-4">
                        {String(i + 1).padStart(2, " ")}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSyntax(line),
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function highlightSyntax(line: string): string {
  return line
    .replace(/(#include|using|namespace|auto|new|return)/g, '<span class="text-primary">$1</span>')
    .replace(/(&lt;.*?&gt;|<.*?>)/g, '<span class="text-chart-2">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="text-muted-foreground">$1</span>')
    .replace(/(".*?")/g, '<span class="text-chart-4">$1</span>')
    .replace(/(\d+)/g, '<span class="text-chart-5">$1</span>')
}
