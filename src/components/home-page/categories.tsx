import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { CATEGORIES } from "@/constants"
import { Smartphone, Shirt, Home, Trophy, Gem, Palette, Car, Book } from "lucide-react"

interface CategoriesProps {
  lang: string
}

const iconMap = {
  smartphone: Smartphone,
  shirt: Shirt,
  home: Home,
  trophy: Trophy,
  gem: Gem,
  palette: Palette,
  car: Car,
  book: Book,
}

export function Categories({ lang }: CategoriesProps) {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse Categories</h2>
          <p className="text-muted-foreground text-lg">Find auctions in your favorite categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <Link key={category.id} href={`/${lang}/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Icon className="h-8 w-8 mb-3 text-primary" />
                    <h3 className="font-semibold">{category.name}</h3>
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
