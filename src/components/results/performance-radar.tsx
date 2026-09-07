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
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-400" />
            Interview Capability Profile Map
          </h3>
          <p className="text-xs text-slate-400">Multimodal performance balance analysis</p>
        </div>

        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 self-start sm:self-auto">
          Simulated AI Competency Radar
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Radar Chart View (7 cols) */}
        <div className="lg:col-span-7 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={MOCK_RADAR_DATA}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0f19",
                  borderColor: "#1e293b",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "12px",
                }}
              />
              <Radar
                name="Candidate Score"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.35}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Interpretation Card (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-violet-950/40 border border-blue-500/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>AI Radar Interpretation</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;Your strongest areas are technical knowledge and response relevance. Improving confidence and structured problem-solving explanations could further improve your interview performance.&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span>Core Balance Metric</span>
              <span className="text-emerald-400 font-bold">84% Well-Balanced</span>
            </div>
            <p>High technical precision paired with solid verbal delivery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
