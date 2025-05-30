import Link from "next/link"

interface FooterProps {
  lang: string
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Marketplace Auctions</h3>
          <p style={{ color: "#94a3b8", marginBottom: "16px" }}>
            The world's leading marketplace for online auctions. Buy and sell unique items with confidence.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href={`/${lang}/auctions`}>Browse Auctions</Link>
            </li>
            <li>
              <Link href={`/${lang}/sell`}>Sell Item</Link>
            </li>
            <li>
              <Link href={`/${lang}/how-it-works`}>How It Works</Link>
            </li>
            <li>
              <Link href={`/${lang}/categories`}>Categories</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>
              <Link href={`/${lang}/help`}>Help Center</Link>
            </li>
            <li>
              <Link href={`/${lang}/contact`}>Contact Us</Link>
            </li>
            <li>
              <Link href={`/${lang}/safety`}>Safety Tips</Link>
            </li>
            <li>
              <Link href={`/${lang}/faq`}>FAQ</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link href={`/${lang}/terms`}>Terms of Service</Link>
            </li>
            <li>
              <Link href={`/${lang}/privacy`}>Privacy Policy</Link>
            </li>
            <li>
              <Link href={`/${lang}/cookies`}>Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Marketplace Auctions. All rights reserved.</p>
      </div>
    </footer>
  )
}
