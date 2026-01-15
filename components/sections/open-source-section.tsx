'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Copy, Check, GitMerge, GitPullRequest } from 'lucide-react'
import { useApp } from '@/lib/store'
import { OSS_CONTRIBUTIONS, MEMORY_REGIONS } from '@/lib/data'
import type { PortfolioItem } from '@/lib/types'
import InspectorDrawer from '@/components/inspector-drawer'

const SKILLS_MAP = [
  { skill: 'Rust async', icon: '⚡' },
  { skill: 'Networking', icon: '🌐' },
  { skill: 'Protobuf', icon: '📦' },
  { skill: 'Databases', icon: '🗄️' },
  { skill: 'Observability', icon: '👁️' },
  { skill: 'Solana runtime', icon: '⛓️' },
]

export default function OpenSourceSection() {
  const { state, dispatch, addKernelLog, addRpcTrace, highlightMemory, clearHighlight } = useApp()
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null)

  const isRamMode = state.mode === 'ram'
  const region = MEMORY_REGIONS['open-source']

  const handleItemHover = useCallback((item: PortfolioItem) => {
    if (!isRamMode) return

    const baseNum = parseInt(item.memoryRegion.baseAddr.replace(/_/g, ''), 16)
    const sizeNum = parseInt(item.memoryRegion.size.replace(/_/g, ''), 16)
    const endAddr = `0x${(baseNum + sizeNum).toString(16).padStart(8, '0').replace(/(.{4})$/, '_$1')}`
    
    highlightMemory(item.memoryRegion.baseAddr, endAddr)
    dispatch({ type: 'SET_HOVERED_ITEM', payload: item.id })

    addKernelLog('info', 'inspect', `oss inspect: ${item.memoryRegion.name} @ ${item.memoryRegion.baseAddr}`)
    
    if (item.relatedRpcMethods.length > 0) {
      addRpcTrace(item.relatedRpcMethods[0], `{ source: "oss/${item.title}" }`)
    }
  }, [isRamMode, highlightMemory, dispatch, addKernelLog, addRpcTrace])

  const handleItemLeave = useCallback(() => {
    if (!isRamMode) return
    clearHighlight()
    dispatch({ type: 'SET_HOVERED_ITEM', payload: null })
  }, [isRamMode, clearHighlight, dispatch])

  const handleDetailOpen = useCallback((item: PortfolioItem) => {
    setSelectedItem(item)
    setDetailOpen(true)
    addKernelLog('info', 'mem', `mmap: loading ${item.memoryRegion.name} into inspector`)
  }, [addKernelLog])

  const copyAddress = useCallback((addr: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(addr)
    setCopiedAddr(addr)
    addKernelLog('info', 'mem', `copied address ${addr}`)
    setTimeout(() => setCopiedAddr(null), 2000)
  }, [addKernelLog])

  return (
    <section
      id="open-source"
      className={`min-h-screen flex items-center justify-center px-4 py-12 md:py-16 transition-colors duration-300 ${
        isRamMode ? 'bg-black border-b border-green-500/20' : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4 mb-8">
            {isRamMode && (
              <div className="font-mono text-xs text-green-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{region.segment}</span>
                  <button
                    onClick={(e) => copyAddress(region.baseAddr, e)}
                    className="hover:text-green-400 transition-colors flex items-center gap-1"
                  >
                    {copiedAddr === region.baseAddr ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="text-gray-600 text-[10px]">
                  base={region.baseAddr} size={region.size} perms={region.perms} checksum={region.checksum}
                </div>
              </div>
            )}
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>
              Open Source
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Contributions */}
            <div className="md:col-span-2 space-y-6">
              {OSS_CONTRIBUTIONS.map((contrib, i) => (
                <motion.div
                  key={contrib.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => handleItemHover(contrib)}
                  onMouseLeave={handleItemLeave}
                  onClick={() => handleDetailOpen(contrib)}
                  className={`p-6 rounded-lg border transition-all cursor-pointer ${
                    isRamMode
                      ? `bg-black/50 border-green-500/20 hover:border-green-500/50 ${
                          state.hoveredItem === contrib.id ? 'border-green-500/80 bg-green-500/5' : ''
                        }`
                      : 'bg-gray-50 border-gray-300 hover:border-black'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Allocation header (RAM mode) */}
                    {isRamMode && (
                      <div className="font-mono text-xs text-green-600 flex items-center justify-between">
                        <span>
                          alloc({contrib.memoryRegion.name}, {contrib.memoryRegion.baseAddr})
                        </span>
                      </div>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className={`text-sm font-mono mb-1 ${isRamMode ? 'text-green-500' : 'text-gray-600'}`}>
                          {contrib.title.split(':')[0]}
                        </div>
                        <h3 className={`font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>
                          {contrib.title.split(':')[1] || contrib.title}
                        </h3>
                      </div>
                      <Badge
                        className={`font-mono text-xs flex items-center gap-1 ${
                          contrib.metrics?.[0]?.value === 'Merged'
                            ? isRamMode
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-green-100 text-green-800'
                            : isRamMode
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-blue-100 text-blue-800'
                        }`}
                        variant="outline"
                      >
                        {contrib.metrics?.[0]?.value === 'Merged' ? (
                          <GitMerge className="w-3 h-3" />
                        ) : (
                          <GitPullRequest className="w-3 h-3" />
                        )}
                        {contrib.metrics?.[0]?.value}
                      </Badge>
                    </div>

                    <p className={`text-sm ${isRamMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {contrib.whatBuilt}
                    </p>

                    <div
                      className={`text-sm italic border-l-2 pl-3 ${
                        isRamMode ? 'border-green-500/30 text-gray-400' : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {contrib.lessons}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`text-xs font-mono gap-1 ${
                          isRamMode ? 'text-green-400 hover:bg-green-500/10' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View PR
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skills Map Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border h-fit transition-all ${
                isRamMode ? 'bg-black/50 border-green-500/20' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <h3 className={`font-bold mb-4 ${isRamMode ? 'text-green-400' : 'text-black'}`}>
                Skills Map
              </h3>
              <div className="space-y-3">
                {SKILLS_MAP.map((item) => (
                  <div
                    key={item.skill}
                    className={`flex items-center gap-3 p-2 rounded transition-colors ${
                      isRamMode ? 'hover:bg-green-500/10' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className={isRamMode ? 'text-gray-300' : 'text-gray-700'}>{item.skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <InspectorDrawer
        open={detailOpen}
        onOpenChange={setDetailOpen}
        item={selectedItem}
      />
    </section>
  )
}
