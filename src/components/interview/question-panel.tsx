"use client";

import React from "react";
import { Mic, MicOff, HelpCircle, FileText, Volume2, VolumeX, Sparkles } from "lucide-react";

interface QuestionPanelProps {
  question: any;
  isPaused: boolean;
  isSpeakingQuestion?: boolean;
  onSpeakQuestion?: () => void;
  onStopSpeaking?: () => void;
  liveVolumeLevel?: number; // 0-100
  liveTranscript?: string;
  interimTranscript?: string;
  isMicActive?: boolean;
  onToggleMic?: () => void;
}

export function QuestionPanel({
  question,
  isPaused,
  isSpeakingQuestion = false,
  onSpeakQuestion,
  onStopSpeaking,
  liveVolumeLevel = 0,
  liveTranscript = "",
  interimTranscript = "",
  isMicActive = false,
  onToggleMic,
}: QuestionPanelProps) {
  // Normalize live audio bar height based on real AudioContext volume level
  const baseVolume = isMicActive && !isPaused ? Math.min(100, Math.max(10, liveVolumeLevel)) : 10;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/80 shadow-2xs space-y-6 flex flex-col justify-between">
      {/* Question Header & Spoken Audio Controls */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
              Question {question.number}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-100 text-slate-700 border border-stone-200 text-xs font-semibold">
              {question.category} • {question.subcategory || question.competency || "Technical"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Question Playback CTA */}
            {onSpeakQuestion && (
              <button
                type="button"
                onClick={isSpeakingQuestion ? onStopSpeaking : onSpeakQuestion}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isSpeakingQuestion
                    ? "bg-slate-900 text-white border-slate-900 animate-pulse"
                    : "bg-stone-50 hover:bg-stone-100 text-slate-700 border-stone-200"
                }`}
                title={isSpeakingQuestion ? "Stop speaking" : "Read question aloud"}
              >
                {isSpeakingQuestion ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                    <span>Stop Speech</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-slate-900" />
                    <span>Read Aloud</span>
                  </>
                )}
              </button>
            )}

            <span className="text-[11px] text-slate-400 font-mono">
              ID: {question.id}
            </span>
          </div>
        </div>

        {/* Main Question Focal Point */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Contextual Guidance Tip */}
        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-700 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
          <p className="leading-relaxed font-normal">
            <span className="font-bold text-slate-900">Guidance Tip: </span>
            {question.helperText || question.relevanceReason || "Answer using structured evidence and quantifiable impact."}
          </p>
        </div>
      </div>

      {/* Real-time Voice Capture Waveform & Live Transcript Box */}
      <div className="space-y-4 pt-4 border-t border-stone-100">
        {/* Microphone Status & Live Dynamic Audio Waveform */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl bg-stone-50 border border-stone-200 gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleMic}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs ${
                isMicActive && !isPaused
                  ? "bg-slate-900 text-white"
                  : "bg-stone-200 text-slate-600 hover:bg-stone-300"
              }`}
              title={isMicActive ? "Mute Microphone" : "Enable Microphone"}
            >
              {isMicActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <div>
              <span className="text-xs font-bold text-slate-900 block">
                {isPaused
                  ? "Capturing Paused"
                  : isMicActive
                  ? "Microphone Active • Web Speech API"
                  : "Microphone Off • Click icon to speak"}
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                {isMicActive && !isPaused
                  ? `Signal Level: ${Math.round(liveVolumeLevel)}% RMS • Speech Recognition streaming`
                  : "Speech recognition idle"}
              </span>
            </div>
          </div>

          {/* Dynamic Audio Visualizer Bars modulated by live RMS level */}
          <div className="flex items-end gap-1 h-6 px-3 shrink-0">
            {[0.5, 0.9, 0.4, 1.0, 0.7, 1.2, 0.6, 0.95, 0.55, 0.85, 0.45, 1.1].map((scale, i) => {
              const barHeight = Math.min(100, Math.max(15, Math.round(baseVolume * scale)));
              return (
                <div
                  key={i}
                  className="w-1 bg-slate-900 rounded-full transition-all duration-150"
                  style={{
                    height: isMicActive && !isPaused ? `${barHeight}%` : "15%",
                    opacity: isMicActive && !isPaused ? 0.9 : 0.3,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Live Speech Recognition Transcript Box */}
        <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
              <FileText className="w-3.5 h-3.5 text-slate-900" />
              <span>Spoken Transcript Preview</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {isMicActive ? "Live Speech-to-Text" : "Manual / Saved Answer"}
            </span>
          </div>

          {liveTranscript || interimTranscript ? (
            <p className="text-xs text-slate-800 leading-relaxed font-sans bg-stone-50 p-3 rounded-xl border border-stone-200/80 font-normal">
              <span>{liveTranscript}</span>
              {interimTranscript && (
                <span className="text-slate-400 italic"> {interimTranscript}</span>
              )}
            </p>
          ) : (
            <p className="text-xs text-slate-400 leading-relaxed font-mono bg-stone-50 p-3 rounded-xl border border-stone-200/80 italic font-normal">
              &ldquo;Speak into your microphone or type your response below...&rdquo;
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
