'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, Github, Check, Cpu, Database, Radio, ExternalLink } from 'lucide-react'
import { useApp } from '@/lib/store'
import { PROJECTS, MEMORY_REGIONS } from '@/lib/data'
import type { PortfolioItem } from '@/lib/types'
import InspectorDrawer from '@/components/inspector-drawer'

const FILTERS = ['All', 'Indexing', 'Geyser', 'On-chain', 'DeFi', 'Performance']

export default function ProjectsSection() {
  const { state, dispatch, addKernelLog, addRpcTrace, highlightMemory, clearHighlight } = useApp()
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [copiedAddr, setCopiedAddr] = useState<string | null>(null)

  const isRamMode = state.mode === 'ram'
  const region = MEMORY_REGIONS.projects

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true
    return project.tags.some((tag) => 
      tag.toLowerCase().includes(activeFilter.toLowerCase())
    )
  })

  const handleProjectHover = useCallback((project: PortfolioItem) => {
    if (!isRamMode) return

    // Highlight memory range
    const baseNum = parseInt(project.memoryRegion.baseAddr.replace(/_/g, ''), 16)
    const sizeNum = parseInt(project.memoryRegion.size.replace(/_/g, ''), 16)
    const endAddr = `0x${(baseNum + sizeNum).toString(16).padStart(8, '0').replace(/(.{4})$/, '_$1')}`
    
    highlightMemory(project.memoryRegion.baseAddr, endAddr)
    dispatch({ type: 'SET_HOVERED_ITEM', payload: project.id })

    // Add kernel log
    addKernelLog(
      'info',
      'inspect',
      `alloc inspect: ${project.memoryRegion.name} @ ${project.memoryRegion.baseAddr} (${project.memoryRegion.size})`
    )

    // Add relevant RPC traces
    if (project.relatedRpcMethods.length > 0) {
      const method = project.relatedRpcMethods[0]
      addRpcTrace(method, `{ source: "${project.title}" }`)
      
      if (project.relatedRpcMethods.length > 1) {
        setTimeout(() => {
          addRpcTrace(project.relatedRpcMethods[1], '{ encoding: "jsonParsed" }')
        }, 200)
      }
    }
  }, [isRamMode, highlightMemory, dispatch, addKernelLog, addRpcTrace])

  const handleProjectLeave = useCallback(() => {
    if (!isRamMode) return
    clearHighlight()
    dispatch({ type: 'SET_HOVERED_ITEM', payload: null })
  }, [isRamMode, clearHighlight, dispatch])

  const handleDetailOpen = useCallback((project: PortfolioItem) => {
    setSelectedProject(project)
    setDetailOpen(true)
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: 'projects' })
    
    addKernelLog('info', 'mem', `mmap: loading ${project.memoryRegion.name} into inspector`)
    addRpcTrace('getAccountInfo', `{ pubkey: "${project.memoryRegion.baseAddr}" }`)
  }, [dispatch, addKernelLog, addRpcTrace])

  const copyAddress = useCallback((addr: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(addr)
    setCopiedAddr(addr)
    addKernelLog('info', 'mem', `copied address ${addr} to clipboard`)
    setTimeout(() => setCopiedAddr(null), 2000)
  }, [addKernelLog])

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'rpc': return <Radio className="w-3 h-3" />
      case 'accounts_db': return <Database className="w-3 h-3" />
      default: return <Cpu className="w-3 h-3" />
    }
  }

  return (
    <section
      id="projects"
      className={`min-h-screen flex items-center justify-center px-4 py-12 md:py-16 transition-colors duration-300 ${
        isRamMode 
          ? 'bg-black border-b border-green-500/20' 
          : 'bg-gray-50 border-b border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto w-full">
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
                    onClick={(e) => copyAddress(region.baseAddr, e)}
                    className="hover:text-green-400 transition-colors flex items-center gap-1"
                    title="Copy address"
                  >
                    {copiedAddr === region.baseAddr ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <div className="text-gray-600 text-[10px]">
                  base={region.baseAddr} size={region.size} perms={region.perms} checksum={region.checksum}
                </div>
              </div>
            )}
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>
              Projects
            </h2>
            <div className={`h-px ${isRamMode ? 'bg-gradient-to-r from-green-500/20 to-transparent' : 'bg-gray-300'}`} />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-all ${
                  activeFilter === filter
                    ? isRamMode
                      ? 'bg-green-500 text-black'
                      : 'bg-black text-white'
                    : isRamMode
                      ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => handleProjectHover(project)}
                onMouseLeave={handleProjectLeave}
                className={`p-6 rounded-lg border transition-all group cursor-pointer ${
                  isRamMode
                    ? `bg-black/50 border-green-500/20 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] ${
                        state.hoveredItem === project.id ? 'border-green-500/80 bg-green-500/5' : ''
                      }`
                    : 'bg-white border-gray-300 hover:border-black hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  {/* Allocation header */}
                  {isRamMode && (
                    <div className="font-mono text-xs text-green-600 flex items-center justify-between">
                      <span>
                        alloc({project.memoryRegion.name}, {project.memoryRegion.baseAddr}, {project.memoryRegion.perms})
                      </span>
                      <button
                        onClick={(e) => copyAddress(project.memoryRegion.baseAddr, e)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedAddr === project.memoryRegion.baseAddr ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 hover:text-green-400" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className={`font-bold text-lg ${isRamMode ? 'text-green-400' : 'text-black'}`}>
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className={`text-sm ${isRamMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack?.map((tech) => (
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

                  {/* Validator stages (RAM mode only) */}
                  {isRamMode && project.relatedValidatorStages.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.relatedValidatorStages.slice(0, 3).map((stage) => (
                        <div
                          key={stage}
                          className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        >
                          {getStageIcon(stage)}
                          <span className="uppercase">{stage}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics preview */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className={`text-sm font-mono ${isRamMode ? 'text-green-500' : 'text-gray-700'}`}>
                      📊 {project.metrics[0].value}
                      {project.metrics[0].simulated && (
                        <span className="text-[10px] text-yellow-400 ml-1">(sim)</span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className={`flex gap-2 pt-4 border-t ${isRamMode ? 'border-green-500/20' : 'border-gray-200'}`}>
                    <Button
                      size="sm"
                      onClick={() => handleDetailOpen(project)}
                      className={`text-xs font-mono gap-1 flex-1 ${
                        isRamMode
                          ? 'bg-green-500 hover:bg-green-600 text-black'
                          : 'bg-black hover:bg-gray-900 text-white'
                      }`}
                    >
                      View Dump
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`text-xs font-mono gap-1 ${
                        isRamMode 
                          ? 'text-green-400 hover:bg-green-500/10' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Github className="w-3 h-3" />
                      Repo
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Inspector Drawer */}
      <InspectorDrawer
        open={detailOpen}
        onOpenChange={setDetailOpen}
        item={selectedProject}
      />
    </section>
  )
}
