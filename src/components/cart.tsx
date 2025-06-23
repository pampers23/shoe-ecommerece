import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from 'lucide-react';
import { UseCarts } from '@/hooks/use-carts';


const Cart = () => {
    const { items, removeItem, updateQuantity, getTotalPrice } = UseCarts();


  return (
    <div className="flex flex-col h-full">
        <div className="flex-1 space-y-4 mt-6">
            {items.map((item) => (
                <div key={`${item.id}-${item.color}`} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="text-3xl">{item.image}</div>

                    <div className="flex-1 space-y-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                        <p className="font-semibold">${item.price}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.color, Math.max(0, item.quantity - 1))}
                        >
                            <Minus className="w-3 h-3" />
                        </Button>

                        <Badge variant="outline" className="min-w-[2rem] justify-center">
                            {item.quantity}
                        </Badge>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item.id, item.color)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>

        <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
                <span className="font-semibold">Total: ${getTotalPrice().toFixed(2)}</span>
            </div>

            <Separator />

            <div className="space-y-2">
                <Button className="w-full" size="lg">
                    Checkout
                </Button>
                <Button variant="outline" className="w-full">
                    Continue Shopping
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Cart