"use client";

import React from "react";
import { LucideIcon, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  accentColor?: "blue" | "violet" | "emerald" | "cyan" | "amber";
  trend?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
}: MetricCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:border-slate-400 transition-all duration-200 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">{title}</span>
        <div className="p-2 rounded-xl bg-slate-900 text-white">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <TrendingUp className="w-3 h-3" />
            <span>{trend.split(" ")[0]}</span>
          </div>
        )}
      </div>

      <p className="text-[11px] text-slate-500 font-normal leading-relaxed">{subtitle}</p>
    </div>
  );
}
