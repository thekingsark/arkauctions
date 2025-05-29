"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/app/i18n/client"
import useGlobalContext from "@/hooks/use-context"
import AuctionCard from "@/components/auction-card"
import AuctionsSortByDropdown from "@/components/common/auctions-sort-by-dropdown"
import NoResults from "@/components/common/no-results"
import type { Auction } from "@/core/domain/auction"
import { auctionsController } from "@/core/controllers/auctions"

const AuctionsSection = () => {
  const globalContext = useGlobalContext()
  const { t } = useTranslation(globalContext.currentLanguage)
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadAuctions()
  }, [sortBy])

  const loadAuctions = async (pageNum = 1) => {
    try {
      setLoading(true)
      const response = await auctionsController.getAuctions({
        page: pageNum,
        limit: 20,
        sortBy,
        status: "active",
      })

      if (pageNum === 1) {
        setAuctions(response.data)
      } else {
        setAuctions((prev) => [...prev, ...response.data])
      }

      setHasMore(response.hasMore)
      setPage(pageNum)
    } catch (error) {
      console.error("Error loading auctions:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      loadAuctions(page + 1)
    }
  }

  return (
    <section className="auctions-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header d-flex justify-content-between align-items-center mb-4">
              <h2 className="section-title">{t("home.all_auctions")}</h2>
              <AuctionsSortByDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>

        {loading && page === 1 ? (
          <div className="row">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="auction-card-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-price"></div>
                    <div className="skeleton-info"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : auctions.length > 0 ? (
          <>
            <div className="row">
              {auctions.map((auction) => (
                <div key={auction.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <AuctionCard auction={auction} />
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="row">
                <div className="col-12 text-center">
                  <button className="btn btn-primary" onClick={loadMore} disabled={loading}>
                    {loading ? t("common.loading") : t("common.load_more")}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <NoResults title={t("auctions.no_auctions_found")} description={t("auctions.no_auctions_description")} />
        )}
      </div>
    </section>
  )
}

export default AuctionsSection
