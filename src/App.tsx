import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
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

const AppContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [generatedAdvice, setGeneratedAdvice] = useState<TradingAdvice | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Handle payment return from Stripe
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');
    
    // Only process if we have a payment status
    if (!paymentStatus) return;
    
    // Check if we've already processed this session
    const processedSessions = JSON.parse(localStorage.getItem('processedSessions') || '[]');
    if (sessionId && processedSessions.includes(sessionId)) {
      console.log('Session already processed, skipping');
      setSearchParams({});
      return;
    }
    
    // If no sessionId but we have payment=success, check if we recently processed (within last 5 seconds)
    // This prevents duplicate processing when URL params persist
    if (paymentStatus === 'success' && !sessionId) {
      const lastProcessed = localStorage.getItem('lastPaymentProcessed');
      if (lastProcessed && Date.now() - parseInt(lastProcessed) < 5000) {
        console.log('Recently processed payment, skipping');
        setSearchParams({});
        return;
      }
    }
    
    // Debug: Log what we're seeing
    console.log('Payment return detected:', {
      paymentStatus,
      sessionId,
      allParams: Object.fromEntries(searchParams.entries()),
      sessionStorage: sessionStorage.getItem('paymentSelections')
    });

    if (paymentStatus === 'success') {
      // Try to retrieve user selections from localStorage first, then sessionStorage
      let storedSelections = localStorage.getItem('paymentSelections');
      if (!storedSelections) {
        storedSelections = sessionStorage.getItem('paymentSelections');
      }
      
      console.log('Stored selections:', storedSelections);
      
      if (storedSelections) {
        try {
          const selections = JSON.parse(storedSelections);
          const { tradeTerm, category, selectedStock, timestamp } = selections;
          
          // Check if selections are too old (more than 1 hour)
          if (timestamp && Date.now() - timestamp > 3600000) {
            console.warn('Selections are too old, generating random advice');
            // Generate random advice as fallback
            const advice = generateAdvice('Random', undefined, undefined);
            setGeneratedAdvice(advice);
            setIsAdviceModalOpen(true);
          } else {
            console.log('Parsed selections:', { tradeTerm, category, selectedStock });
            
            // Generate advice based on stored selections
            const advice = generateAdvice(tradeTerm, category, selectedStock);
            setGeneratedAdvice(advice);
            setIsAdviceModalOpen(true);
          }
          
          console.log('Advice generated, opening modal');
          
          // Mark this session as processed
          if (sessionId) {
            processedSessions.push(sessionId);
            // Keep only last 10 sessions to prevent localStorage from growing too large
            if (processedSessions.length > 10) {
              processedSessions.shift();
            }
            localStorage.setItem('processedSessions', JSON.stringify(processedSessions));
          }
          // Also mark timestamp for cases without sessionId
          localStorage.setItem('lastPaymentProcessed', Date.now().toString());
          
          // Clean up storage and URL parameters
          localStorage.removeItem('paymentSelections');
          sessionStorage.removeItem('paymentSelections');
          setSearchParams({});
        } catch (error) {
          console.error('Error parsing payment selections:', error);
          // Fallback: generate random advice
          const advice = generateAdvice('Random', undefined, undefined);
          setGeneratedAdvice(advice);
          setIsAdviceModalOpen(true);
          // Mark this session as processed
          if (sessionId) {
            processedSessions.push(sessionId);
            if (processedSessions.length > 10) {
              processedSessions.shift();
            }
            localStorage.setItem('processedSessions', JSON.stringify(processedSessions));
          }
          localStorage.setItem('lastPaymentProcessed', Date.now().toString());
          
          localStorage.removeItem('paymentSelections');
          sessionStorage.removeItem('paymentSelections');
          setSearchParams({});
        }
      } else {
        console.warn('No stored selections found, generating random advice as fallback');
        // Fallback: generate random advice if selections are missing
        const advice = generateAdvice('Random', undefined, undefined);
        setGeneratedAdvice(advice);
        setIsAdviceModalOpen(true);
        
        // Mark this session as processed
        if (sessionId) {
          processedSessions.push(sessionId);
          if (processedSessions.length > 10) {
            processedSessions.shift();
          }
          localStorage.setItem('processedSessions', JSON.stringify(processedSessions));
        }
        localStorage.setItem('lastPaymentProcessed', Date.now().toString());
        
        setSearchParams({});
      }
    } else if (paymentStatus === 'cancelled') {
      setPaymentError('Payment was cancelled. You can try again anytime.');
      // Clean up URL parameters
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

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
    // Clear any old payment status from URL when opening payment modal
    const currentPaymentStatus = searchParams.get('payment');
    if (currentPaymentStatus) {
      setSearchParams({});
    }
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };


  const handleCloseAdviceModal = () => {
    setIsAdviceModalOpen(false);
    setGeneratedAdvice(null);
    setPaymentError(null);
  };

  return (
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
      />

      <AdviceModal
        isOpen={isAdviceModalOpen}
        onClose={handleCloseAdviceModal}
        advice={generatedAdvice}
      />

      {/* Payment Error Modal */}
      {paymentError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 max-w-md w-full border border-slate-700/50 shadow-2xl shadow-black/60 rounded-xl">
            <button
              onClick={handleCloseAdviceModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Payment Status
              </h2>
              <p className="text-gray-300">{paymentError}</p>
            </div>
            <button
              onClick={handleCloseAdviceModal}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <CookieBanner />
    </div>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

