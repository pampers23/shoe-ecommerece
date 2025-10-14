import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import ProductCard from "./product-card"
import { useQuery } from "@tanstack/react-query"
import { getProductsShoes } from "@/actions/private"
import { Tailspin } from "ldrs/react"
import type { Product } from "@/type"

const categories = ['All', 'Men', 'Women', 'Kids'];

function ProductGrid() {
    const { data, isPending } = useQuery<Product[]>({
        queryKey: ['products-shoes'],
        queryFn: getProductsShoes
    })

    const [activeCategory, setActiveCategory] = useState('All') 

    if (isPending) {
        return (
            <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
                <p className="text-sm text-muted-foreground animate-pulse">Loading products...</p>
                <Tailspin size="30" stroke="3" speed="0.9" color="#262E40" />
            </div>
        )
    }

    const filteredProducts = activeCategory === 'All'
        ? data ?? []
        : (data ?? []).filter(product => product.category === activeCategory)

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-2">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our curated selection of premium footwear designed for style,
                        comfort and performance.
                    </p>
                </div>

                {/* category filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "outline"}
                            onClick={() => setActiveCategory(category)}
                            className="transition-all duration-200"
                        >
                            {category}
                            {category === 'Sale' && (
                                <Badge variant="destructive" className="ml-2 h-4 px-1 text-xs">
                                    Hot
                                </Badge>
                            )}
                        </Button>
                    ))}
                </div>

                {/* products grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* load button */}
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg">Load more Products</Button>
                </div>
            </div>
        </section>
    )
}

export default ProductGrid
