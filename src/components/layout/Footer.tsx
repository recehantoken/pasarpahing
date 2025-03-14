
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t text-card-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.shop')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.allProducts')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.newArrivals')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.bestSellers')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.featured')}
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.onSale')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.information')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.returns')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Policies Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.policies')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cookie-policy" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.cookiePolicy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.termsConditions')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.subscribe')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('footer.subscribeDesc')}
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder={t('footer.emailAddress')} 
                className="flex-1"
              />
              <Button type="submit">
                {t('footer.subscribe')}
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.svg" alt="Pasar Pahing" className="h-8 w-8 mr-2" />
            <span className="text-lg font-bold">Pasar Pahing</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Pasar Pahing. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};
