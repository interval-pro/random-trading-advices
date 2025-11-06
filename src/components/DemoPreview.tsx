export const DemoPreview = () => {
  const examples = [
    { symbol: 'AAPL', action: 'BUY', time: '2024-11-06 10:23 AM' },
    { symbol: 'TSLA', action: 'SELL', time: '2024-11-06 09:15 AM' },
    { symbol: 'MSFT', action: 'BUY', time: '2024-11-06 08:42 AM' },
    { symbol: 'GOOGL', action: 'SELL', time: '2024-11-05 3:55 PM' },
    { symbol: 'AMZN', action: 'BUY', time: '2024-11-05 2:18 PM' },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-black to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            See Our Random Advice in Action
          </h2>
          <p className="text-center text-gray-400 mb-4 text-lg font-light">
            Here are some recent examples of our completely random trading recommendations
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-black/40 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-white tracking-tight">{example.symbol}</span>
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-bold shadow-lg ${
                      example.action === 'BUY'
                        ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-400/30'
                        : 'bg-gradient-to-br from-red-500 to-red-600 text-white border border-red-400/30'
                    }`}
                  >
                    {example.action}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Generated: {example.time}</span>
                </div>
                <div className="pt-6 border-t border-slate-700/50">
                  <p className="text-xs text-gray-500 italic font-light">
                    Randomly generated - no analysis performed
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-gray-400 italic font-light max-w-2xl mx-auto">
            Each recommendation is generated using our Certified RNG system. 
            Results may vary. Past randomness does not guarantee future randomness.
          </p>
        </div>
      </div>
    </section>
  );
};

