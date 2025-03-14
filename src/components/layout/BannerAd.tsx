
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BannerAdProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  buttonText?: string;
  className?: string;
}

export const BannerAd = ({
  title,
  description,
  imageUrl,
  linkUrl,
  buttonText = "Learn More",
  className = "",
}: BannerAdProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent z-10"></div>
      <img 
        src={imageUrl} 
        alt={title} 
        className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>
        <p className="text-sm md:text-base mb-4 max-w-md">{description}</p>
        <Button 
          asChild
          variant="outline" 
          className="w-fit bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20 text-white"
        >
          <a href={linkUrl}>
            {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};
