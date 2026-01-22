'use client'

import { useEffect, useMemo, useState } from 'react'
import { CLUSTER_HUD_BASE } from '@/lib/data'
import { useCluster } from '@/lib/store'
import { Activity } from 'lucide-react'

function buildProgressStyle(progress: number) {
  const pct = Math.min(100, Math.max(0, progress * 100))
  return {
    background: `conic-gradient(#34d399 ${pct}%, #1e293b ${pct}% 100%)`,
  }
}

export default function ClusterHUD() {
  const cluster = useCluster()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000)
    return () => clearInterval(id)
  }, [])

  const jitter = useMemo(() => (Math.sin(tick) + 1) * 0.5 * 0.02, [tick])
  const epochProgress = Math.min(0.99, CLUSTER_HUD_BASE.epochProgress + jitter)

  return (
    <div className="section-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">Cluster HUD</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">{CLUSTER_HUD_BASE.network}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            simulated
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[100px_1fr] gap-4 items-center">
        {/* Epoch progress ring */}
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full" style={buildProgressStyle(epochProgress)} />
          <div className="absolute inset-2 rounded-full bg-slate-950 border border-emerald-500/20 flex flex-col items-center justify-center">
            <span className="text-[10px] text-slate-500">Epoch</span>
            <span className="text-lg font-semibold text-white">{Math.floor(cluster.epoch)}</span>
            <span className="text-[10px] text-emerald-400">{Math.round(epochProgress * 100)}%</span>
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Metric label="Slot" value={cluster.slot.toLocaleString()} />
          <Metric label="TPS" value={`${cluster.tps.toLocaleString()}`} />
          <Metric label="p50 latency" value={`${CLUSTER_HUD_BASE.latencyMs.p50}ms`} />
          <Metric label="p95 latency" value={`${CLUSTER_HUD_BASE.latencyMs.p95}ms`} />
          <Metric label="Block height" value={cluster.blockHeight.toLocaleString()} />
          <Metric label="Skipped" value={cluster.skippedSlots.toString()} />
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-1.5">
      <span className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  )
}
