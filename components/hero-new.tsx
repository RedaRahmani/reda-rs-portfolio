'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Terminal, Cpu, Database, Radio } from 'lucide-react'
import { useApp, useCluster } from '@/lib/store'

const SKILLS = ['Rust', 'Solana', 'SVM', 'Geyser', 'Kafka', 'ClickHouse', 'Anchor']

const VALIDATOR_STAGES = [
  { name: 'Gossip', icon: Radio },
  { name: 'TPU', icon: Cpu },
  { name: 'Banking', icon: Database },
  { name: 'Replay', icon: Terminal },
]

export default function Hero() {
  const { state, addKernelLog, addRpcTrace } = useApp()
  const cluster = useCluster()
  const isRamMode = state.mode === 'ram'

  const handleCTAClick = (action: string) => {
    if (isRamMode) {
      addKernelLog('info', 'syscall', `user action: ${action}`)
      addRpcTrace('getLatestBlockhash', '{ commitment: "finalized" }')
    }
    
    const target = action === 'projects' ? 'projects' : 'open-source'
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const ramPadding = 'py-12 md:py-16'
  const recruiterPadding = 'py-16 md:py-20'

  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center px-4 ${
        isRamMode ? ramPadding : recruiterPadding
      } transition-colors duration-300 ${
        isRamMode
          ? 'bg-black border-b border-green-500/20'
          : 'bg-gradient-to-br from-slate-50 to-slate-100 border-b border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants}>
              <h1
                className={`text-5xl md:text-7xl font-bold font-mono leading-tight ${
                  isRamMode ? 'text-green-400 glow-text' : 'text-black'
                }`}
              >
                Rust + Solana
                <br />
                Engineer
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl leading-relaxed max-w-md ${isRamMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              I build Solana infra: indexers, decoders, Geyser pipelines, performance tooling.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap">
              <Button
                size="lg"
                onClick={() => handleCTAClick('projects')}
                className={`font-mono ${
                  isRamMode ? 'bg-green-600 hover:bg-green-700 text-black' : 'bg-black hover:bg-gray-900 text-white'
                }`}
              >
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCTAClick('open-source')}
                className={`font-mono ${
                  isRamMode
                    ? 'border-green-500/50 text-green-400 hover:bg-green-500/10'
                    : 'border-black text-black hover:bg-black/5'
                }`}
              >
                Open Source
              </Button>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants} className="space-y-3">
              <p
                className={`text-sm font-mono uppercase tracking-wider ${
                  isRamMode ? 'text-green-500' : 'text-gray-600'
                }`}
              >
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <Badge
                    key={skill}
                    variant={isRamMode ? 'default' : 'secondary'}
                    className={`font-mono text-xs ${
                      isRamMode
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Validator State / Profile */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`font-mono text-sm p-6 rounded-lg border transition-all duration-300 ${
              isRamMode
                ? 'bg-black/50 border-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {isRamMode ? (
              // RAM Mode - Validator State
              <div className="space-y-4">
                <div className="text-green-500 text-xs font-bold">// Validator State (Simulated)</div>
                
                {/* Cluster Info */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">epoch:</span>
                    <span className="text-green-400">{cluster.epoch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">slot:</span>
                    <span className="text-green-400 font-bold">{cluster.slot.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">block_height:</span>
                    <span className="text-green-400">{cluster.blockHeight.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">root:</span>
                    <span className="text-green-400">{cluster.root.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">tps:</span>
                    <span className="text-green-400">{cluster.tps.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t border-green-500/20 pt-3">
                  <div className="text-green-600 text-xs mb-2">Pipeline</div>
                  <div className="flex justify-between gap-1">
                    {VALIDATOR_STAGES.map((stage, i) => (
                      <div
                        key={stage.name}
                        className="flex-1 flex flex-col items-center gap-1 p-2 bg-green-500/10 rounded"
                      >
                        <stage.icon className="w-4 h-4 text-green-500" />
                        <span className="text-[10px] text-green-400">{stage.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-gray-600 mt-2">
                  * Live simulation for demonstration purposes
                </div>
              </div>
            ) : (
              // Recruiter Mode - Profile Snapshot
              <div className="space-y-2">
                <div className="text-gray-600">{'// Profile Snapshot'}</div>
                <div>{'struct Profile {'}</div>
                <div className="ml-4 space-y-1">
                  <div>name: "Reda",</div>
                  <div>focus: "Solana Infrastructure",</div>
                  <div>stack: [Rust, Geyser, Kafka],</div>
                  <div>current: "Indexing Solutions",</div>
                  <div>status: "Open to Opportunities",</div>
                </div>
                <div>{'}'}</div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
