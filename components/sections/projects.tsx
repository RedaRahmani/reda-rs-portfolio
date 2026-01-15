"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Github } from "lucide-react"
import ProjectDetailSheet from "@/components/project-detail-sheet"

const PROJECTS = [
  {
    name: "Solana DEX MEV Indexer",
    address: "0x0000_1000",
    size: "0x0000_1200",
    perms: "r-x",
    purpose: "Real-time MEV detection and analysis pipeline",
    stack: ["Rust", "Kafka", "ClickHouse", "Geyser"],
    impact: "10M+ transactions indexed/day",
    architecture: "Multi-stage pipeline with Kafka for event streaming and ClickHouse for analytics storage",
    whatBuilt: "Rust consumer for Geyser, Kafka producer, ClickHouse schema optimization",
    lessons: "Partitioning strategies and backpressure handling at scale",
    metrics: [
      { label: "Transactions/day", value: "10M+" },
      { label: "Latency", value: "<100ms" },
    ],
  },
  {
    name: "Yellowstone Geyser Ingestion",
    address: "0x0000_2200",
    size: "0x0000_0800",
    perms: "r-x",
    purpose: "High-throughput gRPC client with filtering and reorg handling",
    stack: ["Rust", "Geyser", "Protocol Buffers", "Tokio"],
    impact: "99.9% uptime across 3 regions",
    architecture: "Async Rust with tokio runtime, subscription filters, state recovery",
    whatBuilt: "gRPC client, account/transaction filters, reorg detection",
    lessons: "Network resilience and state management during ledger reorgs",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Regions", value: "3" },
    ],
  },
  {
    name: "Tx Decoder Toolkit",
    address: "0x0000_3000",
    size: "0x0000_0600",
    perms: "r-x",
    purpose: "Parse and decode Solana transactions for major DEX programs",
    stack: ["Rust", "Anchor", "Borsh", "Raydium/Orca"],
    impact: "95%+ program coverage",
    architecture: "Plugin system for program decoders, macro-based IDL parsing",
    whatBuilt: "Decoder implementations, Anchor IDL automation, CLI tool",
    lessons: "IDL parsing challenges and instruction encoding",
    metrics: [
      { label: "Coverage", value: "95%+" },
      { label: "Programs", value: "20+" },
    ],
  },
  {
    name: "On-chain Program Suite",
    address: "0x0000_3600",
    size: "0x0000_0400",
    perms: "r-x",
    purpose: "Anchor smart contracts with security audits",
    stack: ["Anchor", "Rust", "Solana", "SPL"],
    impact: "5M SOL TVL managed",
    architecture: "Modular program design, PDA-based state, granular permissions",
    whatBuilt: "Core program, test suite, security review integration",
    lessons: "PDA derivation patterns and compute unit optimization",
    metrics: [
      { label: "TVL", value: "5M SOL" },
      { label: "Audits", value: "2" },
    ],
  },
  {
    name: "Performance Tooling Suite",
    address: "0x0000_3A00",
    size: "0x0000_0300",
    perms: "r-x",
    purpose: "CU analysis and hidden allocation detection",
    stack: ["Rust", "Solana CLI", "Log parsing"],
    impact: "30% CU reduction for clients",
    architecture: "Log aggregation, statistical analysis, reporting",
    whatBuilt: "CU profiler, allocation tracker, HTML report generator",
    lessons: "Log parsing at scale and memory leak detection",
    metrics: [
      { label: "CU Reduction", value: "30%" },
      { label: "Clients", value: "12" },
    ],
  },
]

const FILTERS = ["All", "Indexing", "Geyser", "On-chain", "Perf", "Devtools"]

export default function Projects({
  isRamMode,
  onSectionChange,
}: {
  isRamMode: boolean
  onSectionChange?: (section: string) => void
}) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[0] | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleDetailOpen = (project: (typeof PROJECTS)[0]) => {
    setSelectedProject(project)
    setDetailOpen(true)
    onSectionChange?.("projects")
  }

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr)
  }

  return (
    <section
      id="projects"
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-300 ${
        isRamMode ? "bg-black border-b border-green-500/20" : "bg-gray-50 border-b border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div
              className={`font-mono text-xs font-bold tracking-wider ${isRamMode ? "text-green-500" : "text-gray-600"}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span>.text</span>
                <button
                  onClick={() => copyAddress("0x0000_1000")}
                  className="hover:text-green-400 transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              <div className={`text-xs ${isRamMode ? "text-gray-600" : "text-gray-500"}`}>
                base=0x0000_1000 size=0x0000_3000 perms=r-x checksum=0xA91F
              </div>
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? "text-green-400" : "text-black"}`}>
              Projects
            </h2>
            <div
              className={`h-px ${isRamMode ? "bg-gradient-to-r from-green-500/20 to-transparent" : "bg-gray-300"}`}
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-all ${
                  activeFilter === filter
                    ? isRamMode
                      ? "bg-green-500 text-black"
                      : "bg-black text-white"
                    : isRamMode
                      ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-lg border transition-all group ${
                  isRamMode
                    ? "bg-black/50 border-green-500/20 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                    : "bg-white border-gray-300 hover:border-black hover:shadow-lg"
                }`}
              >
                <div className="space-y-4">
                  {/* Allocation header */}
                  <div className="space-y-2">
                    <div className={`font-mono text-xs ${isRamMode ? "text-green-600" : "text-gray-600"}`}>
                      alloc({project.name.slice(0, 10)}, {project.address}, {project.size}, {project.perms})
                    </div>
                    <h3 className={`font-bold text-lg ${isRamMode ? "text-green-400" : "text-black"}`}>
                      {project.name}
                    </h3>
                  </div>

                  {/* Purpose */}
                  <p className={`text-sm ${isRamMode ? "text-gray-400" : "text-gray-600"}`}>{project.purpose}</p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        className={`font-mono text-xs ${
                          isRamMode ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-gray-200 text-gray-800"
                        }`}
                        variant="outline"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Impact */}
                  <div className={`text-sm font-mono ${isRamMode ? "text-green-500" : "text-gray-700"}`}>
                    📊 {project.impact}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-300/20">
                    <Button
                      size="sm"
                      onClick={() => handleDetailOpen(project)}
                      className={`text-xs font-mono gap-1 flex-1 ${
                        isRamMode
                          ? "bg-green-500 hover:bg-green-600 text-black"
                          : "bg-black hover:bg-gray-900 text-white"
                      }`}
                    >
                      View Dump
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-xs font-mono gap-1 ${
                        isRamMode ? "text-green-400 hover:bg-green-500/10" : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Github className="w-3 h-3" />
                      Repo
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectDetailSheet
          open={detailOpen}
          onOpenChange={setDetailOpen}
          project={selectedProject}
          isRamMode={isRamMode}
        />
      )}
    </section>
  )
}
