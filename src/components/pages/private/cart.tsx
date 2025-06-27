import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { UseCarts } from "@/hooks/use-carts";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";



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
                onClick={() => navigate('/')}
                className="h-10 w-10"
            >
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Shopping Car</h1>
        </div>

        {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some shoes to get started!</p>
                <Button onClick={() => navigate('/')}>
                    Continue Shopping
                </Button>
            </div>
        ) : (
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={`${item.id}-${item.color}`} className="flex items-center space-x-4 p-6
                        rounded-lg bg-card">
                            <div className="text-6xl">{item.image}</div>

                            <div className="flex-1 space-y-2">
                                <h4 className="font-medium text-lg">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                                <p className="font-semibold text-lg">${item.price}</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10"
                                    onClick={() => updateQuantity(item.id, item.color, Math.max(0, item.quantity - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>

                                <Badge variant="outline" className="min-w-[3rem] h-10 justify-center text-base">
                                    {item.quantity}
                                </Badge>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10"
                                    onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 text-red-500 hover:text-red-700"
                                onClick={() => removeItem(item.id, item.color)}
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 bg-card space-y-6 sticky top-8">
                        <h3 className="text-xl font-semibold">Order Summary</h3>

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total</span>
                            <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                        </div>

                        <div className="space-y-3">
                            <Button className="w-full" size="lg">
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate('/')}
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default Cart
