'use client'

import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/lib/store'
import { MEMORY_REGIONS } from '@/lib/data'

const INTERESTS = ['Indexing', 'Schedulers', 'MEV Analytics', 'Performance', 'Security']

const HIGHLIGHTS = [
  {
    title: 'Infra-first Solana builder',
    desc: 'Building the systems that power blockchain applications',
  },
  {
    title: 'Rust-heavy systems',
    desc: 'Performance-critical code with memory safety guarantees',
  },
  {
    title: 'Open-source contributor',
    desc: 'Sharing knowledge and tools with the community',
  },
]

export default function About() {
  const { state, addKernelLog } = useApp()
  const [copiedAddr, setCopiedAddr] = useState(false)
  
  const isRamMode = state.mode === 'ram'
  const region = MEMORY_REGIONS.about

  const copyAddress = () => {
    navigator.clipboard.writeText(region.baseAddr)
    setCopiedAddr(true)
    addKernelLog('info', 'mem', `copied address ${region.baseAddr}`)
    setTimeout(() => setCopiedAddr(false), 2000)
  }

  return (
    <section
      id="about"
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
          {/* Section Header */}
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
              About
            </h2>
          </div>

          <p className={`text-lg leading-relaxed max-w-2xl ${isRamMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I'm a systems-focused engineer passionate about building scalable infrastructure for Solana. With deep
            expertise in Rust and understanding of blockchain fundamentals, I design solutions that handle high
            throughput and maintain reliability at scale.
          </p>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            {HIGHLIGHTS.map((item, i) => (
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
                <div className="flex gap-3 mb-3">
                  <Check className={`w-5 h-5 flex-shrink-0 ${isRamMode ? 'text-green-500' : 'text-black'}`} />
                  <h3 className={`font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>{item.title}</h3>
                </div>
                <p className={isRamMode ? 'text-gray-400' : 'text-gray-600'}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Interests */}
          <div className="space-y-4">
            <p
              className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? 'text-green-500' : 'text-gray-600'}`}
            >
              INTERESTS
            </p>
            <div className="flex flex-wrap gap-3">
              {INTERESTS.map((interest) => (
                <div
                  key={interest}
                  className={`px-4 py-2 rounded-full font-mono text-sm border transition-all ${
                    isRamMode
                      ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:border-green-500/60'
                      : 'bg-gray-100 border-gray-300 text-gray-800 hover:border-black'
                  }`}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
