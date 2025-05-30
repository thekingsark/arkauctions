import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Marketplace Auctions",
  description: "Buy and sell items through online auctions",
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
