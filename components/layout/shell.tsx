'use client'

import { ReactNode } from 'react'

interface ShellProps {
  children: ReactNode
  sidebar?: ReactNode
}

/**
 * Shell layout component for wide-screen awareness.
 * - On lg+: 2-column grid with sidebar rail (88px) + fluid main content
 * - Container widens progressively: lg=1200px, xl=1440px, 2xl=1600px
 * - On mobile/tablet: single column, sidebar hidden
 */
export function Shell({ children, sidebar }: ShellProps) {
  return (
    <div className="w-full">
      {/* Wide-screen aware container */}
      <div className="
        w-full mx-auto px-4 
        md:px-6 
        lg:max-w-[1200px] lg:px-8
        xl:max-w-[1440px]
        2xl:max-w-[1600px]
      ">
        {/* Grid layout: sidebar + main content */}
        <div className="
          lg:grid lg:grid-cols-[88px_minmax(0,1fr)] lg:gap-6
          xl:gap-8
        ">
          {/* Sidebar column - desktop only */}
          {sidebar && (
            <aside className="hidden lg:block relative">
              <div className="sticky top-0 pt-20 pb-8">
                {sidebar}
              </div>
            </aside>
          )}
          
          {/* Main content column */}
          <main className="min-w-0 pb-24">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

/**
 * Section container for consistent spacing within Shell.
 * Allows sections to fill the available width.
 */
export function SectionContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  )
}
