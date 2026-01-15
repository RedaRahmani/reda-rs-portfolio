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

export default function RegistersPanel({
  activeSection,
  isRamMode,
}: {
  activeSection: string
  isRamMode: boolean
}) {
  const [cursorBlink, setCursorBlink] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((b) => !b)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  if (!isRamMode) return null

  const pc = SECTION_ADDRESSES[activeSection] || "0x0000_0000"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-24 right-4 w-64 bg-black border border-green-500/30 rounded-lg p-4 z-40 hidden lg:block"
    >
      <div className="font-mono text-xs space-y-2 text-green-400">
        <div className="text-green-500 text-xs font-bold mb-3">REGISTERS</div>

        {/* PC with blinking cursor */}
        <div className="flex justify-between items-center">
          <span>PC</span>
          <span className="flex items-center gap-1">
            {pc}
            {cursorBlink && <span className="animate-pulse w-2 h-3 bg-green-400 ml-1"></span>}
          </span>
        </div>

        <div className="flex justify-between">
          <span>SP</span>
          <span>0x7fff_f000</span>
        </div>

        <div className="flex justify-between">
          <span>FP</span>
          <span>0x7fff_f100</span>
        </div>

        <div className="border-t border-green-500/20 my-2"></div>

        <div className="flex justify-between">
          <span>R1</span>
          <span>0x0000_0001</span>
        </div>

        <div className="flex justify-between">
          <span>R2</span>
          <span>0x0000_0002</span>
        </div>

        <div className="border-t border-green-500/20 my-2"></div>

        <div className="flex justify-between">
          <span>FLAGS</span>
          <span className="text-green-300">ZF=0 CF=1</span>
        </div>
      </div>
    </motion.div>
  )
}
