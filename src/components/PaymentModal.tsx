import { useState } from 'react';
import { STOCKS } from '../utils/stockData';
import { Skeleton } from './Skeleton';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (
    tradeTerm: 'Short-term' | 'Long-term' | 'Random',
    category?: 'stocks' | 'crypto' | 'random',
    selectedStock?: string
  ) => void;
}

export const PaymentModal = ({ isOpen, onClose, onPaymentSuccess }: PaymentModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'stocks' | 'crypto' | 'random'>('random');
  const [selectedStock, setSelectedStock] = useState<string>('RANDOM');
  const [tradeTerm, setTradeTerm] = useState<'Short-term' | 'Long-term' | 'Random'>('Random');
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);
    
    // Simulate payment processing with timeout
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setIsProcessing(false);
    const stockSymbol = selectedStock === 'RANDOM' ? undefined : selectedStock;
    const category = selectedCategory === 'random' ? undefined : selectedCategory;
    onPaymentSuccess(tradeTerm, category, stockSymbol);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        // Close if clicking on the backdrop (not the modal content)
        if (e.target === e.currentTarget && !isProcessing) {
          onClose();
        }
      }}
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
              disabled={isProcessing}
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
              disabled={isProcessing}
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
              disabled={isProcessing}
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
            disabled={isProcessing}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isProcessing}
            className="w-full bg-slate-800/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 rounded-xl p-2.5 md:p-3 lg:p-4 mb-3 md:mb-4 lg:mb-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-gray-400 text-xs md:text-sm">Price</span>
            <span className="text-xl md:text-2xl font-bold text-amber-400">$5 USD</span>
          </div>
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

        {isProcessing ? (
          <div className="space-y-3">
            <Skeleton height={56} className="w-full rounded-xl" />
            <div className="flex items-center justify-center gap-3 text-gray-400">
              <svg className="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm">Processing Payment...</span>
            </div>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl text-base md:text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Pay $5 USD</span>
          </button>
        )}

        <p className="text-xs text-gray-500 text-center mt-4 italic font-light">
          Payment is simulated for demonstration purposes
        </p>
      </div>
    </div>
  );
};

