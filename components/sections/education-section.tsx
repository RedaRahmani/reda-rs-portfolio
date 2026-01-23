'use client'

import { EDUCATION, SECTIONS } from '@/lib/data'
import { GraduationCap, ArrowUpRight, ArrowRight } from 'lucide-react'

export default function EducationSection() {
  const meta = SECTIONS.find((s) => s.id === 'education')

  return (
    <section id="education" className="scroll-mt-20">
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x3800_EDU'}</span>
          <span className="segment-label">.data segment · cohorts</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Education & Cohorts</h2>
        <p className="text-slate-400 max-w-3xl">
          Formal studies plus targeted Solana cohorts and security training.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {EDUCATION.map((edu) => (
          <article key={edu.id} className="section-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{edu.program}</h3>
                  <p className="text-sm text-slate-400">{edu.org}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1">
                {edu.start ? `${edu.start} → ${edu.end ?? 'Present'}` : edu.status === 'completed' ? 'Completed' : 'Ongoing'}
              </span>
            </div>

            {edu.detail && (
              <p className="text-sm text-slate-300">{edu.detail}</p>
            )}

            {edu.proofUrl && (
              <a
                href={edu.proofUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                Proof
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>{edu.status === 'ongoing' ? 'In progress' : 'Completed'}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
