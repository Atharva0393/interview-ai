"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Video,
  Sparkles,
  Sliders,
  Clock,
  UserCheck,
  Code,
  Layers,
  MessageCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

export default function InterviewSetupPage() {
  const [targetRole, setTargetRole] = useState("Senior Frontend Engineer");
  const [seniority, setSeniority] = useState("Senior (4+ YOE)");
  const [interviewType, setInterviewType] = useState("Technical & Architecture");
  const [duration, setDuration] = useState("25 Minutes (5 Questions)");
  const [aiPersona, setAiPersona] = useState("Balanced Engineering Lead");

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Interview Parameter Configuration</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Configure Your Mock Interview</h1>
          <p className="text-xs text-slate-400">
            Customize the AI interviewer&apos;s technical scope, seniority expectation, and evaluation persona.
          </p>
        </div>

        {/* Configuration Grid */}
        <div className="space-y-6">
          {/* Step 1: Target Role & Domain */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Target Position & Stack</h3>
                <p className="text-xs text-slate-400">Select the specific role you are practicing for</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "Senior Frontend Engineer",
                "Full Stack React Developer",
                "System Design Architect",
                "Backend Engineer (Node/Go)",
                "Technical Product Analyst",
                "Engineering Manager",
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => setTargetRole(role)}
                  className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                    targetRole === role
                      ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Seniority & Experience Expectation */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Seniority & Complexity</h3>
                <p className="text-xs text-slate-400">Calibrates the depth of technical pushback</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                "Junior (0-2 YOE)",
                "Mid-Level (2-4 YOE)",
                "Senior (4+ YOE)",
                "Staff / Principal",
              ].map((level) => (
                <button
                  key={level}
                  onClick={() => setSeniority(level)}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                    seniority === level
                      ? "bg-violet-600/20 border-violet-500 text-white shadow-md shadow-violet-500/10"
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Interview Type & Focus Area */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Interview Category</h3>
                <p className="text-xs text-slate-400">Choose question focus framework</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Technical & Architecture", desc: "React RSC, Hydration, Web Performance & State" },
                { title: "Behavioral & STAR", desc: "Conflict resolution, leadership anecdotes & trade-offs" },
                { title: "System Design", desc: "Micro-frontends, caching layers, WebSockets & APIs" },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => setInterviewType(item.title)}
                  className={`p-4 rounded-xl border text-left space-y-1 transition-all cursor-pointer ${
                    interviewType === item.title
                      ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10"
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-bold text-white">{item.title}</div>
                  <div className="text-[11px] text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: AI Persona & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-3">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-400" />
                AI Interviewer Persona
              </label>
              <select
                value={aiPersona}
                onChange={(e) => setAiPersona(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Balanced Engineering Lead">Balanced Engineering Lead (Supportive + Technical)</option>
                <option value="Strict Principal Architect">Strict Principal Architect (Rigorous Edge Cases)</option>
                <option value="Rapid-Fire Technical Recruiter">Rapid-Fire Technical Recruiter (High Tempo)</option>
              </select>
            </div>

            <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-3">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                Session Duration & Length
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="15 Minutes (3 Questions)">15 Minutes (3 Express Questions)</option>
                <option value="25 Minutes (5 Questions)">25 Minutes (5 Standard Questions)</option>
                <option value="40 Minutes (8 Questions)">40 Minutes (8 In-Depth Questions)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Configuration Summary Footer & Action */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-violet-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" />
              Ready for Session Simulation
            </h4>
            <p className="text-xs text-slate-300">
              Role: <span className="text-blue-300 font-semibold">{targetRole}</span> • Type:{" "}
              <span className="text-violet-300 font-semibold">{interviewType}</span>
            </p>
          </div>

          <Link
            href="/interview/session"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter Mock Interview Room</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
