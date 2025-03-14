
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  return (
    <div className="flex items-center space-x-1">
      <Button 
        variant={language === 'en' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => handleChange('en')}
        className="text-xs px-2 h-7"
      >
        EN
      </Button>
      <Button 
        variant={language === 'id' ? 'default' : 'ghost'} 
        size="sm" 
        onClick={() => handleChange('id')}
        className="text-xs px-2 h-7"
      >
        ID
      </Button>
    </div>
  );
};
