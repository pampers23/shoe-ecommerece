import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { UseCarts } from '@/hooks/use-carts';
import { toast } from "sonner"
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isOnSale?: boolean;
  rating: number;
  colors: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addItem } = UseCarts();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor
    });
    
    toast(
      <>
        <div className="font-semibold">Add to cart</div>
        <div>{`${product.name} in ${selectedColor} has been added to your cart.`}</div>
      </>
    )  
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        {product.isOnSale && (
          <Badge className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600">
            -{discountPercentage}%
          </Badge>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 z-10 transition-colors ${
            isLiked ? 'text-red-500' : 'text-gray-400'
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        </Button>

        <div className="aspect-square flex items-center justify-center text-8xl p-8 group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Colors:</p>
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color ? 'border-primary scale-110' : 'border-gray-300'
                }`}
                style={{
                  backgroundColor: color.toLowerCase() === 'white' ? '#f8fafc' : 
                                 color.toLowerCase() === 'black' ? '#0f172a' :
                                 color.toLowerCase() === 'red' ? '#ef4444' :
                                 color.toLowerCase() === 'blue' ? '#3b82f6' :
                                 color.toLowerCase() === 'pink' ? '#ec4899' :
                                 color.toLowerCase() === 'gray' ? '#6b7280' :
                                 color.toLowerCase() === 'brown' ? '#a3a3a3' :
                                 color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                 color.toLowerCase() === 'yellow' ? '#eab308' : '#6b7280'
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        <Button 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;