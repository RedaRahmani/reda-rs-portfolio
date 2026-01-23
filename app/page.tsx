'use client'

import { useEffect } from 'react'
import { AppProvider, useApp } from '@/lib/store'
import { useKeyboardShortcuts, KeyboardShortcutsHelp } from '@/lib/keyboard-shortcuts'
import TopNav from '@/components/top-nav'
import HeroSection from '@/components/hero-section'
import QuickSummary from '@/components/quick-summary'
import MemoryNav from '@/components/memory-nav'
import ProjectsSection from '@/components/sections/projects-section'
import OpenSourceSection from '@/components/sections/open-source-section'
import WriteupsSection from '@/components/sections/writeups-section'
import ExperienceSection from '@/components/sections/experience-section'
import EducationSection from '@/components/sections/education-section'
import CertificatesSection from '@/components/sections/certificates-section'
import About from '@/components/sections/about-section'
import Contact from '@/components/sections/contact-section'
import ActivityFeed from '@/components/operator/activity-feed'
import { Shell } from '@/components/layout/shell'

function HomeContent() {
  const { state, dispatch, addKernelLog, addActivity } = useApp()

  useKeyboardShortcuts()

  useEffect(() => {
    const sections = ['projects', 'open-source', 'writing', 'experience', 'education', 'certificates', 'about', 'contact']

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

  useEffect(() => {
    addKernelLog('info', 'validator', 'Operator console initialized')
    addKernelLog('info', 'mem', 'Memory regions mapped: 5 segments')
    addKernelLog('debug', 'syscall', 'Keyboard shortcuts registered')
    addActivity('mode', 'Loaded operator console')
  }, [addActivity, addKernelLog])

  return (
    <div className="min-h-screen">
      {/* Memory grid background */}
      <div className="memory-grid-bg" aria-hidden="true" />
      
      <KeyboardShortcutsHelp />
      <TopNav />
      
      <Shell sidebar={<MemoryNav activeSection={state.activeSection} />}>
        <HeroSection />
        <QuickSummary />
        
        <div className="space-y-16 md:space-y-24">
          <ProjectsSection />
          <OpenSourceSection />
          <WriteupsSection />
          <ExperienceSection />
          <EducationSection />
          <CertificatesSection />
          <About />
          <Contact />
        </div>
      </Shell>
      
      {/* Activity Feed - desktop only */}
      <div className="fixed bottom-4 right-4 w-80 hidden lg:block z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <ActivityFeed />
        </div>
      </div>
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
