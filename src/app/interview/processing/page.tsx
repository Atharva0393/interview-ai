"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { ProcessingHeader } from "@/components/interview/processing-header";
import { ProcessingVisual } from "@/components/interview/processing-visual";
import { AnalysisPipeline } from "@/components/interview/analysis-pipeline";
import { ProcessingInsights, SIMULATED_INSIGHTS } from "@/components/interview/processing-insights";
import { SignalSynthesis } from "@/components/interview/signal-synthesis";
import { ProcessingMetrics } from "@/components/interview/processing-metrics";
import { ProcessingComplete } from "@/components/interview/processing-complete";

export default function InterviewProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [currentStageId, setCurrentStageId] = useState(1);
  const [insightsCount, setInsightsCount] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  // Smooth Progress Timer over ~9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const next = prev + 1.25; // 100 / 1.25 * 100ms = 8000ms total
          if (next >= 100) {
            clearInterval(interval);
            setIsComplete(true);
            return 100;
          }
          return next;
        }
        return 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Update Pipeline Stage ID based on progress thresholds
  useEffect(() => {
    if (progress >= 90) setCurrentStageId(5);
    else if (progress >= 70) setCurrentStageId(4);
    else if (progress >= 45) setCurrentStageId(3);
    else if (progress >= 20) setCurrentStageId(2);
    else setCurrentStageId(1);

    // Update Insights Ticker count based on progress
    const count = Math.min(SIMULATED_INSIGHTS.length, Math.floor((progress / 100) * SIMULATED_INSIGHTS.length) + 1);
    setInsightsCount(count);
  }, [progress]);

  return (
    <AppShell>
      <div className="space-y-8 max-w-5xl mx-auto py-4 animate-in fade-in duration-300">
        {/* Focused Header */}
        <ProcessingHeader />

        {isComplete ? (
          /* Completion State View */
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-400">
            <ProcessingComplete />
            <SignalSynthesis />
          </div>
        ) : (
          /* Active Processing View */
          <div className="space-y-8">
            {/* Central AI Visualizer Orb & Progress Counter */}
            <ProcessingVisual progress={progress} />

            {/* Incoming Mock Score Telemetry Cards */}
            <ProcessingMetrics progress={progress} />

            {/* Grid Layout: Analysis Pipeline (Left) & Insights/Synthesis (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6">
                <AnalysisPipeline currentStageId={currentStageId} />
              </div>

              <div className="lg:col-span-6 space-y-6">
                <ProcessingInsights visibleCount={insightsCount} />
              </div>
            </div>

            {/* Signal Synthesis Architecture Diagram */}
            <SignalSynthesis />
          </div>
        )}
      </div>
    </AppShell>
  );
}
