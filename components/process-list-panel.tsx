'use client'

import { motion } from 'framer-motion'
import { useApp } from '@/lib/store'
import { PROCESSES } from '@/lib/data'
import { Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProcessListPanel({ className = '' }: { className?: string }) {
  const { state } = useApp()

  if (state.mode !== 'ram') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'w-full bg-black/90 border border-green-500/30 rounded-lg overflow-hidden z-30 backdrop-blur-sm',
        className
      )}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-green-500/20 bg-green-500/5">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-green-500" />
          <span className="font-mono text-xs text-green-500 font-bold tracking-wider">
            PROCESSES
          </span>
        </div>
      </div>

      {/* Process list */}
      <div className="max-h-40 overflow-y-auto">
        <table className="w-full font-mono text-[10px]">
          <thead>
            <tr className="text-gray-500 border-b border-green-500/10">
              <th className="text-left px-3 py-1">NAME</th>
              <th className="text-right px-2 py-1">CPU</th>
              <th className="text-right px-3 py-1">MEM</th>
            </tr>
          </thead>
          <tbody>
            {PROCESSES.map((proc) => (
              <tr
                key={proc.id}
                className="hover:bg-green-500/5 transition-colors"
                title={proc.description}
              >
                <td className="px-3 py-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      proc.status === 'running' ? 'bg-green-400' :
                      proc.status === 'sleeping' ? 'bg-blue-400' :
                      proc.status === 'blocked' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`} />
                    <span className="text-gray-300 truncate max-w-[100px]">
                      {proc.name}
                    </span>
                  </div>
                </td>
                <td className={`text-right px-2 py-1 ${
                  proc.cpu > 30 ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                  {proc.cpu}%
                </td>
                <td className="text-right px-3 py-1 text-gray-400">
                  {proc.memory}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="px-3 py-2 border-t border-green-500/20 bg-green-500/5">
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-gray-500">
            {PROCESSES.filter(p => p.status === 'running').length} running
          </span>
          <span className="text-gray-500">
            {PROCESSES.reduce((acc, p) => acc + p.cpu, 0)}% total CPU
          </span>
        </div>
      </div>
    </motion.div>
  )
}
