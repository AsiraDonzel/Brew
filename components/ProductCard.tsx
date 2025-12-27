import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.05] transition-all duration-500 rounded-2xl overflow-hidden p-4">
      {/* Optimized Image with Lazy Loading */}
      <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-zinc-900 border border-white/5">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono mb-1 block">
              {product.roast} Roast
            </span>
            <h3 className="text-xl font-medium tracking-tight text-white">{product.name}</h3>
          </div>
          <span className="text-zinc-300 font-mono bg-white/5 px-2 py-1 rounded text-sm">${product.price}</span>
        </div>
        
        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-1">
          {product.flavorProfile.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-[0.15em] px-2 py-1 rounded-md bg-white/[0.03] text-zinc-400 border border-white/[0.05] group-hover:border-white/20 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button 
        onClick={() => onAddToCart(product)}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-xl"
      >
        <Plus className="w-4 h-4" />
        Add to Cart
      </button>
    </div>
  );
};