interface PricingProps {
  onGetAdvice: () => void;
}

export const Pricing = ({ onGetAdvice }: PricingProps) => {

  return (
    <>
      <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-black to-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Get Your Random Trading Advice
          </h2>
          <p className="text-xl mb-16 text-gray-300 font-light">
            Receive one completely random trading recommendation for just <span className="text-4xl font-bold text-amber-400">$5 USD</span>
          </p>
          <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-xl rounded-3xl p-10 mb-12 border border-slate-700/50 shadow-2xl shadow-black/50 max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 rounded-3xl"></div>
            <div className="relative">
              <div className="text-center mb-8">
                <div className="text-7xl font-extrabold mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">$5</div>
                <p className="text-gray-400 text-sm font-light">One-time payment</p>
              </div>
              <div className="space-y-4 mb-10 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-200">One random stock recommendation</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-200">BUY or SELL action (randomly selected)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-200">Certified RNG guarantee</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/20">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-200">No analysis, no stress, no false promises</span>
                </div>
              </div>
              <button
                onClick={onGetAdvice}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-5 px-8 rounded-xl text-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 uppercase tracking-wide cursor-pointer"
              >
                GET ADVICE
              </button>
            </div>
          </div>
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

