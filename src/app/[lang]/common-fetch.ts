export const getCategories = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`, {
      next: { revalidate: 60 },
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch categories: ${error}`)
    return []
  }
}

export const getCurrencies = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/currency`, {
      next: { revalidate: 3600 },
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch currencies: ${error}`)
    return []
  }
}

export const getPaymentProducts = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/web-payment-product`, {
      next: { revalidate: 3600 },
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch payment products: ${error}`)
    return []
  }
}

export const getExchangeRates = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/exchange-rate`, {
      // Revalidate every 15 minutes
      next: { revalidate: 900 },
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch exchange rates: ${error}`)
    return []
  }
}

export const getAvailablePayments = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/available-payments`, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch available payments: ${error}`)
    return []
  }
}

export const getSettings = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/settings`, {
      next: { revalidate: 100 },
      method: "GET",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }

    return response.json()
  } catch (error) {
    console.error(`Failed to fetch settings: ${error}`)
    return []
  }
}

export async function fetchCommonData(lang: string) {
  // Mock data for now - replace with actual API calls
  return {
    settings: {
      app_name: "Marketplace Auctions",
      app_description: "Buy and sell items through online auctions",
      app_keywords: "auction, marketplace, buy, sell, bidding",
      app_logo: "/assets/logo.png",
    },
    categories: [
      { id: 1, name: "Electronics", icon: "smartphone", count: 150 },
      { id: 2, name: "Fashion", icon: "shirt", count: 89 },
      { id: 3, name: "Home & Garden", icon: "home", count: 67 },
      { id: 4, name: "Sports", icon: "dumbbell", count: 45 },
      { id: 5, name: "Books", icon: "book", count: 123 },
      { id: 6, name: "Art", icon: "palette", count: 34 },
    ],
    currencies: [
      { code: "USD", symbol: "$", name: "US Dollar" },
      { code: "EUR", symbol: "€", name: "Euro" },
      { code: "GBP", symbol: "£", name: "British Pound" },
    ],
  }
}
