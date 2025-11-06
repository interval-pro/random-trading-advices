import { AnimatedSection } from '../components/AnimatedSection';
import { Footer } from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnimatedSection animation="fade-slide">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        </AnimatedSection>

        <AnimatedSection animation="fade-slide" delay={100}>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>
                We collect minimal information necessary to provide our random trading advice service. This includes:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>User selections (category, trade term, stock selection) made during the advice generation process</li>
                <li>Generated advice data stored locally in your browser (localStorage)</li>
                <li>Basic usage analytics (if cookies are accepted)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p>
                The information we collect is used solely to:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Generate random trading advice based on your selections</li>
                <li>Improve our service and user experience</li>
                <li>Analyze usage patterns (anonymously, if analytics are enabled)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Storage</h2>
              <p>
                All generated advice is stored locally in your browser using localStorage. We do not store your personal information on our servers. 
                You can clear this data at any time by clearing your browser's localStorage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
              <p>
                We use cookies only for analytics purposes (if you consent) and to remember your cookie preferences. 
                You can manage cookie preferences through the cookie consent banner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
              <p>
                We do not share your information with third parties. Our service operates entirely client-side, 
                with no backend servers storing your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Access your locally stored data</li>
                <li>Delete your locally stored data by clearing browser storage</li>
                <li>Opt out of analytics cookies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us through the contact information provided in the footer.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

