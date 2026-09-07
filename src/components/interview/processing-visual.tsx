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
      <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-violet-200 border-dashed animate-spin-slow flex items-center justify-center relative">
        {/* Outer Rotating Concentric Ring 2 */}
        <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-violet-300 border-t-violet-600 animate-spin-reverse flex items-center justify-center">
          {/* Inner AI Orb Container */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-violet-50 border border-violet-200 p-1 flex items-center justify-center shadow-2xs relative">
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center space-y-1 relative overflow-hidden border border-stone-200">
              <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-violet-600 animate-pulse" />

              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {Math.round(progress)}%
              </div>
              <span className="text-[10px] font-mono font-bold text-violet-800 uppercase tracking-wider">
                Synthesizing
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e5e3de] text-xs font-bold text-slate-800 shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-violet-600" />
        <span>Analyzing Interview {Math.round(progress)}%</span>
      </div>
    </div>
  );
}
