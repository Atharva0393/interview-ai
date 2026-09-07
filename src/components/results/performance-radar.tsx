"use client";

import React from "react";
import { Sparkles, Brain } from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from "recharts";
import { MOCK_RADAR_DATA } from "./results-mock-data";

export function PerformanceRadar() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Brain className="w-4 h-4 text-slate-900" />
            Interview Capability Profile Map
          </h3>
          <p className="text-xs text-slate-500 font-normal">Multimodal performance balance analysis</p>
        </div>

        <span className="text-[10px] font-mono text-slate-500 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200 self-start sm:self-auto font-medium">
          Simulated AI Competency Radar
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Radar Chart View (7 cols) */}
        <div className="lg:col-span-7 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={MOCK_RADAR_DATA}>
              <PolarGrid stroke="#e5e3de" />
              <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={11} fontWeight={600} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e3de",
                  borderRadius: "12px",
                  color: "#111827",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Radar
                name="Candidate Score"
                dataKey="value"
                stroke="#111111"
                fill="#111111"
                fillOpacity={0.15}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Interpretation Card (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-slate-900 fill-current" />
            <span>AI Radar Interpretation</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic font-normal">
            &ldquo;Your strongest areas are technical knowledge and response relevance. Improving confidence and structured problem-solving explanations could further improve your interview performance.&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-white border border-stone-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Core Balance Metric</span>
              <span className="text-emerald-700 font-extrabold">84% Well-Balanced</span>
            </div>
            <p className="font-normal">High technical precision paired with solid verbal delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
