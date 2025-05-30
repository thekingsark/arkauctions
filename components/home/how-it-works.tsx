import { Search, Gavel, CreditCard, Package } from "lucide-react"

interface HowItWorksProps {
  lang: string
}

export function HowItWorks({ lang }: HowItWorksProps) {
  const steps = [
    {
      icon: Search,
      title: "Find Items",
      description: "Browse thousands of unique items or search for something specific",
    },
    {
      icon: Gavel,
      title: "Place Bids",
      description: "Bid on items you love and watch the auction unfold in real-time",
    },
    {
      icon: CreditCard,
      title: "Win & Pay",
      description: "Win the auction and complete your purchase securely",
    },
    {
      icon: Package,
      title: "Receive Items",
      description: "Get your items delivered safely to your doorstep",
    },
  ]

  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "16px" }}>How It Works</h2>
          <p style={{ color: "var(--secondary-color)", maxWidth: "600px", margin: "0 auto" }}>
            Getting started with our auction platform is simple and secure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center" style={{ padding: "24px" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    margin: "0 auto 24px",
                    background: "var(--primary-color)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <IconComponent size={32} />
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>{step.title}</h3>
                <p style={{ color: "var(--secondary-color)", lineHeight: "1.6" }}>{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
