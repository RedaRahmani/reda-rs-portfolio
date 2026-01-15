"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface ProjectDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    name: string
    address: string
    size: string
    perms: string
    stack: string[]
    architecture: string
    whatBuilt: string
    lessons: string
    metrics: { label: string; value: string }[]
  }
  isRamMode: boolean
}

export default function ProjectDetailSheet({ open, onOpenChange, project, isRamMode }: ProjectDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={`w-full sm:max-w-2xl ${isRamMode ? "bg-black border-green-500/30" : ""}`}>
        <SheetHeader>
          <SheetTitle className={`font-mono ${isRamMode ? "text-green-400" : "text-black"}`}>{project.name}</SheetTitle>
          <SheetDescription className={`font-mono text-xs mt-2 ${isRamMode ? "text-green-600" : "text-gray-600"}`}>
            alloc({project.name}, {project.address}, {project.size}, {project.perms})
          </SheetDescription>
        </SheetHeader>

        <div className={`mt-6 space-y-6 ${isRamMode ? "text-green-400" : "text-gray-900"}`}>
          {/* Stack */}
          <div>
            <p className={`text-sm font-bold mb-2 ${isRamMode ? "text-green-500" : "text-gray-700"}`}>Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge
                  key={tech}
                  className={`font-mono text-xs ${
                    isRamMode ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-gray-200 text-gray-800"
                  }`}
                  variant="outline"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <p className={`text-sm font-bold mb-2 ${isRamMode ? "text-green-500" : "text-gray-700"}`}>Architecture</p>
            <p className={`text-sm leading-relaxed ${isRamMode ? "text-gray-300" : "text-gray-600"}`}>
              {project.architecture}
            </p>
          </div>

          {/* What I Built */}
          <div>
            <p className={`text-sm font-bold mb-2 ${isRamMode ? "text-green-500" : "text-gray-700"}`}>What I Built</p>
            <p className={`text-sm leading-relaxed ${isRamMode ? "text-gray-300" : "text-gray-600"}`}>
              {project.whatBuilt}
            </p>
          </div>

          {/* Key Lessons */}
          <div>
            <p className={`text-sm font-bold mb-2 ${isRamMode ? "text-green-500" : "text-gray-700"}`}>Key Lessons</p>
            <p className={`text-sm leading-relaxed ${isRamMode ? "text-gray-300" : "text-gray-600"}`}>
              {project.lessons}
            </p>
          </div>

          {/* Metrics */}
          <div>
            <p className={`text-sm font-bold mb-2 ${isRamMode ? "text-green-500" : "text-gray-700"}`}>Metrics</p>
            <div className={`space-y-1 font-mono text-sm ${isRamMode ? "text-gray-400" : "text-gray-700"}`}>
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <span>{metric.label}:</span>
                  <span className={`ml-2 ${isRamMode ? "text-green-400" : "text-gray-900"}`}>{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-4 border-t border-gray-300/20">
            <Button
              size="sm"
              className={`text-xs font-mono gap-1 ${
                isRamMode ? "bg-green-500 hover:bg-green-600 text-black" : "bg-black hover:bg-gray-900 text-white"
              }`}
            >
              <Github className="w-3 h-3" />
              View Repository
            </Button>
            <Button
              size="sm"
              variant="outline"
              className={`text-xs font-mono gap-1 ${
                isRamMode ? "border-green-500/50 text-green-400 hover:bg-green-500/10" : ""
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              View Demo
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
