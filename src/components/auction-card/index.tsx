import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Countdown } from "@/components/common/countdown"

interface Auction {
  id: number
  title: string
  currentBid: number
  currency: string
  endTime: Date
  image: string
  bidCount: number
  seller: string
  isPromoted?: boolean
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
          src={auction.image || "/placeholder.svg"}
          alt={auction.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        {auction.isPromoted && (
          <Badge className="absolute top-2 left-2" variant="secondary">
            Featured
          </Badge>
        )}
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
          <Countdown endTime={auction.endTime} />
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{auction.title}</h3>

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
          <span className="mr-2">4.8</span>
          <span>{auction.seller}</span>
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
