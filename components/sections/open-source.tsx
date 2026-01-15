"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const CONTRIBUTIONS = [
  {
    repo: "Yellowstone Geyser",
    title: "Add subscription filters for account updates",
    status: "Merged",
    changes: [
      "Implemented account owner filtering",
      "Added subscription predicate logic",
      "Improved filter performance by 40%",
    ],
    impact: "Clients can now filter updates without processing overhead",
  },
  {
    repo: "DoubleZero",
    title: "Implement async database writes",
    status: "Merged",
    changes: ["Refactored sync I/O to async/await", "Added connection pooling", "Reduced latency by 60%"],
    impact: "Unblocked high-throughput indexing pipelines",
  },
  {
    repo: "Triton One",
    title: "Add MEV protection mechanisms",
    status: "Open",
    changes: ["Designed MEV mitigation strategy", "Implemented sandwich protection", "Added monitoring hooks"],
    impact: "Protects users from value extraction",
  },
]

const SKILLS_MAP = [
  { skill: "Rust async", icon: "⚡" },
  { skill: "Networking", icon: "🌐" },
  { skill: "Protobuf", icon: "📦" },
  { skill: "Databases", icon: "🗄️" },
  { skill: "Observability", icon: "👁️" },
  { skill: "Solana runtime", icon: "⛓️" },
]

export default function OpenSource({ isRamMode }: { isRamMode: boolean }) {
  return (
    <section
      id="open-source"
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-300 ${
        isRamMode ? "bg-black border-b border-green-500/20" : "bg-white border-b border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4">
            <div
              className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? "text-green-500" : "text-gray-600"}`}
            >
              0x0000_2000 (.data)
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? "text-green-400" : "text-black"}`}>
              Open Source
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contributions */}
            <div className="md:col-span-2 space-y-4">
              {CONTRIBUTIONS.map((contrib, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-lg border transition-all ${
                    isRamMode
                      ? "bg-black/50 border-green-500/20 hover:border-green-500/50"
                      : "bg-gray-50 border-gray-300 hover:border-black"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className={`text-sm font-mono mb-1 ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                          {contrib.repo}
                        </div>
                        <h3 className={`font-bold ${isRamMode ? "text-green-400" : "text-black"}`}>{contrib.title}</h3>
                      </div>
                      <Badge
                        className={`font-mono text-xs ${
                          contrib.status === "Merged"
                            ? isRamMode
                              ? "bg-green-500/20 text-green-300"
                              : "bg-green-100 text-green-800"
                            : isRamMode
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-blue-100 text-blue-800"
                        }`}
                        variant="outline"
                      >
                        {contrib.status}
                      </Badge>
                    </div>

                    <ul className={`space-y-1 text-sm ${isRamMode ? "text-gray-400" : "text-gray-600"}`}>
                      {contrib.changes.map((change, j) => (
                        <li key={j}>• {change}</li>
                      ))}
                    </ul>

                    <div
                      className={`text-sm italic border-l-2 pl-3 ${
                        isRamMode ? "border-green-500/30 text-gray-400" : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {contrib.impact}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-xs font-mono gap-1 ${
                          isRamMode ? "text-green-400 hover:bg-green-500/10" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View PR
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Map Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border h-fit transition-all ${
                isRamMode ? "bg-black/50 border-green-500/20" : "bg-gray-50 border-gray-300"
              }`}
            >
              <p className={`font-bold mb-4 text-sm ${isRamMode ? "text-green-400" : "text-black"}`}>Skills Map</p>
              <div className="space-y-2">
                {SKILLS_MAP.map((item) => (
                  <div
                    key={item.skill}
                    className={`p-2 rounded text-sm font-mono transition-all ${
                      isRamMode
                        ? "bg-green-500/10 hover:bg-green-500/20 text-green-400"
                        : "bg-white hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
