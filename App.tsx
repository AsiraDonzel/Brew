import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ShoppingBag, Coffee, Star, Terminal, Sparkles, Send, CheckCircle2, User } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { PortfolioInfo } from './components/PortfolioInfo';
import { Glow, GlassCard } from './components/Glow';
import { AuthPage } from './components/AuthPage';
import { OriginsPage } from './components/OriginsPage';
import { getCoffeeRecommendation } from './services/geminiService';

type View = 'home' | 'origins' | 'auth';
type FilterType = 'All' | 'Light' | 'Medium' | 'Dark';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('home');
  const [filter, setFilter] = useState<FilterType>('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutProcessing, setIsCheckoutProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Derived state for filtered products
  const filteredProducts = useMemo(() => {
    if (filter === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.roast === filter);
  }, [filter]);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCheckoutProcessing(true);
    setTimeout(() => {
      setIsCheckoutProcessing(false);
      setCheckoutComplete(true);
      setCartItems([]);
      setIsCartOpen(false);
      setTimeout(() => setCheckoutComplete(false), 5000);
    }, 2500);
  };

  const askAiSommelier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const recommendation = await getCoffeeRecommendation(aiPrompt, PRODUCTS);
    setAiResponse(recommendation);
    setIsAiLoading(false);
  };

  const handleAuthSuccess = () => {
    setUser({ email: 'demo@example.com' });
    setActiveView('home');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'origins':
        return <OriginsPage onBack={() => setActiveView('home')} />;
      case 'auth':
        return <AuthPage onBack={() => setActiveView('home')} onSuccess={handleAuthSuccess} />;
      default:
        return (
          <>
            <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span>Premium Bean Selection</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic">
                  MINIMALIST <br />
                  <span className="text-zinc-600">STIMULANT.</span>
                </h1>
                <p className="text-xl text-zinc-400 max-w-md leading-relaxed">
                  Ethically sourced, precision roasted, and delivered in sustainable, premium packaging. Experience coffee as it was meant to be.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#store" className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95">
                    Shop The Roast
                  </a>
                  <button 
                    onClick={() => setActiveView('origins')}
                    className="bg-white/5 border border-white/10 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
                  >
                    View Origins
                  </button>
                </div>
              </div>

              <GlassCard className="p-8 space-y-6 relative group border-white/20">
                <div className="absolute -top-4 -right-4 bg-blue-600 p-3 rounded-2xl shadow-xl shadow-blue-500/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">AI Coffee Sommelier</h3>
                  <p className="text-zinc-500 text-sm">Describe your vibe or flavor preference.</p>
                </div>
                
                <form onSubmit={askAiSommelier} className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Describe your perfect brew..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700"
                    />
                    <button 
                      type="submit"
                      disabled={isAiLoading}
                      className="absolute right-2 top-2 h-10 w-10 bg-white text-black rounded-lg flex items-center justify-center hover:bg-zinc-200 transition-colors disabled:opacity-50"
                    >
                      {isAiLoading ? <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                </form>

                {aiResponse && (
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <p className="text-sm text-zinc-300 leading-relaxed font-medium italic">
                      "{aiResponse}"
                    </p>
                  </div>
                )}
              </GlassCard>
            </section>

            <section id="store" className="py-24 max-w-7xl mx-auto px-6 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
                <div className="space-y-2">
                  <h2 className="text-4xl font-bold tracking-tight">Curated Blends</h2>
                  <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Inventory List — 2025</p>
                </div>
                <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
                  {['All', 'Light', 'Medium', 'Dark'].map(item => (
                    <button 
                      key={item} 
                      onClick={() => setFilter(item as FilterType)}
                      className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-tighter transition-all ${
                        filter === item ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={handleAddToCart}
                    />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-600">
                    <Coffee className="w-12 h-12 mb-4 opacity-20" />
                    <p className="font-mono uppercase tracking-widest">No roasts match this criteria</p>
                  </div>
                )}
              </div>
            </section>

            <PortfolioInfo />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-white/20 selection:text-white">
      <Glow className="top-20 left-20 w-[400px] h-[400px] bg-blue-600" />
      <Glow className="bottom-20 right-20 w-[500px] h-[500px] bg-purple-600" />
      <Glow className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-600" />

      <nav className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => setActiveView('home')} className="flex items-center gap-2 group">
            <Coffee className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xl tracking-tighter">BREW.</span>
          </button>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/10 rounded-full transition-colors group"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center rounded-full font-bold animate-pulse">
                  {cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 pl-3 pr-2 py-1.5 rounded-full">
                <span className="text-xs font-medium text-zinc-400">Hi, Demo</span>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-black" />
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setActiveView('auth')}
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors hidden sm:block"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {renderContent()}

        <section className="py-32 bg-black border-y border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center space-y-12">
            <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10">
              <Terminal className="w-8 h-8 text-zinc-500" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white">Built with modern architecture.</h2>
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <span className="text-2xl font-bold">React 19</span>
               <span className="text-2xl font-bold">TailwindCSS</span>
               <span className="text-2xl font-bold">Stripe SDK</span>
               <span className="text-2xl font-bold">TypeScript</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/[0.05] text-center text-zinc-600 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <button onClick={() => setActiveView('home')} className="flex items-center gap-2">
            <Coffee className="w-4 h-4" />
            <span className="font-bold tracking-tighter">BREW. STORE DEMO</span>
          </button>
          <p>© 2025 Portfolio Showcase. Built for educational demonstration.</p>
          <div className="flex gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {isCheckoutProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 border-4 border-white border-t-transparent animate-spin rounded-full mx-auto" />
            <h2 className="text-2xl font-bold tracking-tight">Securing your payment...</h2>
            <p className="text-zinc-500 font-mono">Connecting to Stripe Payment Gateway</p>
          </div>
        </div>
      )}

      {checkoutComplete && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-green-500 text-black px-6 py-4 rounded-2xl flex items-center gap-3 font-bold shadow-2xl shadow-green-500/20">
            <CheckCircle2 className="w-6 h-6" />
            Order Successful! Enjoy your brew.
          </div>
        </div>
      )}
    </div>
  );
};

export default App;