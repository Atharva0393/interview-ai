"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, Clock, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { HistoricalInterview } from "./history-mock-data";

interface InterviewHistoryCardProps {
  session: HistoricalInterview;
}

export function InterviewHistoryCard({ session }: InterviewHistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColor =
    session.status === "Best Performance"
      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      : session.status === "Strong Performance"
      ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
      : "bg-violet-500/20 text-violet-300 border-violet-500/30";

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden">
      {/* Clickable Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group select-none"
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-white">
              Mock Interview #{session.sessionNumber}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor}`}>
              {session.status}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-500" />
              {session.date}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
            <span className="text-blue-400">{session.role}</span>
            <span>•</span>
            <span>{session.type} Interview</span>
            <span>•</span>
            <span className="text-slate-400">{session.difficulty}</span>
            <span>•</span>
            <span className="text-slate-400">{session.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-400">
            <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
              Tech: <strong className="text-white">{session.technicalKnowledge}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
              Comm: <strong className="text-white">{session.communication}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-slate-950 border border-slate-800">
              Conf: <strong className="text-white">{session.confidence}</strong>
            </span>
          </div>

          {/* Big Score Pill */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/30 text-base font-extrabold">
              {session.overallScore}%
            </div>
            <div className="p-1 rounded-lg text-slate-400 group-hover:text-white">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Details View */}
      {isExpanded && (
        <div className="p-5 pt-0 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Technical</span>
              <span className="text-sm font-extrabold text-blue-400">{session.technicalKnowledge}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Communication</span>
              <span className="text-sm font-extrabold text-violet-400">{session.communication}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Confidence</span>
              <span className="text-sm font-extrabold text-emerald-400">{session.confidence}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Problem Solving</span>
              <span className="text-sm font-extrabold text-amber-400">{session.problemSolving}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Top Strength
              </div>
              <p>{session.topStrength}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Primary Improvement Area
              </div>
              <p>{session.primaryImprovement}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
