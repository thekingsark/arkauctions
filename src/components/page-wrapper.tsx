"use client"

import type React from "react"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return <div className="app-wrapper">{children}</div>
}

export default PageWrapper
