"use client";

import React from "react";
import { TrendingUp, Sparkles } from "lucide-react";
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

export function PerformanceTrend() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-900" />
            Performance Over Time
          </h3>
          <p className="text-xs text-slate-500 font-normal">Overall score progression across 6 mock interviews</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            Highest: 88%
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-slate-600 border border-stone-200 font-medium">
            Lowest: 77%
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-900 text-white border border-slate-900">
            Avg: 81%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Line Chart View (8 cols) */}
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
              <Line
                type="monotone"
                dataKey="overall"
                name="Overall Score"
                stroke="#111111"
                strokeWidth={3}
                dot={{ fill: "#111111", r: 5 }}
                activeDot={{ r: 7, stroke: "#ffffff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Interpretation Card (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-slate-900 fill-current" />
            <span>AI Progression Summary</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic font-normal">
            &ldquo;Your overall performance has improved by 7 points since your first mock interview.&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-white border border-stone-200 text-[11px] text-slate-500 space-y-1">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>Overall Growth Rate</span>
              <span className="text-emerald-700 font-extrabold">+9.1% Trajectory</span>
            </div>
            <p className="font-normal">Steady score escalation with peak performance on Session #5 (88%).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
