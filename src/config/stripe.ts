// Stripe Payment Link Configuration
// Automatically uses test URL for development (npm run dev) and production URL for builds (npm run build)

const STRIPE_PAYMENT_LINK_TEST = 'https://buy.stripe.com/test_5kQ28kgag0F5beC11FcV200';
const STRIPE_PAYMENT_LINK_PROD = 'https://buy.stripe.com/5kQ28kgag0F5beC11FcV200';

// Use test URL in development mode, production URL in production builds
// import.meta.env.DEV is true when running npm run dev
// import.meta.env.PROD is true when running npm run build
export const STRIPE_PAYMENT_LINK = import.meta.env.DEV 
  ? STRIPE_PAYMENT_LINK_TEST 
  : STRIPE_PAYMENT_LINK_PROD;

