import { AuctionCard } from "@/components/auction/auction-card"

interface FeaturedAuctionsProps {
  lang: string
}

export function FeaturedAuctions({ lang }: FeaturedAuctionsProps) {
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
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "16px" }}>Featured Auctions</h2>
          <p style={{ color: "var(--secondary-color)", maxWidth: "600px", margin: "0 auto" }}>
            Discover exceptional items from trusted sellers around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} lang={lang} />
          ))}
        </div>

        <div className="text-center" style={{ marginTop: "40px" }}>
          <a href={`/${lang}/auctions`} className="nav-button primary">
            View All Auctions
          </a>
        </div>
      </div>
    </section>
  )
}
