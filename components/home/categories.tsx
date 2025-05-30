import Link from "next/link"
import { Smartphone, Shirt, Home, Dumbbell, Book, Palette, Car, Music } from "lucide-react"

interface CategoriesProps {
  lang: string
}

const categories = [
  { id: "electronics", name: "Electronics", icon: Smartphone, count: 1250 },
  { id: "fashion", name: "Fashion", icon: Shirt, count: 890 },
  { id: "home", name: "Home & Garden", icon: Home, count: 670 },
  { id: "sports", name: "Sports", icon: Dumbbell, count: 450 },
  { id: "books", name: "Books", icon: Book, count: 1230 },
  { id: "art", name: "Art", icon: Palette, count: 340 },
  { id: "automotive", name: "Automotive", icon: Car, count: 280 },
  { id: "music", name: "Music", icon: Music, count: 520 },
]

export function Categories({ lang }: CategoriesProps) {
  return (
    <section className="section" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 style={{ fontSize: "36px", fontWeight: "700", marginBottom: "16px" }}>Browse by Category</h2>
          <p style={{ color: "var(--secondary-color)" }}>
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/${lang}/category/${category.id}`}>
                <div className="category-card">
                  <div className="category-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="category-name">{category.name}</div>
                  <div className="category-count">{category.count} items</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
