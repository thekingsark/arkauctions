"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTranslation } from "@/app/i18n/client"
import useGlobalContext from "@/hooks/use-context"
import type { Auction } from "@/core/domain/auction"
import AssetsCarousel from "./assets-carousel"
import CardStatus from "./card-status"
import BidsCountLabel from "./bids-count-label"
import PromotedLabel from "./promoted-label"
import PlayVideoButton from "./play-video-button"
import LoveButton from "@/components/common/love-button"
import PriceText from "@/components/common/price-text"
import Countdown from "@/components/common/countdown"
import FormattedDate from "@/components/common/formatted-date"

interface AuctionCardProps {
  auction: Auction
  showLocation?: boolean
  showSeller?: boolean
}

const AuctionCard: React.FC<AuctionCardProps> = ({ auction, showLocation = true, showSeller = true }) => {
  const globalContext = useGlobalContext()
  const { t } = useTranslation(globalContext.currentLanguage)

  const auctionUrl = `/${globalContext.currentLanguage}/auction/${auction.id}`

  return (
    <div className="auction-card">
      <div className="auction-card-inner">
        {/* Image/Video Section */}
        <div className="auction-card-media">
          <Link href={auctionUrl}>
            <AssetsCarousel assets={auction.assets} />
          </Link>

          {auction.hasVideo && <PlayVideoButton />}
          {auction.isPromoted && <PromotedLabel />}

          <div className="auction-card-actions">
            <LoveButton auctionId={auction.id} />
          </div>

          <CardStatus status={auction.status} />
        </div>

        {/* Content Section */}
        <div className="auction-card-content">
          <div className="auction-card-header">
            <h3 className="auction-title">
              <Link href={auctionUrl}>{auction.title}</Link>
            </h3>

            {showSeller && auction.seller && (
              <div className="seller-info">
                <Link href={`/${globalContext.currentLanguage}/account/${auction.seller.id}`}>
                  <Image
                    src={auction.seller.avatar || "/assets/img/default-avatar.png"}
                    alt={auction.seller.name}
                    width={24}
                    height={24}
                    className="seller-avatar"
                  />
                  <span className="seller-name">{auction.seller.name}</span>
                </Link>
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="auction-price">
            <div className="current-price">
              <span className="price-label">{t("auction.current_bid")}</span>
              <PriceText amount={auction.currentBid || auction.startingPrice} currency={auction.currency} />
            </div>

            {auction.buyNowPrice && (
              <div className="buy-now-price">
                <span className="price-label">{t("auction.buy_now")}</span>
                <PriceText amount={auction.buyNowPrice} currency={auction.currency} />
              </div>
            )}
          </div>

          {/* Auction Info */}
          <div className="auction-info">
            <BidsCountLabel count={auction.bidsCount} />

            {showLocation && auction.location && (
              <div className="auction-location">
                <i className="icon-location"></i>
                <span>{auction.location.name}</span>
              </div>
            )}
          </div>

          {/* Time Section */}
          <div className="auction-time">
            {auction.status === "active" && auction.endDate && (
              <div className="time-remaining">
                <span className="time-label">{t("auction.ends_in")}</span>
                <Countdown endDate={auction.endDate} />
              </div>
            )}

            {auction.status === "upcoming" && auction.startDate && (
              <div className="time-remaining">
                <span className="time-label">{t("auction.starts_in")}</span>
                <Countdown endDate={auction.startDate} />
              </div>
            )}

            {auction.status === "ended" && auction.endDate && (
              <div className="ended-time">
                <span className="time-label">{t("auction.ended_on")}</span>
                <FormattedDate date={auction.endDate} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionCard
