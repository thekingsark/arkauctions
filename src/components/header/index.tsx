"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, Heart, MessageCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppLogo } from "@/components/common/app-logo"
import { MobileMenu } from "./mobile-menu"
import { UserMenu } from "./user-menu"

interface HeaderProps {
  lang: string
}

export function Header({ lang }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link href={`/${lang}`}>
            <AppLogo />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search auctions..." className="pl-10 pr-4" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link href={`/${lang}/auctions`}>
            <Button variant="ghost">Browse Auctions</Button>
          </Link>
          <Link href={`/${lang}/sell`}>
            <Button variant="ghost">Sell</Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <UserMenu lang={lang} />
        </nav>

        {/* Mobile User Menu */}
        <div className="md:hidden">
          <UserMenu lang={lang} />
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} lang={lang} />
    </header>
  )
}
