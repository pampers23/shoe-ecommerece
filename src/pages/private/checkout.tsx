import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Smartphone, Lock } from 'lucide-react';
import { UseCarts } from '@/hooks/use-carts';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOrder, createOrderWithUser } from '@/actions/private';
import { useSupabaseClient } from '@supabase/auth-helpers-react'



const Checkout = () => {
  const { items, getTotalPrice } = UseCarts();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState('');

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const supabase = useSupabaseClient();

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('Order placed successfully')
    },
  })

 const handleCompletePayment = async () => {
  try {
    
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    if (paymentMethod === "cod") {
      // ✅ Cash on Delivery
      await createOrderWithUser({
        paymentMethod,
        totalAmount: total,
        address,
        items,
      });
      toast.success("Order placed successfully!");
      return;
    }

    // ✅ Online Payments (Stripe)
    if (["card", "gcash", "grabpay"].includes(paymentMethod)) {
      const orderPayload = {
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        order_id: "ORD-" + Date.now(),
        paymentMethod
      };

      const response = await fetch(
        "https://fmlyoznjwdgeaufjcloo.functions.supabase.co/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`, // ✅ important
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error("Stripe error:", error);
        toast.error("Failed to start checkout.");
        return;
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // ✅ Redirect to Stripe
      } else {
        toast.error("No checkout URL returned from server.");
      }
    }
  } catch (error) {
    console.error("Payment error:", error);
    toast.error("Failed to place your order.");
  }
};


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/cart')}
            className="h-9 w-9 sm:h-10 sm:w-10 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Payment Method Selection */}
            <Card className="p-4 sm:p-6 animate-fade-in">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                Payment Method
              </h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                      <CreditCard className="h-4 w-4" />
                      Credit / Debit Card
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                      <Smartphone className="h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="gcash" id="gcash" />
                    <Label htmlFor="gcash" className="flex-1 cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                      <Smartphone className="h-4 w-4" />
                      GCash
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer flex items-center gap-2 text-sm sm:text-base">
                      <Smartphone className="h-4 w-4" />
                      Cash on Delivery
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </Card>

            {/* Card Details Form */}
            {paymentMethod === 'card' && (
              <Card className="p-4 sm:p-6 animate-fade-in">
                <h3 className="text-base sm:text-lg font-semibold mb-4">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Billing Address */}
            <Card className="p-4 sm:p-6 animate-fade-in">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Billing Address</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    className="mt-1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="United States"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sm:p-6 lg:sticky lg:top-8 animate-fade-in">
              <h3 className="text-lg sm:text-xl font-semibold">Order Summary</h3>
              
              <Separator />
              
              <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-64 overflow-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-xs sm:text-sm gap-2">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Qty: {item.quantity}
                        {item.size && ` • ${item.size}`}
                      </p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button 
                className="w-full cursor-pointer" 
                size="lg"
                onClick={handleCompletePayment}
                disabled={mutation.isPending}
              >
                <Lock className="h-4 w-4 mr-2" /> 
                {mutation.isPending ? 'Processing...' : 'Complete Payment'}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Your payment information is secure and encrypted
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;