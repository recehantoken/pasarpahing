
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">How do I create an account?</h2>
            <p className="text-muted-foreground">
              You can create an account by clicking on the Sign up button in the top right corner of the page.
              Fill in your information and follow the instructions to complete the registration process.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">How can I track my order?</h2>
            <p className="text-muted-foreground">
              Once your order is shipped, you will receive a tracking number via email. You can use this number
              to track your package on the shipping carrier's website.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">What payment methods do you accept?</h2>
            <p className="text-muted-foreground">
              We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Can I cancel my order?</h2>
            <p className="text-muted-foreground">
              You can cancel your order within 24 hours of placing it. Please contact our customer service team
              for assistance with cancellations.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Do you ship internationally?</h2>
            <p className="text-muted-foreground">
              Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
