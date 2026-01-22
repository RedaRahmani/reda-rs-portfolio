'use client'

import { useEffect, useCallback } from 'react'
import { useApp } from '@/lib/store'
import { SECTIONS } from '@/lib/data'

export function useKeyboardShortcuts() {
  const { state, dispatch, addKernelLog, addActivity } = useApp()

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: sectionId })
    }
  }, [dispatch])

  const navigateSection = useCallback((direction: 1 | -1) => {
    const currentIndex = SECTIONS.findIndex(s => s.id === state.activeSection)
    const newIndex = Math.max(0, Math.min(SECTIONS.length - 1, currentIndex + direction))
    const newSection = SECTIONS[newIndex]
    
    if (newSection && newSection.id !== state.activeSection) {
      scrollToSection(newSection.id)
      addKernelLog('debug', 'syscall', `kbd: navigate to ${newSection.label} (${direction > 0 ? 'j' : 'k'})`)
    }
  }, [state.activeSection, addKernelLog, scrollToSection])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't handle if user is typing in an input
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      return
    }

    switch (e.key.toLowerCase()) {
      case 'g':
        // Go to address
        e.preventDefault()
        dispatch({ type: 'GOTO_ADDRESS', payload: 'prompt' })
        addKernelLog('debug', 'syscall', 'kbd: goto address (g)')
        break

      case '/':
        // Search
        e.preventDefault()
        addKernelLog('debug', 'syscall', 'kbd: search (/)')
        break

      case 'j':
        // Next section
        e.preventDefault()
        navigateSection(1)
        break

      case 'k':
        // Previous section
        e.preventDefault()
        navigateSection(-1)
        break

      case 'escape':
        // Close inspector
        e.preventDefault()
        if (state.inspectorOpen) {
          dispatch({ type: 'SET_INSPECTOR_OPEN', payload: false })
          dispatch({ type: 'SET_SELECTED_ITEM', payload: null })
          addKernelLog('debug', 'syscall', 'kbd: close inspector (esc)')
        }
        dispatch({ type: 'HIGHLIGHT_MEMORY', payload: null })
        break

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
        // Quick jump to section by number
        if (e.altKey) {
          e.preventDefault()
          const index = parseInt(e.key) - 1
          if (index >= 0 && index < SECTIONS.length) {
            const section = SECTIONS[index]
            scrollToSection(section.id)
            addKernelLog('debug', 'syscall', `kbd: jump to ${section.label} (alt+${e.key})`)
          }
        }
        break

      case 'c':
        // Clear logs
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          dispatch({ type: 'CLEAR_LOGS' })
          addKernelLog('info', 'syscall', 'kbd: logs cleared (ctrl+c)')
        }
        break

      case 't':
        // Cycle console tab
        if (e.altKey) {
          e.preventDefault()
          const tabs: Array<'clock' | 'tpu' | 'tower' | 'rpc' | 'defi'> = ['clock', 'tpu', 'tower', 'rpc', 'defi']
          const currentIndex = tabs.indexOf(state.consoleTab)
          const nextIndex = (currentIndex + 1) % tabs.length
          dispatch({ type: 'SET_CONSOLE_TAB', payload: tabs[nextIndex] })
          addKernelLog('debug', 'syscall', `kbd: console tab -> ${tabs[nextIndex]} (alt+t)`)
        }
        break
    }
  }, [state.inspectorOpen, state.consoleTab, dispatch, addKernelLog, navigateSection, scrollToSection])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// Keyboard shortcuts help component
export function KeyboardShortcutsHelp() {
  const shortcuts = [
    { key: 'j / k', desc: 'Navigate sections' },
    { key: 'g', desc: 'Go to address' },
    { key: 'Esc', desc: 'Close / clear' },
    { key: 'Alt+1-5', desc: 'Jump to section' },
  ]

  return (
    <div className="fixed bottom-24 right-4 z-30 hidden xl:block opacity-40 hover:opacity-100 transition-opacity duration-200">
      <div className="bg-slate-950/80 border border-emerald-500/15 rounded-xl p-3 font-mono text-[10px] backdrop-blur-sm">
        <div className="text-emerald-400 font-semibold mb-2 uppercase tracking-wider text-[9px]">Shortcuts</div>
        <div className="space-y-1">
          {shortcuts.map(({ key, desc }) => (
            <div key={key} className="flex justify-between gap-4">
              <span className="text-emerald-300/80 bg-emerald-500/10 px-1.5 py-0.5 rounded">{key}</span>
              <span className="text-slate-500">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
