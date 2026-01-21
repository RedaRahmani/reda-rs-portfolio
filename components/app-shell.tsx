'use client'

import React, { useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { PanelLeft, PanelRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface AppShellProps {
  mode: 'ram' | 'recruiter'
  navbar: React.ReactNode
  leftRail?: React.ReactNode
  rightRail?: React.ReactNode
  statusBar: React.ReactNode
  kernelDock?: React.ReactNode
  children: React.ReactNode
}

export default function AppShell({
  mode,
  navbar,
  leftRail,
  rightRail,
  statusBar,
  kernelDock,
  children,
}: AppShellProps) {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  const layoutVars = useMemo(
    () =>
      ({
        '--nav-h': '72px',
        '--status-h': '44px',
        '--left-w': leftCollapsed ? '56px' : '300px',
        '--right-w': rightCollapsed ? '56px' : '340px',
        '--gutter': '20px',
      }) as React.CSSProperties,
    [leftCollapsed, rightCollapsed]
  )

  const showRails = mode === 'ram'
  const cloneRail = (rail: React.ReactNode, variant?: 'rail' | 'drawer') => {
    if (!rail) return null
    if (React.isValidElement(rail)) {
      const element = rail as React.ReactElement<Record<string, unknown>>
      const props = element.props || {}

      return React.cloneElement(element, variant ? { ...props, variant } : props)
    }
    return rail
  }

  return (
    <div className="relative min-h-screen" style={layoutVars}>
      <div className="relative z-50">{navbar}</div>

      <div className="px-6 lg:px-10 pt-4 pb-[calc(var(--status-h)+24px)]">
        <div
          className={`grid gap-[var(--gutter)] ${
            showRails
              ? 'grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:grid-cols-[var(--left-w)_minmax(0,1fr)_var(--right-w)]'
              : 'grid-cols-1'
          }`}
        >
          {showRails && leftRail && (
            <aside className="hidden lg:block">
              <div className="relative sticky top-[var(--nav-h)] z-40 h-[calc(100vh-var(--nav-h)-var(--status-h))] overflow-hidden border-r border-green-500/20 pr-3">
                <button
                  aria-label={leftCollapsed ? 'Expand left rail' : 'Collapse left rail'}
                  onClick={() => setLeftCollapsed((prev) => !prev)}
                  className="absolute -right-3 top-3 h-8 w-8 rounded-full border border-green-500/30 bg-black/80 text-green-400 flex items-center justify-center shadow-lg hover:bg-green-500/10 transition"
                >
                  {leftCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <div className={`h-full overflow-y-auto transition-opacity ${leftCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  {cloneRail(leftRail, 'rail')}
                </div>
              </div>
            </aside>
          )}

          <div
            className={`min-w-0 ${
              showRails ? 'md:col-start-1 lg:col-start-auto' : ''
            }`}
          >
            <main className="max-w-[1100px] mx-auto w-full space-y-10">
              {children}
              {kernelDock && <div className="mt-4">{kernelDock}</div>}
            </main>
          </div>

          {showRails && rightRail && (
            <aside className="hidden md:block">
              <div className="relative sticky top-[var(--nav-h)] z-40 h-[calc(100vh-var(--nav-h)-var(--status-h))] overflow-hidden border-l border-green-500/20 pl-3">
                <button
                  aria-label={rightCollapsed ? 'Expand right rail' : 'Collapse right rail'}
                  onClick={() => setRightCollapsed((prev) => !prev)}
                  className="absolute -left-3 top-3 h-8 w-8 rounded-full border border-green-500/30 bg-black/80 text-green-400 flex items-center justify-center shadow-lg hover:bg-green-500/10 transition"
                >
                  {rightCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                <div className={`h-full overflow-y-auto space-y-4 transition-opacity ${rightCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  {cloneRail(rightRail)}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      {showRails && (
        <div className="fixed bottom-[calc(var(--status-h)+12px)] right-4 flex gap-2 z-[60] lg:hidden">
          {leftRail && (
            <Sheet open={leftDrawerOpen} onOpenChange={setLeftDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="font-mono text-xs border-green-500/50 text-green-400 bg-black/80 hover:bg-green-500/10"
                >
                  <PanelLeft className="w-4 h-4 mr-2" />
                  Hexdump
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="z-[60] bg-black text-green-300 border-r border-green-500/30 w-[90vw] sm:max-w-sm"
              >
                <div className="h-full overflow-y-auto p-2">
                  {cloneRail(leftRail, 'drawer')}
                </div>
              </SheetContent>
            </Sheet>
          )}

          {rightRail && (
            <Sheet open={rightDrawerOpen} onOpenChange={setRightDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="font-mono text-xs border-green-500/50 text-green-400 bg-black/80 hover:bg-green-500/10 md:hidden"
                >
                  <PanelRight className="w-4 h-4 mr-2" />
                  Console
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="z-[60] bg-black text-green-300 border-l border-green-500/30 w-[90vw] sm:max-w-sm"
              >
                <div className="h-full overflow-y-auto p-2">
                  {cloneRail(rightRail)}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      )}

      <div className="relative z-50">{statusBar}</div>
    </div>
  )
}
