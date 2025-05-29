import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketplace Auctions",
  description: "Buy and sell items through online auctions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


import './globals.css'