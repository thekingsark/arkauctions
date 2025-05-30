import { Search } from "lucide-react"

interface HeroSectionProps {
  lang: string
}

export function HeroSection({ lang }: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container">
        <h1 className="hero-title">Discover Unique Items at Auction</h1>
        <p className="hero-subtitle">
          Join millions of buyers and sellers in the world's most trusted marketplace for online auctions.
        </p>

        <div className="hero-search">
          <Search className="search-icon" size={24} />
          <input type="text" placeholder="Search for anything..." />
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">10M+</div>
            <div className="hero-stat-label">Items Sold</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">2M+</div>
            <div className="hero-stat-label">Active Users</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">99.9%</div>
            <div className="hero-stat-label">Safe Transactions</div>
          </div>
        </div>
      </div>
    </section>
  )
}
