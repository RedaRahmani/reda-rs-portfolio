"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const SECTION_ADDRESSES = {
  about: "0x0000_0000",
  projects: "0x0000_1000",
  "open-source": "0x0000_2000",
  writeups: "0x0000_3000",
  now: "0x0000_4000",
  contact: "0x0000_5000",
}

const generateHexDump = (baseAddr: string): string[] => {
  // Parse base address (e.g., "0x0000_1000" -> 0x1000)
  const baseNum = Number.parseInt(baseAddr.replace(/_/g, ""), 16)
  const lines: string[] = []

  for (let i = 0; i < 32; i++) {
    const addr = baseNum + i * 16
    const addrStr = `0x${addr
      .toString(16)
      .padStart(8, "0")
      .replace(/(.{4})$/, "_$1")}`

    // Generate random hex bytes
    const bytes = Array.from({ length: 16 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0"),
    ).join(" ")

    // Generate ASCII (mostly printable, some dots)
    const ascii = Array.from({ length: 16 }, () => {
      const code = Math.floor(Math.random() * 94) + 33
      return code >= 32 && code <= 126 && Math.random() > 0.3 ? String.fromCharCode(code) : "."
    }).join("")

    lines.push(`${addrStr}  ${bytes}  ${ascii}`)
  }

  return lines
}

export default function HexDumpGutter({
  activeSection,
  isRamMode,
}: {
  activeSection: string
  isRamMode: boolean
}) {
  const [hexLines, setHexLines] = useState<string[]>([])
  const baseAddr = SECTION_ADDRESSES[activeSection as keyof typeof SECTION_ADDRESSES] || "0x0000_0000"

  useEffect(() => {
    setHexLines(generateHexDump(baseAddr))
  }, [baseAddr])

  if (!isRamMode) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-80 bg-black border-r border-green-500/20 overflow-hidden flex-col z-40"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-green-500/20 bg-black/50">
        <div className="font-mono text-xs text-green-500 space-y-1">
          <div>HEXDUMP(1)</div>
          <div className="text-green-400">{baseAddr}</div>
          <div className="text-gray-600">16 bytes/row</div>
        </div>
      </div>

      {/* Hex dump lines */}
      <div className="flex-1 overflow-y-auto font-mono text-xs text-green-400 p-4 space-y-px">
        {hexLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.01 }}
            className="hover:bg-green-500/10 px-2 py-0.5 rounded transition-colors"
          >
            {line}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
