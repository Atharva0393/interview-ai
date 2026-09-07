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
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            Performance Over Time
          </h3>
          <p className="text-xs text-slate-400">Overall score progression across 6 mock interviews</p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Highest: 88%
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 border border-slate-800">
            Lowest: 77%
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Avg: 81%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Recharts Line Chart View (8 cols) */}
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
              <Line
                type="monotone"
                dataKey="overall"
                name="Overall Score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
                activeDot={{ r: 7, stroke: "#ffffff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Interpretation Card (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 to-violet-950/40 border border-blue-500/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>AI Progression Summary</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;Your overall performance has improved by 7 points since your first mock interview.&rdquo;
          </p>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center justify-between font-semibold text-slate-300">
              <span>Overall Growth Rate</span>
              <span className="text-emerald-400 font-bold">+9.1% Trajectory</span>
            </div>
            <p>Steady score escalation with peak performance on Session #5 (88%).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
