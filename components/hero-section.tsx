'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, FileDown, MapPin, Github, Linkedin, Mail, GitPullRequest, FolderKanban, FileText, Twitter } from 'lucide-react'
import { useApp } from '@/lib/store'
import { SOCIAL_LINKS, OPEN_SOURCE_ORGS, FEATURED_PROJECTS, WRITING, PROFILE, SKILLS } from '@/lib/data'
import ClusterHUD from './operator/cluster-hud'
import RpcHealthPanel from './operator/rpc-health-panel'
import ValidatorPanel from './operator/validator-panel'

export default function HeroSection() {
  const { addActivity } = useApp()
  const resumeHref = SOCIAL_LINKS.find((l) => l.id === 'resume')?.href ?? '/resume.pdf'
  const githubHref = SOCIAL_LINKS.find((l) => l.id === 'github')?.href ?? '#'
  const linkedinHref = SOCIAL_LINKS.find((l) => l.id === 'linkedin')?.href ?? '#'
  const emailHref = SOCIAL_LINKS.find((l) => l.id === 'email')?.href ?? '#'
  const xHref = SOCIAL_LINKS.find((l) => l.id === 'x')?.href ?? '#'

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

      <div className="grid grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
        {/* Left column - Identity */}
        <div className="col-span-12 lg:col-span-7 2xl:col-span-6 space-y-5">
          {/* Quick role tag */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-subtle" />
            {PROFILE.availability}
          </div>

          {/* Main headline - SVM Engineer as primary */}
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight text-white tracking-tight">
              <span className="text-emerald-400">{PROFILE.brand ?? 'reda.rs'}</span>
              <span className="text-slate-400"> · </span>
              {PROFILE.name}
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium">
              SVM Engineer <span className="text-slate-400">(Rust)</span>
            </p>
            <p className="text-base md:text-lg text-slate-400">
              Smart Contract Engineer · Mastery: Anchor + Pinocchio
            </p>
            <p className="text-sm text-slate-500">
              Bundlers · Indexers · Geyser pipelines · RPC tooling
            </p>
          </div>

          {/* Bio */}
          <p className="text-base text-slate-300 leading-relaxed">
            {PROFILE.tagline}
          </p>

          {/* Proof strip - derived counts */}
          <div className="flex flex-wrap items-center gap-4 text-sm border-l-2 border-emerald-500/30 pl-4 py-1">
            <div className="flex items-center gap-1.5 text-slate-300">
              <GitPullRequest className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{OPEN_SOURCE_ORGS.length}</span>
              <span className="text-slate-500">OSS orgs</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FolderKanban className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{FEATURED_PROJECTS.length}</span>
              <span className="text-slate-500">projects</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{WRITING.length}</span>
              <span className="text-slate-500">writing</span>
            </div>
          </div>

          {/* Location + status */}
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
            <ProofLink href={xHref} icon={<Twitter className="w-4 h-4" />} label="X" />
            <ProofLink href={emailHref} icon={<Mail className="w-4 h-4" />} label="Email" />
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 pt-4">
            {SKILLS.map((skill) => (
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
        <div className="col-span-12 lg:col-span-5 2xl:col-span-6 space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
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
