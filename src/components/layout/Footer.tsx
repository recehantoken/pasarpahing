
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/20 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pasar Pahing</h3>
            <p className="text-sm text-muted-foreground">
            Pasar Pahing is a traditional Indonesian market celebrating local culture, fresh produce, and authentic Indonesian products. Experience vibrant trade, heritage crafts, and community spirit in a lively marketplace setting.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:underline">Home</Link></li>
              <li><Link to="/sell" className="text-sm hover:underline">Sell Item</Link></li>
              <li><Link to="/cart" className="text-sm hover:underline">Cart</Link></li>
              <li><Link to="/profile" className="text-sm hover:underline">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm hover:underline">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm hover:underline">Shipping</Link></li>
              <li><Link to="/returns" className="text-sm hover:underline">Returns</Link></li>
              <li><Link to="/contact" className="text-sm hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm hover:underline">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm hover:underline">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-sm hover:underline">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pasar Pahing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
