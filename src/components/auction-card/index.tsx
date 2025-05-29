import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Clock, Users } from "lucide-react"
import { Countdown } from "@/components/common/countdown"

interface AuctionCardProps {
  auction: {
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
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
          <Heart className="h-4 w-4" />
        </Button>
        <Badge className="absolute top-2 left-2">{auction.category}</Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{auction.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{auction.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current bid</span>
            <span className="font-bold text-lg">
              {auction.currency} {auction.currentBid.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{auction.bidCount} bids</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <Countdown endTime={auction.endTime} />
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link href={`/${lang}/auction/${auction.id}`}>View Auction</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
