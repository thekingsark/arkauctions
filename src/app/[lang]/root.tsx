"use client"

import { useEffect } from "react"
import { useTranslation } from "@/app/i18n/client"
import useGlobalContext from "@/hooks/use-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AuctionsSection from "@/components/home-page/auctions-section"
import CategoriesSection from "@/components/home-page/categories"
import PromotedAuctions from "@/components/home-page/promoted-auctions"
import RecommendedAuctions from "@/components/home-page/recommended-auctions"
import StartingSoonAuctions from "@/components/home-page/starting-soon-auctions"
import LastSeenAuctions from "@/components/home-page/last-seen-auctions"
import Preloader from "@/components/common/preloader"

interface RootComponentProps {
  lang: string
  settings: Record<string, unknown>
  categories: Record<string, unknown>[]
  currencies: Record<string, unknown>[]
  exchangeRate: Record<string, unknown>
  paymentProducts: Record<string, unknown>[]
  availablePayments: string[]
}

export default function RootComponent({
  lang,
  settings,
  categories,
  currencies,
  exchangeRate,
  paymentProducts,
  availablePayments,
}: RootComponentProps) {
  const { t } = useTranslation(lang)
  const globalContext = useGlobalContext()

  useEffect(() => {
    // Initialize app data
    globalContext.setCurrentLanguage(lang)
  }, [lang, globalContext])

  return (
    <>
      <Preloader />
      <Header />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-content text-center">
                  <h1 className="hero-title">{t("home.welcome_title")}</h1>
                  <p className="hero-subtitle">{t("home.welcome_subtitle")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Promoted Auctions */}
        <PromotedAuctions />

        {/* Starting Soon Auctions */}
        <StartingSoonAuctions />

        {/* Recommended Auctions */}
        <RecommendedAuctions />

        {/* All Auctions */}
        <AuctionsSection />

        {/* Last Seen Auctions */}
        <LastSeenAuctions />
      </main>

      <Footer />
    </>
  )
}
