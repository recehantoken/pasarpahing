
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
    // Always set dark theme
    document.documentElement.classList.add('dark');

    // Store user's preference if logged in
    const setDarkModePreference = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('theme_settings')
            .select('theme_preference')
            .eq('user_id', user.id)
            .maybeSingle();

          if (error) {
            console.error('Error fetching theme preference:', error);
            return;
          }

          // If theme setting doesn't exist, create one with dark theme
          if (!data) {
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
          }
          // If for some reason it's not dark, update it
          else if (data.theme_preference !== 'dark') {
            const { error: updateError } = await supabase
              .from('theme_settings')
              .update({ theme_preference: 'dark' })
              .eq('user_id', user.id);

            if (updateError) {
              console.error('Error updating theme preference:', updateError);
            }
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
