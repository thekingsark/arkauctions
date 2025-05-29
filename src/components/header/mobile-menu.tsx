"use client"

import { Search, Heart, MessageCircle, Bell, User, Home, Grid3X3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface MobileMenuProps {
  lang: string
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ lang, isOpen, onClose }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search auctions..." className="pl-10" />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/${lang}`} onClick={onClose}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/${lang}/auctions`} onClick={onClose}>
                <Grid3X3 className="mr-2 h-4 w-4" />
                Browse Auctions
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href={`/${lang}/create-auction`} onClick={onClose}>
                <Grid3X3 className="mr-2 h-4 w-4" />
                Create Auction
              </Link>
            </Button>
          </nav>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-2 pt-4 border-t">
            <Button className="w-full">Sign In</Button>
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
