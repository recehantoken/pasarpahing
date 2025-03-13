
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DollarSign } from "lucide-react";

export const CurrencyMenu = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: currencies, isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("currency_rates")
        .select("*")
        .order("currency_code");
      
      if (error) throw error;
      
      // Always include USD as default
      const usdIncluded = data.some(c => c.currency_code === "USD");
      if (!usdIncluded) {
        data.unshift({
          id: "default-usd",
          currency_code: "USD",
          rate: 1,
          created_at: new Date().toISOString(),
          last_updated: new Date().toISOString()
        });
      }
      
      return data;
    },
  });

  // Fetch user's preferred currency if they're logged in
  useEffect(() => {
    if (user) {
      const fetchPreferredCurrency = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("preferred_currency")
          .eq("id", user.id)
          .single();
        
        if (!error && data?.preferred_currency) {
          setSelectedCurrency(data.preferred_currency);
        }
      };
      
      fetchPreferredCurrency();
    }
  }, [user]);

  // Update user's preferred currency
  const updatePreferredCurrency = async (currency: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ preferred_currency: currency })
        .eq("id", user.id);
      
      if (error) throw error;
      
      toast({
        title: "Currency preference updated",
        description: `Your preferred currency is now ${currency}`,
      });
    } catch (error) {
      console.error("Error updating currency preference:", error);
      toast({
        variant: "destructive",
        title: "Error updating currency",
        description: "Failed to update currency preference",
      });
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    updatePreferredCurrency(currency);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <DollarSign className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
        <SelectTrigger className="w-[80px] h-8">
          <SelectValue placeholder="USD" />
        </SelectTrigger>
        <SelectContent>
          {currencies?.map((currency) => (
            <SelectItem key={currency.id} value={currency.currency_code}>
              {currency.currency_code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
