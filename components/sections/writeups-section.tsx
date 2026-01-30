'use client'

import { WRITING } from '@/lib/data'
import { ArrowUpRight, BookOpen, Calendar } from 'lucide-react'
import { useApp } from '@/lib/store'
import { SECTIONS } from '@/lib/data'

export default function WriteupsSection() {
  const { addActivity } = useApp()
  const meta = SECTIONS.find((s) => s.id === 'writing')

  return (
    <section id="writing" className="scroll-mt-20">
      {/* Section header */}
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x3000_WRITING'}</span>
          <span className="segment-label">.stack segment · notes</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Write-ups & Deep Dives
        </h2>
        <p className="text-slate-400 max-w-2xl">
          RLock architecture and Solana performance notes built for reviewers who want substance quickly.
        </p>
      </div>

      {/* Writing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {WRITING.map((post) => (
          <article
            key={post.id}
            className="section-card p-5 flex flex-col gap-3 group"
          >
            {/* Topic badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide">
                {post.topic}
              </span>
              <BookOpen className="w-4 h-4 text-slate-600" />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
              {post.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-slate-400 flex-1">
              {post.summary}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date ?? 'Published'}
              </span>
              <a
                href={post.url}
                target={post.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                onClick={() => addActivity('action', `Opened post ${post.title}`)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                Read
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
