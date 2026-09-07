"use client";

import React from "react";
import { Mic } from "lucide-react";

export function CommunicationAnalysis() {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Mic className="w-4 h-4 text-slate-900" />
          Communication & Speech Analysis
        </h3>
        <span className="text-[10px] font-mono text-slate-400">Simulated Verbal Analysis</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">Speech Clarity</span>
          <div className="text-lg font-extrabold text-slate-900">88%</div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">Fluency</span>
          <div className="text-lg font-extrabold text-slate-900">84%</div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">Tone</span>
          <div className="text-xs font-bold text-slate-900">Confident</div>
        </div>

        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">Structure</span>
          <div className="text-xs font-bold text-emerald-700">Good (STAR)</div>
        </div>
      </div>

      {/* Speaking Pace Visual Gauge */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">Speaking Pace Gauge</span>
          <span className="text-slate-900 font-bold">Optimal (138 wpm)</span>
        </div>

        <div className="relative py-2">
          <div className="w-full h-2 rounded-full bg-stone-200 flex overflow-hidden">
            <div className="w-1/3 bg-stone-300" />
            <div className="w-1/3 bg-slate-900" />
            <div className="w-1/3 bg-stone-300" />
          </div>

          {/* Marker at center (Optimal zone) */}
          <div className="absolute top-0 left-[58%] -translate-x-1/2 flex flex-col items-center">
            <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white shadow-2xs" />
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
          <span>Slow (&lt;110 wpm)</span>
          <span className="text-emerald-700 font-bold">Optimal (130–150 wpm)</span>
          <span>Fast (&gt;170 wpm)</span>
        </div>
      </div>
    </div>
  );
}
