"use client"
import Image from "next/image"
import useGlobalContext from "@/hooks/use-context"

const AppLogo = () => {
  const globalContext = useGlobalContext()
  const appName = globalContext.appSettings?.appName || "Marketplace Auctions"
  const logoUrl = globalContext.appSettings?.logoUrl || "/assets/logo.png"

  return (
    <div className="app-logo">
      <Image
        src={logoUrl || "/placeholder.svg"}
        alt={appName}
        width={120}
        height={40}
        priority
        className="logo-image"
      />
    </div>
  )
}

export default AppLogo
