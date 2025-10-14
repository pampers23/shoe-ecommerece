import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { UseCarts } from '@/hooks/use-carts';
import { toast } from "sonner"
import { useState } from 'react';
import type { Product } from '@/type';
// import { COLOR_MAP } from '@/constants/colors';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addItem } = UseCarts();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    });
    
    toast(
      <>
        <div className="font-semibold">Add to cart</div>
        <div>{`${product.name} has been added to your cart.`}</div>
      </>
    )  
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        
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
          <img 
            src={product.image_url}
            alt={product.name}
            className='w-full h-full object-contain drop-shadow-lg'
          />
          
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
        </div>

        {/* Color Selection */}

        <div className='flex gap-2'>
          <Button
            variant="outline"
            className='flex-1 cursor-pointer'
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <Eye className='mr-2 h-4 w-4' />
            View
          </Button>
          <Button 
          className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors cursor-pointer"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;