'use client'

import { useApp } from '@/lib/store'
import { Clock4, MousePointer2, Zap } from 'lucide-react'
import { useMemo } from 'react'

const ICONS = {
  nav: <MousePointer2 className="w-3 h-3" />,
  mode: <Zap className="w-3 h-3" />,
  action: <Clock4 className="w-3 h-3" />,
}

export default function ActivityFeed() {
  const { state } = useApp()
  const items = useMemo(() => state.activity.slice(0, 8), [state.activity])

  if (items.length === 0) return null

  return (
    <div className="section-card p-3 opacity-50 hover:opacity-100 transition-opacity duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-semibold text-emerald-300/80 uppercase tracking-wide">Activity</span>
        <span className="text-[9px] text-slate-600">live</span>
      </div>
      <div className="space-y-1.5 text-xs">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 rounded-md border border-slate-800/40 bg-slate-900/30 px-2 py-1.5"
          >
            <span className="text-emerald-400/70">{ICONS[item.kind]}</span>
            <span className="text-[10px] text-slate-600 font-mono">
              {new Date(item.ts).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
            <span className="text-slate-400 truncate">{item.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
