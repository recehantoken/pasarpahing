
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            This Cookie Policy explains how Pasar Pahing uses cookies and similar technologies to
            recognize you when you visit our website. It explains what these technologies are and
            why we use them, as well as your rights to control our use of them.
          </p>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small data files that are placed on your computer or mobile device when
                you visit a website. Cookies are widely used by website owners in order to make their
                websites work, or to work more efficiently, as well as to provide reporting information.
                Cookies set by the website owner (in this case, Pasar Pahing) are called "first-party cookies."
                Cookies set by parties other than the website owner are called "third-party cookies."
                Third-party cookies enable third-party features or functionality to be provided on or
                through the website (e.g., advertising, interactive content, and analytics).
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Types of Cookies We Use</h2>
              <p className="text-muted-foreground mb-3">
                We use the following types of cookies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies are necessary for the website to function and cannot be switched off
                    in our systems. They are usually only set in response to actions made by you which
                    amount to a request for services, such as setting your privacy preferences, logging
                    in, or filling in forms. You can set your browser to block or alert you about these
                    cookies, but some parts of the site will not then work.
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies allow us to count visits and traffic sources so we can measure and
                    improve the performance of our site. They help us to know which pages are the most
                    and least popular and see how visitors move around the site. All information these
                    cookies collect is aggregated and therefore anonymous.
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Functionality Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies enable the website to provide enhanced functionality and personalization.
                    They may be set by us or by third-party providers whose services we have added to our
                    pages. If you do not allow these cookies, then some or all of these services may not
                    function properly.
                  </p>
                </div>
                
                <div className="bg-card rounded-lg p-5 shadow-sm">
                  <h3 className="text-xl font-medium mb-2">Targeting Cookies</h3>
                  <p className="text-muted-foreground">
                    These cookies may be set through our site by our advertising partners. They may be
                    used by those companies to build a profile of your interests and show you relevant
                    advertisements on other sites. They do not store directly personal information but
                    are based on uniquely identifying your browser and internet device.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. How to Control Cookies</h2>
              <p className="text-muted-foreground mb-3">
                You can control and manage cookies in various ways. Please keep in mind that removing
                or blocking cookies can negatively impact your user experience and parts of our website
                may no longer be fully accessible.
              </p>
              
              <p className="text-muted-foreground mb-3">
                Most browsers automatically accept cookies, but you can choose whether or not to accept
                cookies through your browser controls, which are typically found in your browser's
                "Tools" or "Preferences" menu. For more information on how to modify your browser
                settings or how to block, manage, or filter cookies can be found in your browser's help
                file or through sites like <a href="https://www.allaboutcookies.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>
              
              <p className="text-muted-foreground">
                Additionally, please note that blocking cookies may not completely prevent how we share
                information with third parties such as our advertising partners. To exercise your rights
                or opt-out of certain uses of your information by these parties, please follow the
                instructions in the "Behavioral Advertising" section below.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Behavioral Advertising</h2>
              <p className="text-muted-foreground">
                As described above, we use your Personal Information to provide you with targeted
                advertisements or marketing communications we believe may be of interest to you.
                For more information about how targeted advertising works, you can visit the Network
                Advertising Initiative's ("NAI") educational page at
                <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
                </a>.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Changes to this Cookie Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time in order to reflect, for example,
                changes to the cookies we use or for other operational, legal, or regulatory reasons.
                Please therefore re-visit this Cookie Policy regularly to stay informed about our use
                of cookies and related technologies.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies or other technologies, please email
                us at privacy@pasarpahing.com.
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

export default CookiePolicy;
