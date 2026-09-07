"use client";

import React, { useState } from "react";
import { History, Filter } from "lucide-react";
import { MOCK_HISTORICAL_SESSIONS } from "./history-mock-data";
import { InterviewHistoryCard } from "./interview-history-card";
import { EmptyState } from "@/components/ui/empty-state";

export function InterviewHistoryList() {
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("newest");

  // Filtering Logic
  const filteredSessions = MOCK_HISTORICAL_SESSIONS.filter((session) => {
    if (roleFilter !== "All" && session.role !== roleFilter) return false;
    if (typeFilter !== "All" && session.type !== typeFilter) return false;
    return true;
  });

  // Sorting Logic
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (sortOrder === "newest") return b.sessionNumber - a.sessionNumber;
    if (sortOrder === "oldest") return a.sessionNumber - b.sessionNumber;
    if (sortOrder === "highest") return b.overallScore - a.overallScore;
    if (sortOrder === "lowest") return a.overallScore - b.overallScore;
    return 0;
  });

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
      {/* List Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-900" />
            Past Interview Logs ({sortedSessions.length})
          </h3>
          <p className="text-xs text-slate-500 font-normal">Filter and inspect transcripts & feedback from previous sessions</p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Role Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter interview sessions by role"
              className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shadow-2xs font-bold"
            >
              <option value="All">All Roles</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Software Engineer">Software Engineer</option>
            </select>
          </div>

          {/* Category Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter interview sessions by question type"
            className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shadow-2xs font-bold"
          >
            <option value="All">All Types</option>
            <option value="Mixed">Mixed</option>
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            aria-label="Sort interview history list"
            className="bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shadow-2xs font-bold"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Score</option>
            <option value="lowest">Lowest Score</option>
          </select>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sortedSessions.length > 0 ? (
          sortedSessions.map((session) => (
            <InterviewHistoryCard key={session.id} session={session} />
          ))
        ) : (
          <EmptyState
            icon={History}
            title="No Matching Sessions Found"
            description="Try adjusting your filter options to view historical mock interview logs."
            actionLabel="Reset Filters"
            onAction={() => {
              setRoleFilter("All");
              setTypeFilter("All");
            }}
          />
        )}
      </div>
    </div>
  );
}
