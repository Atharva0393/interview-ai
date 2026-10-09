/**
 * Web Speech API Recognition and SpeechSynthesis adapters.
 * Gracefully detects browser capabilities and provides fallbacks.
 */

export interface SpeechRecognitionAdapter {
  isSupported: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  isActive: () => boolean;
}

export interface SpeechRecognitionCallbacks {
  onInterimTranscript?: (interim: string) => void;
  onFinalTranscript?: (finalChunk: string, fullTranscript: string) => void;
  onError?: (error: string) => void;
  onStatusChange?: (status: "idle" | "listening" | "processing") => void;
}

/**
 * Checks if browser supports the Web Speech API recognition interface.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/**
 * Creates an active speech recognition adapter instance with deduplication and continuous listening.
 */
export function createSpeechRecognitionAdapter(
  callbacks: SpeechRecognitionCallbacks
): SpeechRecognitionAdapter {
  if (!isSpeechRecognitionSupported()) {
    return {
      isSupported: false,
      start: () => {},
      stop: () => {},
      abort: () => {},
      isActive: () => false,
    };
  }

  const SpeechRecognitionClass =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  let recognition: any = null;
  let active = false;
  let accumulatedFinalText = "";

  const initRecognition = () => {
    recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      active = true;
      callbacks.onStatusChange?.("listening");
    };

    recognition.onresult = (event: any) => {
      let currentInterim = "";
      let newFinalSegments = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        const transcriptPart = item[0]?.transcript || "";

        if (item.isFinal) {
          newFinalSegments += transcriptPart + " ";
        } else {
          currentInterim += transcriptPart;
        }
      }

      if (newFinalSegments.trim()) {
        accumulatedFinalText += (accumulatedFinalText ? " " : "") + newFinalSegments.trim();
        callbacks.onFinalTranscript?.(newFinalSegments.trim(), accumulatedFinalText);
      }

      callbacks.onInterimTranscript?.(currentInterim);
    };

    recognition.onerror = (event: any) => {
      // Don't report "no-speech" as fatal, it's just silence
      if (event.error === "no-speech") return;
      console.warn("Speech recognition event error:", event.error);
      callbacks.onError?.(event.error || "Speech recognition error");
    };

    recognition.onend = () => {
      if (active) {
        // Auto-restart if active flag wasn't explicitly cleared by user stop
        try {
          recognition.start();
        } catch {
          active = false;
          callbacks.onStatusChange?.("idle");
        }
      } else {
        callbacks.onStatusChange?.("idle");
      }
    };
  };

  initRecognition();

  return {
    isSupported: true,
    start: () => {
      if (!recognition) initRecognition();
      try {
        accumulatedFinalText = "";
        active = true;
        recognition.start();
      } catch (e) {
        // Recognition might already be running
        console.warn("Recognition start catch:", e);
      }
    },
    stop: () => {
      active = false;
      try {
        recognition?.stop();
      } catch {}
      callbacks.onStatusChange?.("idle");
    },
    abort: () => {
      active = false;
      try {
        recognition?.abort();
      } catch {}
      callbacks.onStatusChange?.("idle");
    },
    isActive: () => active,
  };
}

/**
 * Browser SpeechSynthesis helper to read interview questions aloud cleanly.
 */
let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakQuestionText(
  text: string,
  options?: {
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options?.onEnd?.();
    return;
  }

  stopSpokenSpeech();

  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    // Select preferred natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Daniel"))
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      options?.onStart?.();
    };

    utterance.onend = () => {
      currentUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      currentUtterance = null;
      // Speech cancellation can trigger 'canceled' or 'interrupted'
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("Speech synthesis error:", e);
        options?.onError?.(e);
      }
      options?.onEnd?.();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error("Speech synthesis failure:", err);
    options?.onEnd?.();
  }
}

export function stopSpokenSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
    currentUtterance = null;
  }
}

export function isSpeechSpeaking(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  return window.speechSynthesis.speaking;
}
