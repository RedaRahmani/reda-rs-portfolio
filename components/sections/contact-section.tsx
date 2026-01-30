'use client'

import type { ReactNode } from 'react'
import { SOCIAL_LINKS } from '@/lib/data'
import { Mail, ArrowUpRight, FileText, Linkedin, Twitter, Send, Github } from 'lucide-react'
import { SECTIONS } from '@/lib/data'

export default function ContactSection() {
  const meta = SECTIONS.find((s) => s.id === 'contact')

  const email = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? 'mailto:redarahmani1937@gmail.com'
  const resume = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '/resume.pdf'
  const linkedin = SOCIAL_LINKS.find((l) => l.id === 'linkedin')?.href ?? '#'
  const x = SOCIAL_LINKS.find((l) => l.id === 'x')?.href ?? '#'
  const telegram = SOCIAL_LINKS.find((l) => l.id === 'telegram')?.href ?? '#'
  const superteam = SOCIAL_LINKS.find((l) => l.id === 'superteam')?.href ?? '#'
  const githubHref = SOCIAL_LINKS.find((l) => l.id === 'github')?.href ?? '#'

  return (
    <section id="contact" className="scroll-mt-20">
      {/* Section header */}
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x5000_CONTACT'}</span>
          <span className="segment-label">.heap segment · alloc</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Get in Touch
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Open to Solana infra roles and advisory. Email is best — response within 24 hours.
        </p>
      </div>

      {/* Contact cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <ContactCard
          href={email}
          title="Email"
          icon={<Mail className="w-5 h-5" />}
          description="Direct line, response within 24h."
        />
        <ContactCard
          href={linkedin}
          title="LinkedIn"
          icon={<Linkedin className="w-5 h-5" />}
          description="Professional profile and references."
        />
        <ContactCard
          href={x}
          title="X"
          icon={<Twitter className="w-5 h-5" />}
          description="Live updates and Solana notes."
        />
        <ContactCard
          href={telegram}
          title="Telegram"
          icon={<Send className="w-5 h-5" />}
          description="Fast responses for collabs."
        />
        <ContactCard
          href={resume}
          title="Resume"
          icon={<FileText className="w-5 h-5" />}
          description="PDF with career highlights."
        />
        <ContactCard
          href={superteam}
          title="Superteam Earn"
          icon={<ArrowUpRight className="w-5 h-5" />}
          description="Bounty proof profile."
        />
      </div>

      {/* Sticky mini-bar */}
      <div className="fixed bottom-3 left-0 right-0 z-30 px-4">
        <div className="max-w-4xl mx-auto rounded-2xl border border-emerald-500/20 bg-slate-950/90 backdrop-blur-lg shadow-lg shadow-black/30">
          <div className="flex flex-wrap items-center gap-2 px-4 py-2 text-sm">
            <span className="text-[11px] font-mono uppercase text-emerald-300">Contact</span>
            <ContactChip href={email} label="Email" icon={<Mail className="w-3.5 h-3.5" />} />
            <ContactChip href={linkedin} label="LinkedIn" icon={<Linkedin className="w-3.5 h-3.5" />} />
            <ContactChip href={githubHref} label="GitHub" icon={<Github className="w-3.5 h-3.5" />} />
            <ContactChip href={resume} label="Resume" icon={<FileText className="w-3.5 h-3.5" />} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactCard({
  href,
  title,
  description,
  icon,
}: {
  href: string
  title: string
  description: string
  icon: ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="section-card p-5 flex flex-col gap-3 group hover:border-emerald-500/30 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400">{icon}</span>
          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
            {title}
          </h3>
        </div>
        <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </a>
  )
}

function ContactChip({ href, label, icon }: { href: string; label: string; icon: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-200 hover:border-emerald-500/40 hover:text-emerald-200 transition-colors"
    >
      {icon}
      {label}
    </a>
  )
}
