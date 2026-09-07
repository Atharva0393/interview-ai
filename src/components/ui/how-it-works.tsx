"use client";

import React from "react";
import { UserCheck, Sliders, Video, BarChart3, TrendingUp, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocationMap } from "@/components/ui/expand-map";

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  const steps = [
    {
      number: "01",
      title: "Build Your Profile",
      description: "Upload your resume and list your technical stack to provide candidate context.",
      icon: UserCheck,
      location: "San Francisco, CA",
      coords: "37.7749° N, 122.4194° W",
    },
    {
      number: "02",
      title: "Configure Your Session",
      description: "Select target role, interview category, difficulty, duration, and focus areas.",
      icon: Sliders,
      location: "Seattle, WA",
      coords: "47.6062° N, 122.3321° W",
    },
    {
      number: "03",
      title: "Practice With AI",
      description: "Answer realistic technical and STAR behavioral questions in a live workspace.",
      icon: Video,
      location: "New York, NY",
      coords: "40.7128° N, 74.0060° W",
    },
    {
      number: "04",
      title: "Review Performance",
      description: "Get structured breakdown across technical depth, speech clarity, and non-verbal signals.",
      icon: BarChart3,
      location: "Austin, TX",
      coords: "30.2672° N, 97.7431° W",
    },
    {
      number: "05",
      title: "Track Your Progress",
      description: "Compare session scores over time to measure readiness before real company interviews.",
      icon: TrendingUp,
      location: "London, UK",
      coords: "51.5074° N, 0.1278° W",
    },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 fill-current text-stone-200" />
          <span>The InterviewAI Feedback Loop</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How InterviewAI Works
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
          From profile setup to long-term readiness tracking, every session is designed to sharpen your engineering interview delivery.
        </p>
      </div>

      {/* Editorial Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-3 relative group hover:border-slate-400 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-slate-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-slate-700 group-hover:text-slate-900 group-hover:bg-stone-200 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900 group-hover:text-slate-900 transition-colors mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 font-bold text-xs">
                  →
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Target Location Map Widget Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-left max-w-md">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[10px] font-bold text-slate-800">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Target Hiring Hub Coordinates</span>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Global Tech Company Interview Calibration
          </h3>
          <p className="text-xs text-slate-500 font-normal leading-relaxed">
            Practice for location-specific engineering standards calibrated against tech hubs in San Francisco, Seattle, New York, and international markets.
          </p>
        </div>

        <div className="flex-shrink-0">
          <LocationMap
            location="San Francisco, CA"
            coordinates="37.7749° N, 122.4194° W"
          />
        </div>
      </div>
    </div>
  );
}
