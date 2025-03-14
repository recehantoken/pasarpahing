
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { CurrencyMenu } from "@/components/layout/CurrencyMenu";
import { ShoppingCart } from "lucide-react";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="border-b border-primary/20 bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img src="/cent.png" alt="Pasar Pahing Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Pasar Pahing
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <CurrencyMenu />
            <ThemeSwitcher />
            
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/sell">
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                    Sell Item
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    Profile
                  </Button>
                </Link>
                <Link to="/cart" className="relative">
                  <Button variant="outline" size="icon">
                    <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
