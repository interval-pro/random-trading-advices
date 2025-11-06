export interface Stock {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto';
}

export const STOCKS: Stock[] = [
  // Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock' },
  { symbol: 'META', name: 'Meta Platforms Inc.', type: 'stock' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'stock' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', type: 'stock' },
  { symbol: 'V', name: 'Visa Inc.', type: 'stock' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', type: 'stock' },
  { symbol: 'WMT', name: 'Walmart Inc.', type: 'stock' },
  { symbol: 'PG', name: 'Procter & Gamble Co.', type: 'stock' },
  { symbol: 'MA', name: 'Mastercard Inc.', type: 'stock' },
  { symbol: 'DIS', name: 'The Walt Disney Company', type: 'stock' },
  { symbol: 'NFLX', name: 'Netflix Inc.', type: 'stock' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', type: 'stock' },
  { symbol: 'INTC', name: 'Intel Corporation', type: 'stock' },
  { symbol: 'BAC', name: 'Bank of America Corp.', type: 'stock' },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation', type: 'stock' },
  { symbol: 'CVX', name: 'Chevron Corporation', type: 'stock' },
  
  // Crypto
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto' },
  { symbol: 'BNB', name: 'Binance Coin', type: 'crypto' },
  { symbol: 'SOL', name: 'Solana', type: 'crypto' },
  { symbol: 'ADA', name: 'Cardano', type: 'crypto' },
  { symbol: 'XRP', name: 'Ripple', type: 'crypto' },
  { symbol: 'DOT', name: 'Polkadot', type: 'crypto' },
  { symbol: 'DOGE', name: 'Dogecoin', type: 'crypto' },
  { symbol: 'AVAX', name: 'Avalanche', type: 'crypto' },
  { symbol: 'MATIC', name: 'Polygon', type: 'crypto' },
];

export const getRandomStock = (): Stock => {
  return STOCKS[Math.floor(Math.random() * STOCKS.length)];
};

export const getStockBySymbol = (symbol: string): Stock | undefined => {
  return STOCKS.find(stock => stock.symbol === symbol);
};

