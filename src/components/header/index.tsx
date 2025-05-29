"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslation } from "@/app/i18n/client"
import useGlobalContext from "@/hooks/use-context"
import AppLogo from "@/components/common/app-logo"
import GlobalSearchInput from "./global-search-input"
import AccountButton from "./account-button"
import ChatButton from "./chat-button"
import FavouritesButton from "./favourites-button"
import NotificationsButton from "./notifications-button"
import CreateAuctionButton from "@/components/common/create-auction-button"
import MobileMenu from "./mobile-menu"

const Header = () => {
  const globalContext = useGlobalContext()
  const { t } = useTranslation(globalContext.currentLanguage)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="header-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-2 col-md-3 col-6">
            <div className="logo">
              <Link href={`/${globalContext.currentLanguage}`}>
                <AppLogo />
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 d-none d-md-block">
            <GlobalSearchInput />
          </div>

          <div className="col-lg-4 col-md-3 col-6">
            <div className="header-actions d-flex align-items-center justify-content-end">
              <CreateAuctionButton />
              <FavouritesButton />
              <ChatButton />
              <NotificationsButton />
              <AccountButton />

              <button className="mobile-menu-toggle d-md-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}

export default Header
