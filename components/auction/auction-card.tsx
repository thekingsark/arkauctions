"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star } from "lucide-react"
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
    <div className="auction-card">
      <div style={{ position: "relative" }}>
        <Image
          src={auction.imageUrl || "/placeholder.svg"}
          alt={auction.title}
          width={400}
          height={200}
          className="auction-image"
        />
        <div className="auction-badge">{auction.category}</div>
        <div className="countdown-badge">
          <Countdown endTime={auction.endTime} />
        </div>
      </div>

      <div className="auction-content">
        <h3 className="auction-title">{auction.title}</h3>
        <p className="auction-description">{auction.description}</p>

        <div className="auction-price">
          <div>
            <div style={{ fontSize: "14px", color: "var(--secondary-color)", marginBottom: "4px" }}>Current bid</div>
            <div className="current-bid">
              {auction.currency} {auction.currentBid.toLocaleString()}
            </div>
          </div>
          <div className="bid-count">
            <Users size={16} />
            {auction.bidCount} bids
          </div>
        </div>

        <div className="seller-info">
          <div className="seller-rating">
            <Star size={16} />
            {auction.seller.rating}
          </div>
          <span>{auction.seller.name}</span>
        </div>

        <Link href={`/${lang}/auction/${auction.id}`}>
          <button className="bid-button">
            <Clock size={16} />
            Place Bid
          </button>
        </Link>
      </div>
    </div>
  )
}
