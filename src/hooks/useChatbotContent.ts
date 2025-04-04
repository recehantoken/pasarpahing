
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const useChatbotContent = (page: string) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    // Instead of attempting to fetch from a non-working endpoint,
    // we'll set a timeout to simulate the loading and then return
    // default content
    const timer = setTimeout(() => {
      setContent(getDefaultContent(page));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page, language]);

  // Function to provide default content based on the page
  const getDefaultContent = (pageName: string) => {
    switch(pageName) {
      case "about":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Our Story</h2>
            <p>
              Pasar Pahing was founded in 2023 with a vision to create a digital marketplace 
              that celebrates authentic Indonesian craftsmanship and culture. We connect artisans 
              and small businesses directly with customers who appreciate unique, handcrafted products.
            </p>
            
            <h2 class="text-2xl font-bold text-primary mt-8">Our Mission</h2>
            <p>
              Our mission is to preserve traditional Indonesian crafts by providing artisans with a 
              platform to showcase their work globally. We believe in fair trade practices and ensuring 
              that creators receive proper compensation for their craftsmanship.
            </p>
            
            <h2 class="text-2xl font-bold text-primary mt-8">Community Values</h2>
            <div class="grid md:grid-cols-3 gap-6 mt-4">
              <div class="p-4 border border-primary/20 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-primary">Cultural Heritage</h3>
                <p>We celebrate Indonesia's rich cultural diversity and traditional craftsmanship.</p>
              </div>
              <div class="p-4 border border-primary/20 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-primary">Sustainability</h3>
                <p>We promote eco-friendly practices and sustainable production methods.</p>
              </div>
              <div class="p-4 border border-primary/20 rounded-lg">
                <h3 class="font-medium text-lg mb-2 text-primary">Authenticity</h3>
                <p>We ensure all products are authentic and of high quality.</p>
              </div>
            </div>
          </div>
        `;
      case "shipping":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Shipping Policies</h2>
            <p>
              Pasar Pahing is committed to reliable and efficient shipping for all our customers. 
              We understand the importance of receiving your purchases in a timely manner.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Domestic Shipping</h3>
            <p>
              For orders within Indonesia, we offer several shipping options to meet your needs:
            </p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
              <li>Standard Shipping (3-5 business days)</li>
              <li>Express Shipping (1-2 business days)</li>
              <li>Same Day Delivery (for orders placed before 10 AM in selected cities)</li>
            </ul>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">International Shipping</h3>
            <p>
              We ship worldwide with estimated delivery times varying by destination:
            </p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
              <li>Southeast Asia: 5-7 business days</li>
              <li>Asia Pacific: 7-10 business days</li>
              <li>North America & Europe: 10-14 business days</li>
              <li>Rest of the world: 14-21 business days</li>
            </ul>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Shipping Costs</h3>
            <p>
              Shipping costs are calculated based on the destination, package weight, and selected shipping method.
              Free shipping is available for domestic orders above IDR 500,000 and international orders above USD 100.
            </p>
          </div>
        `;
      case "returns":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Returns & Refunds Policy</h2>
            <p>
              At Pasar Pahing, we want you to be completely satisfied with your purchase.
              If you're not happy with your order for any reason, we're here to help.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Return Eligibility</h3>
            <p>
              Items can be returned within 14 days of receipt if they meet the following conditions:
            </p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
              <li>Products are in original condition</li>
              <li>Original packaging is intact</li>
              <li>Products are unused and unworn</li>
              <li>All tags and labels are attached</li>
            </ul>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Return Process</h3>
            <ol class="list-decimal pl-6 space-y-2 mt-2">
              <li>Contact our customer service team to initiate a return</li>
              <li>Receive a Return Merchandise Authorization (RMA) number</li>
              <li>Package your return securely with the RMA number clearly marked</li>
              <li>Send the package using a trackable shipping method</li>
              <li>Once received and inspected, a refund will be processed</li>
            </ol>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Non-Returnable Items</h3>
            <p>
              The following items cannot be returned:
            </p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
              <li>Custom or personalized products</li>
              <li>Digital downloads or services</li>
              <li>Items marked as final sale</li>
              <li>Perishable goods</li>
            </ul>
          </div>
        `;
      case "terms":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Terms of Service</h2>
            <p>
              Welcome to Pasar Pahing. By accessing our website and services, you agree to be bound 
              by these Terms of Service, our Privacy Policy, and any other policies referenced herein.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Account Terms</h3>
            <p>
              When you create an account with us, you must provide accurate and complete information.
              You are responsible for maintaining the security of your account and password. 
              Pasar Pahing cannot and will not be liable for any loss or damage from your failure to 
              comply with this security obligation.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Products and Services</h3>
            <p>
              Pasar Pahing reserves the right to refuse service to anyone for any reason at any time.
              Products displayed on our website are subject to availability. We reserve the right 
              to discontinue any product at any time.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Pricing and Payment</h3>
            <p>
              Prices for products are subject to change without notice. We reserve the right to modify 
              or discontinue the service without notice at any time. We shall not be liable to you 
              or to any third party for any modification, price change, suspension, or discontinuance 
              of the service.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Intellectual Property</h3>
            <p>
              All content included on this site, such as text, graphics, logos, button icons, images, 
              audio clips, digital downloads, data compilations, and software, is the property of 
              Pasar Pahing or its content suppliers and protected by international copyright laws.
            </p>
          </div>
        `;
      case "privacy":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Privacy Policy</h2>
            <p>
              This Privacy Policy describes how Pasar Pahing ("we", "our", or "us") collects, uses, 
              and shares your personal information when you visit our website or make a purchase.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Information We Collect</h3>
            <p>
              When you visit our site, we collect certain information about your device, including 
              information about your web browser, IP address, time zone, and some of the cookies 
              that are installed on your device.
            </p>
            <p class="mt-2">
              Additionally, when you make a purchase or attempt to make a purchase through the site, 
              we collect certain information from you, including your name, billing address, shipping 
              address, payment information, email address, and phone number.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">How We Use Your Information</h3>
            <p>
              We use the information that we collect generally for the following purposes:
            </p>
            <ul class="list-disc pl-6 space-y-2 mt-2">
              <li>To fulfill orders and provide services</li>
              <li>To communicate with you about your order or account</li>
              <li>To screen our orders for potential risk or fraud</li>
              <li>To improve and optimize our website</li>
              <li>To provide personalized marketing and advertising</li>
            </ul>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Data Retention</h3>
            <p>
              When you place an order through the site, we will maintain your order information 
              for our records unless and until you ask us to delete this information.
            </p>
          </div>
        `;
      case "cookies":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Cookie Policy</h2>
            <p>
              This Cookie Policy explains how Pasar Pahing uses cookies and similar technologies 
              to recognize you when you visit our website. It explains what these technologies are 
              and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">What Are Cookies?</h3>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when 
              you visit a website. Cookies are widely used by website owners in order to make their 
              websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Why We Use Cookies</h3>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required 
              for technical reasons in order for our website to operate, and we refer to these as "essential" 
              or "strictly necessary" cookies. Other cookies enable us to track and target the interests 
              of our users to enhance the experience on our website.
            </p>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">Types of Cookies We Use</h3>
            <ul class="list-disc pl-6 space-y-2 mt-2">
              <li>Essential cookies: Necessary for the website to function properly</li>
              <li>Preference cookies: Enable the website to remember your preferences</li>
              <li>Statistics cookies: Help us understand how visitors interact with our website</li>
              <li>Marketing cookies: Used to track visitors across websites to display relevant advertisements</li>
            </ul>
            
            <h3 class="text-xl font-bold text-primary/90 mt-6">How to Control Cookies</h3>
            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose 
              to reject cookies, you may still use our website though your access to some functionality 
              and areas may be restricted.
            </p>
          </div>
        `;
      case "contact":
        return `
          <div class="space-y-6">
            <h2 class="text-2xl font-bold text-primary">Contact Information</h2>
            <p>
              We're here to help! If you have any questions, concerns, or feedback, please don't 
              hesitate to reach out to us using the information below.
            </p>
            
            <div class="grid md:grid-cols-2 gap-8 mt-6">
              <div class="space-y-4">
                <h3 class="text-xl font-bold text-primary/90">Customer Support</h3>
                <p><strong>Email:</strong> support@pasarpahing.com</p>
                <p><strong>Phone:</strong> +62 21 1234 5678</p>
                <p><strong>Hours:</strong> Monday-Friday, 8AM-5PM WIB</p>
              </div>
              
              <div class="space-y-4">
                <h3 class="text-xl font-bold text-primary/90">Business Inquiries</h3>
                <p><strong>Email:</strong> business@pasarpahing.com</p>
                <p><strong>Phone:</strong> +62 21 1234 5679</p>
              </div>
            </div>
            
            <div class="mt-8">
              <h3 class="text-xl font-bold text-primary/90">Our Location</h3>
              <p class="mt-2">
                Pasar Pahing Headquarters<br>
                Jalan Sudirman No. 123<br>
                Jakarta Pusat, 10220<br>
                Indonesia
              </p>
            </div>
            
            <div class="mt-8">
              <h3 class="text-xl font-bold text-primary/90">Social Media</h3>
              <p class="mt-2">
                Connect with us on social media for the latest updates, promotions, and more:
              </p>
              <div class="flex space-x-4 mt-2">
                <span class="font-medium">Instagram: @pasarpahing</span>
                <span class="font-medium">Facebook: /pasarpahing</span>
                <span class="font-medium">Twitter: @pasarpahing</span>
              </div>
            </div>
          </div>
        `;
      default:
        return "";
    }
  };

  return { content, loading };
};
