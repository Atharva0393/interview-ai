import { GazeMetrics } from "./types";

export interface FaceLandmarkResult {
  faceDetected: boolean;
  isScreenDirected: boolean;
  statusLabel: "Face detected" | "Head oriented toward screen" | "Estimated screen-directed gaze" | "Tracking unavailable";
  trackingQuality: "optimal" | "partial" | "low_light" | "no_face" | "unavailable";
  headPose: {
    yawDegrees: number;
    pitchDegrees: number;
    rollDegrees: number;
  };
}

export class GazeTrackerSession {
  private totalFrames = 0;
  private validTrackingFrames = 0;
  private screenDirectedFrames = 0;
  private offScreenFrames = 0;
  private startTime: number = Date.now();
  private lastEvaluationTime: number = Date.now();

  private currentHeadPose = { yawDegrees: 0, pitchDegrees: 0, rollDegrees: 0 };
  private currentStatus: "Face detected" | "Head oriented toward screen" | "Estimated screen-directed gaze" | "Tracking unavailable" = "Tracking unavailable";
  private currentQuality: "optimal" | "partial" | "low_light" | "no_face" | "unavailable" = "unavailable";

  public reset(): void {
    this.totalFrames = 0;
    this.validTrackingFrames = 0;
    this.screenDirectedFrames = 0;
    this.offScreenFrames = 0;
    this.startTime = Date.now();
    this.lastEvaluationTime = Date.now();
  }

  /**
   * Process a single video frame with 468+ face landmarks.
   */
  public processLandmarks(landmarks: Array<{ x: number; y: number; z?: number }> | null): FaceLandmarkResult {
    this.totalFrames++;
    const now = Date.now();
    const dtSec = Math.max(0.01, (now - this.lastEvaluationTime) / 1000);
    this.lastEvaluationTime = now;

    if (!landmarks || landmarks.length < 468) {
      this.currentStatus = "Tracking unavailable";
      this.currentQuality = "no_face";
      return {
        faceDetected: false,
        isScreenDirected: false,
        statusLabel: this.currentStatus,
        trackingQuality: this.currentQuality,
        headPose: this.currentHeadPose,
      };
    }

    // Key landmarks from MediaPipe FaceMesh standard canonical indices
    // 1: Nose tip, 152: Chin, 33: Left eye outer corner, 263: Right eye outer corner
    // 168: Midpoint between eyes, 10: Forehead top center
    const nose = landmarks[1];
    const chin = landmarks[152];
    const leftEyeOuter = landmarks[33];
    const rightEyeOuter = landmarks[263];
    const forehead = landmarks[10];

    // Check visibility / reasonable coordinates
    if (!nose || !chin || !leftEyeOuter || !rightEyeOuter || !forehead) {
      this.currentStatus = "Tracking unavailable";
      this.currentQuality = "partial";
      return {
        faceDetected: false,
        isScreenDirected: false,
        statusLabel: this.currentStatus,
        trackingQuality: this.currentQuality,
        headPose: this.currentHeadPose,
      };
    }

    this.validTrackingFrames++;

    // 1. Roll calculation (tilt angle between outer eye corners in degrees)
    const eyeDeltaX = rightEyeOuter.x - leftEyeOuter.x;
    const eyeDeltaY = rightEyeOuter.y - leftEyeOuter.y;
    const rollRadians = Math.atan2(eyeDeltaY, eyeDeltaX);
    const rollDegrees = Math.round(rollRadians * (180 / Math.PI));

    // 2. Yaw calculation (horizontal rotation: relative nose position between eyes)
    // When looking straight forward, nose horizontal ratio is ~0.50
    const eyeSpan = Math.max(0.05, Math.abs(rightEyeOuter.x - leftEyeOuter.x));
    const noseOffsetFromLeft = nose.x - leftEyeOuter.x;
    const horizontalRatio = noseOffsetFromLeft / eyeSpan;
    // Map 0.50 center to 0 degrees; deviation +/- 0.20 maps to +/- 35 degrees
    const yawDegrees = Math.round((horizontalRatio - 0.5) * 160);

    // 3. Pitch calculation (vertical tilt: nose height relative to forehead & chin)
    const faceHeight = Math.max(0.05, Math.abs(chin.y - forehead.y));
    const noseOffsetFromForehead = nose.y - forehead.y;
    const verticalRatio = noseOffsetFromForehead / faceHeight;
    // Balanced vertical center is roughly 0.60
    const pitchDegrees = Math.round((verticalRatio - 0.58) * 150);

    this.currentHeadPose = {
      yawDegrees: Math.max(-60, Math.min(60, yawDegrees)),
      pitchDegrees: Math.max(-45, Math.min(45, pitchDegrees)),
      rollDegrees: Math.max(-45, Math.min(45, rollDegrees)),
    };

    // 4. Iris Landmark Gaze refinement (if 478 iris landmarks are present)
    let irisCentered = true;
    if (landmarks.length >= 478) {
      const leftIris = landmarks[468]; // Left iris center
      const rightIris = landmarks[473]; // Right iris center
      if (leftIris && rightIris) {
        // Approximate iris horizontal deviation
        const leftIrisRatio = (leftIris.x - leftEyeOuter.x) / eyeSpan;
        if (leftIrisRatio < 0.1 || leftIrisRatio > 0.9) {
          irisCentered = false;
        }
      }
    }

    // Determine estimated screen-directed status
    const isHeadOriented = Math.abs(yawDegrees) <= 18 && Math.abs(pitchDegrees) <= 16;
    const isScreenDirected = isHeadOriented && irisCentered && Math.abs(rollDegrees) <= 22;

    if (isScreenDirected) {
      this.screenDirectedFrames++;
      this.currentStatus = "Estimated screen-directed gaze";
      this.currentQuality = "optimal";
    } else if (isHeadOriented) {
      this.offScreenFrames++;
      this.currentStatus = "Head oriented toward screen";
      this.currentQuality = "optimal";
    } else {
      this.offScreenFrames++;
      this.currentStatus = "Face detected";
      this.currentQuality = "partial";
    }

    return {
      faceDetected: true,
      isScreenDirected,
      statusLabel: this.currentStatus,
      trackingQuality: this.currentQuality,
      headPose: this.currentHeadPose,
    };
  }

  /**
   * Finalizes session-level GazeMetrics based on observed frames and actual time intervals.
   */
  public getSnapshotMetrics(): GazeMetrics {
    const elapsedSec = Math.max(1, (Date.now() - this.startTime) / 1000);

    // Approximate time based on frame ratio of total elapsed time
    const validTrackingRatio = this.totalFrames > 0 ? this.validTrackingFrames / this.totalFrames : 0;
    const validTrackingSec = Math.round(elapsedSec * validTrackingRatio * 10) / 10;

    let screenDirectedPct: number | null = null;
    let screenDirectedSec = 0;
    let offScreenSec = 0;

    if (this.validTrackingFrames > 0) {
      const screenDirectedRatio = this.screenDirectedFrames / this.validTrackingFrames;
      screenDirectedPct = Math.min(100, Math.round(screenDirectedRatio * 100));
      screenDirectedSec = Math.round(validTrackingSec * screenDirectedRatio * 10) / 10;
      offScreenSec = Math.round((validTrackingSec - screenDirectedSec) * 10) / 10;
    }

    const faceDetectedPct = Math.round(validTrackingRatio * 100);

    let availabilityNotes = "Computed using client-side MediaPipe landmark geometry.";
    if (this.validTrackingFrames === 0) {
      availabilityNotes = "Camera was inactive or candidate face was not visible.";
    } else if (screenDirectedPct === null) {
      availabilityNotes = "Insufficient tracking frames to compute screen-directed gaze ratio.";
    }

    return {
      totalObservedSec: Math.round(elapsedSec * 10) / 10,
      validTrackingSec,
      screenDirectedSec,
      offScreenSec,
      screenDirectedPct,
      faceDetectedPct,
      headPose: this.currentHeadPose,
      trackingQuality: this.validTrackingFrames > 0 ? this.currentQuality : "unavailable",
      statusLabel: this.currentStatus,
      isReliable: this.validTrackingFrames >= 15,
      availabilityNotes,
    };
  }
}

/**
 * Lazy initializer for MediaPipe FaceLandmarker vision tasks.
 * Safe for Next.js SSR (only runs client-side).
 */
let cachedFaceLandmarker: any = null;

export async function initializeFaceLandmarker(): Promise<any> {
  if (typeof window === "undefined") return null;
  if (cachedFaceLandmarker) return cachedFaceLandmarker;

  try {
    const vision = await import("@mediapipe/tasks-vision");
    const FilesetResolver = vision.FilesetResolver;
    const FaceLandmarker = vision.FaceLandmarker;

    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numFaces: 1,
      minFaceDetectionConfidence: 0.5,
      minFacePresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
      outputFaceBlendshapes: false,
      outputFacialTransformationMatrixes: false,
    });

    cachedFaceLandmarker = landmarker;
    return landmarker;
  } catch (err) {
    console.warn("MediaPipe GPU initialization failed, falling back to CPU delegate:", err);
    try {
      const vision = await import("@mediapipe/tasks-vision");
      const FilesetResolver = vision.FilesetResolver;
      const FaceLandmarker = vision.FaceLandmarker;

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const landmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          delegate: "CPU",
        },
        runningMode: "VIDEO",
        numFaces: 1,
      });

      cachedFaceLandmarker = landmarker;
      return landmarker;
    } catch (fallbackErr) {
      console.error("MediaPipe FaceLandmarker CPU fallback failed:", fallbackErr);
      return null;
    }
  }
}
