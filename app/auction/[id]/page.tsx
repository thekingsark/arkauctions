import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Clock, Gavel, Heart, Share, User } from "lucide-react"

export default function AuctionDetailPage() {
  const auction = {
    id: 1,
    title: "Vintage Rolex Submariner 1960s",
    description:
      "A rare and authentic Rolex Submariner from the 1960s in excellent condition. This timepiece features the original dial, hands, and case. A true collector's item with documented provenance.",
    currentBid: 15000,
    startingBid: 8000,
    timeLeft: "2h 34m 12s",
    bids: 23,
    watchers: 156,
    images: [
      "/placeholder-wiqsd.png",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    seller: {
      name: "WatchCollector123",
      rating: 4.9,
      reviews: 234,
    },
    category: "Watches",
    condition: "Excellent",
    shipping: "Free worldwide shipping",
  }

  const bidHistory = [
    { bidder: "User***45", amount: 15000, time: "2 minutes ago" },
    { bidder: "Watch***er", amount: 14500, time: "15 minutes ago" },
    { bidder: "Collector***", amount: 14000, time: "32 minutes ago" },
    { bidder: "Time***ce", amount: 13500, time: "1 hour ago" },
    { bidder: "Vintage***", amount: 13000, time: "1 hour ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Gavel className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">AuctionHub</span>
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="aspect-square mb-4">
                <img
                  src={auction.images[0] || "/placeholder.svg"}
                  alt={auction.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {auction.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${auction.title} ${index + 1}`}
                    className="aspect-square object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Item Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{auction.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <Badge>{auction.category}</Badge>
                      <span>Condition: {auction.condition}</span>
                      <span>{auction.shipping}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="outline">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{auction.description}</p>
              </CardContent>
            </Card>

            {/* Seller Information */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{auction.seller.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {auction.seller.rating} ★ ({auction.seller.reviews} reviews)
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Panel */}
          <div className="space-y-6">
            {/* Current Bid */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Bid</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {auction.timeLeft}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">${auction.currentBid.toLocaleString()}</div>
                <div className="flex justify-between text-sm text-muted-foreground mb-6">
                  <span>{auction.bids} bids</span>
                  <span>{auction.watchers} watching</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your bid</label>
                    <Input
                      type="number"
                      placeholder={`$${(auction.currentBid + 100).toLocaleString()}`}
                      className="text-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum bid: ${(auction.currentBid + 100).toLocaleString()}
                    </p>
                  </div>

                  <Button className="w-full" size="lg">
                    Place Bid
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Quick Bid +$100
                    </Button>
                    <Button variant="outline" size="sm">
                      Quick Bid +$500
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardHeader>
                <CardTitle>Bid History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bidHistory.map((bid, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{bid.bidder}</span>
                        <span className="font-bold">${bid.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{bid.time}</p>
                      {index < bidHistory.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Auction Details */}
            <Card>
              <CardHeader>
                <CardTitle>Auction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Starting bid:</span>
                  <span>${auction.startingBid.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time left:</span>
                  <span>{auction.timeLeft}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping:</span>
                  <span>{auction.shipping}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Returns:</span>
                  <span>30-day returns</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
