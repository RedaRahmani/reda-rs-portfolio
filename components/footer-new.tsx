'use client'

import { motion } from 'framer-motion'
import { useApp, useCluster } from '@/lib/store'

export default function Footer() {
  const { state } = useApp()
  const cluster = useCluster()
  const isRamMode = state.mode === 'ram'

  return (
    <footer
      className={`px-4 py-12 border-t transition-colors duration-300 ${
        isRamMode ? 'bg-black border-green-500/20 text-green-500' : 'bg-white border-gray-200 text-gray-600'
      } ${isRamMode ? 'mb-10' : ''}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="font-mono text-sm">
            {isRamMode ? (
              <div className="space-y-1">
                <div className="text-green-500">{'// Memory freed at exit()'}</div>
                <div className="text-gray-600 text-xs">
                  Total slots processed: {cluster.slot.toLocaleString()} | 
                  Uptime: {Math.floor((cluster.slot - 280000000) / 2.5)}s
                </div>
              </div>
            ) : (
              '© 2026 Reda. All rights reserved.'
            )}
          </div>
          
          {isRamMode && (
            <div className="flex items-center gap-4 font-mono text-xs text-gray-600">
              <span>Built with Rust mindset</span>
              <span>•</span>
              <span>Memory safe</span>
              <span>•</span>
              <span>Zero UB</span>
            </div>
          )}
        </motion.div>
      </div>
    </footer>
  )
}
