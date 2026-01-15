"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function SlotClock({ isRamMode }: { isRamMode: boolean }) {
  const [slot, setSlot] = useState(245000000)
  const [block, setBlock] = useState(195000)
  const [root, setRoot] = useState(244999900)
  const [skipped, setSkipped] = useState(487)

  useEffect(() => {
    if (!isRamMode) return

    const interval = setInterval(() => {
      setSlot((s) => s + 1)
      // Occasionally skip a slot
      if (Math.random() < 0.02) {
        setSkipped((sk) => sk + 1)
      }
      // Block progresses every ~32 slots (roughly)
      if (slot % 32 === 0) {
        setBlock((b) => b + 1)
      }
      // Root lags behind slot
      setRoot((r) => {
        if (slot % 100 === 0) return r + 1
        return r
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [slot, isRamMode])

  if (!isRamMode) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-16 left-0 right-0 h-12 bg-black border-b border-green-500/20 text-green-400 font-mono text-xs z-40"
    >
      <div className="h-full max-w-7xl mx-auto px-4 lg:ml-80 flex items-center gap-8 overflow-x-auto">
        <span className="text-green-500 font-bold whitespace-nowrap">CLUSTER mainnet-beta (sim)</span>
        <span className="whitespace-nowrap">SLOT {slot.toLocaleString()}</span>
        <span className="whitespace-nowrap">BLOCK {block.toLocaleString()}</span>
        <span className="whitespace-nowrap">ROOT {root.toLocaleString()}</span>
        <span className="whitespace-nowrap text-yellow-400">SKIPPED {skipped}</span>
      </div>
    </motion.div>
  )
}
