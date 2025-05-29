export const SESSION_COOKIE_NAME = "auction_session"

export const AUCTION_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  ENDED: "ended",
  CANCELLED: "cancelled",
} as const

export const BID_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const

export const CATEGORIES = [
  { id: 1, name: "Electronics", icon: "smartphone" },
  { id: 2, name: "Fashion", icon: "shirt" },
  { id: 3, name: "Home & Garden", icon: "home" },
  { id: 4, name: "Sports", icon: "trophy" },
  { id: 5, name: "Collectibles", icon: "gem" },
  { id: 6, name: "Art", icon: "palette" },
  { id: 7, name: "Vehicles", icon: "car" },
  { id: 8, name: "Books", icon: "book" },
]

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
]
