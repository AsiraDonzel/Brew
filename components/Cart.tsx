import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ChevronRight, ShoppingBag } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export const Cart: React.FC<Props> = ({ isOpen, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Smooth scroll helper to return user to the store section
  const handleContinueShopping = () => {
    onClose();
    const storeSection = document.getElementById('store');
    if (storeSection) {
      storeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop with enhanced blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Panel with premium border treatment */}
      <div className="relative w-full max-w-md bg-zinc-950 border-l border-white/[0.08] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
        <div className="p-6 flex items-center justify-between border-b border-white/[0.05]">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight text-white">Your Cart</h2>
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
              {items.length} {items.length === 1 ? 'Item' : 'Items'} selected
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                <ShoppingBag className="w-8 h-8 text-zinc-600" />
              </div>
              <div className="space-y-2">
                <p className="text-zinc-400 font-medium">Your bag is empty</p>
                <p className="text-sm text-zinc-600 max-w-[200px]">Looks like you haven't added any stimulants to your collection yet.</p>
              </div>
              <button 
                onClick={handleContinueShopping} 
                className="text-white text-sm font-bold uppercase tracking-widest border-b border-white/20 hover:border-white transition-all pb-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-5 group animate-in slide-in-from-bottom-2 duration-300">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-zinc-200 text-lg leading-tight">{item.name}</h4>
                    <span className="text-zinc-400 font-mono text-sm">${item.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-500 font-mono uppercase tracking-tighter">Quantity: {item.quantity}</p>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-[10px] uppercase tracking-widest text-red-500/60 hover:text-red-500 flex items-center gap-1.5 transition-colors font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-white/[0.08] bg-zinc-900/30 backdrop-blur-sm space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-zinc-500">
                <span>Shipping</span>
                <span className="font-mono text-zinc-400 uppercase tracking-widest text-[10px]">Calculated at next step</span>
              </div>
              <div className="flex justify-between text-xl">
                <span className="text-zinc-400 font-light tracking-tight">Total</span>
                <span className="font-mono font-bold text-white">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={onCheckout}
              className="w-full bg-white text-black py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
            >
              Secure Checkout
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest">
              Complimentary shipping on orders over $50
            </p>
          </div>
        )}
      </div>
    </div>
  );
};