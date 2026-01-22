import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Reda – Solana Infra Engineer (Rust)",
  description: "Solana infra engineer focused on indexers, decoders, Geyser pipelines, and RPC tooling.",
  generator: "v0.app",
  openGraph: {
    title: "Reda – Solana Infra Engineer (Rust)",
    description: "Indexers, decoders, Geyser pipelines, and RPC tooling built for operators.",
    url: "https://reda.rs/",
    siteName: "reda.rs",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-[#030712] text-slate-100 min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
