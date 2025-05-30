import { Search, Gavel, CreditCard, Package } from "lucide-react"

interface HowItWorksProps {
  lang: string
}

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

export function HowItWorks({ lang }: HowItWorksProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started with our auction marketplace is simple and secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <IconComponent className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
