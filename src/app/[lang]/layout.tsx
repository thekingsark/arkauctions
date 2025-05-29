import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../css/globals.css"
import "../scss/index.scss"
import BootstrapClient from "@/components/common/bootstrap-client"
import NotificationsSW from "@/components/notifications-sw"
import { PageWrapper } from "@/components/page-wrapper"
import { languages } from "@/app/i18n/settings"
import { notFound } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marketplace Auctions",
  description: "Buy and sell items through online auctions",
  keywords: "auction, marketplace, buy, sell, bidding",
  authors: [{ name: "Marketplace Auctions" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }))
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { lang } = params

  if (languages.indexOf(lang) < 0) notFound()

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <PageWrapper>{children}</PageWrapper>
        <BootstrapClient />
        <NotificationsSW />
      </body>
    </html>
  )
}
