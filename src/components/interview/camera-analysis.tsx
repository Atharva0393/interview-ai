"use client";

import React from "react";
import { Eye, Smile, Activity, Sparkles } from "lucide-react";

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
    <div className="p-4 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-white flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          Camera Telemetry & Gaze Tracking
        </span>
        <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded">
          Simulated AI Analysis
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 text-center">
        {/* Eye Contact */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Eye Contact
          </span>
          <div className="text-base font-extrabold text-white transition-all duration-300">
            {eyeContact}%
          </div>
          <span className="text-[10px] font-bold text-emerald-400 block">{eyeStatus}</span>
        </div>

        {/* Facial Engagement */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Facial Engagement
          </span>
          <div className="text-base font-extrabold text-white transition-all duration-300">
            {facialEngagement}%
          </div>
          <span className="text-[10px] font-bold text-violet-400 block">{facialStatus}</span>
        </div>

        {/* Posture */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">
            Posture
          </span>
          <div className="text-base font-extrabold text-white transition-all duration-300">
            {posture}%
          </div>
          <span className="text-[10px] font-bold text-blue-400 block">{postureStatus}</span>
        </div>
      </div>
    </div>
  );
}
