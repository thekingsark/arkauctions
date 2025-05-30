"use client"

import Link from "next/link"
import { Search, Heart, MessageCircle, Bell, User } from "lucide-react"

interface HeaderProps {
  lang: string
}

export function Header({ lang }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link href={`/${lang}`} className="logo">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
            </svg>
          </div>
          Marketplace Auctions
        </Link>

        {/* Search */}
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input type="text" placeholder="Search for anything..." className="search-input" />
        </div>

        {/* Navigation */}
        <div className="nav-actions">
          <Link href={`/${lang}/auctions`} className="nav-button">
            Browse Auctions
          </Link>
          <Link href={`/${lang}/sell`} className="nav-button primary">
            Sell
          </Link>

          <button className="icon-button">
            <Heart size={20} />
          </button>
          <button className="icon-button">
            <MessageCircle size={20} />
          </button>
          <button className="icon-button">
            <Bell size={20} />
          </button>
          <button className="icon-button">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
