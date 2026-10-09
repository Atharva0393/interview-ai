"use client";

import React from "react";
import { Eye } from "lucide-react";

interface CameraAnalysisProps {
  eyeContact: number;
  eyeStatus: string;
  facialEngagement: number;
  facialStatus: string;
  posture: number;
  postureStatus: string;
  isRealtimeActive?: boolean;
}

export function CameraAnalysis({
  eyeContact,
  eyeStatus,
  facialEngagement,
  facialStatus,
  posture,
  postureStatus,
  isRealtimeActive = false,
}: CameraAnalysisProps) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-slate-900" />
          <span>Gaze Estimation & Face Tracking</span>
        </span>
        <span
          className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded border ${
            isRealtimeActive
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-stone-100 text-slate-600 border-stone-200"
          }`}
        >
          {isRealtimeActive ? "MediaPipe Active" : "Telemetry Ready"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        {/* Estimated Screen-Directed Gaze */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Screen-Directed Gaze
          </span>
          <div className="text-base font-extrabold text-slate-900 transition-all duration-300">
            {Math.round(eyeContact)}%
          </div>
          <span className="text-[10px] font-bold text-emerald-700 block truncate">{eyeStatus}</span>
        </div>

        {/* Head Orientation */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Head Orientation
          </span>
          <div className="text-base font-extrabold text-slate-900 transition-all duration-300">
            {Math.round(facialEngagement)}%
          </div>
          <span className="text-[10px] font-bold text-slate-900 block truncate">{facialStatus}</span>
        </div>

        {/* Posture & Alignment */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block truncate">
            Frame Alignment
          </span>
          <div className="text-base font-extrabold text-slate-900 transition-all duration-300">
            {Math.round(posture)}%
          </div>
          <span className="text-[10px] font-bold text-slate-700 block truncate">{postureStatus}</span>
        </div>
      </div>
    </div>
  );
}
