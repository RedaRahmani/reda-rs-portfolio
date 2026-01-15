"use client"

import { motion } from "framer-motion"

export default function Footer({ isRamMode }: { isRamMode: boolean }) {
  return (
    <footer
      className={`px-4 py-12 border-t transition-colors duration-300 ${
        isRamMode ? "bg-black border-green-500/20 text-green-500" : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-sm"
        >
          {isRamMode ? "// Memory freed at exit()" : "© 2026 Reda. All rights reserved."}
        </motion.p>
      </div>
    </footer>
  )
}
