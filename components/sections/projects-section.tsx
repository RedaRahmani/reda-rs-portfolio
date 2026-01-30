'use client'

import type { ReactNode } from 'react'
import { FEATURED_PROJECTS } from '@/lib/data'
import type { FeaturedProject } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, Github, Play, ArrowRight, FileText, Globe, Sparkles, ClipboardList } from 'lucide-react'
import { useApp } from '@/lib/store'
import { SECTIONS } from '@/lib/data'

export default function ProjectsSection() {
  const { addActivity } = useApp()
  const meta = SECTIONS.find((s) => s.id === 'projects')

  const onVisit = (project: FeaturedProject, target: string) => {
    addActivity('action', `Opened ${target} for ${project.title}`)
  }

  return (
    <section id="projects" className="scroll-mt-20">
      {/* Section header */}
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x1000_PROJECTS'}</span>
          <span className="segment-label">.text segment · executable</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Featured Projects
        </h2>
        <p className="text-slate-400 max-w-2xl">
        </p>
      </div>

      {/* Project cards - wider grid on large screens */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
        {FEATURED_PROJECTS.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={idx * 0.05}
            onVisit={onVisit}
          />
        ))}
      </div>

      {/* Minimal GitHub link */}
      <div className="mt-6 text-center">
        <a
          href="https://github.com/RedaRahmani"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-emerald-400 hover:text-emerald-300 font-mono inline-flex items-center gap-1 transition-colors"
        >
          See GitHub for more →
        </a>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  onVisit,
  delay,
}: {
  project: FeaturedProject
  delay: number
  onVisit: (project: FeaturedProject, target: string) => void
}) {
  const evidenceLinks = [
    { label: 'Repo', href: project.evidence.repo, icon: <Github className="w-3.5 h-3.5" />, target: 'repo' },
    project.evidence.article && { label: 'Article', href: project.evidence.article, icon: <FileText className="w-3.5 h-3.5" />, target: 'article' },
    project.evidence.docs && { label: 'Docs', href: project.evidence.docs, icon: <FileText className="w-3.5 h-3.5" />, target: 'docs' },
    project.evidence.demo && { label: 'Demo', href: project.evidence.demo, icon: <Play className="w-3.5 h-3.5" />, target: 'demo' },
    project.evidence.website && { label: 'Website', href: project.evidence.website, icon: <Globe className="w-3.5 h-3.5" />, target: 'website' },
  ].filter(Boolean) as Array<{ label: string; href: string; icon: ReactNode; target: string }>

  const flowSteps = project.io.split('→').map((step) => step.trim()).filter(Boolean)

  return (
    <article
      className="section-card p-5 md:p-6 flex flex-col gap-4 group h-full w-full hover:-translate-y-0.5 transition-transform duration-200"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full bg-emerald-500/10 text-emerald-300 px-2 py-0.5 font-mono uppercase tracking-wide">
              Case Study
            </span>
            {project.badge && (
              <span className="text-[11px] text-emerald-300 font-mono">{project.badge}</span>
            )}
          </div>
        </div>
        {project.evidence.note && (
          <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-300 bg-amber-500/10">
            {project.evidence.note}
          </Badge>
        )}
      </div>

      {/* Visual pipeline */}
      {flowSteps.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-500/15 bg-slate-900/60 px-3 py-2">
          <span className="text-[11px] text-emerald-400 font-mono">I/O</span>
          {flowSteps.map((step, idx) => (
            <div key={`${step}-${idx}`} className="flex items-center gap-2">
              <span className="text-xs font-semibold text-emerald-200 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-1">
                {step}
              </span>
              {idx < flowSteps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-500" />}
            </div>
          ))}
        </div>
      )}

      {/* Problem & Solution */}
      <div className="space-y-3 flex-1">
        <InfoBlock label="Problem" body={project.problem} />
        <InfoBlock label="What I built" body={project.whatBuilt} />
        <InfoBlock label="Impact" body={project.impact} highlight />
        {project.owned && <InfoBlock label="What I owned" body={project.owned} icon={<ClipboardList className="w-4 h-4 text-emerald-300" />} />}
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="text-xs bg-emerald-500/5 text-emerald-200 border-emerald-500/20"
          >
            {tech}
          </Badge>
        ))}
      </div>

      {/* Evidence links */}
      <div className="space-y-1.5">
        <div className="text-xs uppercase tracking-wide text-emerald-400/80 font-medium">Evidence</div>
        {evidenceLinks.map((link) => (
          <EvidenceLink
            key={link.label}
            href={link.href}
            label={link.label}
            icon={link.icon}
            onClick={() => onVisit(project, link.target)}
          />
        ))}
      </div>
    </article>
  )
}

function EvidenceLink({ href, label, icon, onClick }: { href: string; label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-slate-900/60 text-slate-200 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-200 hover:bg-emerald-500/5"
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <ArrowUpRight className="w-3.5 h-3.5" />
    </a>
  )
}

function InfoBlock({
  label,
  body,
  icon,
  highlight = false,
}: {
  label: string
  body: string
  icon?: ReactNode
  highlight?: boolean
}) {
  return (
    <div className={`rounded-lg border ${highlight ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900/50'} p-3`}>
      <div className="flex items-center gap-2 mb-1">
        {icon ?? <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
        <p className="text-xs uppercase tracking-wide text-emerald-400/80 font-medium">{label}</p>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed">{body}</p>
    </div>
  )
}
