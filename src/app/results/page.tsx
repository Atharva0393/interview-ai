"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ResultsHeader } from "@/components/results/results-header";
import { OverallScore } from "@/components/results/overall-score";
import { PerformanceMetrics } from "@/components/results/performance-metrics";
import { PerformanceRadar } from "@/components/results/performance-radar";
import { CommunicationAnalysis } from "@/components/results/communication-analysis";
import { NonVerbalAnalysis } from "@/components/results/nonverbal-analysis";
import { StrengthsSection } from "@/components/results/strengths-section";
import { ImprovementsSection } from "@/components/results/improvements-section";
import { RecommendationsSection } from "@/components/results/recommendations-section";
import { QuestionFeedback } from "@/components/results/question-feedback";
import { ResultsSummary } from "@/components/results/results-summary";

export default function ResultsPage() {
  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto py-4 animate-in fade-in duration-300">
        {/* Section 1 — Report Header */}
        <ResultsHeader />

        {/* Section 2 — Overall Performance Hero */}
        <OverallScore />

        {/* Section 3 — Detailed Performance Breakdown */}
        <PerformanceMetrics />

        {/* Section 4 — Performance Radar Visualization */}
        <PerformanceRadar />

        {/* Section 5 & 6 — Verbal & Non-Verbal Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CommunicationAnalysis />
          <NonVerbalAnalysis />
        </div>

        {/* Section 7 & 8 — Strengths & Areas for Improvement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StrengthsSection />
          <ImprovementsSection />
        </div>

        {/* Section 9 — Personalized AI Recommendations */}
        <RecommendationsSection />

        {/* Section 10 — Question-by-Question Accordion Feedback */}
        <QuestionFeedback />

        {/* Section 11 — Final Summary & Action CTAs */}
        <ResultsSummary />
      </div>
    </AppShell>
  );
}
