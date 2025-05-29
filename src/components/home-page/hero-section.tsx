import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  lang: string
}

export function HeroSection({ lang }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">Discover Unique Auctions</h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Bid on rare collectibles, art, electronics, and more from sellers worldwide
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search for auctions..." className="pl-10 h-12 text-black" />
              <Button className="absolute right-1 top-1 h-10">Search</Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={`/${lang}/auctions`}>Browse Auctions</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href={`/${lang}/create-auction`}>Start Selling</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
