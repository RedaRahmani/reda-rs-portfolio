'use client'

import { SOCIAL_LINKS } from '@/lib/data'
import { Mail, ArrowUpRight, FileText, Linkedin, Twitter, Send } from 'lucide-react'
import { SECTIONS } from '@/lib/data'

export default function ContactSection() {
  const meta = SECTIONS.find((s) => s.id === 'contact')

  const email = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? 'mailto:redarahmani1937@gmail.com'
  const resume = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '/resume.pdf'
  const linkedin = SOCIAL_LINKS.find((l) => l.id === 'linkedin')?.href ?? '#'
  const x = SOCIAL_LINKS.find((l) => l.id === 'x')?.href ?? '#'
  const telegram = SOCIAL_LINKS.find((l) => l.id === 'telegram')?.href ?? '#'
  const superteam = SOCIAL_LINKS.find((l) => l.id === 'superteam')?.href ?? '#'

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
  icon: React.ReactNode
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
