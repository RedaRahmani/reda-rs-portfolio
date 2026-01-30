'use client'

import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import {
  ArrowRight,
  FileDown,
  MapPin,
  Github,
  Linkedin,
  Mail,
  FileText,
  Cpu,
  Keyboard,
  Terminal,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/store'
import { SOCIAL_LINKS, OPEN_SOURCE_ORGS, WRITING, PROFILE, SKILLS } from '@/lib/data'

const ClusterHUD = dynamic(() => import('@/components/operator/cluster-hud'), { ssr: false })
const RpcHealthPanel = dynamic(() => import('@/components/operator/rpc-health-panel'), { ssr: false })
const ValidatorPanel = dynamic(() => import('@/components/operator/validator-panel'), { ssr: false })

const HERO_BULLETS = [
  {
    label: 'Focus',
    text: 'SVM Engineer (Rust)',
  },
  {
    label: 'Strengths',
    text: 'On-chain programs · Indexing/decoding · Runtime awareness',
  },
]

const BOOT_LOG = [
  { ts: '00:01.234', msg: 'validator online, catching up...' },
  { ts: '00:02.891', msg: 'slot 312847123 confirmed' },
  { ts: '00:03.455', msg: 'geyser plugin initialized' },
  { ts: '00:04.012', msg: 'kafka producer connected' },
  { ts: '00:04.567', msg: 'ready for indexing' },
]

const SHORTCUTS = [
  { key: 'j / k', desc: 'Navigate sections' },
  { key: 'Alt+1-6', desc: 'Jump to section' },
  { key: 'Ctrl+C', desc: 'Clear logs' },
  { key: 'Esc', desc: 'Close overlays' },
]

export default function HeroSection() {
  const { addActivity } = useApp()
  const [consoleOpen, setConsoleOpen] = useState(false)

  const resumeHref = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '/resume.pdf'
  const githubHref = SOCIAL_LINKS.find((l) => l.id === 'github')?.href ?? '#'
  const linkedinHref = SOCIAL_LINKS.find((l) => l.id === 'linkedin')?.href ?? '#'
  const emailHref = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? '#'

  const trimmedSkills = useMemo(() => SKILLS.slice(0, 7), [])

  const proofCounts = useMemo(
    () => [
      { label: 'PROJECTS', value: '3 highlights', subtext: 'see the rest on GitHub', href: githubHref },
      { label: 'OSS orgs', value: OPEN_SOURCE_ORGS.length },
      { label: 'Write-ups', value: WRITING.length },
    ],
    [githubHref]
  )

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    addActivity('nav', 'Jumped to featured projects')
  }

  const handleConsoleToggle = (open: boolean) => {
    setConsoleOpen(open)
    addActivity('mode', open ? 'Opened live console' : 'Collapsed live console')
  }

  return (
    <section id="hero" className="pt-20 pb-10 md:pt-24 md:pb-14 w-full">
      <div className="segment-header mb-5">
        <span className="segment-badge">0x0000_BOOT</span>
        <span className="segment-label">.entry · operator console</span>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
        {/* Left column */}
        <div className="col-span-12 lg:col-span-7 2xl:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
            Skim Mode
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl lg:text-[2.8rem] font-semibold leading-tight text-white tracking-tight">
              SVM Engineer <span className="text-emerald-400">(Rust)</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200">
              Solana Smart Contract &amp; SVM Engineer (Rust) — building Anchor/Pinocchio programs and real-time DeFi monitoring pipelines close to validator/RPC systems.
            </p>
            <p className="text-sm text-slate-400 max-w-lg">
              Strong Solana runtime + performance focus (CU, latency, reliability) with a security-first mindset and active open-source contributions.
            </p>
          </div>

          <ul className="space-y-2.5">
            {HERO_BULLETS.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-200 uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm text-slate-300">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-emerald-500 text-black hover:bg-emerald-400 font-semibold btn-glow"
            >
              View Projects
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/10 hover:border-emerald-400/60"
            >
              <a href={resumeHref} target={resumeHref.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                <FileDown className="w-4 h-4 mr-1" />
                Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              asChild
              className="text-slate-300 hover:text-emerald-200 hover:bg-emerald-500/5"
            >
              <a href={emailHref}>
                Contact
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{PROFILE.location}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {PROFILE.availability}
            </div>
          </div>

          <div className="flex gap-2 pt-3 overflow-x-auto pb-2 -mb-2 scrollbar-thin scrollbar-thumb-slate-700">
            {trimmedSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-md px-2.5 py-1 text-sm border border-emerald-500/20 text-emerald-100/90 bg-emerald-500/5 font-mono whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
            <a
              href={githubHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-2.5 py-1 text-sm border border-slate-700 text-slate-300 bg-slate-900/60 font-mono whitespace-nowrap hover:border-emerald-500/40 hover:text-emerald-200 transition-colors"
            >
              More…
            </a>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 lg:col-span-5 2xl:col-span-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.05s' }}>
          <div className="section-card p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="segment-header">
                <span className="segment-badge text-xs">SKIM_BLOCK</span>
                <span className="segment-label text-[10px]">value · proof · links</span>
              </div>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {proofCounts.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 hover:border-emerald-500/40 hover:text-emerald-100 transition-colors"
                  >
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-lg font-semibold text-white leading-tight">{item.value}</p>
                    {item.subtext ? (
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{item.subtext}</p>
                    ) : null}
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2"
                  >
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">{item.label}</p>
                    <p className="text-lg font-semibold text-white">{item.value}</p>
                  </div>
                )
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <ProofLink href={githubHref} icon={<Github className="w-4 h-4" />} label="GitHub" />
              <ProofLink href={linkedinHref} icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
              <ProofLink href={resumeHref} icon={<FileText className="w-4 h-4" />} label="Resume" />
              <ProofLink href={emailHref} icon={<Mail className="w-4 h-4" />} label="Email" />
            </div>
          </div>
        </div>
      </div>

      {/* Console toggle */}
      <Collapsible.Root open={consoleOpen} onOpenChange={handleConsoleToggle} className="mt-6">
        <Collapsible.Trigger
          className="w-full flex items-center justify-between rounded-xl border border-emerald-500/25 bg-slate-950/80 px-4 py-3 text-left hover:border-emerald-500/40 transition-colors"
          aria-expanded={consoleOpen}
        >
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">Show Live Console ▸</span>
            <span className="text-xs text-slate-500">(simulated)</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-emerald-300 transition-transform ${consoleOpen ? 'rotate-180' : ''}`} />
        </Collapsible.Trigger>

        <Collapsible.Content className="mt-3 space-y-3 data-[state=open]:animate-fade-in">
          <p className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden />
            Themed console (simulated) · Cluster HUD, RPC health, validator status, boot log, shortcuts.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            <ClusterHUD />
            <RpcHealthPanel />
            <ValidatorPanel />
            <BootLogCard />
            <ShortcutsCard />
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </section>
  )
}

function ProofLink({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-2 text-sm text-slate-200 hover:border-emerald-500/40 hover:text-emerald-200 transition-colors"
    >
      {icon}
      {label}
    </a>
  )
}

function BootLogCard() {
  return (
    <div className="section-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-semibold text-white">Boot log</span>
      </div>
      <div className="space-y-1 font-mono text-[11px]">
        {BOOT_LOG.map((line, idx) => (
          <div key={idx} className="flex gap-2 text-slate-500">
            <span className="text-slate-600 shrink-0">[{line.ts}]</span>
            <span className="text-slate-300">{line.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ShortcutsCard() {
  return (
    <div className="section-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Keyboard className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-semibold text-white">Shortcuts</span>
      </div>
      <div className="space-y-1">
        {SHORTCUTS.map((shortcut) => (
          <div key={shortcut.key} className="flex justify-between text-sm text-slate-300 rounded-md border border-slate-800 bg-slate-900/50 px-2.5 py-1">
            <span className="font-mono text-emerald-300">{shortcut.key}</span>
            <span className="text-slate-500">{shortcut.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
