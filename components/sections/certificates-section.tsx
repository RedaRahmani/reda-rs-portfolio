'use client'

import { CERTIFICATES, SECTIONS } from '@/lib/data'
import { Award, ArrowUpRight, CheckCircle } from 'lucide-react'
import { useApp } from '@/lib/store'

export default function CertificatesSection() {
  const { addActivity } = useApp()
  const meta = SECTIONS.find((s) => s.id === 'certificates')

  return (
    <section id="certificates" className="scroll-mt-20">
      <div className="space-y-4 mb-8">
        <div className="segment-header">
          <span className="segment-badge">{meta?.addressLabel ?? '0x3C00_CERTS'}</span>
          <span className="segment-label">.rodata segment · signed attestations</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Certificates</h2>
        <p className="text-slate-400 max-w-3xl">
          Verified credentials with attestation links. Click to verify on Credly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {CERTIFICATES.map((cert) => (
          <article key={cert.id} className="section-card p-5 space-y-3 group">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-slate-400">{cert.issuer}</p>
                </div>
              </div>
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => addActivity('action', `Verified certificate: ${cert.title}`)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors text-slate-300 border border-slate-700 bg-slate-900/50 hover:border-emerald-500/40 hover:text-emerald-200"
            >
              Verify
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
