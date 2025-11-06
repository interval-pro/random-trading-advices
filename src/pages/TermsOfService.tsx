import { AnimatedSection } from '../components/AnimatedSection';
import { Footer } from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnimatedSection animation="fade-slide">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        </AnimatedSection>

        <AnimatedSection animation="fade-slide" delay={100}>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Random Trading Advice, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
              <p>
                Random Trading Advice provides completely random trading recommendations for entertainment purposes only. 
                Our service generates random BUY or SELL recommendations based on random selection algorithms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. No Financial Advice</h2>
              <p>
                Our service does NOT provide financial advice. All recommendations are generated randomly and are for entertainment purposes only. 
                You should NOT make trading decisions based on our random recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Obligations</h2>
              <p>By using this service, you agree to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                <li>Use the service only for entertainment purposes</li>
                <li>Not rely on our random recommendations for actual trading decisions</li>
                <li>Understand that all advice is completely random and not based on any analysis</li>
                <li>Accept full responsibility for any trading decisions you make</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p>
                Random Trading Advice shall not be liable for any losses, damages, or financial consequences resulting from the use of our service. 
                Trading involves substantial risk of loss and is not suitable for all investors.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Payment Terms</h2>
              <p>
                Payment for our service is processed through our payment provider. All payments are final and non-refundable. 
                The service fee is $5 USD per random advice generation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Service Availability</h2>
              <p>
                We reserve the right to modify, suspend, or discontinue the service at any time without notice. 
                We do not guarantee uninterrupted access to the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us through the contact information provided in the footer.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;

