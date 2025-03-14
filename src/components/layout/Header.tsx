
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { CurrencyMenu } from "./CurrencyMenu";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, signOut } = useAuth();
  const { cartItems } = useCart();
  const { t } = useLanguage();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-card shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Pasar Pahing" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Pasar Pahing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-sm hover:text-primary">
              {t('nav.home')}
            </Link>
            <Link to="/sell" className="text-sm hover:text-primary">
              {t('nav.sell')}
            </Link>
            <Link to="/faq" className="text-sm hover:text-primary">
              {t('nav.faq')}
            </Link>
            <Link to="/contact" className="text-sm hover:text-primary">
              {t('nav.contact')}
            </Link>
            <Link to="/shipping" className="text-sm hover:text-primary">
              {t('nav.shipping')}
            </Link>
            <Link to="/returns" className="text-sm hover:text-primary">
              {t('nav.returns')}
            </Link>
            <Link to="/terms" className="text-sm hover:text-primary">
              {t('nav.terms')}
            </Link>
          </nav>

          {/* Right-Side Actions */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <CurrencyMenu />
            <ThemeSwitcher />
            
            {session ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => signOut()}
                  className="hidden md:flex"
                >
                  {t('nav.signOut')}
                </Button>
                <Link to="/profile">
                  <Button size="icon" variant="ghost">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="default" size="sm">
                  {t('nav.signIn')}
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button size="icon" variant="ghost">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="md:hidden" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 border-t">
          <nav className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/sell" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.sell')}
            </Link>
            <Link 
              to="/faq" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.faq')}
            </Link>
            <Link 
              to="/contact" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Link 
              to="/shipping" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.shipping')}
            </Link>
            <Link 
              to="/returns" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.returns')}
            </Link>
            <Link 
              to="/terms" 
              className="px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.terms')}
            </Link>
            {session ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="justify-start px-3"
              >
                {t('nav.signOut')}
              </Button>
            ) : (
              <Link 
                to="/auth" 
                className="px-3 py-2 rounded-md hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.signIn')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
