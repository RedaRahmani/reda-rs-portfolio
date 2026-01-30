'use client'

import { Check, Cpu, Radar, Workflow } from 'lucide-react'
import { SECTIONS, PROFILE, SKILLS, ABOUT_HIGHLIGHTS } from '@/lib/data'

const ENVIRONMENT = [
  { label: 'Laptop', value: 'Dell Inspiron 15 5000 (Ryzen 7, AMD Radeon Graphics)' },
  { label: 'Monitor', value: 'BenQ GW2490 — 23.8\" IPS, 100Hz' },
  { label: 'Keyboard', value: 'g-LAB' },
  { label: 'Mouse', value: 'Logitech' },
  { label: 'Headphones', value: 'JVC' },
  { label: 'Network', value: '100 Mbps fiber optic' },
]

export default function AboutSection() {
  const meta = SECTIONS.find((s) => s.id === 'about')

  return (
    <section id="about" className="scroll-mt-20">
      {/* Section header */}
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x4000_ABOUT'}</span>
          <span className="segment-label">.rodata segment · profile</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          About Me
        </h2>
        <p className="text-slate-400 max-w-2xl">
          {PROFILE.tagline}
        </p>
      </div>

      {/* Highlight cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {ABOUT_HIGHLIGHTS.map((item, idx) => {
          const Icon = [Cpu, Radar, Workflow][idx % 3]
          return (
          <div
            key={item.title}
            className="section-card p-5 space-y-3"
          >
            <Icon className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-slate-400">{item.body}</p>
          </div>
        )})}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {SKILLS.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm border border-emerald-500/20 text-emerald-200 bg-emerald-500/5"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            {tag}
          </span>
        ))}
      </div>

      {/* Environment */}
      <div className="mt-8 space-y-2">
        <h3 className="text-xl font-semibold text-white">Environment</h3>
        <p className="text-sm text-slate-500">My daily dev setup and connectivity.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {ENVIRONMENT.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2.5 flex flex-col gap-0.5"
            >
              <span className="text-[11px] uppercase tracking-wide text-slate-500">{item.label}</span>
              <span className="text-sm text-slate-200 leading-snug">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
