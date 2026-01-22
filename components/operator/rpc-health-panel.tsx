'use client'

import { useEffect, useState } from 'react'
import { RPC_HEALTH_BASE } from '@/lib/data'
import type { RpcHealthCheck } from '@/lib/types'
import { Signal } from 'lucide-react'

export default function RpcHealthPanel() {
  const [checks, setChecks] = useState<RpcHealthCheck[]>(RPC_HEALTH_BASE)

  useEffect(() => {
    const id = setInterval(() => {
      setChecks((prev) =>
        prev.map((c) => ({
          ...c,
          latencyMs: Math.max(8, Math.round(c.latencyMs + (Math.random() - 0.5) * 12)),
          status: c.latencyMs > 180 ? 'warn' : c.status,
        }))
      )
    }, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="section-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Signal className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">RPC Health</span>
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-wide">simulated</span>
      </div>

      {/* Health checks */}
      <div className="space-y-2">
        {checks.map((check) => (
          <div
            key={check.method}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2"
          >
            <div>
              <p className="text-sm text-white font-mono">{check.method}</p>
              <p className="text-[10px] text-slate-500">{check.detail}</p>
            </div>
            <LatencyBadge status={check.status} latency={check.latencyMs} />
          </div>
        ))}
      </div>
    </div>
  )
}

function LatencyBadge({ status, latency }: { status: RpcHealthCheck['status']; latency: number }) {
  const styles = {
    ok: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    warn: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  }

  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono border ${styles[status]}`}>
      {latency}ms
    </span>
  )
}
