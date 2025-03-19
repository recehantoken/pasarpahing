import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-primary/20 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pasar Pahing</h3>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:underline">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="text-sm hover:underline">{t('footer.about')}</Link></li>
              <li><Link to="/contact" className="text-sm hover:underline">{t('footer.contact')}</Link></li>
              <li><Link to="/profile" className="text-sm hover:underline">{t('nav.profile')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.help')}</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm hover:underline">{t('footer.faq')}</Link></li>
              <li><Link to="/shipping" className="text-sm hover:underline">{t('footer.shipping')}</Link></li>
              <li><Link to="/cart" className="text-sm hover:underline">{t('nav.cart')}</Link></li>
              <li><Link to="/returns" className="text-sm hover:underline">{t('footer.returns')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm hover:underline">{t('footer.terms')}</Link></li>
              <li><Link to="/privacy" className="text-sm hover:underline">{t('footer.privacy')}</Link></li>
              <li><Link to="/cookies" className="text-sm hover:underline">{t('footer.cookies')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-primary/10 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Pasar Pahing {t('footer.developedBy')} ID Cent. {t('common.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};