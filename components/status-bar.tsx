"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const SECTION_ADDRESSES: Record<string, string> = {
  about: "0x0000_0000",
  projects: "0x0000_1000",
  "open-source": "0x0000_2000",
  writeups: "0x0000_3000",
  now: "0x0000_4000",
  contact: "0x0000_5000",
}

export default function StatusBar({
  activeSection,
  isRamMode,
}: {
  activeSection: string
  isRamMode: boolean
}) {
  const [uptime, setUptime] = useState("00:00:00")
  const [time, setTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1)
      const hours = Math.floor(time / 3600)
        .toString()
        .padStart(2, "0")
      const minutes = Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, "0")
      const seconds = (time % 60).toString().padStart(2, "0")
      setUptime(`${hours}:${minutes}:${seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [time])

  const pc = SECTION_ADDRESSES[activeSection] || "0x0000_0000"
  const heapSize = (24.3 + Math.random() * 2).toFixed(1)

  if (!isRamMode) {
    return (
      <footer className="px-4 py-3 border-t border-gray-200 bg-white text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto">© 2026 Reda. All rights reserved.</div>
      </footer>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-green-500/20 text-green-400 font-mono text-xs flex items-center px-4 z-50"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4 overflow-x-auto">
          <span>PID 1337</span>
          <span>PC {pc}</span>
          <span>SP 0x7fff_f000</span>
          <span>HEAP {heapSize}MB</span>
          <span>UPTIME {uptime}</span>
          <span className="ml-auto">MODE: RAM</span>
        </div>
      </div>
    </motion.div>
  )
}
