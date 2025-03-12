
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  cartId: string | null;
  isLoading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  totalPrice: number;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartId(null);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Calculate total price whenever cart items change
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const fetchCart = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // First, get or create a cart for the user
      const { data: carts, error: cartsError } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cartsError) throw cartsError;

      let currentCartId = carts?.id;

      // If no cart exists, create one
      if (!currentCartId) {
        const { data: newCart, error: createCartError } = await supabase
          .from("carts")
          .insert({ user_id: user.id })
          .select("id")
          .single();

        if (createCartError) throw createCartError;
        currentCartId = newCart.id;
      }

      setCartId(currentCartId);

      // Fetch cart items with product details
      const { data: items, error: itemsError } = await supabase
        .from("cart_items")
        .select(`
          id,
          product_id,
          quantity,
          product:products (
            id,
            name,
            price,
            image_url
          )
        `)
        .eq("cart_id", currentCartId);

      if (itemsError) throw itemsError;
      setCartItems(items as CartItem[]);
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart");
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) {
      toast("Please sign in to add items to your cart", {
        description: "Create an account or sign in to start shopping",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/auth"
        }
      });
      return;
    }

    if (!cartId) {
      await fetchCart();
      if (!cartId) return;
    }

    try {
      // Check if item already exists in cart
      const existingItem = cartItems.find(item => item.product_id === productId);

      if (existingItem) {
        // Update quantity if item exists
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        // Add new item to cart
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            cart_id: cartId,
            product_id: productId,
            quantity: 1
          })
          .select(`
            id,
            product_id,
            quantity,
            product:products (
              id,
              name,
              price,
              image_url
            )
          `)
          .single();

        if (error) throw error;
        setCartItems([...cartItems, data as CartItem]);
        toast.success("Added to cart");
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId);

      if (error) throw error;
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
      toast.success("Item removed from cart");
    } catch (error: any) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", cartItemId);

      if (error) throw error;
      
      setCartItems(
        cartItems.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (error: any) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const clearCart = async () => {
    if (!cartId) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) throw error;
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
