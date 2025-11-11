import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { initializeGA } from '../utils/analytics';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Initialize Google Analytics when user accepts cookies
    initializeGA();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50 shadow-2xl backdrop-blur-xl">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-300 leading-relaxed">
            We use cookies to analyze site usage and improve your experience. By clicking "Accept", you consent to our use of cookies.
            <Link to="/privacy" className="text-amber-400 hover:text-amber-300 underline ml-1">
              Learn more
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/30 text-sm font-medium cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

