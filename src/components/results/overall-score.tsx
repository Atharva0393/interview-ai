"use client";

import React, { useState, useEffect } from "react";
import { Award, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

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
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#111827] to-violet-950/60 border border-blue-500/30 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Hero Content */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Performance Classification: Strong Performance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Overall Interview Readiness Score
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            You demonstrated solid technical understanding and clear communication throughout the interview. You are demonstrating a good level of interview readiness; with focused improvement in a few areas, you can further strengthen your overall performance.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20">
              Technical: <strong className="text-white">88%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-violet-500/10 text-violet-300 border border-violet-500/20">
              Communication: <strong className="text-white">84%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Confidence: <strong className="text-white">81%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Engagement: <strong className="text-white">86%</strong>
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
                stroke="#1e293b"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * animatedScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Score Number Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {animatedScore}
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +6% Above Target Benchmark
          </span>
        </div>
      </div>
    </div>
  );
}
