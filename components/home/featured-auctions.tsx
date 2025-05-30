import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuctionCard } from "@/components/auction/auction-card"

interface FeaturedAuctionsProps {
  lang: string
}

export function FeaturedAuctions({ lang }: FeaturedAuctionsProps) {
  // Mock auction data
  const featuredAuctions = [
    {
      id: "1",
      title: "Vintage Rolex Submariner",
      description: "Rare 1960s Rolex Submariner in excellent condition",
      currentBid: 15000,
      currency: "USD",
      endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      imageUrl: "/placeholder.svg?height=300&width=400&text=Vintage+Watch",
      seller: {
        name: "WatchCollector",
        rating: 4.9,
        verified: true,
      },
      bidCount: 23,
      category: "Collectibles",
    },
    {
      id: "2",
      title: "Original iPhone (2007) - Sealed",
      description: "First generation iPhone in original packaging",
      currentBid: 2300,
      currency: "USD",
      endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
      imageUrl: "/placeholder.svg?height=300&width=400&text=iPhone+2007",
      seller: {
        name: "TechVintage",
        rating: 4.8,
        verified: true,
      },
      bidCount: 45,
      category: "Electronics",
    },
    {
      id: "3",
      title: "Picasso Lithograph - Authenticated",
      description: "Original Picasso lithograph with certificate",
      currentBid: 50000,
      currency: "USD",
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      imageUrl: "/placeholder.svg?height=300&width=400&text=Picasso+Art",
      seller: {
        name: "ArtDealer",
        rating: 5.0,
        verified: true,
      },
      bidCount: 12,
      category: "Art",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
