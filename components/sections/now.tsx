"use client"

import { motion } from "framer-motion"

const CURRENT_ITEMS = [
  {
    label: "Current Project",
    value: "Building next-gen indexing solution for Solana",
    progress: 65,
  },
  {
    label: "Learning Focus",
    value: "Distributed consensus algorithms & MEV protection",
    progress: 40,
  },
  {
    label: "Next OSS Target",
    value: "Performance profiling toolkit for Rust programs",
    progress: 15,
  },
]

export default function Now({ isRamMode }: { isRamMode: boolean }) {
  return (
    <section
      id="now"
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-300 ${
        isRamMode ? "bg-black border-b border-green-500/20" : "bg-white border-b border-gray-200"
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
              0x0000_4000 (.bss)
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? "text-green-400" : "text-black"}`}>Now</h2>
          </div>

          <p className={`text-lg max-w-2xl ${isRamMode ? "text-gray-300" : "text-gray-700"}`}>Currently loading...</p>

          {/* Items */}
          <div className="space-y-6">
            {CURRENT_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <p className={`font-mono text-sm font-bold ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                    {item.label}
                  </p>
                  <span className={`font-mono text-xs ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                    {item.progress}%
                  </span>
                </div>
                <p className={`${isRamMode ? "text-gray-400" : "text-gray-700"}`}>{item.value}</p>
                <div
                  className={`w-full h-2 rounded-full overflow-hidden ${
                    isRamMode ? "bg-green-500/10 border border-green-500/20" : "bg-gray-200 border border-gray-300"
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 1 }}
                    className={`h-full ${isRamMode ? "bg-green-500" : "bg-black"}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
