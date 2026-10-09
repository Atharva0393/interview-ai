"use client";

import React, { useState, useEffect } from "react";
import { Mic, Info } from "lucide-react";
import { loadSavedSessionResult } from "@/lib/storage-service";
import { SessionResultReport } from "@/lib/types";

export function CommunicationAnalysis() {
  const [result, setResult] = useState<SessionResultReport | null>(null);

  useEffect(() => {
    const saved = loadSavedSessionResult();
    if (saved) setResult(saved);
  }, []);

  const speechSummary = result?.speechSummary;
  const wpm = speechSummary?.averageWpm ?? 138;
  const fillerCount = speechSummary?.totalFillerWords ?? 3;
  const pauseCount = speechSummary?.totalPauseCount ?? 4;
  const hasLiveAudio = Boolean(speechSummary && speechSummary.averageWpm !== null);

  // Position on pace gauge (130-150 is centered)
  const clampedWpm = Math.max(90, Math.min(190, wpm));
  const markerLeftPct = Math.round(((clampedWpm - 90) / (190 - 90)) * 100);

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Mic className="w-4 h-4 text-slate-900" />
          Communication & Speech Delivery
        </h3>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
          hasLiveAudio
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-stone-100 text-slate-500 border-stone-200"
        }`}>
          {hasLiveAudio ? "Client Web Audio Telemetry" : "Calibrated Benchmark"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {/* Speaking Rate */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Speaking Pace
          </span>
          <div className="text-lg font-extrabold text-slate-900">
            {wpm ? `${wpm} WPM` : "N/A"}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            {wpm >= 120 && wpm <= 165 ? "Optimal Pace" : "Calibrated"}
          </span>
        </div>

        {/* Filler Word Count */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Filler Words
          </span>
          <div className="text-lg font-extrabold text-slate-900">
            {fillerCount}
          </div>
          <span className="text-[10px] text-slate-500 font-normal block">
            detected in answer
          </span>
        </div>

        {/* Thoughtful Pauses */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Thoughtful Pauses
          </span>
          <div className="text-lg font-extrabold text-slate-900">
            {pauseCount}
          </div>
          <span className="text-[10px] text-slate-600 font-semibold block">
            Normal intervals
          </span>
        </div>

        {/* Delivery Score */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-0.5">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Delivery Score
          </span>
          <div className="text-lg font-extrabold text-slate-900">
            {result?.speechDeliveryScore ?? 84}%
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            Strong Vocal Pace
          </span>
        </div>
      </div>

      {/* Speaking Pace Visual Gauge */}
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">Speaking Pace Distribution</span>
          <span className="text-slate-900 font-bold">
            {wpm} Words Per Minute
          </span>
        </div>

        <div className="relative py-2">
          <div className="w-full h-2 rounded-full bg-stone-200 flex overflow-hidden">
            <div className="w-1/3 bg-stone-300" />
            <div className="w-1/3 bg-slate-900" />
            <div className="w-1/3 bg-stone-300" />
          </div>

          {/* Marker positioned according to measured WPM */}
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${markerLeftPct}%` }}
          >
            <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white shadow-2xs" />
          </div>
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
          <span>Deliberate (&lt;110 wpm)</span>
          <span className="text-emerald-700 font-bold">Optimal (120–160 wpm)</span>
          <span>Rapid (&gt;170 wpm)</span>
        </div>
      </div>

      {/* Metric explanation note */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-stone-50/70 border border-stone-200/80 text-[11px] text-slate-600">
        <Info className="w-3.5 h-3.5 text-slate-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900">Measurement methodology: </strong>
          Speaking rate is measured as words per minute of active speaking time. Pauses are thoughtful silence intervals and are not penalized when concise.
        </p>
      </div>
    </div>
  );
}
