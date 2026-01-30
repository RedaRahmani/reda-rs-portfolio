'use client'

import { OPEN_SOURCE_ORGS } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, GitBranch } from 'lucide-react'
import { useApp } from '@/lib/store'
import { SECTIONS } from '@/lib/data'

export default function OpenSourceSection() {
  const { addActivity } = useApp()
  const meta = SECTIONS.find((s) => s.id === 'open-source')

  return (
    <section id="open-source" className="scroll-mt-20">
      {/* Section header */}
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x2000_OSS'}</span>
          <span className="segment-label">.data segment · read-write</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Open Source Proof
        </h2>
        <p className="text-slate-400 max-w-2xl">
          PR links you can verify.
        </p>
        <p className="text-xs text-slate-500"></p>
      </div>

      {/* Org cards */}
      <div className="space-y-3">
        {[...OPEN_SOURCE_ORGS].sort((a, b) => a.order - b.order).map((org) => (
          <article
            key={org.name}
            className="section-card p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <GitBranch className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="font-semibold text-white">{org.name}</h3>
                <Badge variant="outline" className="text-[11px] bg-emerald-500/10 border-emerald-500/30 text-emerald-200">
                  PR links
                </Badge>
              </div>
              <p className="text-sm text-slate-300 ml-7">{org.description}</p>
            </div>

            <div className="flex gap-2 ml-7 md:ml-0">
              <OutboundLink 
                href={org.viewAllUrl} 
                label="View all PRs" 
                onClick={() => addActivity('action', `Viewed PRs for ${org.name}`)} 
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function OutboundLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick: () => void
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors text-slate-300 border border-slate-700 bg-slate-900/50 hover:border-emerald-500/40 hover:text-emerald-200"
    >
      {label}
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  )
}
