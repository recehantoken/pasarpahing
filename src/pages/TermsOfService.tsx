
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to Pasar Pahing. These Terms of Service govern your use of our website and services.
            By accessing or using our platform, you agree to be bound by these terms.
          </p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the Pasar Pahing platform, you agree to be bound by these Terms of Service
                and all applicable laws and regulations. If you do not agree with any of these terms, you are
                prohibited from using or accessing this site.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use of Services</h2>
              <p className="text-muted-foreground mb-3">
                Pasar Pahing provides an online marketplace where users can buy and sell products. You may use
                our services only as permitted by these terms and any applicable laws.
              </p>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account information, including
                your password, and for all activity that occurs under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
              <p className="text-muted-foreground mb-3">
                To use certain features of our platform, you must create an account. When you create an account,
                you agree to provide accurate, current, and complete information.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to suspend or terminate your account if any information provided during the
                registration process or thereafter proves to be inaccurate, not current, or incomplete.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Products and Listings</h2>
              <p className="text-muted-foreground mb-3">
                Sellers are responsible for the accuracy of their listings, including product descriptions,
                images, pricing, and availability.
              </p>
              <p className="text-muted-foreground">
                Pasar Pahing reserves the right to remove any listing that violates our policies or that we
                determine, in our sole discretion, is harmful to our platform, users, or third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-3">
                You agree not to engage in any of the following prohibited activities:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Violating any laws, third-party rights, or our policies</li>
                <li>Using our platform to distribute spam, unsolicited commercial messages, or advertisements</li>
                <li>Posting false, inaccurate, misleading, deceptive, defamatory, or libelous content</li>
                <li>Transferring your account to another party without our consent</li>
                <li>Harvesting or collecting user information without their consent</li>
                <li>Interfering with the proper working of the platform</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
              <p className="text-muted-foreground mb-3">
                The Pasar Pahing platform and its content, features, and functionality are owned by Pasar Pahing
                and are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property laws.
              </p>
              <p className="text-muted-foreground">
                You may not reproduce, distribute, modify, create derivative works of, publicly display,
                publicly perform, republish, download, store, or transmit any of the material on our platform
                without our prior written consent.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Pasar Pahing, its directors, employees, partners, agents, suppliers, or
                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                If a revision is material, we will provide at least 30 days' notice prior to any new terms
                taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed and construed in accordance with the laws of the United States,
                without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms, please contact us at legal@pasarpahing.com.
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

export default TermsOfService;
