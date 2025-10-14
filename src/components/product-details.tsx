import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { UseCarts } from '@/hooks/use-carts'
import { toast } from "sonner"
import Header from './header'
import Footer from './footer'



interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category: string;
    brand: string;
    stock: number;
    sizes: string[];
}

const mockProduct: Product[] = [
    {
        id: 1,
        name: "Air Max 270",
        price: 150,
        description: "The Nike Air Max 270 features a large Air unit in the heel for cushioning and a sleek, modern design.",
        image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        category: "Running",
        brand: "Nike",
        stock: 20,
        sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
        id: 2,
        name: "Classic Leather",
        price: 89.99,
        description: "Timeless style meets comfort in the Reebok Classic Leather, perfect for everyday wear.",
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        category: "Casual",
        brand: "Adidas",
        stock: 23,
        sizes: ["7", "8", "9", "10", "11", "12"]
    },
    {
        id: 3,
        name: "Classic Leather",
        price: 89.99,
        description: "Timeless style meets comfort in the Reebok Classic Leather, perfect for everyday wear.",
        image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        category: "Casual",
        brand: "Adidas",
        stock: 23,
        sizes: ["7", "8", "9", "10", "11", "12"]
    },
]

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = UseCarts();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    setLoading(true);

    const foundProduct = mockProduct.find(p => p.id === Number(id));

    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!selectedSize) {
      toast("Please select a size", { description: "Choose a size before adding to cart" });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      size: selectedSize
    });
    
    toast.success("Added to cart", { description: `${product.name} (${selectedSize}) has been added to your cart.` });
  };


  if (loading) {
     return (
      <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
        <Header />
        <p className="text-sm text-muted-foreground animate-pulse">Fetching products...</p>
        <Tailspin size="100" stroke="10" speed="0.9" color="#262E40" />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4'>Product Not Found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    )
  }


  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 container mx-auto px-4 py-8'>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className='mb-6'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>

        <div className='grid md:grid-cols-2 gap-8'>
          <div className='bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 flex items-center justify-center'>
            <img 
              src={product.image_url} 
              alt={product.name}
              className='w-full h-auto max-h-[500px] object-contain drop-shadow-2xl' 
            />
          </div>
          
          <div className='space-y-6'>
            <div>
              <Badge variant="secondary" className='mb-2'>
                {product.category}
              </Badge>
              <h1 className='text-3xl font-bold mb-2'>{product.name}</h1>
              <div className='flex items-center'>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400'/>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400'/>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400'/>
                <Star className='h-5 w-5 fill-yellow-400 text-yellow-400'/>
                <Star className='h-5 w-5 fill-gray-300 text-gray-300'/>
              </div>
              <span className='text-sm text-muted-foreground'>(4.0)</span>
            </div>
            <p className='text-3xl font-bold text-primary'>${product.price}</p>
          </div>

          <div>
            <h2 className='text-lg font-semibold mb-2'>Brand</h2>
            <p className='text-muted-foreground'>{product.brand}</p>
          </div>

          <div>
            <h2 className='text-lg font-semibold mb-2'>Description</h2>
            <p className='text-muted-foreground leading-relaxed'>
              {product.description || 'No description available for this product.'}
            </p>
          </div>

          {/* size selection */}
          <div>
            <h2 className='text-lg font-semibold mb-3'>Available Sizes</h2>
            <div className='flex flex-wrap gap-2'>
              {product.sizes?.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className='min-w-[60px]'
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>


          {/* stock */}
          <div>
            <p className='text-sm text-muted-foreground'>
              {product.stock > 0 ? (
                <span className='text-green-600 font-medium'>In stock ({product.stock} available)</span>
              ) : (
                <span className='text-red-600 font-medium'>Out of stock</span>
              )}
            </p>
          </div>

          {/* add to cart */}
          <Button
            size="lg"
            className='w-full'
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className='mr-2 h-5 w-5' />
            Add to Cart
          </Button>

        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetails
