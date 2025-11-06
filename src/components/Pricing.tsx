import { AnimatedSection } from './AnimatedSection';

interface PricingProps {
  onGetAdvice: () => void;
}

export const Pricing = ({ onGetAdvice }: PricingProps) => {

  return (
    <>
      <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-black to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(120,119,198,0.1),transparent_50%)] parallax-bg"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] parallax-bg"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <AnimatedSection animation="fade-slide">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Get Your Random Trading Advice
            </h2>
          </AnimatedSection>
          <p className="text-xl md:text-2xl mb-12 text-gray-300 font-light max-w-3xl mx-auto">
            Receive one completely random trading recommendation for just{' '}
            <span className="text-5xl md:text-2xl font-bold text-amber-400">$5 USD</span>
          </p>
          
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-200 text-lg font-medium">One random stock recommendation</p>
                  <p className="text-gray-400 text-sm font-light mt-1">Stocks or crypto, randomly selected</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-200 text-lg font-medium">BUY or SELL action</p>
                  <p className="text-gray-400 text-sm font-light mt-1">Randomly generated, 50/50 chance</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-200 text-lg font-medium">Certified RNG guarantee</p>
                  <p className="text-gray-400 text-sm font-light mt-1">100% random, verified system</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-gray-200 text-lg font-medium">No analysis, no stress</p>
                  <p className="text-gray-400 text-sm font-light mt-1">No false promises, just honesty</p>
                </div>
              </div>
            </div>
          </div>

          <AnimatedSection animation="fade-slide" delay={200}>
            <div className="mb-16">
              <button
                onClick={onGetAdvice}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-6 px-12 rounded-xl text-2xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 hover:scale-105 active:scale-95 uppercase tracking-wide cursor-pointer"
              >
                GET ADVICE NOW
              </button>
            </div>
          </AnimatedSection>

          <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-xl shadow-black/40 max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl"></div>
            <p className="relative text-xl font-semibold mb-3 text-white">Our Guarantee</p>
            <p className="relative text-gray-300 leading-relaxed font-light">
              We guarantee that our advice is completely random. We don't guarantee profits, 
              but we guarantee honesty - something most trading advisors can't offer.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

