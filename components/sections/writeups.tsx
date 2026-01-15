"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const WRITEUPS = [
  {
    title: "Reorg-safe ingestion: deterministic IDs + gap repair",
    tags: ["Indexing", "Solana", "Architecture"],
    readTime: "8 min",
    excerpt: "How to handle ledger reorgs safely while maintaining data consistency...",
  },
  {
    title: "Geyser → Kafka → ClickHouse: production notes",
    tags: ["Streaming", "Kafka", "Data Pipeline"],
    readTime: "12 min",
    excerpt: "End-to-end walkthrough of a high-throughput event streaming architecture...",
  },
  {
    title: "Compute unit hotspots: hidden allocs in Rust",
    tags: ["Performance", "Rust", "Optimization"],
    readTime: "6 min",
    excerpt: "Finding and eliminating surprising allocations that blow through CU budgets...",
  },
  {
    title: "Account locks & parallelism: how throughput breaks",
    tags: ["Concurrency", "SVM", "Systems"],
    readTime: "10 min",
    excerpt: "Understanding account contention and its impact on validator throughput...",
  },
]

export default function Writeups({ isRamMode }: { isRamMode: boolean }) {
  return (
    <section
      id="writeups"
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-300 ${
        isRamMode ? "bg-black border-b border-green-500/20" : "bg-gray-50 border-b border-gray-200"
      }`}
    >
      <div className="max-w-4xl mx-auto w-full">
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
              0x0000_3000 (.stack)
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? "text-green-400" : "text-black"}`}>
              Write-ups
            </h2>
          </div>

          {/* Articles */}
          <div className="space-y-4">
            {WRITEUPS.map((article, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-lg border transition-all group ${
                  isRamMode
                    ? "bg-black/50 border-green-500/20 hover:border-green-500/50"
                    : "bg-white border-gray-300 hover:border-black"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={`font-bold text-lg leading-snug ${
                        isRamMode ? "text-green-400 group-hover:text-green-300" : "text-black group-hover:text-gray-700"
                      }`}
                    >
                      {article.title}
                    </h3>
                    <span
                      className={`text-xs font-mono whitespace-nowrap ${
                        isRamMode ? "text-green-500" : "text-gray-600"
                      }`}
                    >
                      {article.readTime}
                    </span>
                  </div>

                  <p className={`text-sm ${isRamMode ? "text-gray-400" : "text-gray-600"}`}>{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className={`font-mono text-xs ${
                            isRamMode
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-gray-200 text-gray-800"
                          }`}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-xs font-mono gap-1 ${
                        isRamMode ? "text-green-400 hover:bg-green-500/10" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Read
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
