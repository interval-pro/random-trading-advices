import { AnimatedSection } from '../components/AnimatedSection';
import { Footer } from '../components/Footer';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <AnimatedSection animation="fade-slide">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Disclaimer
          </h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        </AnimatedSection>

        <AnimatedSection animation="fade-slide" delay={100}>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section className="bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-l-4 border-red-500 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Important Warning</h2>
              <p className="text-white font-semibold">
                Random Trading Advice provides COMPLETELY RANDOM trading recommendations. These recommendations are NOT based on any analysis, 
                research, or market data. They are generated using random number generators for entertainment purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">No Guarantees</h2>
              <p>
                We make NO guarantees about the accuracy, reliability, or profitability of our random recommendations. 
                Past randomness does not guarantee future randomness. Each recommendation is independent and random.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Trading Risks</h2>
              <p>
                Trading stocks, cryptocurrencies, and other financial instruments involves substantial risk of loss. 
                You may lose some or all of your investment. Trading is not suitable for everyone. 
                You should carefully consider whether trading is appropriate for you in light of your circumstances, 
                knowledge, and financial resources.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Not Financial Advice</h2>
              <p>
                Our service does NOT constitute financial advice, investment advice, or trading advice. 
                We are NOT licensed financial advisors. Our random recommendations should NOT be used as the basis 
                for any trading decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Randomness Guarantee</h2>
              <p>
                We guarantee that our recommendations are completely random. We do NOT guarantee profits, 
                positive returns, or any specific outcomes. The randomness of our recommendations means 
                that results are unpredictable and may result in losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">User Responsibility</h2>
              <p>
                You are solely responsible for any trading decisions you make. Random Trading Advice shall not be liable 
                for any losses, damages, or financial consequences resulting from the use of our service or any trading 
                decisions made based on our random recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Entertainment Purpose</h2>
              <p>
                This service is provided for entertainment purposes only. It is a satirical take on trading advice services 
                that promise guaranteed results. We are honest about the randomness - something most trading advisors cannot offer.
              </p>
            </section>

            <section className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-amber-400 mb-4">Final Reminder</h2>
              <p className="text-white font-semibold">
                Trading involves risk. Our advice is random. Do not trade with money you cannot afford to lose. 
                If you are looking for actual trading advice, please consult a licensed financial advisor.
              </p>
            </section>
          </div>
        </AnimatedSection>
      </div>
      <Footer />
    </div>
  );
};

export default Disclaimer;

