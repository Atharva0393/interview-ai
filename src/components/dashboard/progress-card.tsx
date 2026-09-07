import React from "react";
import { Target } from "lucide-react";
import { SkillProgressItem } from "@/lib/mock-data";

interface ProgressCardProps {
  items: SkillProgressItem[];
}

export function ProgressCard({ items }: ProgressCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-50 border border-violet-100 text-violet-700">
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
              ? "bg-emerald-500"
              : item.score >= 70
              ? "bg-violet-600"
              : "bg-amber-500";

          const statusBadge =
            item.score >= 80
              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
              : item.score >= 70
              ? "text-violet-700 bg-violet-50 border-violet-200"
              : "text-amber-700 bg-amber-50 border-amber-200";

          return (
            <div key={item.id} className="group border-b border-[#f4f3ef] pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-800 flex items-center gap-2 group-hover:text-violet-700 transition-colors">
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
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200/60">
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
