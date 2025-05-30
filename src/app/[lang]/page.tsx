import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { languages } from "@/app/i18n/settings"
import { fetchCommonData } from "./common-fetch"
import { SESSION_COOKIE_NAME } from "@/constants"
import { cookies } from "next/headers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home-page/hero-section"
import { FeaturedAuctions } from "@/components/home-page/featured-auctions"
import { Categories } from "@/components/home-page/categories"
import { HowItWorks } from "@/components/home-page/how-it-works"

const getAuctions = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auction/latest`, {
      next: { revalidate: 0 },
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch categories: ${error}`)
    return []
  }
}

const getPromotedAuctions = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auction/filter/auctions`, {
      next: { revalidate: 100 },
      body: JSON.stringify({ promotedOnly: true, perPage: 6 }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch promoted auctions: ${error}`)
    return []
  }
}

const countActiveAuctions = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auction/filter/count`, {
      next: { revalidate: 0 },
      method: "POST",
      body: JSON.stringify({ active: true }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch categories: ${error}`)
    return 0
  }
}

const getRecommendations = async () => {
  const loadedCookies = await cookies()
  const session = loadedCookies.get(SESSION_COOKIE_NAME)?.value || ""
  if (!session) {
    return []
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auction-similarities`, {
      method: "POST",
      body: JSON.stringify({ page: 0, perPage: 8 }),
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Authorization: session,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      return []
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch recommendations: ${error}`)
    return []
  }
}

const getStartingSoonAuctions = async () => {
  const loadedCookies = await cookies()
  const session = loadedCookies.get(SESSION_COOKIE_NAME)?.value || ""
  if (!session) {
    return []
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auction/filter/auctions`, {
      method: "POST",
      body: JSON.stringify({ perPage: 6, started: false }),
      headers: {
        "Cache-Control": "no-store, max-age=0",
        Authorization: session,
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    })

    if (!response.ok) {
      return []
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch recommendations: ${error}`)
    return []
  }
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lang: lng }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params
  if (languages.indexOf(lang) < 0) notFound()

  const { settings } = await fetchCommonData(lang)

  return {
    title: settings.app_name || "Marketplace Auctions",
    description: settings.app_description || "Buy and sell items through auctions",
    keywords: settings.app_keywords || "auction, marketplace, buy, sell",
    openGraph: {
      title: settings.app_name || "Marketplace Auctions",
      description: settings.app_description || "Buy and sell items through auctions",
      images: [settings.app_logo || "/assets/logo.png"],
    },
  }
}

interface HomePageProps {
  params: {
    lang: string
  }
}

export default async function HomePage({ params: { lang } }: HomePageProps) {
  if (languages.indexOf(lang) < 0) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Header lang={lang} />

      <main>
        <HeroSection lang={lang} />
        <FeaturedAuctions lang={lang} />
        <Categories lang={lang} />
        <HowItWorks lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  )
}
