'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp, useCluster, useTower } from '@/lib/store'
import { MEMORY_REGIONS } from '@/lib/data'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SolanaRegistersPanel({ className = '' }: { className?: string }) {
  const { state } = useApp()
  const cluster = useCluster()
  const tower = useTower()
  const [cursorBlink, setCursorBlink] = useState(true)
  const [copiedReg, setCopiedReg] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((b) => !b)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  if (state.mode !== 'ram') return null

  const currentRegion = MEMORY_REGIONS[state.activeSection] || MEMORY_REGIONS.about
  const pc = currentRegion.baseAddr

  const copyValue = (key: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedReg(key)
    setTimeout(() => setCopiedReg(null), 1500)
  }

  const registers = [
    // Program Counter - current section address
    { key: 'PC', value: pc, label: 'Program Counter', highlight: true },
    // Stack Pointer - simulated
    { key: 'SP', value: '0x7fff_f000', label: 'Stack Pointer' },
    // Frame Pointer
    { key: 'FP', value: '0x7fff_f100', label: 'Frame Pointer' },
  ]

  const solanaRegs = [
    { key: 'SLOT', value: cluster.slot.toLocaleString(), label: 'Current Slot', highlight: true },
    { key: 'EPOCH', value: cluster.epoch.toString(), label: 'Current Epoch' },
    { key: 'ROOT', value: cluster.root.toLocaleString(), label: 'Root Slot' },
    { key: 'VOTE', value: tower.lastVoteSlot.toLocaleString(), label: 'Last Vote' },
  ]

  const flags = [
    { key: 'ZF', value: cluster.health === 'healthy' ? '0' : '1', label: 'Zero Flag' },
    { key: 'CF', value: cluster.skippedSlots > 0 ? '1' : '0', label: 'Carry Flag' },
    { key: 'OF', value: tower.rootDistance > 40 ? '1' : '0', label: 'Overflow Flag' },
    { key: 'SF', value: '0', label: 'Sign Flag' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'w-full bg-black/90 border border-green-500/30 rounded-lg p-4 z-30 backdrop-blur-sm',
        className
      )}
    >
      <div className="font-mono text-xs space-y-3">
        {/* Header */}
        <div className="text-green-500 font-bold tracking-wider flex items-center justify-between">
          <span>REGISTERS</span>
          <span className="text-[10px] text-gray-600">
            {state.activeSection.toUpperCase()}
          </span>
        </div>

        {/* CPU Registers */}
        <div className="space-y-1">
          {registers.map((reg) => (
            <RegisterRow
              key={reg.key}
              regKey={reg.key}
              value={reg.value}
              highlight={reg.highlight}
              showCursor={reg.key === 'PC' && cursorBlink}
              copied={copiedReg === reg.key}
              onCopy={() => copyValue(reg.key, reg.value)}
            />
          ))}
        </div>

        <div className="border-t border-green-500/20" />

        {/* Solana-specific Registers */}
        <div className="space-y-1">
          <div className="text-green-600 text-[10px] mb-1">SOLANA STATE</div>
          {solanaRegs.map((reg) => (
            <RegisterRow
              key={reg.key}
              regKey={reg.key}
              value={reg.value}
              highlight={reg.highlight}
              copied={copiedReg === reg.key}
              onCopy={() => copyValue(reg.key, reg.value)}
            />
          ))}
        </div>

        <div className="border-t border-green-500/20" />

        {/* Flags */}
        <div className="space-y-1">
          <div className="text-green-600 text-[10px] mb-1">FLAGS</div>
          <div className="flex flex-wrap gap-2">
            {flags.map((flag) => (
              <div
                key={flag.key}
                className={`px-2 py-1 rounded text-[10px] ${
                  flag.value === '1'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-green-500/10 text-green-500'
                }`}
                title={flag.label}
              >
                {flag.key}={flag.value}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-green-500/20" />

        {/* Memory Region Info */}
        <div className="space-y-1">
          <div className="text-green-600 text-[10px]">MEMORY REGION</div>
          <div className="bg-green-500/5 rounded p-2 space-y-0.5">
            <div className="flex justify-between">
              <span className="text-gray-500">name</span>
              <span className="text-green-400">{currentRegion.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">segment</span>
              <span className="text-green-400">{currentRegion.segment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">perms</span>
              <span className={`${
                currentRegion.perms.includes('x') ? 'text-red-400' : 'text-green-400'
              }`}>
                {currentRegion.perms}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">checksum</span>
              <span className="text-gray-400">{currentRegion.checksum}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RegisterRow({
  regKey,
  value,
  highlight,
  showCursor,
  copied,
  onCopy,
}: {
  regKey: string
  value: string
  highlight?: boolean
  showCursor?: boolean
  copied?: boolean
  onCopy: () => void
}) {
  return (
    <div className="flex justify-between items-center group">
      <span className="text-gray-500">{regKey}</span>
      <div className="flex items-center gap-1">
        <span className={`${highlight ? 'text-green-400' : 'text-gray-300'} flex items-center`}>
          {value}
          {showCursor && (
            <span className="w-1.5 h-3.5 bg-green-400 ml-1 animate-pulse" />
          )}
        </span>
        <button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-green-400 p-0.5"
        >
          {copied ? (
            <Check className="w-2.5 h-2.5 text-green-400" />
          ) : (
            <Copy className="w-2.5 h-2.5" />
          )}
        </button>
      </div>
    </div>
  )
}
