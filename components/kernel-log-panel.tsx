'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp, useKernelLogs } from '@/lib/store'
import { Terminal, X, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export default function KernelLogPanel() {
  const { state, dispatch } = useApp()
  const kernelLogs = useKernelLogs()
  const [isExpanded, setIsExpanded] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  if (state.mode !== 'ram') return null

  const renderLogs = () => (
    <div className="p-2 max-h-64 overflow-y-auto font-mono text-xs space-y-0.5">
      {kernelLogs.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          Waiting for events...
        </div>
      ) : (
        kernelLogs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2 py-0.5 hover:bg-green-500/5 px-1 rounded"
          >
            <span className="text-gray-600 text-[10px] w-20 flex-shrink-0">
              {new Date(log.ts).toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}.{String(log.ts % 1000).padStart(3, '0')}
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold w-12 text-center flex-shrink-0 ${getSourceBadge(log.source)}`}>
              {log.source}
            </span>
            <span className={`${getLevelColor(log.level)} flex-shrink-0 w-10 uppercase text-[10px]`}>
              [{log.level}]
            </span>
            <span className="text-gray-300 flex-1 truncate">
              {log.msg}
            </span>
          </motion.div>
        ))
      )}
    </div>
  )

  return (
    <>
      <div className="hidden lg:block">
        <div className="rounded-xl border border-green-500/30 bg-black/80 backdrop-blur-sm">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsExpanded((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIsExpanded((prev) => !prev)
              }
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3 text-green-500" />
              <span className="font-mono text-xs text-green-400 font-bold tracking-wider">
                kernel.log
              </span>
              <span className="font-mono text-[10px] text-gray-500">
                ({kernelLogs.length} entries)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch({ type: 'CLEAR_LOGS' })
                }}
                className="text-gray-500 hover:text-green-400 transition-colors p-1"
                title="Clear logs"
              >
                <X className="w-3 h-3" />
              </button>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-green-400" />
              ) : (
                <ChevronUp className="w-4 h-4 text-green-400" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden border-t border-green-500/20"
              >
                {renderLogs()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="lg:hidden">
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full font-mono justify-between text-xs border-green-500/40 text-green-400 bg-black/80 hover:bg-green-500/10"
            >
              kernel.log
              <ChevronUp className={`w-4 h-4 transition-transform ${drawerOpen ? 'rotate-180' : ''}`} />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="bottom" 
            className="z-[60] border-t border-green-500/30 bg-black text-green-300 max-h-[70vh] p-0"
          >
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-green-500" />
                  <span className="font-mono text-sm font-bold text-green-400">kernel.log</span>
                  <span className="text-[11px] text-gray-500">
                    ({kernelLogs.length})
                  </span>
                </div>
                <button
                  onClick={() => dispatch({ type: 'CLEAR_LOGS' })}
                  className="text-gray-500 hover:text-green-400 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {renderLogs()}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

function getLevelColor(level: string) {
  switch (level) {
    case 'error': return 'text-red-400'
    case 'warn': return 'text-yellow-400'
    case 'info': return 'text-blue-400'
    case 'debug': return 'text-gray-400'
    case 'trace': return 'text-gray-500'
    default: return 'text-green-400'
  }
}

function getSourceBadge(source: string) {
  switch (source) {
    case 'mem': return 'bg-blue-500/20 text-blue-400'
    case 'alloc': return 'bg-green-500/20 text-green-400'
    case 'dealloc': return 'bg-red-500/20 text-red-400'
    case 'inspect': return 'bg-purple-500/20 text-purple-400'
    case 'syscall': return 'bg-yellow-500/20 text-yellow-400'
    case 'validator': return 'bg-cyan-500/20 text-cyan-400'
    default: return 'bg-gray-500/20 text-gray-400'
  }
}
