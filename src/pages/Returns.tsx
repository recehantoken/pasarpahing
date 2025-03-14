
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Returns & Refunds</h1>
        
        <div className="space-y-8">
          <div className="prose max-w-none">
            <p className="text-lg">
              We want you to be completely satisfied with your purchase. If for any reason you're not, 
              you can return your items within 30 days of delivery for a full refund or exchange.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
            
            <div className="space-y-4">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Eligibility</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Items must be unused, unworn, and in their original packaging</li>
                  <li>All tags and labels must be attached</li>
                  <li>Items must be returned within 30 days of delivery</li>
                  <li>Proof of purchase (order number or receipt) is required</li>
                </ul>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-medium mb-2">Exceptions</h3>
                <p className="text-muted-foreground mb-3">
                  The following items cannot be returned or exchanged:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Personalized or custom-made items</li>
                  <li>Digital products</li>
                  <li>Gift cards</li>
                  <li>Intimate apparel for hygiene reasons</li>
                  <li>Items marked as final sale</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
            
            <ol className="space-y-6">
              <li className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Contact Customer Service</h3>
                    <p className="text-muted-foreground">
                      Email us at returns@pasarpahing.com or call our customer service at (123) 456-7890 
                      to initiate a return. Please include your order number and reason for return.
                    </p>
                  </div>
                </div>
              </li>
              
              <li className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Receive Return Authorization</h3>
                    <p className="text-muted-foreground">
                      We'll review your request and send you a return authorization along with a return 
                      shipping label and instructions.
                    </p>
                  </div>
                </div>
              </li>
              
              <li className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Pack Your Return</h3>
                    <p className="text-muted-foreground">
                      Place the items back in their original packaging if possible. Include the return 
                      form in the package.
                    </p>
                  </div>
                </div>
              </li>
              
              <li className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Ship Your Return</h3>
                    <p className="text-muted-foreground">
                      Drop off the package at your nearest shipping location using our prepaid return label.
                      We recommend keeping the tracking number for your records.
                    </p>
                  </div>
                </div>
              </li>
              
              <li className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">5</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Refund Processing</h3>
                    <p className="text-muted-foreground">
                      Once we receive and inspect your return, we'll process your refund to the original 
                      payment method. This typically takes 3-5 business days.
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
            
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <p className="text-muted-foreground mb-3">
                Refunds will be issued to the original payment method used for the purchase.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Credit/debit card refunds typically take 3-5 business days to process</li>
                <li>Bank transfers may take 5-7 business days</li>
                <li>Store credit is processed immediately</li>
                <li>Shipping costs are non-refundable unless the return is due to our error</li>
                <li>Return shipping fees will be deducted from your refund unless the return is due to our error</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Returns;
