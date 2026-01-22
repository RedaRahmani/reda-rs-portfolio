'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, FileDown, MapPin, Github, Linkedin, Mail, GitPullRequest, FolderKanban, FileText } from 'lucide-react'
import { useApp } from '@/lib/store'
import { SOCIAL_LINKS, OPEN_SOURCE_PRS, FEATURED_PROJECTS, WRITING } from '@/lib/data'
import ClusterHUD from './operator/cluster-hud'
import RpcHealthPanel from './operator/rpc-health-panel'
import ValidatorPanel from './operator/validator-panel'

const STACK = ['Rust', 'Solana', 'Geyser', 'Kafka', 'ClickHouse', 'Anchor', 'SVM']

export default function HeroSection() {
  const { addActivity } = useApp()
  const resumeHref = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '/resume.pdf'
  const githubHref = SOCIAL_LINKS.find((l) => l.id === 'github')?.href ?? '#'
  const linkedinHref = SOCIAL_LINKS.find((l) => l.id === 'linkedin')?.href ?? '#'
  const emailHref = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? '#'

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    addActivity('nav', 'Jumped to featured projects')
  }

  return (
    <section id="hero" className="pt-20 pb-12 md:pt-24 md:pb-16 w-full">
      {/* Address header */}
      <div className="segment-header mb-6">
        <span className="segment-badge">0x0000_BOOT</span>
        <span className="segment-label">.entry · init vector</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_minmax(320px,400px)] xl:grid-cols-[1fr_420px] 2xl:grid-cols-[1fr_480px] gap-8 lg:gap-10 xl:gap-12 items-start">
        {/* Left column - Identity */}
        <div className="space-y-6">
          {/* Quick role tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
            Solana infra • Rust • Observability
          </div>

          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-white tracking-tight">
            Solana infra engineer
            <span className="text-emerald-400"> (Rust)</span>
            <span className="block text-slate-300 mt-1 text-xl md:text-2xl font-normal">
              Indexers · Decoders · Geyser pipelines · RPC tooling
            </span>
          </h1>

          {/* Bio */}
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
            I build validator-adjacent systems that stay stable through reorgs: 
            ingestion, decoding, and observability that keep RPCs and data teams 
            ahead of cluster churn.
          </p>

          {/* Proof strip - derived counts */}
          <div className="flex flex-wrap items-center gap-4 text-sm border-l-2 border-emerald-500/30 pl-4 py-1">
            <div className="flex items-center gap-1.5 text-slate-300">
              <GitPullRequest className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{OPEN_SOURCE_PRS.length}</span>
              <span className="text-slate-500">merged PRs</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FolderKanban className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{FEATURED_PROJECTS.length}</span>
              <span className="text-slate-500">projects</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{WRITING.length}</span>
              <span className="text-slate-500">write-ups</span>
            </div>
          </div>

          {/* Location + status */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Morocco</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Open to Solana infra roles
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-emerald-500 text-black hover:bg-emerald-400 font-medium btn-glow"
            >
              View projects
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
          </div>

          {/* Proof links - always visible */}
          <div className="flex flex-wrap gap-2 pt-2">
            <ProofLink href={githubHref} icon={<Github className="w-4 h-4" />} label="GitHub" />
            <ProofLink href={linkedinHref} icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" />
            <ProofLink href={emailHref} icon={<Mail className="w-4 h-4" />} label="Email" />
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-4">
            {STACK.map((skill) => (
              <span
                key={skill}
                className="rounded-md px-2.5 py-1 text-sm border border-emerald-500/20 text-emerald-100/90 bg-emerald-500/5 font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right column - Operator panels */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <ClusterHUD />
          <RpcHealthPanel />
          <ValidatorPanel />
        </div>
      </div>
    </section>
  )
}

function ProofLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-sm text-slate-200 hover:border-emerald-500/40 hover:text-emerald-200 transition-colors"
    >
      {icon}
      {label}
    </a>
  )
}
