import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { UseCarts } from '@/hooks/use-carts';
import { useNavigate } from "react-router-dom";
import Header from "./header";


const Cart = () => {
    const { items, removeItem, updateQuantity, getTotalPrice } = UseCarts();
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/index')}
                    className="h-10 w-10 cursor-pointer"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
            </div>

            {
                items.length === 0 ? (
                    <div className="flex flex-col items-center py-12 text-center">
                        <div className="text-6xl mb-4">🛒</div>
                        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                        <p className="text-muted-foreground mb-4">Add some shoes to get started!</p>
                        <Button onClick={() => navigate('/index')}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                            {
                                items.map((item) => (
                                    <div 
                                        key={`${item.id}`} 
                                        className="flex text-center gap-6 p-6 border rounded-lg bg-card"
                                    >
                                       <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                        />

                                        <div className="space-y-1 mt-6">
                                            <h4 className="font-medium text-lg">{item.name}</h4>
                                        </div>

                                        <div className="flex flex-1 justify-center mt-6">
                                            <p className="font-semibold text-lg">${item.price}</p>
                                        </div>

                                        <div className="flex items-center space-x-3 ml-auto">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-10 w-10"
                                                onClick={() => 
                                                    updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>

                                            <Badge
                                                variant="outline"
                                                className="min-h-[3rem] h-10 justify-center text-base"
                                            >
                                                {item.quantity}
                                            </Badge>

                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-10 w-10"
                                                onClick={() => 
                                                    updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-10 w-10 text-red-500 hover:text-red-700"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="border rounded-lg p-6 bg-card sticky top-8">
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Order Summary</h3>

                                <Separator />

                                <div className="space-y-2 text-sm sm:text-base">
                                    <div className="flex justify-between mt-2">
                                        <span>Subtotal</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Tax</span>
                                        <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                                    </div>
                                </div>

                                <Separator className="mt-2 mb-2" />

                                <div className="flex justify-between items-center text-base sm:text-lg font-semibold mb-2 mt-2">
                                    <span>Total</span>
                                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <Button 
                                        className="w-full text-sm sm:text-base cursor-pointer" 
                                        size="lg"
                                        onClick={() => navigate('/cart/checkout')}
                                    >
                                        Proceed To Checkout
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full text-sm sm:text-base cursor-pointer"
                                        onClick={() => navigate('/index')}
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Cart