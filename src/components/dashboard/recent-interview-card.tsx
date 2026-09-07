import React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, Award, CheckCircle2 } from "lucide-react";
import { RecentInterview } from "@/lib/mock-data";

interface RecentInterviewCardProps {
  interview: RecentInterview;
}

export function RecentInterviewCard({ interview }: RecentInterviewCardProps) {
  const scoreColor =
    interview.score >= 85
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-950/40"
      : interview.score >= 75
      ? "text-blue-400 border-blue-500/30 bg-blue-950/40"
      : "text-amber-400 border-amber-500/30 bg-amber-950/40";

  return (
    <div className="p-5 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] hover:border-blue-500/30 hover:bg-[#161f30] transition-all duration-300 group shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {interview.role}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {interview.timeAgo}
              </span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {interview.title}
            </h3>
          </div>

          <div className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border ${scoreColor}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Score</span>
            <span className="text-lg font-extrabold">{interview.score}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {interview.feedbackSummary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {interview.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{interview.questionsCount} Questions • {interview.duration}</span>
        </div>

        <Link
          href="/results"
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
        >
          <span>View Report</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
