import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Github, Chrome, Info, ShieldCheck } from 'lucide-react';
import { GlassCard } from './Glow';

interface Props {
  onBack: () => void;
  onSuccess: () => void;
}

export const AuthPage: React.FC<Props> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic Client-side Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      triggerShake();
      return;
    }

    setIsLoading(true);
    // Simulate auth delay for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1500);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <GlassCard className={`w-full max-max-w-md p-8 md:p-10 space-y-8 border-white/20 transition-transform ${isShaking ? 'animate-shake' : ''}`}>
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
             <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                <ShieldCheck className="w-8 h-8 text-white opacity-50" />
             </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-zinc-500 text-sm">
            {mode === 'login' 
              ? 'Enter your credentials to access your orders' 
              : 'Join the community of coffee enthusiasts'}
          </p>
        </div>

        {/* Demo Info Tooltip */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start animate-in slide-in-from-top-2 duration-700">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-200/70 leading-relaxed">
            <span className="font-bold text-blue-400 block mb-1 uppercase tracking-tighter">Demo Environment</span>
            No real account is required. You may enter any valid email format to proceed to the authenticated store view.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-700 text-white"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-700 text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-left-2">{error}</p>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all disabled:opacity-50 active:scale-[0.98] group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold"><span className="bg-zinc-950 px-4 text-zinc-600">Secure Gateway</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-tighter">
            <Github className="w-4 h-4" /> Github
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-tighter">
            <Chrome className="w-4 h-4" /> Google
          </button>
        </div>

        <p className="text-center text-sm text-zinc-500 pt-2">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-white hover:underline underline-offset-4 font-bold"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>

        <div className="text-center pt-2">
          <button onClick={onBack} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-mono uppercase tracking-widest">
            &larr; Return to Roastery
          </button>
        </div>
      </GlassCard>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
};