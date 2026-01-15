'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp, useCluster, useTower, useTpuPipeline, useRpcTrace, useDefiEvents } from '@/lib/store'
import { Clock, Cpu, GitBranch, Radio, TrendingUp, ChevronRight, AlertTriangle, Zap, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ConsoleTab = 'clock' | 'tpu' | 'tower' | 'rpc' | 'defi'

const TABS: { id: ConsoleTab; label: string; icon: React.ReactNode }[] = [
  { id: 'clock', label: 'Cluster', icon: <Clock className="w-3 h-3" /> },
  { id: 'tpu', label: 'TPU', icon: <Cpu className="w-3 h-3" /> },
  { id: 'tower', label: 'Tower', icon: <GitBranch className="w-3 h-3" /> },
  { id: 'rpc', label: 'RPC', icon: <Radio className="w-3 h-3" /> },
  { id: 'defi', label: 'DeFi', icon: <TrendingUp className="w-3 h-3" /> },
]

export default function ValidatorConsole({ className = '' }: { className?: string }) {
  const { state, dispatch } = useApp()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (state.mode !== 'ram') return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'relative z-40 transition-all duration-300 w-full',
        isCollapsed ? '' : 'min-h-[240px]',
        className
      )}
    >
      <div className="bg-black/90 border border-green-500/30 rounded-lg overflow-hidden backdrop-blur-sm flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-green-500/20 bg-green-500/5">
          {!isCollapsed && (
            <span className="font-mono text-xs text-green-500 font-bold tracking-wider">
              VALIDATOR CONSOLE
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-green-500 hover:text-green-400 transition-colors p-1"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {!isCollapsed && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-green-500/20">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => dispatch({ type: 'SET_CONSOLE_TAB', payload: tab.id })}
                  className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 text-xs font-mono transition-colors ${
                    state.consoleTab === tab.id
                      ? 'text-green-400 bg-green-500/10 border-b-2 border-green-500'
                      : 'text-gray-500 hover:text-green-500 hover:bg-green-500/5'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden xl:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-3 max-h-[60vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {state.consoleTab === 'clock' && <ClusterClockTab key="clock" />}
                {state.consoleTab === 'tpu' && <TpuPipelineTab key="tpu" />}
                {state.consoleTab === 'tower' && <TowerTab key="tower" />}
                {state.consoleTab === 'rpc' && <RpcTraceTab key="rpc" />}
                {state.consoleTab === 'defi' && <DefiMonitorTab key="defi" />}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

function ClusterClockTab() {
  const cluster = useCluster()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 font-mono text-xs"
    >
      <div className="text-green-500 font-bold mb-2">// Cluster State</div>
      
      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Epoch" value={cluster.epoch.toLocaleString()} />
        <StatBox label="Slot" value={cluster.slot.toLocaleString()} highlight />
        <StatBox label="Block Height" value={cluster.blockHeight.toLocaleString()} />
        <StatBox label="Root" value={cluster.root.toLocaleString()} />
        <StatBox label="Confirmed" value={cluster.confirmedSlot.toLocaleString()} />
        <StatBox label="Finalized" value={cluster.finalizedSlot.toLocaleString()} />
      </div>

      <div className="border-t border-green-500/20 pt-3 mt-3">
        <div className="flex justify-between text-gray-400">
          <span>TPS</span>
          <span className="text-green-400">{cluster.tps.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Skipped</span>
          <span className="text-yellow-400">{cluster.skippedSlots}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Leader</span>
          <span className="text-green-400">{cluster.leader}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Health</span>
          <span className={cluster.health === 'healthy' ? 'text-green-400' : 'text-red-400'}>
            {cluster.health.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="text-gray-600 text-[10px] mt-2">
        * Simulated cluster data for demonstration
      </div>
    </motion.div>
  )
}

function TpuPipelineTab() {
  const tpu = useTpuPipeline()
  const stages = [tpu.fetch, tpu.sigverify, tpu.banking, tpu.broadcast]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 font-mono text-xs"
    >
      <div className="text-green-500 font-bold mb-2">// TPU Pipeline</div>
      
      {/* Pipeline visualization */}
      <div className="flex items-center justify-between gap-1 py-2">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center">
            <div className={`px-2 py-1 rounded text-[10px] ${
              stage.status === 'active' ? 'bg-green-500/20 text-green-400' :
              stage.status === 'congested' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {stage.name.slice(0, 4).toUpperCase()}
            </div>
            {i < stages.length - 1 && (
              <ChevronRight className="w-3 h-3 text-green-500/50" />
            )}
          </div>
        ))}
      </div>

      {/* Stage details */}
      <div className="space-y-2">
        {stages.map((stage) => (
          <div key={stage.name} className="bg-green-500/5 rounded p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-green-400 uppercase">{stage.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                stage.status === 'active' ? 'bg-green-500/20 text-green-400' :
                stage.status === 'congested' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {stage.status}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-[10px]">
              <span>Queue: {stage.queueDepth}</span>
              <span>{stage.throughput.toLocaleString()} tx/s</span>
            </div>
            {/* Progress bar */}
            <div className="mt-1 h-1 bg-green-500/10 rounded overflow-hidden">
              <div 
                className="h-full bg-green-500/50 transition-all duration-500"
                style={{ width: `${Math.min(100, stage.queueDepth / 2)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-gray-600 text-[10px] mt-2">
        * Simulated pipeline metrics
      </div>
    </motion.div>
  )
}

function TowerTab() {
  const tower = useTower()
  const cluster = useCluster()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3 font-mono text-xs"
    >
      <div className="text-green-500 font-bold mb-2">// Tower BFT Consensus</div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Last Vote Slot</span>
          <span className="text-green-400">{tower.lastVoteSlot.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tower Height</span>
          <span className="text-green-400">{tower.towerHeight}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Lockout Depth</span>
          <span className="text-yellow-400">{tower.lockoutDepth}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Fork Choice</span>
          <span className="text-green-400">{tower.forkChoiceId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Stake Weight</span>
          <span className="text-green-400">{tower.stakeWeight.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Root Distance</span>
          <span className={tower.rootDistance > 40 ? 'text-yellow-400' : 'text-green-400'}>
            {tower.rootDistance} slots
          </span>
        </div>
      </div>

      {/* Vote lockout visualization */}
      <div className="border-t border-green-500/20 pt-3 mt-3">
        <div className="text-green-500 text-[10px] mb-2">LOCKOUT STACK</div>
        <div className="flex gap-0.5 flex-wrap">
          {Array.from({ length: Math.min(32, tower.towerHeight) }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 rounded-sm ${
                i < tower.lockoutDepth ? 'bg-green-500' : 'bg-green-500/20'
              }`}
              title={`Lockout ${i + 1}: ${Math.pow(2, i + 1)} slots`}
            />
          ))}
        </div>
      </div>

      <div className="text-gray-600 text-[10px] mt-2">
        * Simulated consensus state
      </div>
    </motion.div>
  )
}

function RpcTraceTab() {
  const rpcTrace = useRpcTrace()
  const { dispatch } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2 font-mono text-xs"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-green-500 font-bold">// RPC Trace</span>
        <button
          onClick={() => dispatch({ type: 'CLEAR_LOGS' })}
          className="text-gray-500 hover:text-green-400 transition-colors p-1"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      
      {rpcTrace.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          Hover over items to generate RPC traces
        </div>
      ) : (
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {rpcTrace.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-green-500/5 rounded px-2 py-1.5 border-l-2 border-green-500/50"
            >
              <div className="flex justify-between items-start gap-2">
                <span className="text-green-400 truncate">{event.method}</span>
                <span className="text-gray-600 text-[10px] whitespace-nowrap">
                  {event.duration}ms
                </span>
              </div>
              <div className="text-gray-500 text-[10px] truncate">
                {event.paramsSummary}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function DefiMonitorTab() {
  const defiEvents = useDefiEvents()
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const getFlagColor = (flag: string) => {
    switch (flag) {
      case 'large_impact': return 'text-yellow-400 bg-yellow-500/20'
      case 'sandwich_risk': return 'text-red-400 bg-red-500/20'
      case 'arb_candidate': return 'text-blue-400 bg-blue-500/20'
      case 'whale': return 'text-purple-400 bg-purple-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-2 font-mono text-xs"
    >
      <div className="text-green-500 font-bold mb-2">// DeFi Stream</div>
      
      {defiEvents.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          Monitoring swap activity...
        </div>
      ) : (
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {defiEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              className={`bg-green-500/5 rounded px-2 py-1.5 cursor-pointer transition-colors ${
                selectedEvent === event.id ? 'border border-green-500/50' : 'hover:bg-green-500/10'
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-green-400 uppercase text-[10px]">{event.dex}</span>
                <span className="text-gray-600 text-[10px]">slot {event.slot.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-gray-300">{event.fields.tokenIn}</span>
                <ChevronRight className="w-3 h-3 text-green-500" />
                <span className="text-gray-300">{event.fields.tokenOut}</span>
              </div>
              {event.flags.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {event.flags.map((flag) => (
                    <span key={flag} className={`text-[9px] px-1 py-0.5 rounded ${getFlagColor(flag)}`}>
                      {flag === 'sandwich_risk' && <AlertTriangle className="w-2 h-2 inline mr-0.5" />}
                      {flag === 'large_impact' && <Zap className="w-2 h-2 inline mr-0.5" />}
                      {flag.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Expanded details */}
              <AnimatePresence>
                {selectedEvent === event.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 pt-2 border-t border-green-500/20 text-[10px]"
                  >
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount In</span>
                      <span className="text-gray-300">{event.fields.amountIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amount Out</span>
                      <span className="text-gray-300">{event.fields.amountOut}</span>
                    </div>
                    {event.fields.priceImpact && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price Impact</span>
                        <span className={event.fields.priceImpact > 1 ? 'text-yellow-400' : 'text-gray-300'}>
                          {event.fields.priceImpact.toFixed(2)}%
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-500">Signature</span>
                      <span className="text-green-400">{event.signature}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-gray-600 text-[10px] mt-2">
        * Simulated swap stream for demonstration
      </div>
    </motion.div>
  )
}

function StatBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`bg-green-500/5 rounded p-2 ${highlight ? 'border border-green-500/30' : ''}`}>
      <div className="text-gray-500 text-[10px]">{label}</div>
      <div className={`text-sm ${highlight ? 'text-green-400' : 'text-gray-300'}`}>
        {value}
      </div>
    </div>
  )
}
