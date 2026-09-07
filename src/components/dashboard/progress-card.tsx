import React from "react";
import { Target } from "lucide-react";
import { SkillProgressItem } from "@/lib/mock-data";

interface ProgressCardProps {
  items: SkillProgressItem[];
}

export function ProgressCard({ items }: ProgressCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-slate-900 text-white">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Continue Improving</h2>
            <p className="text-xs text-slate-500 font-normal">Key skill areas flagged by AI analysis</p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const statusColor =
            item.score >= 80
              ? "bg-emerald-600"
              : item.score >= 70
              ? "bg-slate-900"
              : "bg-stone-500";

          const statusBadge =
            item.score >= 80
              ? "text-emerald-800 bg-emerald-50 border-emerald-200"
              : item.score >= 70
              ? "text-slate-900 bg-stone-100 border-stone-300"
              : "text-stone-700 bg-stone-100 border-stone-200";

          return (
            <div key={item.id} className="group border-b border-stone-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-800 flex items-center gap-2 group-hover:text-slate-900 transition-colors">
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${statusBadge}`}>
                    {item.status}
                  </span>
                  <span className="text-slate-900 font-extrabold">{item.score}%</span>
                </div>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${statusColor}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
