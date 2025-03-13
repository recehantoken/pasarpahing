
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, Store, LogIn, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const { user, session, signOut } = useAuth();
  const { items } = useCart();
  
  const getInitials = () => {
    if (!user) return "U";
    
    // Extract initials from email
    return user.email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <header className="bg-card border-b border-primary/20 sticky top-0 z-50 w-full shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Pasar Pahing
        </Link>
        
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          
          {session ? (
            <>
              <Link to="/sell">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Store className="h-4 w-4" />
                  <span className="hidden md:inline">Sell Item</span>
                </Button>
              </Link>
              
              <Link to="/cart" className="relative">
                <Button variant="outline" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>
              
              <Link to="/profile">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
