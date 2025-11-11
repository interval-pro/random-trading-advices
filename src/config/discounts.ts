// Discount Codes Configuration
// Each discount code has:
// - code: The discount code string (case-insensitive)
// - link: Stripe payment link (string URL) or "FREE" for 100% discount, or null for free
// - discount: Discount percentage (0-100)

export interface DiscountConfig {
  code: string;
  link: string | null | 'FREE';
  discount: number;
}

// Stripe Payment Links
// You can add test/prod variants similar to stripe.ts if needed
const STRIPE_PAYMENT_LINK_XMAS50_TEST = 'https://buy.stripe.com/test_6oUfZjfk5aZE6gAbAIf7i01'; // Replace with actual XMAS50 test link
const STRIPE_PAYMENT_LINK_XMAS50_PROD = 'https://buy.stripe.com/6oU9AV4Frd7McEYgV2f7i00'; // Replace with actual XMAS50 prod link

const STRIPE_PAYMENT_LINK_XMAS50 = import.meta.env.DEV 
  ? STRIPE_PAYMENT_LINK_XMAS50_TEST 
  : STRIPE_PAYMENT_LINK_XMAS50_PROD;

// Discount codes configuration
export const DISCOUNT_CODES: DiscountConfig[] = [
  {
    code: 'MAGIC100',
    link: 'FREE', // 100% discount - instant generation, no Stripe
    discount: 100,
  },
  {
    code: 'XMAS50',
    link: STRIPE_PAYMENT_LINK_XMAS50, // 50% discount - use custom Stripe link
    discount: 50,
  },
];

/**
 * Get discount configuration by code (case-insensitive)
 * @param code - The discount code to lookup
 * @returns DiscountConfig if found, null otherwise
 */
export const getDiscountByCode = (code: string): DiscountConfig | null => {
  const normalizedCode = code.trim().toUpperCase();
  return DISCOUNT_CODES.find(d => d.code.toUpperCase() === normalizedCode) || null;
};

