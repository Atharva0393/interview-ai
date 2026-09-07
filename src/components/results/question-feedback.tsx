"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, MessageSquare, AlertCircle, Filter } from "lucide-react";
import { MOCK_DETAILED_RESULTS } from "./results-mock-data";

export function QuestionFeedback() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>("q-1"); // Q1 expanded by default

  const filteredQuestions = MOCK_DETAILED_RESULTS.filter((q) => {
    if (selectedFilter === "All") return true;
    return q.category === selectedFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-violet-600" />
            Question-by-Question Detailed Feedback
          </h3>
          <p className="text-xs text-slate-500 font-normal">Review evaluation breakdown across all 10 session questions</p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 p-1.5 rounded-xl text-xs overflow-x-auto shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {["All", "Technical", "Project", "Behavioral"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                selectedFilter === cat
                  ? "bg-violet-600 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;

          const scoreBadgeColor =
            q.score >= 85
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : q.score >= 80
              ? "bg-violet-50 text-violet-700 border-violet-200"
              : "bg-amber-50 text-amber-700 border-amber-200";

          return (
            <div
              key={q.id}
              className="rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all overflow-hidden shadow-2xs"
            >
              {/* Accordion Header Bar */}
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left cursor-pointer group select-none hover:bg-stone-50/50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-stone-100 font-extrabold text-xs text-slate-800 flex items-center justify-center border border-stone-200 shrink-0">
                    {q.number}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-50 text-violet-800 border border-violet-100">
                        {q.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
                        {q.subcategory}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-1">
                      {q.question}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className={`px-3 py-1 rounded-xl border text-xs font-extrabold ${scoreBadgeColor}`}>
                    {q.score}% Score
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 group-hover:text-slate-700">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Body Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-stone-200/80 space-y-4 animate-in fade-in duration-200">
                  {/* Full Question Text & Guidance */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Full Question Prompt
                    </span>
                    <p className="text-xs font-bold text-slate-900 leading-relaxed">{q.question}</p>
                  </div>

                  {/* Simulated Response */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Your Simulated Response
                    </span>
                    <p className="text-xs font-mono text-slate-600 italic leading-relaxed font-normal">
                      &ldquo;{q.simulatedTranscript}&rdquo;
                    </p>
                  </div>

                  {/* Breakdown Scores Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-semibold block">Relevance</span>
                      <span className="text-sm font-extrabold text-violet-700">{q.relevance}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-semibold block">Clarity</span>
                      <span className="text-sm font-extrabold text-violet-700">{q.clarity}%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-stone-200 shadow-2xs">
                      <span className="text-[10px] text-slate-500 font-semibold block">Confidence</span>
                      <span className="text-sm font-extrabold text-emerald-700">{q.confidenceScore}%</span>
                    </div>
                  </div>

                  {/* Feedback Notes */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">AI Evaluator Feedback:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{q.feedbackNote}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2 font-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-slate-900">Key Strength</strong>
                          {q.strengthNote}
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 font-normal">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-bold text-slate-900">Target Improvement</strong>
                          {q.improvementNote}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
