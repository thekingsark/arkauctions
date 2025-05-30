"use client"

import { Search, Heart, MessageCircle, Bell } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  lang: string
}

export function MobileMenu({ isOpen, onClose, lang }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search auctions..." className="pl-10" />
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <Link href={`/${lang}/auctions`} onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Browse Auctions
              </Button>
            </Link>
            <Link href={`/${lang}/sell`} onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Sell Item
              </Button>
            </Link>
            <Link href={`/${lang}/favorites`} onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Button>
            </Link>
            <Link href={`/${lang}/messages`} onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>
            <Link href={`/${lang}/notifications`} onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
