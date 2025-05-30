import { Gavel } from "lucide-react"

export function AppLogo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Gavel className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl">AuctionHub</span>
    </div>
  )
}
