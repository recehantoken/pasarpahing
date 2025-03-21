
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { MinusIcon, PlusIcon, TrashIcon, ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Footer } from "@/components/layout/Footer";
import { sendCryptoPayment } from "@/services/crypto";
import { FaEthereum } from "react-icons/fa";

const Cart = () => {
  const { cartItems, cartId, isLoading, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-lg mb-4">Your cart is empty</p>
              <Button onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!cartId || !user) return;

    setIsSubmitting(true);
    try {
      if (paymentMethod === "crypto") {
        // Process crypto payment
        const result = await sendCryptoPayment(totalPrice, cartId, user.id);
        
        if (!result.success) {
          throw new Error(result.error || "Crypto payment failed");
        }
        
        toast.success("Crypto payment successful!", {
          description: `Transaction hash: ${result.transactionHash?.substring(0, 10)}...`
        });
      } else if (paymentMethod === "bank") {
        // Process bank payment (as before)
        if (!bankName || !accountNumber) {
          toast.error("Please fill in all bank details");
          setIsSubmitting(false);
          return;
        }

        const paymentData = {
          cart_id: cartId,
          payment_method: paymentMethod,
          bank_name: bankName,
          account_number: accountNumber,
          amount: totalPrice,
          status: "pending",
          created_at: new Date().toISOString()
        };
        
        localStorage.setItem('last_payment', JSON.stringify(paymentData));
        
        toast.success("Order placed successfully!", {
          description: "Your payment is being processed."
        });
      }
      
      await clearCart();
      navigate("/");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error("Failed to process your order", {
        description: error.message || "Please try again later"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your Cart ({cartItems.length} items)</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-sm text-gray-400">No Image</div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="w-24 text-right font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">
                        <div className="flex items-center gap-2">
                          <FaEthereum className="text-orange-500" />
                          Cryptocurrency
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name">Bank Name</Label>
                      <Input
                        id="bank-name"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Enter bank name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        id="account-number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="Enter account number"
                      />
                    </div>
                  </div>
                )}
                
                {paymentMethod === "crypto" && (
                  <div className="bg-orange-100 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <FaEthereum className="text-orange-500 text-xl" />
                      <h3 className="font-medium">Pay with Cryptocurrency</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      You'll be prompted to connect your MetaMask wallet to complete this transaction.
                    </p>
                    <p className="text-xs text-gray-500">
                      Total: {(totalPrice * 0.00028).toFixed(6)} ETH (approx)
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Complete Order"}
                  {!isSubmitting && <ArrowRightIcon className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
