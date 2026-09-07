"use client";

import { AppShell } from "@/components/layout/app-shell";
import { HistoryHeader } from "@/components/history/history-header";
import { PerformanceSnapshot } from "@/components/history/performance-snapshot";
import { PerformanceTrend } from "@/components/history/performance-trend";
import { SkillProgress } from "@/components/history/skill-progress";
import { PerformanceComparison } from "@/components/history/performance-comparison";
import { ImprovementHighlights } from "@/components/history/improvement-highlights";
import { FocusAreas } from "@/components/history/focus-areas";
import { MilestoneTimeline } from "@/components/history/milestone-timeline";
import { InterviewHistoryList } from "@/components/history/interview-history-list";
import { HistoryCTA } from "@/components/history/history-cta";

export default function HistoryPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-300">
        {/* Section 1 — Header */}
        <HistoryHeader />

        {/* Section 2 — Current Performance Snapshot */}
        <PerformanceSnapshot />

        {/* Section 3 — Overall Performance Trend (Recharts Line Chart) */}
        <PerformanceTrend />

        {/* Section 4 — Skill Progress (Recharts Multi-line Chart) */}
        <SkillProgress />

        {/* Section 5 — Latest vs First Performance Comparison */}
        <PerformanceComparison />

        {/* Section 6 & 7 — Improvement Highlights & Focus Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImprovementHighlights />
          <FocusAreas />
        </div>

        {/* Section 8 — Journey Milestone Timeline */}
        <MilestoneTimeline />

        {/* Section 9 & 10 — Historical Sessions List & Filtering */}
        <InterviewHistoryList />

        {/* Section 11 — Next Steps Action CTA */}
        <HistoryCTA />
      </div>
    </AppShell>
  );
}
