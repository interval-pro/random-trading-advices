import type { Stock } from './stockData';
import { getRandomStock, getStockBySymbol, STOCKS } from './stockData';

export interface TradingAdvice {
  stock: Stock;
  action: 'BUY' | 'SELL';
  tradeTerm: 'Short-term' | 'Long-term';
  closeDate: string;
  timestamp: string;
  isTradeTermRandom: boolean;
  isCategoryRandom: boolean;
  isStockRandom: boolean;
}

const generateCloseDate = (tradeTerm: 'Short-term' | 'Long-term'): string => {
  const now = new Date();
  let daysToAdd: number;
  
  // Generate days based on term
  if (tradeTerm === 'Short-term') {
    // Short-term: 1-30 days in the future
    daysToAdd = Math.floor(Math.random() * 30) + 1;
  } else {
    // Long-term: 30-365 days in the future
    daysToAdd = Math.floor(Math.random() * 335) + 30;
  }
  
  // Create future date
  const closeDate = new Date(now);
  closeDate.setDate(now.getDate() + daysToAdd);
  
  // Format date nicely
  return closeDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const generateAdvice = (
  tradeTerm: 'Short-term' | 'Long-term' | 'Random',
  selectedCategory?: 'stocks' | 'crypto' | 'random',
  selectedStockSymbol?: string
): TradingAdvice => {
  let stock: Stock;
  let isStockRandom: boolean;
  let isCategoryRandom: boolean;
  
  // If specific stock is selected, use it
  if (selectedStockSymbol) {
    stock = getStockBySymbol(selectedStockSymbol) || getRandomStock();
    isStockRandom = !getStockBySymbol(selectedStockSymbol);
    // When a specific stock is selected, category is not relevant, but we need to set it
    // We'll determine it based on whether a category was specified
    if (selectedCategory === 'stocks' || selectedCategory === 'crypto') {
      isCategoryRandom = false;
    } else {
      isCategoryRandom = true;
    }
  } else {
    isStockRandom = true;
    // Filter by category if specified
    let availableStocks: Stock[];
    if (selectedCategory === 'stocks') {
      availableStocks = STOCKS.filter(s => s.type === 'stock');
      isCategoryRandom = false;
    } else if (selectedCategory === 'crypto') {
      availableStocks = STOCKS.filter(s => s.type === 'crypto');
      isCategoryRandom = false;
    } else {
      // Random category - use all stocks
      availableStocks = STOCKS;
      isCategoryRandom = true;
    }
    
    // Randomly select from available stocks (ensure we have stocks available)
    if (availableStocks.length > 0) {
      stock = availableStocks[Math.floor(Math.random() * availableStocks.length)];
    } else {
      stock = getRandomStock(); // Fallback if no stocks available
    }
  }
  
  // Randomly generate BUY or SELL
  const action = Math.random() < 0.5 ? 'BUY' : 'SELL';
  
  // Determine the actual term if Random was selected
  let actualTerm: 'Short-term' | 'Long-term';
  const isTradeTermRandom = tradeTerm === 'Random';
  if (isTradeTermRandom) {
    actualTerm = Math.random() < 0.5 ? 'Short-term' : 'Long-term';
  } else {
    actualTerm = tradeTerm;
  }
  
  // Generate close date based on actual term
  const closeDate = generateCloseDate(actualTerm);
  
  // Generate timestamp
  const now = new Date();
  const timestamp = now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  
  return {
    stock,
    action,
    tradeTerm: actualTerm, // Store the actual term (not "Random")
    closeDate,
    timestamp,
    isTradeTermRandom,
    isCategoryRandom,
    isStockRandom,
  };
};

