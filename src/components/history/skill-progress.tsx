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
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-900" />
            How Your Skills Have Improved
          </h3>
          <p className="text-xs text-slate-500 font-normal">Track skill domain evolution across all 6 mock sessions</p>
        </div>

        {/* Legend Interactive Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
          {[
            { key: "all", label: "All Skills" },
            { key: "technical", label: "Technical", color: "#111111" },
            { key: "communication", label: "Communication", color: "#444444" },
            { key: "confidence", label: "Confidence", color: "#777777" },
            { key: "problemSolving", label: "Problem Solving", color: "#aaaaaa" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveKey(item.key)}
              className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                activeKey === item.key
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                  : "bg-stone-50 text-slate-600 border-stone-200 hover:text-slate-900"
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e3de" />
              <XAxis dataKey="session" stroke="#64748b" fontSize={11} fontWeight={600} />
              <YAxis domain={[65, 95]} stroke="#64748b" fontSize={11} fontWeight={600} />
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

              {(activeKey === "all" || activeKey === "technical") && (
                <Line
                  type="monotone"
                  dataKey="technical"
                  name="Technical"
                  stroke="#111111"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}

              {(activeKey === "all" || activeKey === "communication") && (
                <Line
                  type="monotone"
                  dataKey="communication"
                  name="Communication"
                  stroke="#444444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}

              {(activeKey === "all" || activeKey === "confidence") && (
                <Line
                  type="monotone"
                  dataKey="confidence"
                  name="Confidence"
                  stroke="#777777"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}

              {(activeKey === "all" || activeKey === "problemSolving") && (
                <Line
                  type="monotone"
                  dataKey="problemSolving"
                  name="Problem Solving"
                  stroke="#aaaaaa"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insight Card (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-slate-900" />
            <span>Skill Growth Insight</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic font-normal">
            &ldquo;Your strongest improvement has been in communication (+8%) and confidence (+9%), while problem-solving (+8%) remains the biggest opportunity for growth.&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-white border border-stone-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Top Skill Booster</span>
              <span className="text-emerald-700 font-extrabold">Confidence (+9%)</span>
            </div>
            <p className="font-normal">Fluency and response structure improved significantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
