
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-primary/20 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pasar Pahing</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted marketplace for buying and selling products with ease.
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
              <li><a href="#" className="text-sm hover:underline">FAQ</a></li>
              <li><a href="#" className="text-sm hover:underline">Shipping</a></li>
              <li><a href="#" className="text-sm hover:underline">Returns</a></li>
              <li><a href="#" className="text-sm hover:underline">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:underline">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:underline">Cookies</a></li>
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
