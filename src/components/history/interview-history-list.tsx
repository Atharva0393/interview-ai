"use client";

import React, { useState } from "react";
import { History, Filter, ArrowUpDown } from "lucide-react";
import { MOCK_HISTORICAL_SESSIONS, HistoricalInterview } from "./history-mock-data";
import { InterviewHistoryCard } from "./interview-history-card";

export function InterviewHistoryList() {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest">("newest");

  const filteredSessions = MOCK_HISTORICAL_SESSIONS.filter((s) => {
    if (selectedType !== "All" && s.type !== selectedType) return false;
    if (selectedDifficulty !== "All" && s.difficulty !== selectedDifficulty) return false;
    return true;
  }).sort((a, b) => {
    if (sortOrder === "newest") return b.sessionNumber - a.sessionNumber;
    if (sortOrder === "oldest") return a.sessionNumber - b.sessionNumber;
    if (sortOrder === "highest") return b.overallScore - a.overallScore;
    return 0;
  });

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] shadow-xl space-y-6">
      {/* List Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-blue-400" />
            Previous Mock Interviews
          </h3>
          <p className="text-xs text-slate-400">Review all 6 historical interview session logs</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Type Select */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Mixed">Mixed</option>
          </select>

          {/* Difficulty Select */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Sort Order Select */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Score</option>
          </select>
        </div>
      </div>

      {/* Render Cards List */}
      <div className="space-y-3">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <InterviewHistoryCard key={session.id} session={session} />
          ))
        ) : (
          <div className="p-8 text-center rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <Filter className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">No Matching Interview Logs</h4>
              <p className="text-xs text-slate-400">Try adjusting your type or difficulty filters to see your session history.</p>
            </div>
            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedDifficulty("All");
              }}
              className="px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
