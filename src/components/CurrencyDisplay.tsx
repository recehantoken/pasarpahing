
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

type CurrencyRate = {
  currency_code: string;
  rate: number;
  last_updated: string;
}

export const CurrencyDisplay = ({ amount, className }: { amount: number, className?: string }) => {
  const [convertedAmount, setConvertedAmount] = useState<string>("-");

  const { data: currencyRate, isLoading } = useQuery({
    queryKey: ["currencyRate"],
    queryFn: async () => {
      // Using raw query to bypass the type issue until types are updated
      const { data, error } = await supabase
        .rpc('get_latest_currency_rate', { code: 'IDR' });
        
      if (error) {
        console.error("Error fetching currency rate:", error);
        throw error;
      }
      
      return data as CurrencyRate;
    },
  });

  useEffect(() => {
    if (currencyRate?.rate && amount) {
      const converted = (amount * currencyRate.rate).toLocaleString('id-ID');
      setConvertedAmount(`Rp ${converted}`);
    }
  }, [currencyRate, amount]);

  const lastUpdated = currencyRate?.last_updated 
    ? new Date(currencyRate.last_updated).toLocaleDateString() 
    : null;

  if (isLoading) {
    return <span className={className}>Loading...</span>;
  }

  return (
    <div className={className}>
      <span className="font-medium">{convertedAmount}</span>
      {lastUpdated && (
        <span className="text-xs text-muted-foreground block">
          Rate updated: {lastUpdated}
        </span>
      )}
    </div>
  );
};
