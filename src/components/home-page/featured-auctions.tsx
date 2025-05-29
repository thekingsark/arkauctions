import { AuctionCard } from "@/components/auction-card"

interface FeaturedAuctionsProps {
  lang: string
}

// Mock auction data
const mockAuctions = [
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
    title: "Original Picasso Sketch",
    description: "Authenticated original sketch by Pablo Picasso",
    currentBid: 50000,
    currency: "USD",
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    imageUrl: "/placeholder.svg?height=300&width=400&text=Picasso+Sketch",
    seller: {
      name: "ArtDealer",
      rating: 5.0,
      verified: true,
    },
    bidCount: 45,
    category: "Art",
  },
  {
    id: "3",
    title: "Rare Pokemon Cards Set",
    description: "Complete first edition Pokemon card set in mint condition",
    currentBid: 8500,
    currency: "USD",
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    imageUrl: "/placeholder.svg?height=300&width=400&text=Pokemon+Cards",
    seller: {
      name: "CardMaster",
      rating: 4.8,
      verified: true,
    },
    bidCount: 67,
    category: "Collectibles",
  },
]

export function FeaturedAuctions({ lang }: FeaturedAuctionsProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Auctions</h2>
          <p className="text-muted-foreground text-lg">Don't miss these exciting auctions ending soon</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}
