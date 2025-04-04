
import { useEffect } from "react";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ThemeSwitcher = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Always enforce dark theme
    document.documentElement.classList.add('dark');
    
    // Remove light mode class if it exists
    document.documentElement.classList.remove('light');

    // Store user's preference if logged in
    const setDarkModePreference = async () => {
      if (user) {
        try {
          const { error: upsertError } = await supabase
            .from('theme_settings')
            .upsert({ 
              user_id: user.id, 
              theme_preference: 'dark' 
            }, { 
              onConflict: 'user_id'
            });

          if (upsertError) {
            console.error('Error creating theme setting:', upsertError);
          }
        } catch (err) {
          console.error('Unexpected error in theme preference:', err);
        }
      }
    };

    setDarkModePreference();
  }, [user]);

  // This button now just serves as an indicator that dark mode is active
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-10 h-10 rounded-full cursor-default"
      disabled
      title="Dark Mode Active"
    >
      <Moon className="h-5 w-5" />
    </Button>
  );
};
