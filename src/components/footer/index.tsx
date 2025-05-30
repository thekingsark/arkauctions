import Link from "next/link"
import { AppLogo } from "@/components/common/app-logo"

interface FooterProps {
  lang: string
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <AppLogo />
            <p className="text-sm text-muted-foreground">
              The world's leading marketplace for online auctions. Buy and sell unique items with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/auctions`} className="text-muted-foreground hover:text-foreground">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/sell`} className="text-muted-foreground hover:text-foreground">
                  Sell Item
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/how-it-works`} className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/categories`} className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/help`} className="text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/safety`} className="text-muted-foreground hover:text-foreground">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/faq`} className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${lang}/terms`} className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy`} className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/cookies`} className="text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Marketplace Auctions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
