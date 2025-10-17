import { useState } from 'react'
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
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/actions/private';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const numberId = id ? Number(id) : undefined;
  const navigate = useNavigate();
  const { addItem } = UseCarts();
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ['product', numberId],
    queryFn: () => getProductById(numberId!),
    enabled: !!id,
  })


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


  if (isLoading) {
     return (
      <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
        <Header />
        <p className="text-sm text-muted-foreground animate-pulse">Fetching products...</p>
        <Tailspin size="100" stroke="10" speed="0.9" color="#262E40" />
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4 text-red-500'>
              Failed to load product
            </h1>
            <p className='text-muted-foreground mb-6'>
              {(error as Error).message || "Something went wrong while fetching the product."}
            </p>
            <Button
              onClick={() => navigate('/')}
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 flex items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4'>Product Not Found</h1>
            <Button className='cursor-pointer' onClick={() => navigate('/')}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Button>
          </div>
        </main>
      </div>
    )
  }


  return (
     <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aaspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="max-w-full max-h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <Star className="h-5 w-5 fill-gray-300 text-gray-300" />
                </div>
                <span className="text-sm text-muted-foreground">(4.0)</span>
              </div>
              <p className="text-3xl font-bold text-primary">${product.price}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Brand</h2>
              <p className="text-muted-foreground">{product.brand}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || 'No description available for this product.'}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Available Sizes</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size: string) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <p className="text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Add to Cart Button */}
            <Button 
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetails
