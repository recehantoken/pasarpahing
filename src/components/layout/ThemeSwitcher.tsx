
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a theme preference
    const fetchThemePreference = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('theme_settings')
          .select('theme_preference')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          setTheme(data.theme_preference as 'light' | 'dark');
          document.documentElement.classList.toggle('dark', data.theme_preference === 'dark');
        }
      }
    };

    fetchThemePreference();
  }, [user]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');

    if (user) {
      const { error } = await supabase
        .from('theme_settings')
        .upsert({
          user_id: user.id,
          theme_preference: newTheme
        });

      if (error) {
        toast({
          title: "Error saving theme preference",
          description: "Please try again later",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};
