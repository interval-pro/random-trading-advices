import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { PaymentModal } from './components/PaymentModal';
import { AdviceModal } from './components/AdviceModal';
import { generateAdvice } from './utils/generateAdvice';
import type { TradingAdvice } from './utils/generateAdvice';

export const App = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [generatedAdvice, setGeneratedAdvice] = useState<TradingAdvice | null>(null);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isPaymentModalOpen || isAdviceModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPaymentModalOpen, isAdviceModalOpen]);

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

  const handlePaymentSuccess = (
    tradeTerm: 'Short-term' | 'Long-term' | 'Random',
    category?: 'stocks' | 'crypto' | 'random',
    selectedStock?: string
  ) => {
    // Generate advice based on trade term, category, and selected stock
    const advice = generateAdvice(tradeTerm, category, selectedStock);
    setGeneratedAdvice(advice);
    setIsAdviceModalOpen(true);
  };

  const handleCloseAdviceModal = () => {
    setIsAdviceModalOpen(false);
    setGeneratedAdvice(null);
  };

  return (
    <div className="min-h-screen">
      <Hero onGetAdvice={handleOpenPaymentModal} />
      <HowItWorks />
      <Pricing onGetAdvice={handleOpenPaymentModal} />
      <Testimonials />
      <Footer />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <AdviceModal
        isOpen={isAdviceModalOpen}
        onClose={handleCloseAdviceModal}
        advice={generatedAdvice}
      />
    </div>
  );
};

