import { Card, CardContent } from "@/components/ui/card"
import { Search, Gavel, CreditCard, Package } from "lucide-react"

interface HowItWorksProps {
  lang: string
}

const steps = [
  {
    icon: Search,
    title: "Browse & Discover",
    description: "Search through thousands of unique auctions and find items you love",
  },
  {
    icon: Gavel,
    title: "Place Your Bid",
    description: "Bid on items you want and track your auctions in real-time",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay securely when you win with our trusted payment system",
  },
  {
    icon: Package,
    title: "Receive Your Item",
    description: "Get your items shipped directly to your door with tracking",
  },
]

export function HowItWorks({ lang }: HowItWorksProps) {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Start bidding in just a few simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
