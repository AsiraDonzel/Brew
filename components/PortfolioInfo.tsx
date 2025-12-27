import React from 'react';
import { PORTFOLIO_CONTENT } from '../constants';
import { ShieldCheck, Layout, Zap, Package } from 'lucide-react';
import { GlassCard } from './Glow';

export const PortfolioInfo: React.FC = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          {PORTFOLIO_CONTENT.headline}
        </h2>
        <p className="text-lg text-zinc-400 leading-relaxed">
          {PORTFOLIO_CONTENT.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-8 space-y-4 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-blue-500/10 transition-colors">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold">Security First</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Safe handling of user input, Stripe PCI compliance, and secure state management.
          </p>
        </GlassCard>

        <GlassCard className="p-8 space-y-4 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-purple-500/10 transition-colors">
            <Layout className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold">Premium UI</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Linear aesthetic with dark-mode focus, glassmorphism, and subtle glow effects.
          </p>
        </GlassCard>

        <GlassCard className="p-8 space-y-4 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-yellow-500/10 transition-colors">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <h3 className="text-xl font-semibold">Micro-Interactions</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Smooth transitions, animated cart updates, and responsive hover states.
          </p>
        </GlassCard>

        <GlassCard className="p-8 space-y-4 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-green-500/10 transition-colors">
            <Package className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold">Clean Tech Stack</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Built with React 19, Tailwind CSS, TypeScript, and Stripe API integration.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};