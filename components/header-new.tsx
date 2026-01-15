'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import { useApp, useCluster } from '@/lib/store'
import { SECTIONS } from '@/lib/data'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const { state, dispatch, addKernelLog, addRpcTrace } = useApp()
  const cluster = useCluster()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isRamMode = state.mode === 'ram'

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: id })
      setMobileMenuOpen(false)
      
      if (isRamMode) {
        addKernelLog('debug', 'syscall', `navigate: ${id}`)
        addRpcTrace('getSlot', '{}')
      }
    }
  }

  const handleModeToggle = (checked: boolean) => {
    const newMode = checked ? 'ram' : 'recruiter'
    dispatch({ type: 'SET_MODE', payload: newMode })
    
    if (newMode === 'ram') {
      addKernelLog('info', 'syscall', 'Mode switched to RAM/Console')
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isRamMode 
          ? 'bg-black/95 border-green-500/30 backdrop-blur-sm' 
          : 'bg-white border-gray-200'
      }`}
      style={{ minHeight: 'var(--nav-h)' }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <span
              className={`font-mono font-bold text-lg tracking-wider ${
                isRamMode ? 'text-green-500 glow-text' : 'text-black'
              }`}
            >
              reda.rs
            </span>
            {isRamMode && (
              <span className="hidden sm:block font-mono text-[10px] text-green-600 bg-green-500/10 px-2 py-0.5 rounded">
                SLOT {cluster.slot.toLocaleString()}
              </span>
            )}
          </motion.div>

          {/* Center Nav - Desktop */}
          {!isMobile && (
            <nav className="flex gap-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors relative group rounded ${
                    isRamMode
                      ? state.activeSection === section.id
                        ? 'text-green-400 bg-green-500/10'
                        : 'text-gray-500 hover:text-green-500 hover:bg-green-500/5'
                      : state.activeSection === section.id
                        ? 'text-black font-semibold bg-gray-100'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {isRamMode && (
                    <span className="mr-1.5 text-green-600">
                      {section.memoryRegion.baseAddr}
                    </span>
                  )}
                  <span>{section.label}</span>
                  {state.activeSection === section.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        isRamMode ? 'bg-green-500' : 'bg-black'
                      }`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono hidden sm:block ${
                      isRamMode ? 'text-green-500' : 'text-gray-600'
                    }`}>
                      {isRamMode ? 'RAM' : 'CLEAN'}
                    </span>
                    <Switch
                      checked={isRamMode}
                      onCheckedChange={handleModeToggle}
                      className="scale-75"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isRamMode ? 'Switch to Recruiter Mode' : 'Switch to RAM/Console Mode'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Resume Button */}
            <Button
              variant="outline"
              size="sm"
              className={`text-xs font-mono hidden sm:flex ${
                isRamMode 
                  ? 'border-green-500/50 text-green-500 hover:bg-green-500/10' 
                  : ''
              }`}
            >
              ↓ Resume
            </Button>

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded ${
                  isRamMode 
                    ? 'text-green-400 hover:bg-green-500/10' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 pt-3 border-t ${
              isRamMode ? 'border-green-500/20' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col gap-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleNavClick(section.id)}
                  className={`px-3 py-2 text-sm font-mono text-left rounded transition-colors ${
                    isRamMode
                      ? state.activeSection === section.id
                        ? 'text-green-400 bg-green-500/10'
                        : 'text-gray-500 hover:text-green-500 hover:bg-green-500/5'
                      : state.activeSection === section.id
                        ? 'text-black font-semibold bg-gray-100'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {isRamMode && (
                    <span className="mr-2 text-green-600 text-xs">
                      {section.memoryRegion.baseAddr}
                    </span>
                  )}
                  {section.label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
}
