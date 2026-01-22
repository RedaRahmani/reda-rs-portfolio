'use client'

import type { ReactNode } from 'react'
import { FEATURED_PROJECTS } from '@/lib/data'
import type { FeaturedProject } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, Github, Play, ArrowRight } from 'lucide-react'
import { useApp } from '@/lib/store'
import { SECTIONS } from '@/lib/data'

// I/O mapping for infra feel
const IO_MAP: Record<string, string> = {
  'mev-signal': 'Kafka → ClickHouse → Alerts',
  'geyser-edge': 'Geyser → Decoder → DLQ',
  'decoder-kit': 'RPC → Decode → Metrics',
}

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
          Each module shows: problem → solution → tech → evidence → impact. 
          Demos marked as simulated when applicable.
        </p>
      </div>

      {/* Project cards - wider grid on large screens */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
        {FEATURED_PROJECTS.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            io={IO_MAP[project.id]}
            delay={idx * 0.05}
            onVisit={onVisit}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  io,
  onVisit,
}: {
  project: FeaturedProject
  io?: string
  delay: number
  onVisit: (project: FeaturedProject, target: string) => void
}) {
  return (
    <article className="section-card p-5 md:p-6 flex flex-col gap-4 group h-full w-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
            {project.title}
          </h3>
          {project.badge && (
            <span className="text-xs text-emerald-400 font-mono">{project.badge}</span>
          )}
        </div>
        {project.evidence.note && (
          <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-300 bg-amber-500/10">
            {project.evidence.note}
          </Badge>
        )}
      </div>

      {/* I/O line - infra feel */}
      {io && (
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900/50 rounded-md px-3 py-1.5 border border-slate-800">
          <span className="text-emerald-400">I/O:</span>
          {io}
        </div>
      )}

      {/* Problem & Solution */}
      <div className="space-y-3 flex-1">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-400/80 font-medium mb-1.5">Problem</p>
          <p className="text-sm text-slate-200 leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-400/80 font-medium mb-1.5">What I built</p>
          <p className="text-sm text-slate-200 leading-relaxed">{project.solution}</p>
        </div>
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

      {/* Impact */}
      <div className="flex items-start gap-2 text-sm border-t border-slate-800 pt-3 mt-auto">
        <ArrowRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <span className="text-emerald-200 font-medium">{project.impact}</span>
      </div>

      {/* Evidence links */}
      <div className="grid grid-cols-3 gap-2">
        <LinkPill
          href={project.evidence.repo}
          label="Repo"
          icon={<Github className="w-3.5 h-3.5" />}
          onClick={() => onVisit(project, 'repo')}
        />
        <LinkPill
          href={project.evidence.pr}
          label="PR"
          icon={<ArrowUpRight className="w-3.5 h-3.5" />}
          onClick={() => onVisit(project, 'PR')}
        />
        <LinkPill
          href={project.evidence.demo}
          label="Demo"
          icon={<Play className="w-3.5 h-3.5" />}
          onClick={() => onVisit(project, 'demo')}
        />
      </div>
    </article>
  )
}

function LinkPill({
  href,
  label,
  icon,
  onClick,
}: {
  href: string
  label: string
  icon: ReactNode
  onClick: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors bg-slate-900/60 text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-200 hover:bg-emerald-500/5"
    >
      {icon}
      {label}
    </a>
  )
}
