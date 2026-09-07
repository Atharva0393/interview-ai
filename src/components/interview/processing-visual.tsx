"use client";

import React from "react";
import { Cpu, Sparkles } from "lucide-react";

interface ProcessingVisualProps {
  progress: number;
}

export function ProcessingVisual({ progress }: ProcessingVisualProps) {
  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* Outer Rotating Concentric Ring 1 */}
      <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-blue-500/20 border-dashed animate-spin-slow flex items-center justify-center relative">
        {/* Outer Rotating Concentric Ring 2 */}
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-violet-500/30 border-t-blue-500 animate-spin-reverse flex items-center justify-center">
          {/* Inner Glowing AI Orb Container */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-600/30 to-violet-600/30 border border-blue-500/40 p-1 flex items-center justify-center shadow-2xl shadow-blue-500/25 relative animate-pulse">
            <div className="w-full h-full rounded-full bg-[#0b0f19] flex flex-col items-center justify-center space-y-1 relative overflow-hidden">
              {/* Radial scanning glow overlay */}
              <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

              <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 animate-bounce" />

              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {Math.round(progress)}%
              </div>
              <span className="text-[10px] font-mono font-semibold text-blue-300 uppercase tracking-wider">
                Synthesizing
              </span>
            </div>
          </div>
        </div>

        {/* Floating Data Particles */}
        <div className="absolute top-2 right-6 w-2 h-2 rounded-full bg-blue-400 animate-ping" />
        <div className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-violet-400 animate-ping delay-300" />
      </div>

      <div className="mt-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        <span>Analyzing Interview {Math.round(progress)}%</span>
      </div>
    </div>
  );
}
