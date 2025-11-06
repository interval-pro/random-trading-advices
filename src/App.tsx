import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { PaymentModal } from './components/PaymentModal';
import { AdviceModal } from './components/AdviceModal';
import { CookieBanner } from './components/CookieBanner';
import { Skeleton } from './components/Skeleton';
import { generateAdvice } from './utils/generateAdvice';
import type { TradingAdvice } from './utils/generateAdvice';

// Lazy load legal pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));

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
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <Home onGetAdvice={handleOpenPaymentModal} />
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Skeleton width={200} height={200} /></div>}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/terms"
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Skeleton width={200} height={200} /></div>}>
                <TermsOfService />
              </Suspense>
            }
          />
          <Route
            path="/disclaimer"
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Skeleton width={200} height={200} /></div>}>
                <Disclaimer />
              </Suspense>
            }
          />
        </Routes>

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

        <CookieBanner />
      </div>
    </BrowserRouter>
  );
};

