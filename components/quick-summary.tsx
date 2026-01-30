'use client'

import { PROOF_STATS, SOCIAL_LINKS, KEY_ACHIEVEMENTS } from '@/lib/data'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

export default function QuickSummary() {
  const githubHref = SOCIAL_LINKS.find((l) => l.id === 'github')?.href ?? '#'
  const resumeHref = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '#'
  const emailHref = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? '#'
  const superteamHref = SOCIAL_LINKS.find((l) => l.id === 'superteam')?.href

  return (
    <div className="section-card p-5 md:p-6 my-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="segment-header">
          <span className="segment-badge text-xs">QUICK SUMMARY</span>
          <span className="segment-label text-[10px]">skim.first()</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">~8 sec skim</span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Stats + achievements */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
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
          
          <div className="space-y-2">
            {KEY_ACHIEVEMENTS.map((achievement) => (
              <div key={achievement} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proof links */}
        <div className="col-span-12 lg:col-span-5 space-y-2 lg:border-l lg:border-emerald-500/10 lg:pl-6">
          <p className="text-sm text-slate-400 font-mono uppercase tracking-wide">Verify</p>
          <div className="grid sm:grid-cols-2 gap-2">
            <ProofLinkCard
              href={githubHref}
              title="GitHub"
              description="Projects & PRs"
            />
            <ProofLinkCard
              href={resumeHref}
              title="Resume"
              description="PDF"
            />
            <ProofLinkCard
              href={emailHref}
              title="Contact"
              description="Reply within 24h"
            />
            {superteamHref && (
              <ProofLinkCard
                href={superteamHref}
                title="Superteam Earn"
                description="Bounty proofs"
              />
            )}
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
