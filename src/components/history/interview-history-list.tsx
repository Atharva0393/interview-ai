"use client";

import React, { useState } from "react";
import { History, Filter } from "lucide-react";
import { MOCK_HISTORICAL_SESSIONS } from "./history-mock-data";
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
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e5e3de] shadow-2xs space-y-6">
      {/* List Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-violet-600" />
            Previous Mock Interviews
          </h3>
          <p className="text-xs text-slate-500 font-normal">Review all 6 historical interview session logs</p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Type Select */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-violet-400 cursor-pointer shadow-2xs font-bold"
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
            className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-violet-400 cursor-pointer shadow-2xs font-bold"
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
            className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-violet-400 cursor-pointer shadow-2xs font-bold"
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
          <div className="p-8 text-center rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
            <Filter className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">No Matching Interview Logs</h4>
              <p className="text-xs text-slate-500 font-normal">Try adjusting your type or difficulty filters to see your session history.</p>
            </div>
            <button
              onClick={() => {
                setSelectedType("All");
                setSelectedDifficulty("All");
              }}
              className="px-4 py-2 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
