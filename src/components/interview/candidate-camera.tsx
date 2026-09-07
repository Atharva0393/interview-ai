"use client";

import React from "react";
import { Video, ShieldCheck, User } from "lucide-react";

interface CandidateCameraProps {
  isPaused: boolean;
}

export function CandidateCamera({ isPaused }: CandidateCameraProps) {
  return (
    <div className="relative aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-2xl group">
      {/* Background Camera Gradient & Simulated Video Noise */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/80 pointer-events-none" />

      {/* Simulated Candidate Video Silhouette Placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-3">
        <div className="relative">
          <div
            className={`w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600/30 to-violet-600/30 border border-blue-500/30 flex items-center justify-center shadow-2xl ${
              !isPaused ? "animate-pulse" : ""
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-extrabold text-xl text-white shadow-lg">
              AK
            </div>
          </div>

          {/* Eye tracking focal indicator ring overlay */}
          <div className="absolute -inset-2 rounded-full border border-dashed border-blue-400/30 animate-spin-slow pointer-events-none" />
        </div>

        <div className="text-center space-y-0.5">
          <span className="text-xs font-bold text-slate-200 block">Atharva Kale</span>
          <span className="text-[10px] text-slate-500">Candidate Video Feed (Simulated)</span>
        </div>
      </div>

      {/* Top Overlay Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/60 text-[11px] text-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Camera Preview • Simulated</span>
        </div>

        <div className="px-2.5 py-1 rounded-full bg-blue-950/80 backdrop-blur-md border border-blue-500/40 text-[10px] font-mono text-blue-300">
          1080p • 60 FPS
        </div>
      </div>

      {/* Bottom Status Overlay */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Eye & Posture Tracking Active</span>
        </div>

        <div className="text-[10px] text-slate-500 font-mono">
          Simulated Stream
        </div>
      </div>
    </div>
  );
}
