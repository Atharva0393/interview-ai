"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Sliders,
  Mic,
  Camera,
  Bell,
  Sparkles,
  Save,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [aiStrictness, setAiStrictness] = useState("Balanced");
  const [micDevice, setMicDevice] = useState("Default Microphone (Built-in)");
  const [cameraDevice, setCameraDevice] = useState("Default HD Camera (Built-in)");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platform & AI Preferences</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">User Settings</h1>
            <p className="text-xs text-slate-400">
              Manage your profile, target position goals, AI evaluation tone, and simulated devices.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Settings Saved!" : "Save Changes"}</span>
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* User Profile Info */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Candidate Profile Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  defaultValue={MOCK_USER_PROFILE.name}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Role Title</label>
                <input
                  type="text"
                  defaultValue={MOCK_USER_PROFILE.role}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* AI Feedback Persona & Evaluation Strictness */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-violet-400" />
              AI Evaluation Calibration
            </h2>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-300 block">
                Technical Feedback Strictness
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { level: "Encouraging", desc: "Forgiving on minor syntax or STAR structure slips" },
                  { level: "Balanced", desc: "Realistic tech lead evaluation standards" },
                  { level: "Rigorous", desc: "Strict Big-Tech bar with deep pushback on trade-offs" },
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setAiStrictness(item.level)}
                    className={`p-3.5 rounded-xl border text-left space-y-1 transition-all cursor-pointer ${
                      aiStrictness === item.level
                        ? "bg-violet-600/20 border-violet-500 text-white shadow-md shadow-violet-500/10"
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.level}</div>
                    <div className="text-[11px] text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Simulated Device Selection */}
          <div className="p-6 rounded-2xl bg-[#111827]/80 backdrop-blur-md border border-[#1e293b] space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              Simulated Audio & Video Input
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-slate-400" />
                  Microphone Source
                </label>
                <select
                  value={micDevice}
                  onChange={(e) => setMicDevice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Default Microphone (Built-in)">Default Microphone (Built-in)</option>
                  <option value="Studio USB Microphone">Studio USB Microphone</option>
                  <option value="Bluetooth Headset Mic">Bluetooth Headset Mic</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-slate-400" />
                  Camera Preview Source
                </label>
                <select
                  value={cameraDevice}
                  onChange={(e) => setCameraDevice(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Default HD Camera (Built-in)">Default HD Camera (Built-in)</option>
                  <option value="External 4K Webcam">External 4K Webcam</option>
                  <option value="Virtual AI Cam Simulator">Virtual AI Cam Simulator</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
