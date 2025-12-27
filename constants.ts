
import { Product, PortfolioCopy } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aether Origin',
    price: 24,
    description: 'A light, floral roast with hints of jasmine and citrus zest.',
    image: 'https://picsum.photos/seed/coffee1/600/600',
    flavorProfile: ['Citrus', 'Floral', 'Honey'],
    roast: 'Light'
  },
  {
    id: 'p2',
    name: 'Midnight Bloom',
    price: 28,
    description: 'Deep, complex medium roast with notes of stone fruit and chocolate.',
    image: 'https://picsum.photos/seed/coffee2/600/600',
    flavorProfile: ['Stone Fruit', 'Caramel', 'Cocoa'],
    roast: 'Medium'
  },
  {
    id: 'p3',
    name: 'Void Roast',
    price: 32,
    description: 'A bold, smoky dark roast for the espresso purist.',
    image: 'https://picsum.photos/seed/coffee3/600/600',
    flavorProfile: ['Smoke', 'Cedar', 'Dark Berry'],
    roast: 'Dark'
  }
];

export const PORTFOLIO_CONTENT: PortfolioCopy = {
  headline: "Minimalist E-commerce: Engineering the Perfect Brew",
  description: "A high-performance storefront designed for speed and conversion. This project demonstrates a full-stack integration of secure payment processing, responsive state management, and refined UI interactions using React and Node.js.",
  securityNote: "Security is paramount: I implemented Stripe’s server-side authentication to ensure PCI compliance, while utilizing robust validation on all user inputs and managing state with high-performance hooks to prevent data leaks.",
  visualEnhancements: [
    "Vercel-inspired glassmorphism and subtle border glows",
    "Framer Motion layout transitions for cart operations",
    "Micro-interactions on hover and button clicks",
    "Dynamic high-contrast typography for readability"
  ]
};
