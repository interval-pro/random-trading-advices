import { useState, useEffect } from 'react';
import { STOCKS } from '../utils/stockData';
import { STRIPE_PAYMENT_LINK } from '../config/stripe';
import { getDiscountByCode, type DiscountConfig } from '../config/discounts';
import { generateAdvice } from '../utils/generateAdvice';
import type { TradingAdvice } from '../utils/generateAdvice';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateAdvice: (advice: TradingAdvice) => void;
}

export const PaymentModal = ({ isOpen, onClose, onGenerateAdvice }: PaymentModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'stocks' | 'crypto' | 'random'>('random');
  const [selectedStock, setSelectedStock] = useState<string>('RANDOM');
  const [tradeTerm, setTradeTerm] = useState<'Short-term' | 'Long-term' | 'Random'>('Random');
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscountConfig, setAppliedDiscountConfig] = useState<DiscountConfig | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isApplyingDiscount, setIsApplyingDiscount] = useState<boolean>(false);
  const [discountError, setDiscountError] = useState<string | null>(null);
  
  const stripePaymentLink = STRIPE_PAYMENT_LINK;
  const isPaymentDisabled = !stripePaymentLink;
  
  const BASE_PRICE = 5;
  
  // Apply discount code with loading state
  const handleApplyDiscount = async () => {
    // Clear previous error and discount
    setDiscountError(null);
    setAppliedDiscountConfig(null);
    
    // If code is empty, just clear
    if (!discountCode.trim()) {
      return;
    }
    
    setIsApplyingDiscount(true);
    
    // Simulate backend request delay (1-2 seconds)
    const delay = Math.floor(Math.random() * 1000) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Lookup discount code
    const discountConfig = getDiscountByCode(discountCode);
    
    if (discountConfig) {
      // Valid code - apply discount
      setAppliedDiscountConfig(discountConfig);
      setDiscountError(null);
    } else {
      // Invalid code
      setDiscountError('Invalid discount code. Please try again.');
      setAppliedDiscountConfig(null);
    }
    
    setIsApplyingDiscount(false);
  };
  
  // Calculate final price
  const appliedDiscount = appliedDiscountConfig?.discount || 0;
  const finalPrice = Math.max(0, BASE_PRICE * (1 - appliedDiscount / 100));
  const discountAmount = BASE_PRICE - finalPrice;
  const isFree = finalPrice === 0;
  
  // Get the Stripe link to use (discount-specific or default)
  const getStripeLink = (): string | null => {
    if (appliedDiscountConfig) {
      // If link is "FREE" or null, it's a free discount
      if (appliedDiscountConfig.link === 'FREE' || appliedDiscountConfig.link === null) {
        return null; // Will trigger instant generation
      }
      // Otherwise use the discount-specific link
      return appliedDiscountConfig.link;
    }
    // No discount, use default link
    return stripePaymentLink;
  };

  // Reset discount state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setDiscountCode('');
      setAppliedDiscountConfig(null);
      setIsGenerating(false);
      setIsApplyingDiscount(false);
      setDiscountError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter stocks based on selected category
  const availableStocks = selectedCategory === 'random'
    ? STOCKS
    : STOCKS.filter(s => {
        if (selectedCategory === 'stocks') {
          return s.type === 'stock';
        } else if (selectedCategory === 'crypto') {
          return s.type === 'crypto';
        }
        return true;
      });

  const handlePayment = async () => {
    const paymentLink = getStripeLink();
    
    // If no payment link (FREE discount), generate advice instantly
    if (!paymentLink) {
      setIsGenerating(true);
      
      // Wait 3-4 seconds (random between 3000-4000ms)
      const delay = Math.floor(Math.random() * 1000) + 3000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Generate advice based on selections
      const stockSymbol = selectedStock === 'RANDOM' ? undefined : selectedStock;
      const category = selectedCategory === 'random' ? undefined : selectedCategory;
      const advice = generateAdvice(tradeTerm, category, stockSymbol);
      
      // Close payment modal and show advice
      onClose();
      onGenerateAdvice(advice);
      setIsGenerating(false);
      return;
    }
    
    // Otherwise, proceed with Stripe payment

    // Clear any old payment data before starting new payment
    localStorage.removeItem('paymentSelections');
    sessionStorage.removeItem('paymentSelections');

    // Store user selections in localStorage before redirecting (more persistent than sessionStorage)
    const stockSymbol = selectedStock === 'RANDOM' ? undefined : selectedStock;
    const category = selectedCategory === 'random' ? undefined : selectedCategory;
    
    const selections = {
      tradeTerm,
      category,
      selectedStock: stockSymbol,
      timestamp: Date.now() // Add timestamp to expire old selections
    };
    
    localStorage.setItem('paymentSelections', JSON.stringify(selections));
    // Also store in sessionStorage as backup
    sessionStorage.setItem('paymentSelections', JSON.stringify(selections));

    // Build the Stripe Payment Link URL with success and cancel URLs
    const currentUrl = window.location.origin;
    const successUrl = `${currentUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${currentUrl}/?payment=cancelled`;
    
    // Append success and cancel URLs to the payment link
    const paymentUrl = new URL(paymentLink);
    paymentUrl.searchParams.set('success_url', successUrl);
    paymentUrl.searchParams.set('cancel_url', cancelUrl);
    
    // Redirect to Stripe Payment Link
    window.location.href = paymentUrl.toString();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div 
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-6 lg:p-8 max-w-sm md:max-w-lg lg:max-w-xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto modal-scroll border border-slate-700/50 shadow-2xl shadow-black/60 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-3 md:mb-4 lg:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 md:mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Get Your Random Advice
          </h2>
          <p className="text-gray-400 text-xs md:text-sm font-light">
            Select category, trade term, and optionally a specific stock
          </p>
        </div>

        <div className="mb-2.5 md:mb-3 lg:mb-4">
          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 lg:mb-3">
            Trade Term <span className="text-amber-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-1.5 md:gap-2 lg:gap-3">
            <button
              type="button"
              onClick={() => setTradeTerm('Random')}
              className={`px-2 py-2 md:px-4 md:py-3 rounded-xl font-semibold transition-all duration-300 border text-xs md:text-sm cursor-pointer ${
                tradeTerm === 'Random'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500/50 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/80 text-gray-300 border-slate-700/50 hover:border-amber-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              🎲 Random
            </button>
            <button
              type="button"
              onClick={() => setTradeTerm('Short-term')}
              className={`px-2 py-2 md:px-4 md:py-3 rounded-xl font-semibold transition-all duration-300 border text-xs md:text-sm cursor-pointer ${
                tradeTerm === 'Short-term'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500/50 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/80 text-gray-300 border-slate-700/50 hover:border-amber-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Short-term
            </button>
            <button
              type="button"
              onClick={() => setTradeTerm('Long-term')}
              className={`px-2 py-2 md:px-4 md:py-3 rounded-xl font-semibold transition-all duration-300 border text-xs md:text-sm cursor-pointer ${
                tradeTerm === 'Long-term'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500/50 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/80 text-gray-300 border-slate-700/50 hover:border-amber-500/30'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Long-term
            </button>
          </div>
        </div>

        <div className="mb-2.5 md:mb-3 lg:mb-4">
          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 lg:mb-3">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as 'stocks' | 'crypto' | 'random');
              setSelectedStock('RANDOM'); // Reset stock selection when category changes
            }}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="random" className="bg-slate-800">🎲 Random (All)</option>
            <option value="stocks" className="bg-slate-800">📈 Stocks Only</option>
            <option value="crypto" className="bg-slate-800">₿ Crypto Only</option>
          </select>
        </div>

        <div className="mb-3 md:mb-4 lg:mb-6">
          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2 lg:mb-3">
            Choose Stock (Optional)
          </label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          >
            <option value="RANDOM" className="bg-slate-800">
              🎲 Random (Recommended)
            </option>
            {availableStocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol} className="bg-slate-800">
                {stock.symbol} - {stock.name}
              </option>
            ))}
          </select>
        </div>

        {/* Discount Badge */}
        {appliedDiscount > 0 && (
          <div className="mb-3 md:mb-4 flex justify-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm md:text-base shadow-lg shadow-green-500/30 animate-pulse">
              -{appliedDiscount}%
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 rounded-xl p-2.5 md:p-3 lg:p-4 mb-3 md:mb-4 lg:mb-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-gray-400 text-xs md:text-sm">Price</span>
            <div className="flex flex-col items-end">
              {appliedDiscount > 0 && (
                <span className="text-xs text-gray-500 line-through mb-0.5">${BASE_PRICE} USD</span>
              )}
              <span className={`text-xl md:text-2xl font-bold ${isFree ? 'text-green-400' : 'text-amber-400'}`}>
                ${finalPrice.toFixed(2)} USD
              </span>
            </div>
          </div>
          {appliedDiscount > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-xs md:text-sm">Discount</span>
              <span className="text-green-400 text-xs md:text-sm font-semibold">-${discountAmount.toFixed(2)} USD</span>
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs md:text-sm">Trade Term</span>
            <span className="text-gray-300 text-xs md:text-sm font-semibold">{tradeTerm}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-xs md:text-sm">Category</span>
            <span className="text-gray-300 text-xs md:text-sm">
              {selectedCategory === 'random' ? 'Random' : selectedCategory === 'stocks' ? 'Stocks' : 'Crypto'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs md:text-sm">Stock Selection</span>
            <span className="text-gray-300 text-xs md:text-sm">
              {selectedStock === 'RANDOM' ? 'Random' : STOCKS.find(s => s.symbol === selectedStock)?.symbol}
            </span>
          </div>
        </div>

        {/* Discount Code Input */}
        <div className="mb-3 md:mb-4">
          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1.5 md:mb-2">
            Discount Code (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={discountCode}
              onChange={(e) => {
                // Only allow changes if no discount is applied
                if (!appliedDiscountConfig) {
                  setDiscountCode(e.target.value);
                  // Clear error when user types
                  if (discountError) setDiscountError(null);
                }
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isApplyingDiscount && !appliedDiscountConfig) {
                  handleApplyDiscount();
                }
              }}
              placeholder="Enter code"
              disabled={isApplyingDiscount || !!appliedDiscountConfig}
              readOnly={!!appliedDiscountConfig}
              className={`flex-1 bg-slate-800/80 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 transition-all ${
                discountError
                  ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50'
                  : appliedDiscountConfig
                  ? 'border-green-500/50 focus:ring-green-500/50 focus:border-green-500/50'
                  : 'border-slate-700/50 focus:ring-amber-500/50 focus:border-amber-500/50'
              } ${isApplyingDiscount || appliedDiscountConfig ? 'opacity-60 cursor-not-allowed' : ''}`}
            />
            {appliedDiscountConfig ? (
              <button
                type="button"
                onClick={() => {
                  setAppliedDiscountConfig(null);
                  setDiscountCode('');
                  setDiscountError(null);
                }}
                className="px-4 py-3 bg-slate-700/80 text-white font-semibold rounded-xl hover:bg-slate-600/80 transition-all duration-300 text-sm flex items-center justify-center min-w-[80px] cursor-pointer"
                title="Remove discount"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={isApplyingDiscount}
                className={`px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-sm flex items-center justify-center min-w-[80px] ${
                  isApplyingDiscount ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isApplyingDiscount ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Apply'
                )}
              </button>
            )}
          </div>
          {discountError && (
            <p className="text-red-400 text-xs mt-1.5">{discountError}</p>
          )}
          {appliedDiscountConfig && !discountError && (
            <p className="text-green-400 text-xs mt-1.5">Discount applied!</p>
          )}
        </div>

        <button
          onClick={handlePayment}
          disabled={isPaymentDisabled || isGenerating}
          className={`w-full font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isPaymentDisabled || isGenerating
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 cursor-pointer'
          }`}
          aria-disabled={isPaymentDisabled || isGenerating}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Generating Advice...</span>
            </>
          ) : (
            'Get Advice'
          )}
        </button>

        {!isFree && (
          <p className="text-xs text-gray-500 text-center mt-4 italic font-light">
            You will be redirected to Stripe to complete your payment
          </p>
        )}
      </div>
    </div>
  );
};

