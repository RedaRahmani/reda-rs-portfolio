'use client'

import { useEffect } from 'react'
import { AppProvider, useApp } from '@/lib/store'
import { useKeyboardShortcuts, KeyboardShortcutsHelp } from '@/lib/keyboard-shortcuts'
import AppShell from '@/components/app-shell'
import Header from '@/components/header-new'
import Hero from '@/components/hero-new'
import About from '@/components/sections/about-section'
import ProjectsSection from '@/components/sections/projects-section'
import OpenSourceSection from '@/components/sections/open-source-section'
import WriteupsSection from '@/components/sections/writeups-section'
import Now from '@/components/sections/now-section'
import Contact from '@/components/sections/contact-section'
import Footer from '@/components/footer-new'
import HexDumpRail from '@/components/hex-dump-rail'
import ValidatorConsole from '@/components/validator-console'
import SolanaRegistersPanel from '@/components/solana-registers-panel'
import ValidatorStatusBar from '@/components/validator-status-bar'
import KernelLogPanel from '@/components/kernel-log-panel'
import ProcessListPanel from '@/components/process-list-panel'

function HomeContent() {
  const { state, dispatch, addKernelLog } = useApp()
  
  // Initialize keyboard shortcuts
  useKeyboardShortcuts()

  // Handle scroll-based section detection
  useEffect(() => {
    const sections = ['about', 'projects', 'open-source', 'writeups', 'now', 'contact']
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (state.activeSection !== sectionId) {
              dispatch({ type: 'SET_ACTIVE_SECTION', payload: sectionId })
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [state.activeSection, dispatch])

  // Boot log on mount (RAM mode)
  useEffect(() => {
    if (state.mode === 'ram') {
      addKernelLog('info', 'validator', 'Validator Memory Inspector initialized')
      addKernelLog('info', 'mem', 'Memory regions mapped: 6 segments')
      addKernelLog('debug', 'syscall', 'Keyboard shortcuts registered')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const isRamMode = state.mode === 'ram'

  return (
    <div className={isRamMode ? 'ram-mode' : 'recruiter-mode'}>
      <KeyboardShortcutsHelp isRamMode={isRamMode} />

      <AppShell
        mode={state.mode}
        navbar={<Header />}
        leftRail={isRamMode ? <HexDumpRail /> : null}
        rightRail={
          isRamMode ? (
            <>
              <ValidatorConsole />
              <SolanaRegistersPanel />
              <ProcessListPanel />
            </>
          ) : null
        }
        kernelDock={isRamMode ? <KernelLogPanel /> : null}
        statusBar={<ValidatorStatusBar />}
      >
        <Hero />
        <About />
        <ProjectsSection />
        <OpenSourceSection />
        <WriteupsSection />
        <Now />
        <Contact />
        <Footer />
      </AppShell>
    </div>
  )
}

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  )
}
