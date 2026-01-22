'use client'

import { PROOF_STATS, SOCIAL_LINKS } from '@/lib/data'
import { ArrowUpRight, CheckCircle2, Terminal } from 'lucide-react'

const KEY_ACHIEVEMENTS = [
  '18 merged PRs in Solana ecosystem',
  'Built 10M tx/day indexing pipelines',
  '99.9% uptime across multi-region deployments',
]

const BOOT_LOG = [
  { ts: '00:01.234', msg: 'validator online, catching up...' },
  { ts: '00:02.891', msg: 'slot 312847123 confirmed' },
  { ts: '00:03.455', msg: 'geyser plugin initialized' },
  { ts: '00:04.012', msg: 'kafka producer connected' },
  { ts: '00:04.567', msg: 'ready for indexing' },
]

export default function QuickSummary() {
  const githubHref = SOCIAL_LINKS.find((l) => l.id === 'github')?.href ?? '#'
  const resumeHref = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '#'
  const emailHref = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? '#'

  return (
    <div className="section-card p-5 md:p-6 my-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="segment-header">
          <span className="segment-badge text-xs">QUICK SUMMARY</span>
          <span className="segment-label text-[10px]">operator.brief()</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">~10 sec read</span>
      </div>

      <div className="grid md:grid-cols-[1fr_1px_1fr] 2xl:grid-cols-[1fr_1px_1fr_1px_minmax(200px,280px)] gap-6">
        {/* Left - Stats */}
        <div className="space-y-4">
          <p className="text-sm text-slate-400 font-mono uppercase tracking-wide">At a glance</p>
          <div className="flex flex-wrap gap-2">
            {PROOF_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 rounded-lg bg-slate-900/50 border border-slate-800 px-3 py-2"
              >
                <span className="text-xs text-slate-500 uppercase">{stat.label}</span>
                <span className="text-sm font-semibold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
          
          {/* Key achievements */}
          <div className="space-y-2 pt-2">
            {KEY_ACHIEVEMENTS.map((achievement) => (
              <div key={achievement} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block bg-emerald-500/10" />

        {/* Middle - Proof links */}
        <div className="space-y-4">
          <p className="text-sm text-slate-400 font-mono uppercase tracking-wide">Verify</p>
          <div className="space-y-2">
            <ProofLinkCard
              href={githubHref}
              title="GitHub"
              description="All projects, PRs, and contributions"
            />
            <ProofLinkCard
              href={resumeHref}
              title="Resume PDF"
              description="Career history and technical skills"
            />
            <ProofLinkCard
              href={emailHref}
              title="Contact"
              description="Response within 24 hours"
            />
          </div>
        </div>

        {/* Divider - 2xl only */}
        <div className="hidden 2xl:block bg-emerald-500/10" />

        {/* Right - Boot Log (2xl only) */}
        <div className="hidden 2xl:block space-y-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-500" />
            <p className="text-sm text-slate-500 font-mono uppercase tracking-wide">Boot Log</p>
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            {BOOT_LOG.map((line, idx) => (
              <div key={idx} className="flex gap-2 text-slate-600">
                <span className="text-slate-700 shrink-0">[{line.ts}]</span>
                <span className="text-slate-500 truncate">{line.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProofLinkCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/30 px-4 py-3 hover:border-emerald-500/30 hover:bg-slate-900/50 transition-colors group"
    >
      <div>
        <p className="text-sm font-medium text-white group-hover:text-emerald-200 transition-colors">{title}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
    </a>
  )
}
