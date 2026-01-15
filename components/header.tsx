"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

const NAV_ITEMS = [
  { label: "About", address: "0x0000_0000", id: "about" },
  { label: "Projects (.text)", address: "0x0000_1000", id: "projects" },
  { label: "Open Source (.data)", address: "0x0000_2000", id: "open-source" },
  { label: "Write-ups (.stack)", address: "0x0000_3000", id: "writeups" },
  { label: "Now (.bss)", address: "0x0000_4000", id: "now" },
  { label: "Contact (.heap)", address: "0x0000_5000", id: "contact" },
]

export default function Header({
  isRamMode,
  setIsRamMode,
  setActiveSection,
}: {
  isRamMode: boolean
  setIsRamMode: (value: boolean) => void
  setActiveSection?: (id: string) => void
}) {
  const [localActiveSection, setLocalActiveSection] = useState("about")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setLocalActiveSection(id)
      setActiveSection?.(id)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isRamMode ? "bg-black/95 border-green-500/30 backdrop-blur-sm" : "bg-white border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`font-mono font-bold text-lg tracking-wider ${
              isRamMode ? "text-green-500 glow-text" : "text-black"
            }`}
          >
            reda.rs
          </motion.div>

          {/* Center Nav - Hidden on mobile */}
          {!isMobile && (
            <nav className="flex gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2 py-1 text-xs font-mono transition-colors relative group ${
                    isRamMode
                      ? localActiveSection === item.id
                        ? "text-green-400"
                        : "text-gray-500 hover:text-green-500"
                      : localActiveSection === item.id
                        ? "text-black font-semibold"
                        : "text-gray-600 hover:text-black"
                  }`}
                >
                  {isRamMode && <span className="mr-2">{item.address}</span>}
                  <span>{item.label.split(" ")[0]}</span>
                  {localActiveSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${isRamMode ? "bg-green-500" : "bg-black"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${isRamMode ? "text-green-500" : "text-gray-600"}`}>
                      {isRamMode ? "RAM" : "REC"}
                    </span>
                    <Switch checked={isRamMode} onCheckedChange={setIsRamMode} className="scale-75" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>{isRamMode ? "Switch to Recruiter Mode" : "Switch to RAM Mode"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="outline"
              size="sm"
              className={`text-xs font-mono ${
                isRamMode ? "border-green-500/50 text-green-500 hover:bg-green-500/10" : ""
              }`}
            >
              ↓ Resume
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
