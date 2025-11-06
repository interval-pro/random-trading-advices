export const DemoPreview = () => {

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
        
        {/* Actions Collage Image */}
        <div className="mb-16">
          <div className="flex items-center justify-center">
            <div className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl shadow-2xl shadow-black/40 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1 max-w-5xl w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img 
                src="/actions.png" 
                alt="How it works - Actions collage" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
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

