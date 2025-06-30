import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedAuctions } from "@/components/home/featured-auctions"
import { Categories } from "@/components/home/categories"
import { HowItWorks } from "@/components/home/how-it-works"

interface PageProps {
  params: {
    lang: string
  }
}

export default function Page({ params: { lang } }: PageProps) {
  return (
    <div className="min-h-screen">
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
