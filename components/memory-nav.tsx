'use client'

import { SECTIONS } from '@/lib/data'

interface MemoryNavProps {
  activeSection: string
}

export default function MemoryNav({ activeSection }: MemoryNavProps) {
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className="flex flex-col items-center h-full"
      aria-label="Memory map navigation"
    >
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-8 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent" />
      
      {/* Address ticks */}
      <div className="relative flex flex-col gap-1 mt-8">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id
          const address = section.addressLabel?.split('_')[0] ?? `0x${(idx + 1).toString(16).padStart(4, '0')}`
          
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={`
                relative flex flex-col items-center gap-0.5 py-3 px-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-emerald-500/15 border border-emerald-500/30' 
                  : 'hover:bg-slate-800/50 border border-transparent'
                }
              `}
              title={`Jump to ${section.label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              {/* Address tick */}
              <span className={`
                font-mono text-[9px] tracking-wider transition-colors
                ${isActive ? 'text-emerald-300' : 'text-slate-600'}
              `}>
                {address}
              </span>
              
              {/* Segment indicator */}
              <span className={`
                font-mono text-[8px] uppercase tracking-widest transition-colors
                ${isActive ? 'text-emerald-400' : 'text-slate-700'}
              `}>
                {section.segment}
              </span>
              
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
              )}
            </button>
          )
        })}
      </div>
      
      {/* Hex decoration at bottom */}
      <div className="mt-auto font-mono text-[8px] text-slate-700 tracking-widest">
        <div>0xFF</div>
        <div>EOF</div>
      </div>
    </nav>
  )
}
