import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import ProductCard from "./product-card";


const categories = ['All', 'Men', 'Women', 'Kids', 'Sale'];

const products = [
    {
        id: 1,
        name: 'Air Max Revolution',
        price: 129.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
        category: 'Men',
        isOnSale: true,
        rating: 4.8,
        colors: ['Black', 'White', 'Red']
    },
    {
        id: 2,
        name: 'Classic Runner',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center',
        category: 'Women',
        isOnSale: false,
        rating: 4.6,
        colors: ['Pink', 'Blue', 'Gray']
    },
    {
        id: 3,
        name: 'Urban Sneaker',
        price: 109.99,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center',
        category: 'Men',
        isOnSale: false,
        rating: 4.7,
        colors: ['Black', 'White']
    },
    {
        id: 4,
        name: 'Kids Play',
        price: 59.99,
        originalPrice: 79.99,
        image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center',
        category: 'Kids',
        isOnSale: true,
        rating: 4.9,
        colors: ['Red', 'Blue', 'Yellow']
    },
    {
        id: 5,
        name: 'Elegant Loafer',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1582897085656-c636e909c2d4?w=400&h=400&fit=crop&crop=center',
        category: 'Men',
        isOnSale: false,
        rating: 4.5,
        colors: ['Brown', 'Black']
    },
    {
        id: 6,
        name: 'Sport Elite',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=400&fit=crop&crop=center',
        category: 'Women',
        isOnSale: true,
        rating: 4.8,
        colors: ['White', 'Pink', 'Black']
    },
    {
        id: 7,
        name: 'Casual Canvas',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1520256862855-398228c41684?w=400&h=400&fit=crop&crop=center',
        category: 'Women',
        isOnSale: false,
        rating: 4.4,
        colors: ['White', 'Navy', 'Red']
    },
        {
        id: 8,
        name: 'Perfomance Pro',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center',
        category: 'Men',
        isOnSale: false,
        rating: 4.9,
        colors: ['Black', 'Gray', 'Blue']
    },
]


const ProductGrid = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? products
        : activeCategory === 'Sale'
        ? products.filter(product => product.isOnSale)
        : products.filter(product => product.category === activeCategory);


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
