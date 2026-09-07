"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, TrendingUp } from "lucide-react";

export function OverallScore() {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < 84) return prev + 2;
        clearInterval(timer);
        return 84;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Hero Content */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Performance Classification: Strong Performance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Overall Interview Readiness Score
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            You demonstrated solid technical understanding and clear communication throughout the interview. You are demonstrating a good level of interview readiness; with focused improvement in a few areas, you can further strengthen your overall performance.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-slate-900 border border-stone-200">
              Technical: <strong className="text-slate-900">88%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-slate-900 border border-stone-200">
              Communication: <strong className="text-slate-900">84%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
              Confidence: <strong className="text-slate-900">81%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-stone-100 text-slate-800 border border-stone-200">
              Engagement: <strong className="text-slate-900">86%</strong>
            </span>
          </div>
        </div>

        {/* Right Animated Circular Score Visualization */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Outer Progress Ring SVG */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#f4f3ef"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#111111"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * animatedScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>

            {/* Score Number Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {animatedScore}
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +6% Above Target Benchmark
          </span>
        </div>
      </div>
    </div>
  );
}
