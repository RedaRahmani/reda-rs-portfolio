'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp, useCluster } from '@/lib/store'
import { MEMORY_REGIONS } from '@/lib/data'
import { Activity, Cpu, HardDrive, Clock, Wifi, AlertCircle } from 'lucide-react'

export default function ValidatorStatusBar() {
  const { state } = useApp()
  const cluster = useCluster()
  const [uptime, setUptime] = useState('00:00:00')
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    setUptime(`${hours}:${minutes}:${secs}`)
  }, [seconds])

  const currentRegion = MEMORY_REGIONS[state.activeSection] || MEMORY_REGIONS.about
  const pc = currentRegion.baseAddr

  if (state.mode !== 'ram') {
    // Recruiter mode - minimal footer
    return (
      <footer className="fixed bottom-0 left-0 right-0 h-[var(--status-h)] border-t border-gray-200 bg-white text-gray-600 text-sm z-50">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          <span>© 2026 Reda. All rights reserved.</span>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Rust + Solana Engineer</span>
          </div>
        </div>
      </footer>
    )
  }

  const heapUsage = (24.3 + Math.random() * 5).toFixed(1)
  const cpuUsage = Math.floor(15 + Math.random() * 25)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-[var(--status-h)] bg-black/95 border-t border-green-500/20 text-green-400 font-mono text-[11px] flex items-center px-4 z-50 backdrop-blur-sm"
    >
      <div className="w-full flex items-center justify-between gap-4 overflow-x-auto">
        {/* Left section - Process info */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <StatusItem icon={<Activity className="w-3 h-3" />} label="PID" value="1337" />
          <StatusItem 
            icon={<span className="text-green-500">PC</span>} 
            value={pc}
            highlight 
          />
        </div>

        {/* Center section - Cluster info */}
        <div className="flex items-center gap-4">
          <StatusItem 
            icon={<Clock className="w-3 h-3" />} 
            label="SLOT" 
            value={cluster.slot.toLocaleString()}
            highlight
          />
          <StatusItem 
            label="EPOCH" 
            value={cluster.epoch.toString()}
          />
          <StatusItem 
            label="ROOT" 
            value={cluster.root.toLocaleString()}
          />
          <StatusItem 
            icon={<Wifi className="w-3 h-3" />}
            label="TPS" 
            value={cluster.tps.toLocaleString()}
          />
        </div>

        {/* Right section - System metrics */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <StatusItem 
            icon={<Cpu className="w-3 h-3" />}
            label="CPU" 
            value={`${cpuUsage}%`}
          />
          <StatusItem 
            icon={<HardDrive className="w-3 h-3" />}
            label="HEAP" 
            value={`${heapUsage}MB`}
          />
          <StatusItem 
            label="UPTIME" 
            value={uptime}
          />
          
          {/* Health indicator */}
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded ${
            cluster.health === 'healthy' 
              ? 'bg-green-500/20 text-green-400' 
              : cluster.health === 'behind'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
          }`}>
            {cluster.health !== 'healthy' && <AlertCircle className="w-3 h-3" />}
            <span className="uppercase text-[10px]">{cluster.health}</span>
          </div>

          {/* Mode indicator */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/20 text-green-400">
            <span className="text-[10px]">MODE:</span>
            <span className="font-bold">RAM</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function StatusItem({ 
  icon, 
  label, 
  value, 
  highlight 
}: { 
  icon?: React.ReactNode
  label?: string
  value: string
  highlight?: boolean 
}) {
  return (
    <div className="flex items-center gap-1">
      {icon && <span className="text-green-600">{icon}</span>}
      {label && <span className="text-gray-500">{label}</span>}
      <span className={highlight ? 'text-green-400' : 'text-gray-300'}>{value}</span>
    </div>
  )
}
