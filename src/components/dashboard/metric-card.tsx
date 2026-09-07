import React from "react";
import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  accentColor?: "blue" | "violet" | "cyan" | "emerald";
  trend?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accentColor = "blue",
  trend,
}: MetricCardProps) {
  const accentStyles = {
    blue: {
      iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      glow: "hover:border-blue-500/40 hover:shadow-blue-500/10",
      accentBar: "from-blue-500 to-blue-600",
    },
    violet: {
      iconBg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
      glow: "hover:border-violet-500/40 hover:shadow-violet-500/10",
      accentBar: "from-violet-500 to-purple-600",
    },
    cyan: {
      iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      glow: "hover:border-cyan-500/40 hover:shadow-cyan-500/10",
      accentBar: "from-cyan-500 to-blue-500",
    },
    emerald: {
      iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      glow: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
      accentBar: "from-emerald-500 to-teal-500",
    },
  }[accentColor];

  return (
    <div
      className={cn(
        "relative overflow-hidden p-5 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] transition-all duration-300 group hover:-translate-y-0.5 shadow-lg",
        accentStyles.glow
      )}
    >
      {/* Subtle Accent Glow line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-80",
          accentStyles.accentBar
        )}
      />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn("p-2 rounded-xl border", accentStyles.iconBg)}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
