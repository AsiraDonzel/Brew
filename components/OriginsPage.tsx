import React from 'react';
import { Globe, Leaf, Mountain, Droplets, ArrowLeft, ThermometerSun } from 'lucide-react';
import { GlassCard } from './Glow';

const ORIGINS = [
  {
    region: "Yirgacheffe, Ethiopia",
    altitude: "1,700 - 2,200m",
    process: "Washed / Natural",
    description: "Known as the birthplace of Arabica coffee, Yirgacheffe offers distinct floral notes and a tea-like body that is unmatched globally.",
    icon: <Mountain className="w-6 h-6 text-blue-400" />,
    climate: "Highland Tropical"
  },
  {
    region: "Huila, Colombia",
    altitude: "1,200 - 1,800m",
    process: "Fully Washed",
    description: "The volcanic soil of the Huila region produces beans with bright acidity and a sweet, caramelly finish that defines the Colombian classic profile.",
    icon: <Leaf className="w-6 h-6 text-green-400" />,
    climate: "Volcanic Equatorial"
  },
  {
    region: "Mandheling, Sumatra",
    altitude: "1,100 - 1,500m",
    process: "Giling Basah (Wet-Hulled)",
    description: "Sumatran coffees are world-renowned for their low acidity, full body, and unique earthy, spicy notes developed through traditional processing.",
    icon: <Droplets className="w-6 h-6 text-purple-400" />,
    climate: "Humid Tropical"
  }
];

interface Props {
  onBack: () => void;
}

export const OriginsPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="py-24 max-w-5xl mx-auto px-6 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-6">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Roastery
        </button>
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic">
            BEYOND THE <br />
            <span className="text-zinc-700">TERROIR.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">
            We partner with small-scale estates that prioritize ecological integrity. 
            Every selection is a snapshot of soil chemistry, micro-climate, and generational craft.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {ORIGINS.map((origin, idx) => (
          <GlassCard 
            key={idx} 
            className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start hover:border-white/20 transition-all group relative overflow-hidden"
          >
            {/* Background Accent for premium feel */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-white/10 to-transparent" />
            
            <div className="w-20 h-20 bg-white/[0.03] rounded-3xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/[0.07] group-hover:scale-110 transition-all duration-500 shadow-2xl">
              {origin.icon}
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">Batch Origin 00{idx + 1}</span>
                   <div className="h-px flex-1 bg-white/5" />
                </div>
                <h3 className="text-4xl font-bold tracking-tight text-white">{origin.region}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Mountain className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Elevation</span>
                  </div>
                  <p className="text-zinc-300 font-mono text-sm">{origin.altitude}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Globe className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Method</span>
                  </div>
                  <p className="text-zinc-300 font-mono text-sm">{origin.process}</p>
                </div>

                <div className="space-y-1 col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <ThermometerSun className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Climate</span>
                  </div>
                  <p className="text-zinc-300 font-mono text-sm">{origin.climate}</p>
                </div>
              </div>

              <p className="text-zinc-400 leading-relaxed text-lg font-light italic border-l-2 border-white/5 pl-6 py-1">
                "{origin.description}"
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="text-center py-20 space-y-4">
        <div className="inline-block p-px rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent w-full max-w-md mb-8" />
        <p className="text-zinc-600 text-sm font-mono tracking-tight">
          Interested in our ethical sourcing data? 
          <button className="text-zinc-400 hover:text-white underline underline-offset-8 decoration-white/20 hover:decoration-white transition-all ml-2">
            Request Transparency Report
          </button>
        </p>
      </div>
    </div>
  );
};