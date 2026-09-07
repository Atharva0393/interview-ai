"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { HistoricalInterview } from "./history-mock-data";

interface InterviewHistoryCardProps {
  session: HistoricalInterview;
}

export function InterviewHistoryCard({ session }: InterviewHistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColor =
    session.status === "Best Performance"
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : session.status === "Strong Performance"
      ? "bg-stone-900 text-white border-slate-900"
      : "bg-stone-100 text-slate-700 border-stone-200";

  return (
    <div className="rounded-2xl bg-white border border-stone-200 hover:border-slate-400 transition-all overflow-hidden shadow-2xs">
      {/* Clickable Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left cursor-pointer group select-none hover:bg-stone-50/50"
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-slate-900">
              Mock Interview #{session.sessionNumber}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor}`}>
              {session.status}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {session.date}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="text-slate-900 font-bold">{session.role}</span>
            <span>•</span>
            <span>{session.type} Interview</span>
            <span>•</span>
            <span className="text-slate-500">{session.difficulty}</span>
            <span>•</span>
            <span className="text-slate-500">{session.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200">
              Tech: <strong className="text-slate-900">{session.technicalKnowledge}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200">
              Comm: <strong className="text-slate-900">{session.communication}</strong>
            </span>
            <span className="px-2 py-1 rounded bg-stone-50 border border-stone-200">
              Conf: <strong className="text-slate-900">{session.confidence}</strong>
            </span>
          </div>

          {/* Big Score Pill */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-900 text-white border border-slate-900 text-base font-extrabold">
              {session.overallScore}%
            </div>
            <div className="p-1 rounded-lg text-slate-400 group-hover:text-slate-700">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>
          </div>
        </div>
      </button>

      {/* Expanded Details View */}
      {isExpanded && (
        <div className="p-5 pt-0 border-t border-stone-200/80 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Technical</span>
              <span className="text-sm font-extrabold text-slate-900">{session.technicalKnowledge}%</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Communication</span>
              <span className="text-sm font-extrabold text-slate-900">{session.communication}%</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Confidence</span>
              <span className="text-sm font-extrabold text-emerald-700">{session.confidence}%</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-slate-500 font-semibold uppercase block">Problem Solving</span>
              <span className="text-sm font-extrabold text-slate-900">{session.problemSolving}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1 font-normal">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Top Strength
              </div>
              <p>{session.topStrength}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 font-normal">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
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
