import { AnimatedSection } from './AnimatedSection';

export const HowItWorks = () => {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] parallax-bg"></div>
      <div className="relative max-w-7xl mx-auto z-10">
        <AnimatedSection animation="fade-slide">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="fade-slide" delay={100}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 p-10 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-black/30 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg shadow-amber-500/20">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Random Stock Selection</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-light">
                Our advanced algorithm randomly selects a stock from the market. No bias, no analysis - pure randomness.
              </p>
            </div>
          </div>
            <div className="group relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 p-10 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-black/30 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg shadow-amber-500/20">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-white">Random Action Generation</h3>
                </div>
                <p className="text-gray-300 leading-relaxed font-light">
                  We randomly generate either a BUY or SELL recommendation. It's a 50/50 chance - just like the market.
                </p>
              </div>
            </div>
            <div className="group relative bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 p-10 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-black/30 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg shadow-amber-500/20">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white">Receive Your Advice</h3>
              </div>
              <p className="text-gray-300 leading-relaxed font-light">
                Get your random trading advice instantly. No waiting, no analysis paralysis - just pure, unfiltered randomness.
              </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="fade-slide" delay={200}>
          <div className="relative bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-l-4 border-amber-500 p-8 rounded-xl backdrop-blur-xl shadow-xl shadow-black/40 border-t border-r border-b border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-xl"></div>
          <p className="relative text-gray-200 text-lg leading-relaxed">
            <strong className="text-amber-400 font-semibold">Why random?</strong> Traditional analysis has a 50% success rate. Our random advice also has a 50% success rate, 
            but without the hours of research, stress, and false confidence. We're honest about the randomness - and that honesty 
            is worth more than expensive trading courses.
            </p>
          </div>
        </AnimatedSection>

        {/* Actions Screenshot below "Why random?" section */}
        <AnimatedSection animation="fade-slide" delay={300}>
          <div className="mt-16">
            <div className="flex items-center justify-center">
              <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/40 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1 hover:scale-105 max-w-5xl w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img 
                  src="/actions.png" 
                  alt="How it works - Actions collage" 
                  className="w-full h-auto object-cover opacity-75"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

