"use client";

import { useState } from "react";
import {
  User,
  Sliders,
  Mic,
  Camera,
  Sparkles,
  Save,
  Check,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";
import { useToast } from "@/components/ui/toast";

export default function SettingsPage() {
  const { showToast } = useToast();
  const [saved, setSaved] = useState(false);
  const [aiStrictness, setAiStrictness] = useState("Balanced");
  const [micDevice, setMicDevice] = useState("Default Microphone (Built-in)");
  const [cameraDevice, setCameraDevice] = useState("Default HD Camera (Built-in)");

  const handleSave = () => {
    setSaved(true);
    showToast("Settings Updated", "Your profile and AI evaluation parameters have been saved.", "success");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-current text-stone-200" />
              <span>Platform & AI Preferences</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">User Settings</h1>
            <p className="text-xs text-slate-500 font-normal">
              Manage your profile, target position goals, AI evaluation tone, and simulated devices.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:outline-none active:scale-[0.98]"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Settings Saved!" : "Save Changes"}</span>
          </button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* User Profile Info */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-900" />
              Candidate Profile Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  defaultValue={MOCK_USER_PROFILE.name}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Target Role Title</label>
                <input
                  type="text"
                  defaultValue={MOCK_USER_PROFILE.role}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* AI Feedback Persona & Evaluation Strictness */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-900" />
              AI Evaluation Calibration
            </h2>
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
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
                        ? "bg-slate-900 border-slate-900 text-white shadow-2xs"
                        : "bg-white border-stone-200 text-slate-600 hover:border-stone-400 hover:bg-stone-50"
                    }`}
                  >
                    <div className={`text-xs font-bold ${aiStrictness === item.level ? "text-white" : "text-slate-900"}`}>{item.level}</div>
                    <div className={`text-[11px] leading-relaxed font-normal ${aiStrictness === item.level ? "text-stone-300" : "text-slate-500"}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Simulated Device Selection */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mic className="w-4 h-4 text-slate-900" />
              Simulated Audio & Video Input
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-slate-500" />
                  Microphone Source
                </label>
                <select
                  value={micDevice}
                  onChange={(e) => setMicDevice(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium cursor-pointer"
                >
                  <option value="Default Microphone (Built-in)">Default Microphone (Built-in)</option>
                  <option value="Studio USB Microphone">Studio USB Microphone</option>
                  <option value="Bluetooth Headset Mic">Bluetooth Headset Mic</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-slate-500" />
                  Camera Preview Source
                </label>
                <select
                  value={cameraDevice}
                  onChange={(e) => setCameraDevice(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-slate-900 font-medium cursor-pointer"
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
