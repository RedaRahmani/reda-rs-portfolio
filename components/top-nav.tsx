'use client'

import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import { useApp } from '@/lib/store'
import { SOCIAL_LINKS, SECTIONS, PROFILE } from '@/lib/data'
import { ArrowUpRight, Mail, Github, Linkedin, FileText, Twitter } from 'lucide-react'

const ICON_MAP: Record<string, JSX.Element> = {
  github: <Github className="w-4 h-4" />,
  resume: <FileText className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  x: <Twitter className="w-4 h-4" />,
}

export default function TopNav() {
  const { state, dispatch, addActivity } = useApp()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id: string) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      dispatch({ type: 'SET_ACTIVE_SECTION', payload: id })
      addActivity('nav', `Jumped to ${id}`)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#030712]/95 backdrop-blur-md border-b border-emerald-500/10 shadow-lg shadow-black/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo / Name */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNav('hero') }}
          className="flex items-center gap-3 group"
        >
          <span className="font-mono text-sm tracking-[0.2em] uppercase text-emerald-400 group-hover:text-emerald-300 transition-colors">
            {PROFILE.brand ?? 'reda.rs'}
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNav(section.id)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${state.activeSection === section.id
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }
              `}
              aria-current={state.activeSection === section.id ? 'page' : undefined}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Proof links - always visible */}
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.filter((link) => ['github', 'resume', 'linkedin', 'x', 'email'].includes(link.id)).map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              onClick={() => addActivity('action', `Opened ${link.label}`)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm border border-slate-700/50 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-200 transition-colors bg-slate-900/30"
              aria-label={link.label}
            >
              {ICON_MAP[link.id] ?? <ArrowUpRight className="w-4 h-4" />}
              <span className="hidden lg:inline">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
