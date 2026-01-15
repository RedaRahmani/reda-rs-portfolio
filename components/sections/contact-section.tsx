'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check, Mail, Github, Twitter, Send } from 'lucide-react'
import { useState } from 'react'
import { useApp } from '@/lib/store'
import { MEMORY_REGIONS } from '@/lib/data'

const CONTACT_LINKS = [
  { name: 'Email', icon: Mail, href: 'mailto:hello@reda.rs', label: 'hello@reda.rs' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/reda', label: '@reda' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/reda', label: '@reda' },
]

export default function Contact() {
  const { state, addKernelLog, addRpcTrace } = useApp()
  const [copiedAddr, setCopiedAddr] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const isRamMode = state.mode === 'ram'
  const region = MEMORY_REGIONS.contact

  const copyAddress = () => {
    navigator.clipboard.writeText(region.baseAddr)
    setCopiedAddr(true)
    addKernelLog('info', 'mem', `copied address ${region.baseAddr}`)
    setTimeout(() => setCopiedAddr(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRamMode) {
      addKernelLog('info', 'syscall', `contact form submitted: ${formData.name}`)
      addRpcTrace('sendTransaction', '{ type: "contact_message" }')
    }
    // Form submission logic would go here
    alert('Message sent! (Demo only)')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      className={`min-h-screen flex items-center justify-center px-4 py-12 md:py-16 transition-colors duration-300 ${
        isRamMode ? 'bg-black border-b border-green-500/20' : 'bg-gray-50 border-b border-gray-200'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4 mb-8">
            {isRamMode && (
              <div className="font-mono text-xs text-green-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">{region.segment}</span>
                  <button
                    onClick={copyAddress}
                    className="hover:text-green-400 transition-colors flex items-center gap-1"
                  >
                    {copiedAddr ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <div className="text-gray-600 text-[10px]">
                  base={region.baseAddr} size={region.size} perms={region.perms} checksum={region.checksum}
                </div>
              </div>
            )}
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? 'text-green-400' : 'text-black'}`}>
              Contact
            </h2>
            <p className={`text-lg ${isRamMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Let's build something great together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Contact Links */}
            <div className="space-y-4">
              <h3 className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? 'text-green-500' : 'text-gray-600'}`}>
                REACH OUT
              </h3>
              <div className="space-y-3">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-6 rounded-lg border transition-all ${
                      isRamMode
                        ? 'bg-black/50 border-green-500/20 hover:border-green-500/50 hover:bg-green-500/5'
                        : 'bg-white border-gray-200 hover:border-black'
                    }`}
                    onClick={() => {
                      if (isRamMode) {
                        addKernelLog('info', 'syscall', `external link: ${link.name}`)
                      }
                    }}
                  >
                    <link.icon className={`w-5 h-5 ${isRamMode ? 'text-green-500' : 'text-black'}`} />
                    <div>
                      <div className={`font-bold text-sm ${isRamMode ? 'text-green-400' : 'text-black'}`}>
                        {link.name}
                      </div>
                      <div className={`text-xs ${isRamMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {link.label}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-4">
              <h3 className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? 'text-green-500' : 'text-gray-600'}`}>
                SEND MESSAGE
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`font-mono ${
                      isRamMode
                        ? 'bg-black border-green-500/30 text-green-400 placeholder:text-gray-600 focus:border-green-500'
                        : ''
                    }`}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`font-mono ${
                      isRamMode
                        ? 'bg-black border-green-500/30 text-green-400 placeholder:text-gray-600 focus:border-green-500'
                        : ''
                    }`}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`font-mono ${
                      isRamMode
                        ? 'bg-black border-green-500/30 text-green-400 placeholder:text-gray-600 focus:border-green-500'
                        : ''
                    }`}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className={`w-full font-mono ${
                    isRamMode
                      ? 'bg-green-500 hover:bg-green-600 text-black'
                      : 'bg-black hover:bg-gray-900 text-white'
                  }`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
