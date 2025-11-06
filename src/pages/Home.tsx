import { Hero } from '../components/Hero';
import { HowItWorks } from '../components/HowItWorks';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

interface HomeProps {
  onGetAdvice: () => void;
}

export const Home = ({ onGetAdvice }: HomeProps) => {
  return (
    <>
      <Hero onGetAdvice={onGetAdvice} />
      <HowItWorks />
      <Pricing onGetAdvice={onGetAdvice} />
      <Testimonials />
      <Footer />
    </>
  );
};

