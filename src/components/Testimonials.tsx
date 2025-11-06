export const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Former Day Trader',
      quote: 'I spent thousands on trading courses and lost more. For $5, I got the same random results but with honesty. Best investment ever.',
      rating: 5,
    },
    {
      name: 'John D.',
      role: 'Retail Investor',
      quote: 'Finally, a service that admits trading is random! Their random advice performed just as well as my "expert" advisor, but cost 99% less.',
      rating: 5,
    },
    {
      name: 'Emily R.',
      role: 'Stock Market Enthusiast',
      quote: 'I love the transparency. They tell you upfront it\'s random, unlike those expensive courses that promise secrets but deliver the same 50/50 odds.',
      rating: 5,
    },
    {
      name: 'Michael T.',
      role: 'Experienced Trader',
      quote: 'After 10 years of trading, I realized the market is random. This service saved me hours of "analysis" and gave me the same results. Brilliant.',
      rating: 5,
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-400 mb-4 text-lg font-light">
            Real testimonials from people who appreciate honest randomness
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 p-10 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-black/40 hover:border-amber-500/30 transition-all duration-300 hover:shadow-amber-500/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-amber-400 drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-200 mb-8 italic text-lg leading-relaxed font-light">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-slate-700/50 pt-6">
                  <p className="font-bold text-white text-lg">{testimonial.name}</p>
                  <p className="text-sm text-gray-400 font-light">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

