import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { useChatbotContent } from "@/hooks/useChatbotContent";

const Shipping = () => {
  const { content, loading: contentLoading } = useChatbotContent("shipping");
  const { data: shippingMethods, isLoading: methodsLoading } = useQuery({
    queryKey: ["shipping-methods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shipping_methods")
        .select("*")
        .eq("is_active", true);
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Shipping Information</h1>
        <div className="space-y-8">
          {contentLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <div className="prose max-w-none text-muted-foreground whitespace-pre-wrap">
              {content}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Available Shipping Methods</h2>
            {methodsLoading ? (
              <p>Loading methods...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shippingMethods?.map((method) => (
                  <Card key={method.id} className="border border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <span>{method.name}</span>
                        <Badge variant="outline">${method.base_cost.toFixed(2)}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {method.estimated_days === 1 ? "Approx. 1 day" : `Approx. ${method.estimated_days} days`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {!shippingMethods?.length && (
                  <p className="col-span-full text-center py-4 text-muted-foreground">
                    No shipping methods available at the moment.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;