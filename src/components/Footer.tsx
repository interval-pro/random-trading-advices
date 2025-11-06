export const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-slate-800 text-gray-400 py-16 px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Random Trading Advice
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Honest randomness for honest traders. No false promises, just transparent randomness.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Disclaimer</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Our advice is completely random and for entertainment purposes only. 
              Trading involves risk. Past randomness does not guarantee future randomness.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Contact</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-light">
              Questions about our random advice? We're here to help.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            &copy; {new Date().getFullYear()} Random Trading Advice. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-light">
            This service provides random trading advice. Results are not guaranteed. Trade at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
};

