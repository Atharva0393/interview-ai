"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Camera, CameraOff, ShieldCheck, AlertCircle, RefreshCw } from "lucide-react";
import { initializeFaceLandmarker, GazeTrackerSession, FaceLandmarkResult } from "@/lib/gaze-estimation";

interface CandidateCameraProps {
  isPaused: boolean;
  onTelemetryUpdate?: (result: FaceLandmarkResult) => void;
  gazeTracker?: GazeTrackerSession | null;
}

export function CandidateCamera({
  isPaused,
  onTelemetryUpdate,
  gazeTracker,
}: CandidateCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const landmarkerRef = useRef<any>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastProcessTimeRef = useRef<number>(0);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<string>("Camera ready");

  // Stop camera media tracks cleanly
  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Request real camera stream and initialize FaceLandmarker
  const startCamera = async () => {
    setPermissionError(null);
    setIsModelLoading(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsCameraActive(true);

      // Initialize client-side MediaPipe FaceLandmarker
      const landmarker = await initializeFaceLandmarker();
      landmarkerRef.current = landmarker;
      setTrackingStatus("MediaPipe Face Tracking Active");
    } catch (err: any) {
      console.warn("Camera start error:", err);
      const msg =
        err.name === "NotAllowedError" || err.name === "PermissionDeniedError"
          ? "Camera permission denied. You can proceed without camera tracking."
          : err.message || "Failed to access webcam.";
      setPermissionError(msg);
      stopCameraStream();
    } finally {
      setIsModelLoading(false);
    }
  };

  // Video frame analysis loop using MediaPipe
  const processFrame = useCallback(() => {
    if (!isCameraActive || isPaused || !videoRef.current) return;

    const now = performance.now();
    // Throttle inference to ~10 fps (100ms interval) to maintain silky-smooth UI
    if (now - lastProcessTimeRef.current >= 100) {
      lastProcessTimeRef.current = now;

      const video = videoRef.current;
      if (video.readyState >= 2 && landmarkerRef.current) {
        try {
          const results = landmarkerRef.current.detectForVideo(video, now);
          const landmarks = results?.faceLandmarks?.[0] || null;

          if (gazeTracker) {
            const telemetry = gazeTracker.processLandmarks(landmarks);
            setTrackingStatus(telemetry.statusLabel);
            onTelemetryUpdate?.(telemetry);
          }
        } catch (e) {
          // Frame skipped or video paused
        }
      }
    }

    animFrameIdRef.current = requestAnimationFrame(processFrame);
  }, [isCameraActive, isPaused, gazeTracker, onTelemetryUpdate]);

  useEffect(() => {
    if (isCameraActive && !isPaused) {
      animFrameIdRef.current = requestAnimationFrame(processFrame);
    } else if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };
  }, [isCameraActive, isPaused, processFrame]);

  // Clean up media tracks when component unmounts
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stopCameraStream]);

  return (
    <div className="relative aspect-video rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between p-4 shadow-2xs group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-950/80 pointer-events-none" />

      {/* Real Video Element */}
      <video
        ref={videoRef}
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
          isCameraActive ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Placeholder / Camera Off Silhouette State */}
      {!isCameraActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center space-y-3 z-0">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-bold text-base text-slate-900">
                AK
              </div>
            </div>
          </div>

          <div className="space-y-1 max-w-xs">
            <span className="text-xs font-bold text-white block">Atharva Kale</span>
            <p className="text-[11px] text-stone-400 leading-tight">
              {permissionError
                ? permissionError
                : "Camera is currently off. Click below to enable live webcam & client-side gaze estimation."}
            </p>
          </div>

          <button
            onClick={startCamera}
            disabled={isModelLoading}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-slate-900 text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isModelLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Loading Vision Model...</span>
              </>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5" />
                <span>Enable Camera Tracking</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Top Overlay Badge & Controls */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md border border-stone-700/60 text-[11px] text-slate-200">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isCameraActive ? "bg-emerald-400" : "bg-stone-500"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isCameraActive ? "bg-emerald-500" : "bg-stone-500"
              }`}
            />
          </span>
          <span>
            {isCameraActive ? "Live Webcam Feed" : "Camera Idle"}
          </span>
        </div>

        {isCameraActive && (
          <button
            onClick={stopCameraStream}
            className="px-3 py-1 rounded-full bg-stone-800/80 hover:bg-stone-800 backdrop-blur-md border border-stone-700 text-[10px] text-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CameraOff className="w-3 h-3 text-red-400" />
            <span>Turn Off</span>
          </button>
        )}
      </div>

      {/* Bottom Status Overlay */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-stone-900/80 backdrop-blur-md border border-stone-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[220px]">{trackingStatus}</span>
        </div>

        <div className="text-[10px] text-stone-400 font-mono">
          MediaPipe Tasks
        </div>
      </div>
    </div>
  );
}
