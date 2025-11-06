import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { DemoPreview } from './components/DemoPreview';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <DemoPreview />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

