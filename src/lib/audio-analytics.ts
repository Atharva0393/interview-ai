import { SpeechMetrics } from "./types";

// Common English filler words and phrases with regex boundaries
const FILLER_PATTERNS: Array<{ word: string; pattern: RegExp }> = [
  { word: "um", pattern: /\b(um|umm|ummm)\b/gi },
  { word: "uh", pattern: /\b(uh|uhh|uhhh)\b/gi },
  { word: "er", pattern: /\b(er|err)\b/gi },
  { word: "ah", pattern: /\b(ah|ahh)\b/gi },
  { word: "like", pattern: /\b(like)\b/gi },
  { word: "you know", pattern: /\b(you know)\b/gi },
  { word: "basically", pattern: /\b(basically)\b/gi },
  { word: "actually", pattern: /\b(actually)\b/gi },
  { word: "kind of", pattern: /\b(kind of|kinda)\b/gi },
  { word: "sort of", pattern: /\b(sort of)\b/gi },
];

export interface AudioAnalyserSession {
  context: AudioContext;
  analyser: AnalyserNode;
  source: MediaStreamAudioSourceNode;
  getVolumeLevel: () => number; // 0 to 100
  destroy: () => void;
}

/**
 * Creates a browser Web Audio AnalyserNode linked to the provided microphone stream.
 */
export function createAudioAnalyser(stream: MediaStream): AudioAnalyserSession | null {
  if (typeof window === "undefined") return null;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;

    const context = new AudioContextClass();
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.4;

    const source = context.createMediaStreamSource(stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const getVolumeLevel = (): number => {
      if (context.state === "suspended") {
        context.resume().catch(() => {});
      }
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      // Normalize 0-255 to 0-100 with modest gain
      const normalized = Math.min(100, Math.round((average / 128) * 100));
      return normalized;
    };

    const destroy = () => {
      try {
        source.disconnect();
        analyser.disconnect();
        if (context.state !== "closed") {
          context.close().catch(() => {});
        }
      } catch (err) {
        console.warn("Audio context cleanup warning:", err);
      }
    };

    return { context, analyser, source, getVolumeLevel, destroy };
  } catch (err) {
    console.error("Failed to initialize Web Audio Analyser:", err);
    return null;
  }
}

/**
 * Extracts and tallies filler words from candidate transcript text.
 */
export function analyzeFillerWords(transcript: string): {
  totalCount: number;
  frequencies: Record<string, number>;
} {
  if (!transcript || !transcript.trim()) {
    return { totalCount: 0, frequencies: {} };
  }

  const frequencies: Record<string, number> = {};
  let totalCount = 0;

  for (const item of FILLER_PATTERNS) {
    const matches = transcript.match(item.pattern);
    if (matches && matches.length > 0) {
      frequencies[item.word] = matches.length;
      totalCount += matches.length;
    }
  }

  return { totalCount, frequencies };
}

/**
 * Computes structured speech analytics from actual response timing, volume samples, and transcript.
 */
export function calculateSpeechMetrics(params: {
  transcript: string;
  totalDurationSec: number;
  speakingDurationSec: number;
  volumeSamples?: number[];
  pauseIntervalsCount?: number;
}): SpeechMetrics {
  const { transcript, totalDurationSec, speakingDurationSec, volumeSamples = [], pauseIntervalsCount = 0 } = params;

  const words = transcript.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Filler words
  const { totalCount: fillerWordCount, frequencies: fillerWords } = analyzeFillerWords(transcript);

  // Pause duration is the silent gap during the answer
  const rawPauseSec = Math.max(0, totalDurationSec - speakingDurationSec);
  const pauseDurationSec = Math.round(rawPauseSec * 10) / 10;
  const pauseCount = pauseIntervalsCount;

  // Words per minute calculation using speaking duration as denominator
  // If speaking duration is less than 3 seconds or word count < 3, speaking rate is marked unavailable (null)
  let speakingRateWpm: number | null = null;
  let isReliable = true;
  let availabilityNotes = "Reliable client-side measurement.";

  if (speakingDurationSec >= 3 && wordCount >= 3) {
    const durationMinutes = speakingDurationSec / 60;
    speakingRateWpm = Math.round(wordCount / durationMinutes);
    // Sanity check against anomalous recognition bursts
    if (speakingRateWpm > 320) {
      speakingRateWpm = 320;
      availabilityNotes = "Rapid speech rate detected or burst recognition window.";
    }
  } else {
    isReliable = false;
    availabilityNotes = "Sample too brief (< 3 seconds or < 3 words) to compute speaking rate reliably.";
  }

  // Volume analysis
  let averageVolumeRms: number | null = null;
  let volumeConsistencyPct: number | null = null;
  let audioQuality: "optimal" | "low_input" | "noisy" | "unavailable" = "unavailable";

  if (volumeSamples.length > 0) {
    const sum = volumeSamples.reduce((a, b) => a + b, 0);
    const avg = sum / volumeSamples.length;
    averageVolumeRms = Math.round(avg);

    // Variance calculation for volume consistency
    const variance =
      volumeSamples.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / volumeSamples.length;
    const stdDev = Math.sqrt(variance);

    // Consistency score (lower stdDev means more even vocal projection)
    volumeConsistencyPct = Math.max(20, Math.min(100, Math.round(100 - stdDev * 1.5)));

    if (avg < 5) {
      audioQuality = "low_input";
      availabilityNotes = "Microphone input volume was low; speak closer to your device.";
    } else if (avg > 85) {
      audioQuality = "noisy";
      availabilityNotes = "High microphone signal level or background noise detected.";
    } else {
      audioQuality = "optimal";
    }
  } else {
    audioQuality = "unavailable";
  }

  return {
    totalDurationSec: Math.round(totalDurationSec * 10) / 10,
    speakingDurationSec: Math.round(speakingDurationSec * 10) / 10,
    pauseDurationSec,
    pauseCount,
    wordCount,
    speakingRateWpm,
    fillerWordCount,
    fillerWords,
    averageVolumeRms,
    volumeConsistencyPct,
    audioQuality,
    isReliable,
    availabilityNotes,
  };
}

/**
 * Computes session-wide speech delivery score (0-100) combining pace, filler density, and pause control.
 * Kept strictly distinct from technical correctness.
 */
export function computeSpeechDeliveryScore(metrics: SpeechMetrics[]): number {
  if (!metrics || metrics.length === 0) return 80;

  const validPaceMetrics = metrics.filter((m) => m.speakingRateWpm !== null);
  const avgWpm =
    validPaceMetrics.length > 0
      ? validPaceMetrics.reduce((a, b) => a + (b.speakingRateWpm || 0), 0) / validPaceMetrics.length
      : 140;

  const totalWords = metrics.reduce((a, b) => a + b.wordCount, 0);
  const totalFillers = metrics.reduce((a, b) => a + b.fillerWordCount, 0);

  // 1. Pace Score (Optimal range is 120-160 WPM)
  let paceScore = 85;
  if (avgWpm >= 120 && avgWpm <= 165) {
    paceScore = 95;
  } else if (avgWpm >= 100 && avgWpm <= 185) {
    paceScore = 85;
  } else {
    paceScore = 70;
  }

  // 2. Filler Density Score (percentage of filler words)
  let fillerScore = 90;
  if (totalWords > 0) {
    const fillerRatio = totalFillers / totalWords;
    if (fillerRatio < 0.03) {
      fillerScore = 95; // < 3% fillers is exceptional
    } else if (fillerRatio < 0.07) {
      fillerScore = 85; // 3% - 7% is normal
    } else {
      fillerScore = 70; // > 7% needs work
    }
  }

  // 3. Audio Quality Score
  const qualityScores = metrics.map((m) => {
    if (m.audioQuality === "optimal") return 90;
    if (m.audioQuality === "low_input") return 75;
    if (m.audioQuality === "noisy") return 75;
    return 80;
  });
  const avgQualityScore = qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length;

  return Math.round(paceScore * 0.45 + fillerScore * 0.4 + avgQualityScore * 0.15);
}
