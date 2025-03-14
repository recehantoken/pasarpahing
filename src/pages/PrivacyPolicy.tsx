
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            At Pasar Pahing, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Create an account</li>
                <li>Make a purchase</li>
                <li>Contact customer support</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in surveys, contests, or promotions</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                This information may include your name, email address, postal address, phone number,
                payment information, and any other information you choose to provide.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Automatically Collected Information</h2>
              <p className="text-muted-foreground mb-3">
                When you access or use our platform, we automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Log Information: IP address, browser type, access times, pages viewed, and other browsing activities</li>
                <li>Device Information: Device type, operating system, and unique device identifiers</li>
                <li>Location Information: General location based on IP address</li>
                <li>Cookies and Similar Technologies: Information collected through cookies and similar tracking technologies</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our platform and services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, promotions, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our platform</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience on our platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Sharing of Information</h2>
              <p className="text-muted-foreground mb-3">
                We may share the information we collect in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>With vendors, service providers, and consultants that perform services for us</li>
                <li>With other users as part of the marketplace functionality</li>
                <li>In response to a request for information if we believe disclosure is in accordance with applicable law</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
              <p className="text-muted-foreground">
                We take reasonable measures to help protect your personal information from loss, theft,
                misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet
                or electronic transmission is fully secure or error-free.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Choices</h2>
              <p className="text-muted-foreground mb-3">
                You have several choices regarding the information we collect and how it's used:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><strong>Account Information:</strong> You may update, correct, or delete your account information at any time by logging into your account</li>
                <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies</li>
                <li><strong>Promotional Communications:</strong> You may opt out of receiving promotional emails by following the instructions in those emails</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our platform is not directed to children under 13, and we do not knowingly collect personal
                information from children under 13. If we learn we have collected personal information from
                a child under 13, we will delete that information.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. If we make material changes, we will
                notify you by email or through a notice on our platform. We encourage you to review the
                Privacy Policy whenever you access our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@pasarpahing.com.
              </p>
            </section>
          </div>
          
          <p className="text-muted-foreground mt-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
