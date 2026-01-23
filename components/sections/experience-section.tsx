'use client'

import { EXPERIENCE, SECTIONS } from '@/lib/data'
import { Briefcase, ArrowRight } from 'lucide-react'

export default function ExperienceSection() {
  const meta = SECTIONS.find((s) => s.id === 'experience')

  return (
    <section id="experience" className="scroll-mt-20">
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x3500_RUNLOG'}</span>
          <span className="segment-label">.bss segment · run log</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Deployment History</h2>
        <p className="text-slate-400 max-w-3xl">
          Recent roles and cohorts focused on shipping AI/ML backends and Solana-first systems.
        </p>
      </div>

      <div className="space-y-4">
        {EXPERIENCE.map((role) => (
          <article key={role.id} className="section-card p-5 md:p-6 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{role.role}</h3>
                  <p className="text-sm text-slate-400">
                    {role.company} — {role.location}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1">
                {role.start} → {role.end}
              </span>
            </div>

            <ul className="space-y-2 text-sm text-slate-300">
              {role.bullets.map((item, idx) => (
                <li key={idx} className="flex gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
