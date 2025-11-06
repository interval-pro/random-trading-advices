interface HeroProps {
  onGetAdvice: () => void;
}

export const Hero = ({ onGetAdvice }: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-18 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative max-w-5xl mx-auto text-center z-10">
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-medium text-amber-300">Certified RNG Technology</span>
        </div>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
          Are you tired of always losing money on trading?
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
          Stocks are unpredictable. We offer you random advice for just{' '}
          <span className="font-bold text-amber-400">$5 USD</span> - 
          guaranteed better results than traditional analysis.
        </p>
        <button
          onClick={onGetAdvice}
          className="mb-12 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-5 px-10 rounded-xl text-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 uppercase tracking-wide cursor-pointer"
        >
          GET ADVICE NOW
        </button>
        <div className="relative bg-gradient-to-br from-slate-800/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 mb-12 border border-slate-700/50 shadow-2xl shadow-black/50">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl"></div>
          <div className="relative">
            <p className="text-lg mb-3 text-gray-200 font-light">
              Our advice is not based on deep analysis or market research.
            </p>
            <p className="text-xl font-semibold text-white">
              It's completely random - and that's our guarantee.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-gray-400">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/30"></div>
          <svg className="w-5 h-5 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-medium tracking-wider uppercase">Instant Random Generation</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/30"></div>
        </div>
      </div>
    </section>
  );
};

