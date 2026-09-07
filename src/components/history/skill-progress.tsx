"use client";

import React, { useState } from "react";
import { Activity, Sparkles } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { MOCK_TREND_DATA } from "./history-mock-data";

export function SkillProgress() {
  const [activeKey, setActiveKey] = useState<string>("all");

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-400" />
            How Your Skills Have Improved
          </h3>
          <p className="text-xs text-slate-400">Track skill domain evolution across all 6 mock sessions</p>
        </div>

        {/* Legend Interactive Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
          {[
            { key: "all", label: "All Skills" },
            { key: "technical", label: "Technical", color: "#3b82f6" },
            { key: "communication", label: "Communication", color: "#8b5cf6" },
            { key: "confidence", label: "Confidence", color: "#10b981" },
            { key: "problemSolving", label: "Problem Solving", color: "#f59e0b" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                activeKey === item.key
                  ? "bg-slate-800 text-white border-slate-600"
                  : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
              }`}
            >
              {item.color && (
                <span
                  className="w-2 h-2 rounded-full inline-block mr-1.5"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Multi-line Chart View (8 cols) */}
        <div className="lg:col-span-8 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="session" stroke="#64748b" fontSize={11} />
              <YAxis domain={[65, 95]} stroke="#64748b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0b0f19",
                  borderColor: "#1e293b",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "12px",
                }}
              />

              {(activeKey === "all" || activeKey === "technical") && (
                <Line
                  type="monotone"
                  dataKey="technical"
                  name="Technical"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}

              {(activeKey === "all" || activeKey === "communication") && (
                <Line
                  type="monotone"
                  dataKey="communication"
                  name="Communication"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}

              {(activeKey === "all" || activeKey === "confidence") && (
                <Line
                  type="monotone"
                  dataKey="confidence"
                  name="Confidence"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}

              {(activeKey === "all" || activeKey === "problemSolving") && (
                <Line
                  type="monotone"
                  dataKey="problemSolving"
                  name="Problem Solving"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insight Card (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-violet-950/40 to-blue-950/40 border border-violet-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Skill Growth Insight</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;Your strongest improvement has been in communication (+8%) and confidence (+9%), while problem-solving (+8%) remains the biggest opportunity for growth.&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span>Top Skill Booster</span>
              <span className="text-emerald-400 font-bold">Confidence (+9%)</span>
            </div>
            <p>Fluency and response structure improved significantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
