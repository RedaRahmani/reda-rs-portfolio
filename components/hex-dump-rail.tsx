'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/lib/store'
import { MEMORY_REGIONS, SECTIONS } from '@/lib/data'
import { Search, Copy, Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Generate deterministic hex dump based on address
function generateHexDump(baseAddr: string, rows: number = 32): string[] {
  const baseNum = parseInt(baseAddr.replace(/_/g, ''), 16)
  const lines: string[] = []
  
  // Use seeded random for consistency
  const seed = baseNum
  const seededRandom = (n: number) => {
    const x = Math.sin(seed + n) * 10000
    return x - Math.floor(x)
  }

  for (let i = 0; i < rows; i++) {
    const addr = baseNum + i * 16
    const addrStr = `0x${addr.toString(16).padStart(8, '0').replace(/(.{4})$/, '_$1')}`

    // Generate hex bytes with seeded random
    const bytes = Array.from({ length: 16 }, (_, j) =>
      Math.floor(seededRandom(i * 16 + j) * 256)
        .toString(16)
        .padStart(2, '0')
    ).join(' ')

    // Generate ASCII representation
    const ascii = Array.from({ length: 16 }, (_, j) => {
      const code = Math.floor(seededRandom(i * 16 + j) * 94) + 33
      return code >= 32 && code <= 126 ? String.fromCharCode(code) : '.'
    }).join('')

    lines.push(`${addrStr}  ${bytes}  ${ascii}`)
  }

  return lines
}

export default function HexDumpRail({
  className = '',
  variant = 'rail',
}: {
  className?: string
  variant?: 'rail' | 'drawer'
}) {
  const { state, dispatch, addKernelLog, addRpcTrace } = useApp()
  const [hexLines, setHexLines] = useState<string[]>([])
  const [goToInput, setGoToInput] = useState('')
  const [showGoTo, setShowGoTo] = useState(false)
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null)
  const [highlightedLines, setHighlightedLines] = useState<Set<number>>(new Set())

  const currentRegion = MEMORY_REGIONS[state.activeSection] || MEMORY_REGIONS.about
  const baseAddr = currentRegion.baseAddr

  // Generate hex dump when base address changes
  useEffect(() => {
    setHexLines(generateHexDump(baseAddr, 48))
  }, [baseAddr])

  // Handle memory highlight from hovering items
  useEffect(() => {
    if (!state.highlightedMemoryRange) {
      setHighlightedLines(new Set())
      return
    }

    const { start, end } = state.highlightedMemoryRange
    const startNum = parseInt(start.replace(/_/g, ''), 16)
    const endNum = parseInt(end.replace(/_/g, ''), 16)
    const baseNum = parseInt(baseAddr.replace(/_/g, ''), 16)

    const highlighted = new Set<number>()
    for (let i = 0; i < hexLines.length; i++) {
      const lineAddr = baseNum + i * 16
      if (lineAddr >= startNum && lineAddr < endNum) {
        highlighted.add(i)
      }
    }
    setHighlightedLines(highlighted)
  }, [state.highlightedMemoryRange, baseAddr, hexLines.length])

  const handleCopyAddress = useCallback((addr: string) => {
    navigator.clipboard.writeText(addr)
    setCopiedAddr(addr)
    addKernelLog('info', 'mem', `copied address ${addr} to clipboard`)
    setTimeout(() => setCopiedAddr(null), 2000)
  }, [addKernelLog])

  const handleGoToAddress = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const addr = goToInput.trim()
    if (addr) {
      dispatch({ type: 'GOTO_ADDRESS', payload: addr })
      addKernelLog('info', 'mem', `goto address ${addr}`)
      addRpcTrace('getAccountInfo', `{ pubkey: "${addr}" }`)
      setShowGoTo(false)
      setGoToInput('')
    }
  }, [goToInput, dispatch, addKernelLog, addRpcTrace])

  if (state.mode !== 'ram') return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex flex-col h-full overflow-hidden rounded-xl border border-green-500/20 bg-black/80 backdrop-blur-sm',
        variant === 'drawer' ? 'shadow-lg' : '',
        className
      )}
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-green-500/20 bg-black/60">
        <div className="font-mono text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-green-500 font-bold">HEXDUMP</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowGoTo(!showGoTo)}
                className="text-gray-500 hover:text-green-400 transition-colors p-1"
                title="Go to address (g)"
              >
                <Search className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleCopyAddress(baseAddr)}
                className="text-gray-500 hover:text-green-400 transition-colors p-1"
                title="Copy base address"
              >
                {copiedAddr === baseAddr ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
          
          {/* Region info */}
          <div className="text-green-400 font-bold">{currentRegion.name}</div>
          <div className="text-gray-500 text-[10px] space-y-0.5">
            <div>base={baseAddr}</div>
            <div>size={currentRegion.size} perms={currentRegion.perms}</div>
            <div>checksum={currentRegion.checksum}</div>
          </div>
        </div>

        {/* Go to address input */}
        <AnimatePresence>
          {showGoTo && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleGoToAddress}
              className="mt-3 overflow-hidden"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={goToInput}
                  onChange={(e) => setGoToInput(e.target.value)}
                  placeholder="0x0000_0000"
                  className="flex-1 bg-black border border-green-500/30 rounded px-2 py-1 font-mono text-xs text-green-400 placeholder:text-gray-600 focus:outline-none focus:border-green-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono hover:bg-green-500/30 transition-colors"
                >
                  GO
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* Memory Map Mini-bar */}
      <div className="flex-shrink-0 px-4 py-2 border-b border-green-500/20 bg-green-500/5">
        <div className="text-[10px] text-gray-500 mb-1 font-mono">MEMORY MAP</div>
        <div className="flex gap-0.5 h-3">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className={`flex-1 rounded-sm transition-colors cursor-pointer ${
                state.activeSection === section.id
                  ? 'bg-green-500'
                  : 'bg-green-500/20 hover:bg-green-500/40'
              }`}
              onClick={() => {
                const el = document.getElementById(section.id)
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              title={`${section.label} (${section.memoryRegion.baseAddr})`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-gray-600 mt-1 font-mono">
          <span>0x0000_0000</span>
          <span>0x0000_7000</span>
        </div>
      </div>

      {/* Hex dump lines */}
      <div className="flex-1 overflow-y-auto font-mono text-[11px] text-green-400 p-2 space-y-px">
        {hexLines.map((line, i) => {
          const isHighlighted = highlightedLines.has(i)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                backgroundColor: isHighlighted ? 'rgba(34, 197, 94, 0.2)' : 'transparent'
              }}
              transition={{ delay: i * 0.005 }}
              className={`px-2 py-0.5 rounded transition-colors cursor-pointer hover:bg-green-500/10 ${
                isHighlighted ? 'border-l-2 border-green-500' : ''
              }`}
              onClick={() => {
                const addr = line.split('  ')[0]
                handleCopyAddress(addr)
              }}
            >
              <span className="text-green-600">{line.split('  ')[0]}</span>
              {'  '}
              <span className={isHighlighted ? 'text-green-300' : 'text-green-500'}>
                {line.split('  ')[1]}
              </span>
              {'  '}
              <span className="text-gray-600">{line.split('  ')[2]}</span>
            </motion.div>
          )
        })}
      </div>

      {/* Footer with keyboard hints */}
      <div className="flex-shrink-0 px-4 py-2 border-t border-green-500/20 bg-black/50">
        <div className="flex justify-between text-[10px] text-gray-600 font-mono">
          <span>g: goto</span>
          <span>/: search</span>
          <span>j/k: scroll</span>
        </div>
      </div>
    </motion.div>
  )
}
