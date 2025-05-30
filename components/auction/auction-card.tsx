import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/common/countdown"

interface Auction {
  id: string
  title: string
  description: string
  currentBid: number
  currency: string
  endTime: Date
  imageUrl: string
  seller: {
    name: string
    rating: number
    verified: boolean
  }
  bidCount: number
  category: string
}

interface AuctionCardProps {
  auction: Auction
  lang: string
}

export function AuctionCard({ auction, lang }: AuctionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={auction.imageUrl || "/placeholder.svg"}
          alt={auction.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2">{auction.category}</Badge>
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          <Countdown endTime={auction.endTime} />
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{auction.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{auction.description}</p>

        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Current bid</p>
            <p className="text-xl font-bold text-primary">
              {auction.currency} {auction.currentBid.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Users className="h-4 w-4 mr-1" />
              {auction.bidCount} bids
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
          <span className="mr-2">{auction.seller.rating}</span>
          <span>{auction.seller.name}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/${lang}/auction/${auction.id}`} className="w-full">
          <Button className="w-full">
            <Clock className="h-4 w-4 mr-2" />
            Place Bid
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
