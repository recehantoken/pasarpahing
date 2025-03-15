
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  LogOut,
  Search,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from "@/components/ui/sheet";
import { CurrencyMenu } from "./CurrencyMenu";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, signOut, user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const isAdmin = user?.email === "master@recehan.gold";

  // Update header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-md" 
          : "bg-background/70"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Recehan Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Recehan
          </span>
        </Link>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.home')}
          </Link>
          {session && (
            <>
              <Link to="/sell" className="text-sm font-medium hover:text-primary transition-colors">
                {t('nav.sell')}
              </Link>
              <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
                {t('nav.profile')}
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                  {t('nav.admin')}
                </Link>
              )}
            </>
          )}
        </nav>
        
        {/* Right section with cart, profile and menu */}
        <div className="flex items-center space-x-2">
          {/* Theme switcher */}
          <ThemeSwitcher />
          
          {/* Language switcher */}
          <LanguageSwitcher />
          
          {/* Currency menu */}
          <CurrencyMenu />
          
          {session ? (
            <>
              {/* Cart link */}
              <Link to="/cart">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">{t('nav.cart')}</span>
                </Button>
              </Link>
              
              {/* Profile link */}
              <Link to="/profile">
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">{t('nav.profile')}</span>
                </Button>
              </Link>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={() => navigate("/auth")}>
              {t('nav.login')}
            </Button>
          )}
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Menu</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </SheetClose>
              </div>
              
              <nav className="flex flex-col space-y-4 mt-8">
                <SheetClose asChild>
                  <Link to="/" className="flex items-center py-2 hover:text-primary transition-colors">
                    {t('nav.home')}
                  </Link>
                </SheetClose>
                
                {session ? (
                  <>
                    <SheetClose asChild>
                      <Link to="/sell" className="flex items-center py-2 hover:text-primary transition-colors">
                        {t('nav.sell')}
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/profile" className="flex items-center py-2 hover:text-primary transition-colors">
                        {t('nav.profile')}
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/cart" className="flex items-center py-2 hover:text-primary transition-colors">
                        {t('nav.cart')}
                      </Link>
                    </SheetClose>
                    {isAdmin && (
                      <SheetClose asChild>
                        <Link to="/admin" className="flex items-center py-2 hover:text-primary transition-colors">
                          {t('nav.admin')}
                        </Link>
                      </SheetClose>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center py-2 hover:text-primary transition-colors"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('nav.logout')}
                    </button>
                  </>
                ) : (
                  <SheetClose asChild>
                    <Link to="/auth" className="flex items-center py-2 hover:text-primary transition-colors">
                      {t('nav.login')}
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
