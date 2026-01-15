"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Mail, Github, Twitter, Linkedin } from "lucide-react"

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "reda@example.com", href: "mailto:reda@example.com" },
  { icon: Github, label: "GitHub", value: "github.com/reda", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", value: "@redasondev", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/reda", href: "https://linkedin.com" },
]

export default function Contact({ isRamMode }: { isRamMode: boolean }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <section
      id="contact"
      className={`min-h-screen flex items-center justify-center px-4 py-20 transition-colors duration-300 ${
        isRamMode ? "bg-black border-b border-green-500/20" : "bg-gray-50 border-b border-gray-200"
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
          <div className="space-y-4">
            <div
              className={`font-mono text-sm font-bold tracking-wider ${isRamMode ? "text-green-500" : "text-gray-600"}`}
            >
              0x0000_5000 (.heap)
            </div>
            <h2 className={`text-4xl md:text-5xl font-bold ${isRamMode ? "text-green-400" : "text-black"}`}>Contact</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              {CONTACT_INFO.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-lg border transition-all group cursor-pointer ${
                      isRamMode
                        ? "bg-black/50 border-green-500/20 hover:border-green-500/50"
                        : "bg-white border-gray-300 hover:border-black"
                    }`}
                    onClick={() => handleCopy(item.value, i)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isRamMode ? "text-green-500" : "text-black"}`} />
                        <div>
                          <p className={`text-xs font-mono ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                            {item.label}
                          </p>
                          <p
                            className={`font-mono ${
                              isRamMode
                                ? "text-green-400 group-hover:text-green-300"
                                : "text-black group-hover:text-gray-700"
                            }`}
                          >
                            {item.value}
                          </p>
                        </div>
                      </div>
                      <Copy
                        className={`w-4 h-4 transition-opacity ${
                          copiedIndex === i
                            ? isRamMode
                              ? "text-green-400"
                              : "text-black"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg border transition-all space-y-4 ${
                isRamMode ? "bg-black/50 border-green-500/20" : "bg-white border-gray-300"
              }`}
            >
              <div>
                <label className={`text-sm font-mono mb-2 block ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                  Name
                </label>
                <Input
                  placeholder="Your name"
                  className={`font-mono ${
                    isRamMode
                      ? "bg-black/30 border-green-500/30 text-green-400 placeholder:text-green-500/30"
                      : "bg-gray-50 border-gray-300 text-black"
                  }`}
                />
              </div>
              <div>
                <label className={`text-sm font-mono mb-2 block ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className={`font-mono ${
                    isRamMode
                      ? "bg-black/30 border-green-500/30 text-green-400 placeholder:text-green-500/30"
                      : "bg-gray-50 border-gray-300 text-black"
                  }`}
                />
              </div>
              <div>
                <label className={`text-sm font-mono mb-2 block ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                  Message
                </label>
                <Textarea
                  placeholder="Your message..."
                  rows={4}
                  className={`font-mono ${
                    isRamMode
                      ? "bg-black/30 border-green-500/30 text-green-400 placeholder:text-green-500/30"
                      : "bg-gray-50 border-gray-300 text-black"
                  }`}
                />
              </div>
              <Button
                className={`w-full font-mono ${
                  isRamMode ? "bg-green-600 hover:bg-green-700 text-black" : "bg-black hover:bg-gray-900 text-white"
                }`}
              >
                Send Message
              </Button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
