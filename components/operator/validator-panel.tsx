'use client'

import { useApp } from '@/lib/store'
import { Radio, Vote, Cpu, Timer } from 'lucide-react'

export default function ValidatorPanel() {
  const { state } = useApp()
  
  // Derive from cluster HUD data
  const gossipPeers = 3847 + Math.floor(state.cluster.slot % 100)
  const voteSuccess = 99.2 + (state.cluster.slot % 10) * 0.05
  const tpuStatus = state.cluster.tps > 2000 ? 'active' : 'idle'
  const leaderEta = Math.floor((state.cluster.slot % 4) * 2.5 + 1.2)

  return (
    <div className="section-card p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wide font-mono">
          Validator Status
        </span>
        <span className="text-[9px] text-slate-600 font-mono">simulated</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Gossip Peers */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/50 border border-slate-800/60 px-3 py-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Gossip</div>
            <div className="text-sm font-mono text-white">{gossipPeers.toLocaleString()}</div>
          </div>
        </div>

        {/* Vote Success */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/50 border border-slate-800/60 px-3 py-2">
          <Vote className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Vote %</div>
            <div className="text-sm font-mono text-white">{voteSuccess.toFixed(1)}%</div>
          </div>
        </div>

        {/* TPU Status */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/50 border border-slate-800/60 px-3 py-2">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase">TPU</div>
            <div className={`text-sm font-mono ${tpuStatus === 'active' ? 'text-emerald-300' : 'text-slate-400'}`}>
              {tpuStatus}
            </div>
          </div>
        </div>

        {/* Leader ETA */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/50 border border-slate-800/60 px-3 py-2">
          <Timer className="w-3.5 h-3.5 text-emerald-400" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase">Leader</div>
            <div className="text-sm font-mono text-white">~{leaderEta}s</div>
          </div>
        </div>
      </div>
    </div>
  )
}
