import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuctionCard } from "@/components/auction-card"

interface FeaturedAuctionsProps {
  lang: string
}

export function FeaturedAuctions({ lang }: FeaturedAuctionsProps) {
  // Mock auction data
  const featuredAuctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      currentBid: 8500,
      currency: "USD",
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      image: "/placeholder.svg?height=300&width=400&text=Vintage+Watch",
      bidCount: 23,
      seller: "WatchCollector",
      isPromoted: true,
    },
    {
      id: 2,
      title: "Original iPhone (2007) - Sealed",
      currentBid: 2300,
      currency: "USD",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
      image: "/placeholder.svg?height=300&width=400&text=iPhone+2007",
      bidCount: 45,
      seller: "TechVintage",
      isPromoted: false,
    },
    {
      id: 3,
      title: "Picasso Lithograph - Authenticated",
      currentBid: 15000,
      currency: "USD",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      image: "/placeholder.svg?height=300&width=400&text=Picasso+Art",
      bidCount: 12,
      seller: "ArtDealer",
      isPromoted: true,
    },
    {
      id: 4,
      title: "1965 Ford Mustang - Restored",
      currentBid: 45000,
      currency: "USD",
      endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      image: "/placeholder.svg?height=300&width=400&text=Ford+Mustang",
      bidCount: 8,
      seller: "ClassicCars",
      isPromoted: false,
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Auctions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover exceptional items from trusted sellers around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} lang={lang} />
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${lang}/auctions`}>
            <Button variant="outline" size="lg">
              View All Auctions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
