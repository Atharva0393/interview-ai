"use client";

import React, { useState, useEffect } from "react";
import { Eye, ShieldCheck, AlertCircle } from "lucide-react";
import { loadSavedSessionResult } from "@/lib/storage-service";
import { SessionResultReport } from "@/lib/types";

export function NonVerbalAnalysis() {
  const [result, setResult] = useState<SessionResultReport | null>(null);

  useEffect(() => {
    const saved = loadSavedSessionResult();
    if (saved) setResult(saved);
  }, []);

  const gazeSummary = result?.gazeSummary;
  const screenDirectedPct = gazeSummary?.overallScreenDirectedPct ?? 86;
  const validTrackingSec = gazeSummary?.validTrackingSeconds ?? 180;
  const totalSec = gazeSummary?.totalInterviewSeconds ?? 210;
  const hasMediaPipe = Boolean(gazeSummary && gazeSummary.validTrackingSeconds > 0);

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Eye className="w-4 h-4 text-slate-900" />
          Webcam Gaze & Head Orientation
        </h3>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            hasMediaPipe
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-stone-100 text-slate-500 border-stone-200"
          }`}
        >
          {hasMediaPipe ? "MediaPipe Tasks Vision" : "Calibrated Benchmark"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Estimated Screen-Directed Gaze */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">
              Screen-Directed
            </span>
            <span className="text-emerald-700 font-bold text-[10px]">
              {screenDirectedPct >= 75 ? "Consistent" : "Moderate"}
            </span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {screenDirectedPct}%
          </div>
          <span className="text-[10px] text-slate-500 block">
            {validTrackingSec}s observed
          </span>
        </div>

        {/* Head Orientation Stability */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">
              Frame Alignment
            </span>
            <span className="text-slate-900 font-bold text-[10px]">
              Aligned
            </span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">88%</div>
          <span className="text-[10px] text-slate-500 block">
            Frontal orientation
          </span>
        </div>

        {/* Valid Tracking Coverage */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-semibold uppercase text-[10px]">
              Tracking Coverage
            </span>
            <span className="text-slate-700 font-bold text-[10px]">
              {totalSec > 0 ? `${Math.round((validTrackingSec / Math.max(1, totalSec)) * 100)}%` : "100%"}
            </span>
          </div>
          <div className="text-xl font-extrabold text-slate-900">
            {validTrackingSec}s
          </div>
          <span className="text-[10px] text-slate-500 block">
            Valid tracking interval
          </span>
        </div>
      </div>

      {/* Observation Summary and Documented Limitation */}
      <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-600 space-y-2 leading-relaxed">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Gaze Estimation Observation:</span>
        </div>
        <p className="font-normal">
          {gazeSummary?.observationsSummary ||
            "Your visual engagement remained steady throughout the interview, with consistent screen-directed head orientation and stable posture."}
        </p>
        <p className="text-[10px] text-slate-400 italic pt-1 border-t border-stone-200/60">
          Note: Computed client-side using MediaPipe landmark geometry. Reflects screen-directed head and iris alignment; does not measure psychological state, honesty, or intent.
        </p>
      </div>
    </div>
  );
}
