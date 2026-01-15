'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink, Copy, Check, Code, Database, Cpu, Radio, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import type { PortfolioItem } from '@/lib/types'
import { useApp } from '@/lib/store'

interface InspectorDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: PortfolioItem | null
}

export default function InspectorDrawer({ open, onOpenChange, item }: InspectorDrawerProps) {
  const { state, addKernelLog, addRpcTrace } = useApp()
  const [copiedAddr, setCopiedAddr] = useState(false)

  if (!item) return null

  const isRamMode = state.mode === 'ram'

  const copyAddress = () => {
    navigator.clipboard.writeText(item.memoryRegion.baseAddr)
    setCopiedAddr(true)
    addKernelLog('info', 'mem', `copied address ${item.memoryRegion.baseAddr}`)
    setTimeout(() => setCopiedAddr(false), 2000)
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'rpc': return <Radio className="w-3 h-3" />
      case 'accounts_db': return <Database className="w-3 h-3" />
      case 'banking': case 'sigverify': case 'tpu': return <Cpu className="w-3 h-3" />
      default: return <Code className="w-3 h-3" />
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        className={`w-full sm:max-w-2xl overflow-y-auto ${
          isRamMode ? 'bg-black border-green-500/30' : 'bg-white'
        }`}
      >
        <SheetHeader>
          <SheetTitle className={`font-mono ${isRamMode ? 'text-green-400' : 'text-black'}`}>
            {item.title}
          </SheetTitle>
          <SheetDescription className={`font-mono text-xs mt-2 ${isRamMode ? 'text-green-600' : 'text-gray-600'}`}>
            <div className="flex items-center gap-2">
              <span>
                alloc({item.memoryRegion.name}, {item.memoryRegion.baseAddr}, {item.memoryRegion.size}, {item.memoryRegion.perms})
              </span>
              <button
                onClick={copyAddress}
                className={`p-1 rounded transition-colors ${
                  isRamMode ? 'hover:bg-green-500/20' : 'hover:bg-gray-100'
                }`}
              >
                {copiedAddr ? (
                  <Check className="w-3 h-3 text-green-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className={`mt-6 space-y-6 ${isRamMode ? 'text-green-400' : 'text-gray-900'}`}>
          {/* Memory Region Header (RAM mode only) */}
          {isRamMode && (
            <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 font-mono text-xs">
              <div className="text-green-500 font-bold mb-2">// Memory Region</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">base</span>
                  <span className="text-green-400">{item.memoryRegion.baseAddr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">size</span>
                  <span className="text-green-400">{item.memoryRegion.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">segment</span>
                  <span className="text-green-400">{item.memoryRegion.segment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">perms</span>
                  <span className={item.memoryRegion.perms.includes('x') ? 'text-red-400' : 'text-green-400'}>
                    {item.memoryRegion.perms}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Stack */}
          {item.stack && (
            <Section title="Stack" isRamMode={isRamMode}>
              <div className="flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <Badge
                    key={tech}
                    className={`font-mono text-xs ${
                      isRamMode 
                        ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                        : 'bg-gray-200 text-gray-800'
                    }`}
                    variant="outline"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Section>
          )}

          {/* Validator Internals */}
          {item.relatedValidatorStages.length > 0 && (
            <Section title="Validator Internals" isRamMode={isRamMode}>
              <div className="flex flex-wrap gap-2">
                {item.relatedValidatorStages.map((stage) => (
                  <div
                    key={stage}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono ${
                      isRamMode 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {getStageIcon(stage)}
                    <span className="uppercase">{stage.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* RPC Methods */}
          {item.relatedRpcMethods.length > 0 && (
            <Section title="Related RPC Methods" isRamMode={isRamMode}>
              <div className="flex flex-wrap gap-1">
                {item.relatedRpcMethods.map((method) => (
                  <code
                    key={method}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      isRamMode 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {method}
                  </code>
                ))}
              </div>
            </Section>
          )}

          {/* DeFi Concepts */}
          {item.relatedDefiConcepts && item.relatedDefiConcepts.length > 0 && (
            <Section title="DeFi / MEV Concepts" isRamMode={isRamMode}>
              <div className="flex flex-wrap gap-2">
                {item.relatedDefiConcepts.map((concept) => (
                  <div
                    key={concept}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-mono ${
                      isRamMode 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {concept.includes('sandwich') && <AlertTriangle className="w-3 h-3" />}
                    {concept.replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Architecture */}
          {item.architecture && (
            <Section title="Architecture" isRamMode={isRamMode}>
              <p className={`text-sm leading-relaxed ${isRamMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.architecture}
              </p>
            </Section>
          )}

          {/* What I Built */}
          {item.whatBuilt && (
            <Section title="What I Built" isRamMode={isRamMode}>
              <p className={`text-sm leading-relaxed ${isRamMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.whatBuilt}
              </p>
            </Section>
          )}

          {/* Key Lessons */}
          {item.lessons && (
            <Section title="Key Lessons" isRamMode={isRamMode}>
              <p className={`text-sm leading-relaxed ${isRamMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.lessons}
              </p>
            </Section>
          )}

          {/* Metrics */}
          {item.metrics && item.metrics.length > 0 && (
            <Section title="Metrics" isRamMode={isRamMode}>
              <div className={`space-y-2 font-mono text-sm ${isRamMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center">
                    <span>{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={isRamMode ? 'text-green-400' : 'text-gray-900'}>
                        {metric.value}
                      </span>
                      {metric.simulated && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isRamMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          sim
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Decoded Instruction (for DeFi projects) */}
          {item.decodedInstruction && isRamMode && (
            <Section title="Decoded Instruction (Simulated)" isRamMode={isRamMode}>
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 font-mono text-xs overflow-x-auto">
                <div className="text-purple-400 mb-2">
                  // {item.decodedInstruction.program}::{item.decodedInstruction.name}
                </div>
                <div className="text-gray-500 mb-2">accounts:</div>
                {item.decodedInstruction.accounts.map((acc, i) => (
                  <div key={i} className="ml-4 text-gray-400">
                    [{i}] {acc.name}: <span className="text-green-400">{acc.pubkey}</span>
                  </div>
                ))}
                <div className="text-gray-500 mt-2 mb-1">data:</div>
                <pre className="ml-4 text-green-400">
                  {JSON.stringify(item.decodedInstruction.data, null, 2)}
                </pre>
              </div>
            </Section>
          )}

          {/* Links */}
          <div className={`flex gap-2 pt-4 border-t ${isRamMode ? 'border-green-500/20' : 'border-gray-200'}`}>
            {item.links?.github && (
              <Button
                size="sm"
                className={`text-xs font-mono gap-1 ${
                  isRamMode 
                    ? 'bg-green-500 hover:bg-green-600 text-black' 
                    : 'bg-black hover:bg-gray-900 text-white'
                }`}
                onClick={() => {
                  addRpcTrace('getAccountInfo', `{ pubkey: "${item.memoryRegion.baseAddr}" }`)
                }}
              >
                <Github className="w-3 h-3" />
                View Repository
              </Button>
            )}
            {item.links?.demo && (
              <Button
                size="sm"
                variant="outline"
                className={`text-xs font-mono gap-1 ${
                  isRamMode ? 'border-green-500/50 text-green-400 hover:bg-green-500/10' : ''
                }`}
              >
                <ExternalLink className="w-3 h-3" />
                View Demo
              </Button>
            )}
            {item.links?.article && (
              <Button
                size="sm"
                variant="outline"
                className={`text-xs font-mono gap-1 ${
                  isRamMode ? 'border-green-500/50 text-green-400 hover:bg-green-500/10' : ''
                }`}
              >
                <ExternalLink className="w-3 h-3" />
                Read Article
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function Section({ 
  title, 
  isRamMode, 
  children 
}: { 
  title: string
  isRamMode: boolean
  children: React.ReactNode 
}) {
  return (
    <div>
      <p className={`text-sm font-bold mb-2 ${isRamMode ? 'text-green-500' : 'text-gray-700'}`}>
        {title}
      </p>
      {children}
    </div>
  )
}
