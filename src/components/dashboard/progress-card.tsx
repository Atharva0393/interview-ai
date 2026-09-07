import React from "react";
import { Target, ChevronRight } from "lucide-react";
import { SkillProgressItem } from "@/lib/mock-data";

interface ProgressCardProps {
  items: SkillProgressItem[];
}

export function ProgressCard({ items }: ProgressCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Continue Improving</h2>
            <p className="text-xs text-slate-400">Key skill areas flagged by AI analysis</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const statusColor =
            item.score >= 80
              ? "bg-emerald-500"
              : item.score >= 70
              ? "bg-blue-500"
              : "bg-amber-500";

          const statusBadge =
            item.score >= 80
              ? "text-emerald-400 bg-emerald-950/50 border-emerald-500/30"
              : item.score >= 70
              ? "text-blue-400 bg-blue-950/50 border-blue-500/30"
              : "text-amber-400 bg-amber-950/50 border-amber-500/30";

          return (
            <div key={item.id} className="group">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="text-slate-200 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] ${statusBadge}`}>
                    {item.status}
                  </span>
                  <span className="text-slate-100 font-extrabold">{item.score}%</span>
                </div>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${statusColor}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
