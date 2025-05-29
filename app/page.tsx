import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Gavel, Heart, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function HomePage() {
  const featuredAuctions = [
    {
      id: 1,
      title: "Vintage Rolex Submariner",
      currentBid: 15000,
      timeLeft: "2h 34m",
      bids: 23,
      image: "/placeholder-fxe5g.png",
      category: "Watches",
    },
    {
      id: 2,
      title: "1965 Ford Mustang Classic",
      currentBid: 45000,
      timeLeft: "1d 12h",
      bids: 67,
      image: "/1965-ford-mustang.png",
      category: "Vehicles",
    },
    {
      id: 3,
      title: "Original Picasso Sketch",
      currentBid: 125000,
      timeLeft: "3d 8h",
      bids: 156,
      image: "/picasso-style-sketch.png",
      category: "Art",
    },
    {
      id: 4,
      title: "Rare Pokemon Card Collection",
      currentBid: 8500,
      timeLeft: "5h 22m",
      bids: 89,
      image: "/rare-pokemon-cards.png",
      category: "Collectibles",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Gavel className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">AuctionHub</span>
              </Link>
            </div>
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search auctions..." className="pl-10" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Watchlist
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button size="sm">Sell Item</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Unique Treasures</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bid on rare collectibles, vintage items, and exclusive pieces from around the world
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Start Bidding
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Browse Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Art", "Watches", "Vehicles", "Collectibles", "Jewelry", "Electronics"].map((category) => (
              <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Auctions</h2>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={auction.image || "/placeholder.svg"}
                    alt={auction.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2">{auction.category}</Badge>
                  <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{auction.title}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {auction.timeLeft} left
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current bid</p>
                      <p className="text-2xl font-bold">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Bids</p>
                      <p className="text-lg font-semibold">{auction.bids}</p>
                    </div>
                  </div>
                  <Button className="w-full">Place Bid</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Browse & Discover</h3>
              <p className="text-muted-foreground">Explore thousands of unique items across various categories</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gavel className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Place Your Bid</h3>
              <p className="text-muted-foreground">Bid on items you love and track your auctions in real-time</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Win & Enjoy</h3>
              <p className="text-muted-foreground">Win amazing items and have them delivered safely to your door</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Gavel className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">AuctionHub</span>
              </div>
              <p className="text-muted-foreground">The world's leading marketplace for unique and rare items.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Art & Antiques
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Collectibles
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Jewelry & Watches
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Vehicles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Buyer Protection
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Seller Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AuctionHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
