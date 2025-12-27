
import React from 'react';

export const Glow: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute -z-10 blur-[120px] rounded-full opacity-20 pointer-events-none ${className}`} />
);

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);
