import { useState, useEffect } from 'react';
import type { TradingAdvice } from '../utils/generateAdvice';
import { ConfirmExitModal } from './ConfirmExitModal';
import confetti from 'canvas-confetti';

interface AdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  advice: TradingAdvice | null;
  onGetAnotherAdvice: () => void;
}

export const AdviceModal = ({ isOpen, onClose, advice, onGetAnotherAdvice }: AdviceModalProps) => {
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [showConfirmAnother, setShowConfirmAnother] = useState(false);

  useEffect(() => {
    if (isOpen && advice) {
      // Trigger confetti animation when advice modal opens
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }
  }, [isOpen, advice]);

  if (!isOpen || !advice) return null;

  const handleCloseClick = () => {
    setShowConfirmExit(true);
  };

  const handleConfirmExit = () => {
    setShowConfirmExit(false);
    onClose();
  };

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  };

  const handleGetAnotherClick = () => {
    setShowConfirmAnother(true);
  };

  const handleConfirmAnother = () => {
    setShowConfirmAnother(false);
    onClose();
    onGetAnotherAdvice();
  };

  const handleCancelAnother = () => {
    setShowConfirmAnother(false);
  };

  const generateAdviceImage = async (): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas size
      canvas.width = 650;
      canvas.height = 650;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Left padding
      const leftPadding = 40;

      // Title
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Random Trading Advice', leftPadding, 80);

      // Stock Symbol and Action Badge (side by side)
      const stockY = 180;
      const stockSymbolX = leftPadding;
      
      // Stock Symbol (large)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 72px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(advice.stock.symbol, stockSymbolX, stockY);
      
      // Action Badge (to the right of stock symbol)
      const actionX = canvas.width - 220;
      const actionY = stockY - 50;
      const actionWidth = 180;
      const actionHeight = 80;
      
      const actionGradient = ctx.createLinearGradient(actionX, actionY, actionX + actionWidth, actionY + actionHeight);
      if (advice.action === 'BUY') {
        actionGradient.addColorStop(0, '#10b981');
        actionGradient.addColorStop(1, '#059669');
      } else {
        actionGradient.addColorStop(0, '#ef4444');
        actionGradient.addColorStop(1, '#dc2626');
      }
      ctx.fillStyle = actionGradient;
      ctx.fillRect(actionX, actionY, actionWidth, actionHeight);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 40px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(advice.action, actionX + actionWidth / 2, actionY + 55);
      
      // Stock Name (below stock symbol)
      ctx.fillStyle = '#9ca3af';
      ctx.font = '32px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(advice.stock.name, stockSymbolX, stockY + 50);

      // Details section
      let yPos = 320;
      const lineHeight = 50;
      ctx.font = '28px Arial';
      ctx.textAlign = 'left';

      // Trade Term
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('Trade Term:', leftPadding, yPos);
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`${advice.tradeTerm} (${advice.isTradeTermRandom ? 'Random' : 'Preselected'})`, leftPadding + 250, yPos);
      yPos += lineHeight;

      // Type
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('Type:', leftPadding, yPos);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${advice.stock.type.charAt(0).toUpperCase() + advice.stock.type.slice(1)} (${advice.isCategoryRandom ? 'Random' : 'Preselected'})`, leftPadding + 250, yPos);
      yPos += lineHeight;

      // Stock Symbol
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('Stock Symbol:', leftPadding, yPos);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${advice.stock.symbol} (${advice.isStockRandom ? 'Random' : 'Preselected'})`, leftPadding + 250, yPos);
      yPos += lineHeight;

      // Close Date
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('When to Close:', leftPadding, yPos);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(advice.closeDate, leftPadding + 250, yPos);
      yPos += lineHeight;

      // Timestamp
      ctx.fillStyle = '#6b7280';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Generated: ${advice.timestamp}`, leftPadding, yPos + 30);

      // Footer
      ctx.fillStyle = '#4b5563';
      ctx.font = '16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('This is completely random advice. Trading involves risk.', leftPadding, canvas.height - 40);

      // Convert to blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    });
  };

  const handleSave = async () => {
    try {
      const blob = await generateAdviceImage();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `trading-advice-${advice.stock.symbol}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to save image:', err);
      alert('Failed to save image. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      const blob = await generateAdviceImage();
      const file = new File([blob], `trading-advice-${advice.stock.symbol}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'Random Trading Advice',
            text: `Random Trading Advice: ${advice.action} ${advice.stock.symbol} - ${advice.tradeTerm} trade`,
            files: [file],
          });
        } catch (err) {
          // User cancelled or error occurred
          console.log('Share cancelled');
        }
      } else {
        // Fallback: copy image to clipboard
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ]);
          alert('Advice image copied to clipboard!');
        } catch (err) {
          // If clipboard API fails, download the image
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `trading-advice-${advice.stock.symbol}-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert('Image downloaded. Please share it manually.');
        }
      }
    } catch (err) {
      console.error('Failed to share image:', err);
      alert('Failed to share image. Please try again.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div 
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 lg:p-10 max-w-sm md:max-w-2xl lg:max-w-3xl w-full max-h-[calc(100vh-2rem)] overflow-y-auto modal-scroll border border-slate-700/50 shadow-2xl shadow-black/60 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleCloseClick}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg z-10 cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-3 md:mb-4 lg:mb-6">
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-3 md:mb-4">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-xs md:text-sm font-medium text-amber-300">Certified RNG Generated</span>
          </div>
          
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 md:mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Your Random Trading Advice
          </h2>
        </div>

        <div className="bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 rounded-2xl p-3 md:p-5 lg:p-7 mb-3 md:mb-4 lg:mb-6 border border-slate-700/50 backdrop-blur-xl">
          <div className="mb-3 md:mb-4 lg:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs md:text-sm text-gray-400 mb-1 font-light">Stock Symbol</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight">{advice.stock.symbol}</p>
                <p className="text-xs md:text-sm text-gray-400 mt-1 font-light">{advice.stock.name}</p>
              </div>
              <div className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-base md:text-lg font-bold shadow-lg ${
                advice.action === 'BUY'
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border border-emerald-400/30'
                  : 'bg-gradient-to-br from-red-500 to-red-600 text-white border border-red-400/30'
              }`}>
                {advice.action}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-xl p-2.5 md:p-3 lg:p-4 border border-amber-500/20 mb-3 md:mb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-3 mb-2 md:mb-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1 font-light">
                    Trade Term <span className="text-amber-500/70">({advice.isTradeTermRandom ? 'Random' : 'Preselected'})</span>
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-amber-400">{advice.tradeTerm}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-400 mb-1 font-light">
                    Type <span className="text-amber-500/70">({advice.isCategoryRandom ? 'Random' : 'Preselected'})</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-300 capitalize">{advice.stock.type}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-amber-500/20">
                <div className="mb-3">
                  <p className="text-xs text-gray-400 mb-1 font-light">
                    Stock Symbol <span className="text-amber-500/70">({advice.isStockRandom ? 'Random' : 'Preselected'})</span>
                  </p>
                  <p className="text-sm font-semibold text-gray-300">{advice.stock.symbol}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1 font-light">When to Close</p>
                  <p className="text-base md:text-lg font-bold text-white">{advice.closeDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 md:pt-4 lg:pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-400 mb-1.5 md:mb-2">
              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Generated: {advice.timestamp}</span>
            </div>
            <p className="text-xs text-gray-500 italic font-light mt-2">
              This advice was randomly generated using our Certified RNG system. No analysis was performed.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <span className="text-xs md:text-sm">Save</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-300 shadow-lg shadow-slate-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="text-xs md:text-sm">Share</span>
            </button>
          </div>
          <button
            onClick={handleGetAnotherClick}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-xs md:text-sm">Get Another Advice</span>
          </button>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent rounded-xl p-2.5 md:p-3 lg:p-4 border border-amber-500/20">
          <p className="text-xs md:text-sm text-gray-300 text-center font-light leading-relaxed">
            <strong className="text-amber-400">Remember:</strong> This is completely random advice. 
            Trading involves risk. Past randomness does not guarantee future randomness.
          </p>
        </div>
      </div>

      <ConfirmExitModal
        isOpen={showConfirmExit}
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
      />

      <ConfirmExitModal
        isOpen={showConfirmAnother}
        onConfirm={handleConfirmAnother}
        onCancel={handleCancelAnother}
        title="Get Another Advice?"
        message="Are you sure you want to get another advice? You will lose the current advice information if not saved."
        confirmText="Get Another"
        confirmButtonClass="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/30"
      />
    </div>
  );
};

