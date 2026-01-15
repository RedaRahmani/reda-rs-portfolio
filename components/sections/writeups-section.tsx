'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Copy, Check, Clock, BookOpen } from 'lucide-react'
import { useApp } from '@/lib/store'
import { WRITEUPS, MEMORY_REGIONS } from '@/lib/data'
import type { PortfolioItem } from '@/lib/types'
import InspectorDrawer from '@/components/inspector-drawer'

export default function WriteupsSection() {
  const { state, dispatch, addKernelLog, addRpcTrace, highlightMemory, clearHighlight } = useApp()
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null)

  const isRamMode = state.mode === 'ram'
  const region = MEMORY_REGIONS.writeups

  const handleItemHover = useCallback((item: PortfolioItem) => {
    if (!isRamMode) return

    const baseNum = parseInt(item.memoryRegion.baseAddr.replace(/_/g, ''), 16)
    const sizeNum = parseInt(item.memoryRegion.size.replace(/_/g, ''), 16)
    const endAddr = `0x${(baseNum + sizeNum).toString(16).padStart(8, '0').replace(/(.{4})$/, '_$1')}`
    
    highlightMemory(item.memoryRegion.baseAddr, endAddr)
    dispatch({ type: 'SET_HOVERED_ITEM', payload: item.id })

    addKernelLog('info', 'inspect', `writeup inspect: ${item.memoryRegion.name} @ ${item.memoryRegion.baseAddr}`)
    
    if (item.relatedRpcMethods.length > 0) {
      addRpcTrace(item.relatedRpcMethods[0], `{ source: "writeup/${item.title.slice(0, 20)}" }`)
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
      id="writeups"
      className={`min-h-screen flex items-center justify-center px-4 py-12 md:py-16 transition-colors duration-300 ${
        isRamMode ? 'bg-black border-b border-green-500/20' : 'bg-gray-50 border-b border-gray-200'
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
              Write-ups
            </h2>
          </div>

          {/* Articles */}
          <div className="space-y-6">
            {WRITEUPS.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => handleItemHover(article)}
                onMouseLeave={handleItemLeave}
                onClick={() => handleDetailOpen(article)}
                className={`p-6 rounded-lg border transition-all group cursor-pointer ${
                  isRamMode
                    ? `bg-black/50 border-green-500/20 hover:border-green-500/50 ${
                        state.hoveredItem === article.id ? 'border-green-500/80 bg-green-500/5' : ''
                      }`
                    : 'bg-white border-gray-300 hover:border-black'
                }`}
              >
                <div className="space-y-3">
                  {/* Allocation header (RAM mode) */}
                  {isRamMode && (
                    <div className="font-mono text-xs text-green-600 flex items-center justify-between">
                      <span>
                        alloc({article.memoryRegion.name}, {article.memoryRegion.baseAddr})
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <BookOpen className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                        isRamMode ? 'text-green-500' : 'text-gray-500'
                      }`} />
                      <h3
                        className={`font-bold text-lg leading-snug ${
                          isRamMode ? 'text-green-400 group-hover:text-green-300' : 'text-black group-hover:text-gray-700'
                        }`}
                      >
                        {article.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono whitespace-nowrap flex items-center gap-1 ${
                          isRamMode ? 'text-green-500' : 'text-gray-600'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {article.metrics?.[0]?.value}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm ${isRamMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {article.description}
                  </p>

                  {/* Related RPC Methods (RAM mode) */}
                  {isRamMode && article.relatedRpcMethods.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {article.relatedRpcMethods.map((method) => (
                        <code
                          key={method}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-green-500/10 text-green-400"
                        >
                          {method}
                        </code>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className={`font-mono text-xs ${
                            isRamMode
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                          variant="outline"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-xs font-mono gap-1 ${
                        isRamMode ? 'text-green-400 hover:bg-green-500/10' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Read
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
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
