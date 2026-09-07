"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface CandidateCameraProps {
  isPaused: boolean;
}

export function CandidateCamera({ isPaused }: CandidateCameraProps) {
  return (
    <div className="relative aspect-video rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between p-4 shadow-2xs group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-950/90 pointer-events-none" />

      {/* Simulated Candidate Video Silhouette Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-3">
        <div className="relative">
          <div
            className={`w-24 h-24 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shadow-2xs ${
              !isPaused ? "animate-pulse" : ""
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center font-bold text-lg text-slate-900 shadow-2xs">
              AK
            </div>
          </div>
        </div>

        <div className="text-center space-y-0.5">
          <span className="text-xs font-bold text-white block">Atharva Kale</span>
          <span className="text-[10px] text-stone-400">Candidate Video Feed (Simulated)</span>
        </div>
      </div>

      {/* Top Overlay Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700/60 text-[11px] text-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Camera Preview • Simulated</span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-stone-800/80 backdrop-blur-md border border-stone-700 text-[10px] font-mono text-stone-300">
          1080p • 60 FPS
        </div>
      </div>

      {/* Bottom Status Overlay */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Eye & Posture Tracking Active</span>
        </div>

        <div className="text-[10px] text-stone-400 font-mono">
          Simulated Stream
        </div>
      </div>
    </div>
  );
}
