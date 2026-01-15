'use client'

import { motion } from 'framer-motion'
import { Copy, Check, Zap, Rocket, Target } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/lib/store'
import { MEMORY_REGIONS } from '@/lib/data'

const CURRENT_FOCUS = [
  {
    title: 'Reorg-safe indexing patterns',
    desc: 'Building bulletproof data pipelines that handle ledger reorgs gracefully',
    icon: Target,
  },
  {
    title: 'High-throughput Geyser consumers',
    desc: 'Optimizing event processing at validator-level throughput',
    icon: Zap,
  },
  {
    title: 'MEV detection & analytics',
    desc: 'Real-time sandwich detection and arbitrage pattern identification',
    icon: Rocket,
  },
]

const LEARNING = [
  'Fork choice algorithms',
  'Tower BFT implementation details',
  'Account lock scheduling',
  'Compute unit optimization',
]

export default function Now() {
  const { state, addKernelLog } = useApp()
  const [copiedAddr, setCopiedAddr] = useState(false)

  const isRamMode = state.mode === 'ram'
  const region = MEMORY_REGIONS.now

  const copyAddress = () => {
    navigator.clipboard.writeText(region.baseAddr)
    setCopiedAddr(true)
    addKernelLog('info', 'mem', `copied address ${region.baseAddr}`)
    setTimeout(() => setCopiedAddr(false), 2000)
  }

  return (
    <section
      id="now"
      className={`min-h-screen flex items-center justify-center px-4 py-12 md:py-16 transition-colors duration-300 ${
        isRamMode ? 'bg-black border-b border-green-500/20' : 'bg-white border-b border-gray-200'
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
                    onClick={copyAddress}
                    className="hover:text-green-400 transition-colors flex items-center gap-1"
                  >
                    {copiedAddr ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="text-gray-600 text-[10px]">
                  base={region.baseAddr} size={region.size} perms={region.perms} checksum={region.checksum}
                </div>
              </div>
            )}
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>
              Now
            </h2>
            <p className={`text-sm ${isRamMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Updated January 2026
            </p>
          </div>

          {/* Current Focus */}
          <div className="space-y-6">
            <h3 className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? 'text-green-500' : 'text-gray-600'}`}>
              CURRENT FOCUS
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {CURRENT_FOCUS.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-6 rounded-lg border transition-all ${
                    isRamMode
                      ? 'bg-black/50 border-green-500/20 hover:border-green-500/50'
                      : 'bg-gray-50 border-gray-200 hover:border-black'
                  }`}
                >
                  <item.icon className={`w-6 h-6 mb-3 ${isRamMode ? 'text-green-500' : 'text-black'}`} />
                  <h4 className={`font-bold mb-2 ${isRamMode ? 'text-green-400' : 'text-black'}`}>
                    {item.title}
                  </h4>
                  <p className={`text-sm ${isRamMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div className="space-y-6">
            <h3 className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? 'text-green-500' : 'text-gray-600'}`}>
              DEEP DIVING INTO
            </h3>
            <div className="flex flex-wrap gap-3">
              {LEARNING.map((topic) => (
                <div
                  key={topic}
                  className={`px-4 py-2 rounded-full font-mono text-sm border transition-all ${
                    isRamMode
                      ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:border-green-500/60'
                      : 'bg-gray-100 border-gray-300 text-gray-800 hover:border-black'
                  }`}
                >
                  {topic}
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className={`p-6 rounded-lg border ${
            isRamMode ? 'bg-green-500/5 border-green-500/30' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className={`text-sm ${isRamMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-2">
                <span className={`font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>Status:</span>{' '}
                Open to new opportunities in Solana infrastructure
              </p>
              <p>
                <span className={`font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>Location:</span>{' '}
                Remote / Async-first
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
