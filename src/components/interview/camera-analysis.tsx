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
}

export function CameraAnalysis({
  eyeContact,
  eyeStatus,
  facialEngagement,
  facialStatus,
  posture,
  postureStatus,
}: CameraAnalysisProps) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-[#e5e3de] space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-violet-600" />
          Camera Telemetry & Gaze Tracking
        </span>
        <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-violet-50 text-violet-800 border border-violet-100 rounded">
          Simulated AI Analysis
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        {/* Eye Contact */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">
            Eye Contact
          </span>
          <div className="text-base font-extrabold text-slate-900 transition-all duration-300">
            {eyeContact}%
          </div>
          <span className="text-[10px] font-bold text-emerald-700 block">{eyeStatus}</span>
        </div>

        {/* Facial Engagement */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">
            Facial Engagement
          </span>
          <div className="text-base font-extrabold text-slate-900 transition-all duration-300">
            {facialEngagement}%
          </div>
          <span className="text-[10px] font-bold text-violet-700 block">{facialStatus}</span>
        </div>

        {/* Posture */}
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block">
            Posture
          </span>
          <div className="text-base font-extrabold text-slate-900 transition-all duration-300">
            {posture}%
          </div>
          <span className="text-[10px] font-bold text-slate-700 block">{postureStatus}</span>
        </div>
      </div>
    </div>
  );
}
