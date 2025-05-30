import Link from "next/link"
import { Smartphone, Shirt, Home, Dumbbell, Book, Palette, Car, Music } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CategoriesProps {
  lang: string
}

const categories = [
  { id: 1, name: "Electronics", icon: Smartphone, count: 1250 },
  { id: 2, name: "Fashion", icon: Shirt, count: 890 },
  { id: 3, name: "Home & Garden", icon: Home, count: 670 },
  { id: 4, name: "Sports", icon: Dumbbell, count: 450 },
  { id: 5, name: "Books", icon: Book, count: 1230 },
  { id: 6, name: "Art", icon: Palette, count: 340 },
  { id: 7, name: "Automotive", icon: Car, count: 280 },
  { id: 8, name: "Music", icon: Music, count: 520 },
]

export function Categories({ lang }: CategoriesProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground">Find exactly what you're looking for in our organized categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/${lang}/category/${category.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
