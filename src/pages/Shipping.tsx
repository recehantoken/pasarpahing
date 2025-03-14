
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock } from "lucide-react";

const Shipping = () => {
  const { data: shippingMethods, isLoading } = useQuery({
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
          <div className="prose max-w-none">
            <p className="text-lg">
              At Pasar Pahing, we strive to provide reliable and affordable shipping options for all our customers.
              Below you'll find information about our shipping methods, estimated delivery times, and costs.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Available Shipping Methods</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="h-16 bg-gray-200" />
                    <CardContent className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                          {method.estimated_days === 1 
                            ? 'Approx. 1 day' 
                            : `Approx. ${method.estimated_days} days`}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {!shippingMethods?.length && (
                  <p className="col-span-full text-center py-4 text-muted-foreground">
                    No shipping methods available at the moment. Please check back later.
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Shipping Policies</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Processing Time</h3>
                <p className="text-muted-foreground">
                  Most orders are processed within 1-2 business days after payment confirmation.
                  During high volume periods or holidays, processing may take an additional 1-2 days.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">International Shipping</h3>
                <p className="text-muted-foreground">
                  We ship to most countries worldwide. International orders may be subject to import
                  duties and taxes, which are the responsibility of the recipient.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Tracking</h3>
                <p className="text-muted-foreground">
                  All orders come with tracking information that will be sent to your email
                  once your order has been shipped.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Shipping Delays</h3>
                <p className="text-muted-foreground">
                  Occasionally, shipping may be delayed due to unforeseen circumstances such as 
                  weather conditions, customs clearance, or carrier delays. We appreciate your 
                  patience in these situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shipping;
