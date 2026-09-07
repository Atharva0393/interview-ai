"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  CheckCircle2,
  Code,
  Users,
  Layers,
  Clock,
  Sliders,
  Camera,
  Mic,
  ArrowRight,
  Edit3,
  HelpCircle,
  Cpu,
  Check,
  Zap,
  Play,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

export default function InterviewSetupPage() {
  const router = useRouter();

  // Configuration States
  const [selectedRole, setSelectedRole] = useState("Frontend Developer");
  const [selectedType, setSelectedType] = useState("Mixed Interview");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Intermediate");
  const [selectedDuration, setSelectedDuration] = useState("20 Minutes");

  // Multi-select Focus Areas
  const [focusAreas, setFocusAreas] = useState<string[]>([
    "JavaScript",
    "React",
    "Projects & Experience",
    "Communication",
  ]);

  // Toggle Controls
  const [cameraAnalysis, setCameraAnalysis] = useState(true);
  const [voiceAnalysis, setVoiceAnalysis] = useState(true);

  // Preparation Modal Overlay States
  const [isPreparing, setIsPreparing] = useState(false);
  const [prepStep, setPrepStep] = useState(0);

  const prepSteps = [
    "Analyzing interview preferences...",
    "Preparing personalized questions...",
    "Setting up interview environment...",
    "Almost ready...",
  ];

  // Available Options Data
  const roleOptions = [
    "Frontend Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Data Analyst",
    "Product Analyst",
  ];

  const typeOptions = [
    {
      id: "Technical Interview",
      title: "Technical Interview",
      desc: "Practice role-specific technical concepts and problem-solving questions.",
      icon: Code,
    },
    {
      id: "Behavioral Interview",
      title: "Behavioral Interview",
      desc: "Practice communication, teamwork, leadership, and situational questions.",
      icon: Users,
    },
    {
      id: "Mixed Interview",
      title: "Mixed Interview",
      desc: "A balanced combination of technical and behavioral questions.",
      icon: Layers,
    },
  ];

  const difficultyOptions = [
    {
      id: "Beginner",
      title: "Beginner",
      desc: "Fundamental questions designed to build confidence.",
    },
    {
      id: "Intermediate",
      title: "Intermediate",
      desc: "Role-focused questions that test practical understanding.",
    },
    {
      id: "Advanced",
      title: "Advanced",
      desc: "Challenging scenario-based and in-depth questions.",
    },
  ];

  const durationOptions = [
    { id: "10 Minutes", title: "10 Minutes", count: "5–6 questions" },
    { id: "20 Minutes", title: "20 Minutes", count: "10–12 questions" },
    { id: "30 Minutes", title: "30 Minutes", count: "15–18 questions" },
  ];

  const availableFocusAreas = [
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "CSS / Tailwind",
    "Problem Solving",
    "Projects & Experience",
    "Communication",
  ];

  const toggleFocusArea = (area: string) => {
    if (focusAreas.includes(area)) {
      if (focusAreas.length > 1) {
        setFocusAreas(focusAreas.filter((item) => item !== area));
      }
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };

  // Trigger Preparation Overlay Animation & Navigation
  const handleStartInterview = () => {
    setIsPreparing(true);
    setPrepStep(0);

    const stepInterval = setInterval(() => {
      setPrepStep((prev) => {
        if (prev < prepSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            router.push("/interview/session");
          }, 600);
          return prev;
        }
      });
    }, 550);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-300 relative">
        {/* Page Header & Stepper */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-stone-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 fill-current text-stone-200" />
              <span>Step 2: Interview Configuration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Set Up Your Interview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Customize your mock interview experience and let AI prepare questions tailored to your profile.
            </p>
          </div>

          {/* 4-Step Journey Stepper */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-stone-200/80 p-2 rounded-2xl overflow-x-auto text-xs shrink-0 shadow-2xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>1 Profile</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>2 Setup</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center gap-1 px-2.5 py-1 text-slate-400 font-medium">
              <span>3 Mock</span>
            </div>

            <span className="text-slate-400 font-bold">→</span>

            <div className="flex items-center gap-1 px-2.5 py-1 text-slate-400 font-medium">
              <span>4 Feedback</span>
            </div>
          </div>
        </div>

        {/* Profile Context Card */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-extrabold text-white text-lg shadow-2xs shrink-0">
                AK
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">Candidate: Atharva Kale</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-stone-100 text-slate-900 border border-stone-300 rounded-md">
                    Target: {selectedRole}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-stone-100 text-slate-700 border border-stone-200 rounded-md">
                    Fresher / Entry Level
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-normal">
                  <span className="font-semibold text-slate-700">Extracted Skills:</span>
                  {["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"].map((sk) => (
                    <span key={sk} className="px-2 py-0.5 rounded bg-stone-100 text-slate-700 text-[10px] border border-stone-200">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-slate-700 text-xs font-bold border border-stone-200 transition-colors shrink-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-900" />
              <span>Edit Profile</span>
            </Link>
          </div>
          
          <div className="pt-3 border-t border-stone-100">
            <p className="text-xs text-slate-500 flex items-center gap-1.5 leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-slate-700 shrink-0 fill-current" />
              <span><strong className="font-medium text-slate-700">AI Context Engine:</strong> Your extracted resume skills and experience level will be used dynamically to calibrate question complexity and evaluate the depth of your technical responses.</span>
            </p>
          </div>
        </div>

        {/* Configuration Body Layout (8 cols left, 4 cols right summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Configuration Form Sections (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* SECTION 1 — TARGET ROLE */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Code className="w-4 h-4 text-slate-900" />
                  What role are you preparing for?
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Questions will calibrate based on expectations for this role
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {roleOptions.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                          : "bg-white border-stone-200 text-slate-600 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      <span>{role}</span>
                      {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2 — INTERVIEW TYPE */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-900" />
                  What would you like to practice?
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Select your primary question category format
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {typeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedType(opt.id)}
                      className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer group ${
                        isSelected
                          ? "bg-stone-900 border-slate-900 text-white shadow-2xs"
                          : "bg-white border-stone-200 text-slate-600 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2.5 rounded-xl border ${
                            isSelected
                              ? "bg-white text-black border-white"
                              : "bg-stone-100 text-slate-500 border-stone-200 group-hover:text-slate-700"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>

                      <div>
                        <div className={`text-xs font-bold mb-1 ${isSelected ? "text-white" : "text-slate-900"}`}>{opt.title}</div>
                        <p className={`text-[11px] leading-relaxed font-normal ${isSelected ? "text-stone-300" : "text-slate-500"}`}>{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3 — DIFFICULTY */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-slate-900" />
                  Choose your difficulty
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Adjust question complexity and evaluation strictness
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {difficultyOptions.map((diff) => {
                  const isSelected = selectedDifficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => setSelectedDifficulty(diff.id)}
                      className={`p-4 rounded-2xl border text-left space-y-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                          : "bg-white border-stone-200 text-slate-600 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-extrabold ${isSelected ? "text-white" : "text-slate-900"}`}>{diff.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <p className={`text-[11px] leading-relaxed font-normal ${isSelected ? "text-stone-300" : "text-slate-500"}`}>{diff.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 4 — INTERVIEW DURATION */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-900" />
                  How long should your interview be?
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Pace and estimated question set size
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {durationOptions.map((dur) => {
                  const isSelected = selectedDuration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      onClick={() => setSelectedDuration(dur.id)}
                      className={`p-4 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                          : "bg-white border-stone-200 text-slate-600 hover:border-stone-400 hover:bg-stone-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>{dur.title}</span>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <p className={`text-[11px] font-bold ${isSelected ? "text-emerald-400" : "text-slate-700"}`}>{dur.count}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 5 — INTERVIEW FOCUS */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-slate-900" />
                  Customize your interview focus
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Select multiple key topic areas to emphasize during questions
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {availableFocusAreas.map((area) => {
                  const isSelected = focusAreas.includes(area);
                  return (
                    <button
                      key={area}
                      onClick={() => toggleFocusArea(area)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-2xs border border-slate-900"
                          : "bg-stone-50 text-slate-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-100"
                      }`}
                    >
                      <span>{area}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <span className="text-slate-400 text-[10px]">+</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 6 — INTERVIEW EXPERIENCE TOGGLES */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-slate-900" />
                  Simulated AI Signals & Analytics
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Enable simulated real-time telemetry tracking during the interview room session
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Camera Toggle */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-slate-900" />
                      Camera Analysis
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                      Track eye contact and facial engagement during the interview.
                    </p>
                  </div>

                  <button
                    onClick={() => setCameraAnalysis(!cameraAnalysis)}
                    className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
                      cameraAnalysis ? "bg-slate-900" : "bg-stone-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-2xs transition-transform ${
                        cameraAnalysis ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Voice Toggle */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <Mic className="w-3.5 h-3.5 text-slate-900" />
                      Voice Analysis
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                      Analyze speech fluency, pace, and vocal confidence.
                    </p>
                  </div>

                  <button
                    onClick={() => setVoiceAnalysis(!voiceAnalysis)}
                    className={`w-11 h-6 rounded-full transition-colors relative shrink-0 p-0.5 cursor-pointer ${
                      voiceAnalysis ? "bg-slate-900" : "bg-stone-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-2xs transition-transform ${
                        voiceAnalysis ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* QUESTION PREVIEW SECTION */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-900" />
                  Interview Question Sample Preview
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Illustrative sample topics based on your selected options
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-bold bg-slate-900 text-white text-[10px]">
                      Technical
                    </span>
                    <span className="text-slate-900 font-bold">Server-Side vs Client-Side Rendering</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-0.5 font-normal">
                    &ldquo;Can you explain the difference between server-side rendering and client-side rendering?&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-bold bg-slate-900 text-white text-[10px]">
                      Project
                    </span>
                    <span className="text-slate-900 font-bold">Technical Architecture Trade-offs</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-0.5 font-normal">
                    &ldquo;Tell me about a challenging technical problem you faced while building one of your projects.&rdquo;
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px]">
                      Behavioral
                    </span>
                    <span className="text-slate-900 font-bold">Adaptability & Rapid Learning</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pt-0.5 font-normal">
                    &ldquo;Describe a situation where you had to learn a new technology quickly.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Summary Panel (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-20 p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-slate-900 fill-current" />
                  Your Interview Summary
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Live configuration summary</p>
              </div>

              {/* Summary Items List */}
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-slate-500 font-medium">Role</span>
                  <span className="text-slate-900 font-bold">{selectedRole}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-slate-500 font-medium">Interview Type</span>
                  <span className="text-slate-900 font-bold">{selectedType}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-slate-500 font-medium">Difficulty</span>
                  <span className="text-slate-900 font-bold">{selectedDifficulty}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-slate-500 font-medium">Duration</span>
                  <span className="text-emerald-700 font-bold">{selectedDuration}</span>
                </div>

                <div className="pb-2 border-b border-stone-100 space-y-1.5">
                  <span className="text-slate-500 font-medium block">Selected Focus Areas</span>
                  <div className="flex flex-wrap gap-1">
                    {focusAreas.map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded bg-stone-100 text-slate-900 border border-stone-300 text-[10px] font-bold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="text-slate-500 font-medium">Camera Analysis</span>
                  <span className={cameraAnalysis ? "text-emerald-700 font-bold" : "text-slate-400 font-semibold"}>
                    {cameraAnalysis ? "Enabled" : "Disabled"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Voice Analysis</span>
                  <span className={voiceAnalysis ? "text-emerald-700 font-bold" : "text-slate-400 font-semibold"}>
                    {voiceAnalysis ? "Enabled" : "Disabled"}
                  </span>
                </div>
              </div>

              {/* Primary Action CTA */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleStartInterview}
                  aria-label="Start AI Mock Interview Session"
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start AI Mock Interview</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center leading-relaxed font-normal">
                  Your personalized interview questions will be prepared based on your profile.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Sequence Modal Overlay */}
        {isPreparing && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="max-w-md w-full p-8 rounded-3xl bg-[#121212] border border-white/10 text-center space-y-6 shadow-2xl relative text-white">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 p-0.5 mx-auto flex items-center justify-center text-white shadow-2xs">
                <Cpu className="w-8 h-8 animate-spin text-white" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-stone-200">
                  <Sparkles className="w-3.5 h-3.5 text-white fill-current" />
                  <span>AI Preparation Engine</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">Preparing Your Session</h3>
                <p className="text-xs text-stone-300 font-mono font-bold">
                  {prepSteps[prepStep]}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/15">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{
                    width: `${((prepStep + 1) / prepSteps.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
