"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const SKILLS = ["Rust", "Solana", "SVM", "Geyser", "Kafka", "ClickHouse", "Anchor"]

export default function Hero({ isRamMode }: { isRamMode: boolean }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-300 ${
        isRamMode
          ? "bg-black border-b border-green-500/20"
          : "bg-gradient-to-br from-slate-50 to-slate-100 border-b border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1
                className={`text-5xl md:text-7xl font-bold font-mono leading-tight ${
                  isRamMode ? "text-green-400 glow-text drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "text-black"
                }`}
              >
                Rust + Solana
                <br />
                Engineer
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl leading-relaxed max-w-md ${isRamMode ? "text-gray-300" : "text-gray-700"}`}
            >
              I build Solana infra: indexers, decoders, Geyser pipelines, performance tooling.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <Button
                size="lg"
                className={`font-mono ${
                  isRamMode ? "bg-green-600 hover:bg-green-700 text-black" : "bg-black hover:bg-gray-900 text-white"
                }`}
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`font-mono ${
                  isRamMode
                    ? "border-green-500/50 text-green-400 hover:bg-green-500/10"
                    : "border-black text-black hover:bg-black/5"
                }`}
              >
                Open Source
              </Button>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p
                className={`text-sm font-mono uppercase tracking-wider ${
                  isRamMode ? "text-green-500" : "text-gray-600"
                }`}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <Badge
                    key={skill}
                    variant={isRamMode ? "default" : "secondary"}
                    className={`font-mono text-xs ${
                      isRamMode
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Memory Snapshot */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`font-mono text-sm p-6 rounded-lg border transition-all duration-300 ${
              isRamMode
                ? "bg-black/50 border-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <div className="space-y-2">
              <div className={isRamMode ? "text-green-500" : "text-gray-600"}>{"// Memory Snapshot"}</div>
              <div>{"struct Profile {"}</div>
              <div className="ml-4 space-y-1">
                <div>name: "Reda",</div>
                <div>location: "Solana Labs",</div>
                <div>focus: "Infra & Performance",</div>
                <div>stack: [Rust, Geyser, Kafka],</div>
                <div>current: "Indexing Solutions",</div>
              </div>
              <div>{"}"}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
