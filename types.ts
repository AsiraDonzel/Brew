
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  flavorProfile: string[];
  roast: 'Light' | 'Medium' | 'Dark';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PortfolioCopy {
  headline: string;
  description: string;
  securityNote: string;
  visualEnhancements: string[];
}
