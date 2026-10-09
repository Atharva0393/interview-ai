import { GoogleGenAI } from "@google/genai";
import { CandidateProfileAnalysis, AIQuestion, AIAnswerEvaluation } from "./types";
import { MOCK_RESUME_ANALYSIS, MOCK_INTERVIEW_QUESTIONS } from "./mock-data";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey.includes("your-api-key")) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

export async function analyzeResumeWithGemini(
  resumeText: string,
  jobDescriptionText?: string,
  fileName: string = "Uploaded_Resume.pdf"
): Promise<CandidateProfileAnalysis> {
  const ai = getGeminiClient();

  if (!ai || !resumeText.trim()) {
    return {
      ...MOCK_RESUME_ANALYSIS,
      fileName,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      isAiGenerated: false,
      source: "fallback",
    };
  }

  try {
    const prompt = `
You are an expert AI technical recruiter and engineering evaluator.
Analyze the following candidate resume text ${jobDescriptionText ? "against the target job description" : ""}.

RESUME TEXT:
"""
${resumeText.slice(0, 10000)}
"""

${jobDescriptionText ? `TARGET JOB DESCRIPTION:\n"""\n${jobDescriptionText.slice(0, 4000)}\n"""` : ""}

Respond ONLY with valid JSON matching this exact structure:
{
  "score": <number 0-100 indicating resume match/strength>,
  "targetRole": "<detected primary job role e.g. Frontend Engineer>",
  "workExperienceYears": <estimated years of experience number>,
  "detectedSkills": ["<skill1>", "<skill2>", ...],
  "missingSkills": ["<missing1>", "<missing2>", ...],
  "strengths": ["<strength1>", "<strength2>", ...],
  "recommendations": ["<rec1>", "<rec2>", ...],
  "education": ["<degree or school>"],
  "potentialFollowUpAreas": ["<area1>", "<area2>"]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "";
    const parsed = JSON.parse(jsonText);

    return {
      fileName,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      score: typeof parsed.score === "number" ? parsed.score : 85,
      targetRole: parsed.targetRole || "Software Engineer",
      workExperienceYears: typeof parsed.workExperienceYears === "number" ? parsed.workExperienceYears : 2,
      detectedSkills: Array.isArray(parsed.detectedSkills) ? parsed.detectedSkills : ["JavaScript", "React", "TypeScript"],
      missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : ["CI/CD Pipelines", "GraphQL Caching"],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ["Strong modern technical stack experience"],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : ["Quantify project metrics in interview anecdotes"],
      education: Array.isArray(parsed.education) ? parsed.education : ["B.S. Computer Science"],
      projects: [],
      potentialFollowUpAreas: Array.isArray(parsed.potentialFollowUpAreas) ? parsed.potentialFollowUpAreas : ["State management trade-offs"],
      isAiGenerated: true,
      source: "gemini",
    };
  } catch (error) {
    console.error("Gemini analyzeResume error:", error);
    return {
      ...MOCK_RESUME_ANALYSIS,
      fileName,
      uploadDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      isAiGenerated: false,
      source: "fallback",
    };
  }
}

export async function generatePersonalizedQuestionsWithGemini(params: {
  role: string;
  category: string;
  difficulty: string;
  experienceLevel: string;
  candidateResumeText?: string;
  jobDescriptionText?: string;
  knowledgePassages?: string[];
  focusAreas?: string[];
}): Promise<AIQuestion[]> {
  const ai = getGeminiClient();

  if (!ai) {
    // Return grounded mock questions calibrated for role
    return MOCK_INTERVIEW_QUESTIONS.map((q, idx) => ({
      id: `q_${Date.now()}_${idx}`,
      number: idx + 1,
      question: q.question,
      category: (q.topic.includes("Behavioral") ? "Behavioral" : "Technical") as any,
      difficulty: (params.difficulty || "Medium") as any,
      competency: q.topic,
      relevanceReason: `Calibrated for ${params.role} (${params.difficulty} level).`,
      evidence: params.candidateResumeText ? "Extracted from candidate resume technical experience." : "Target role core requirement.",
      expectedKeyPoints: q.expectedKeyPoints,
      suggestedFollowUps: ["How did you measure the performance impact?", "What alternative approach did you consider?"],
      isApproved: true,
      isCustom: false,
      isAiGenerated: false,
      source: "fallback",
    }));
  }

  try {
    const prompt = `
You are a principal technical interviewer at a top tech company.
Generate 5 personalized, realistic technical & behavioral interview questions grounded strictly in the provided candidate evidence and role parameters.

TARGET ROLE: ${params.role}
INTERVIEW CATEGORY: ${params.category}
DIFFICULTY LEVEL: ${params.difficulty}
EXPERIENCE LEVEL: ${params.experienceLevel}
FOCUS AREAS: ${params.focusAreas?.join(", ") || "General Technical & Behavioral"}

${params.candidateResumeText ? `CANDIDATE RESUME EXCERPT:\n"""\n${params.candidateResumeText.slice(0, 5000)}\n"""` : ""}
${params.jobDescriptionText ? `JOB DESCRIPTION EXCERPT:\n"""\n${params.jobDescriptionText.slice(0, 3000)}\n"""` : ""}
${params.knowledgePassages && params.knowledgePassages.length > 0 ? `KNOWLEDGE BASE CONTEXT PASSAGES:\n"""\n${params.knowledgePassages.join("\n---\n").slice(0, 4000)}\n"""` : ""}

Respond ONLY with valid JSON matching this exact structure:
[
  {
    "number": 1,
    "question": "<question text>",
    "category": "<Technical | Behavioral | System Design>",
    "difficulty": "<Easy | Medium | Hard>",
    "competency": "<competency being tested e.g. React Hydration>",
    "relevanceReason": "<why this question is relevant based on candidate/job evidence>",
    "evidence": "<specific resume line or job requirement evidence cited>",
    "expectedKeyPoints": ["<point1>", "<point2>", "<point3>", "<point4>"],
    "suggestedFollowUps": ["<followup1>", "<followup2>"]
  }
]
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "[]";
    const parsed = JSON.parse(jsonText);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item: any, idx: number) => ({
        id: `q_gen_${Date.now()}_${idx}`,
        number: idx + 1,
        question: item.question || `Explain your experience with ${params.role} architecture.`,
        category: item.category === "Behavioral" ? "Behavioral" : item.category === "System Design" ? "System Design" : "Technical",
        difficulty: item.difficulty === "Easy" ? "Easy" : item.difficulty === "Hard" ? "Hard" : "Medium",
        competency: item.competency || "Technical Problem Solving",
        relevanceReason: item.relevanceReason || `Assessing core competency for ${params.role}.`,
        evidence: item.evidence || "Resume project experience",
        expectedKeyPoints: Array.isArray(item.expectedKeyPoints) ? item.expectedKeyPoints : ["Core concepts", "Trade-offs", "Implementation steps"],
        suggestedFollowUps: Array.isArray(item.suggestedFollowUps) ? item.suggestedFollowUps : ["What trade-offs did you make?"],
        isApproved: true,
        isCustom: false,
        isAiGenerated: true,
        source: "gemini",
      }));
    }

    throw new Error("Parsed response array was empty");
  } catch (error) {
    console.error("Gemini question generation error:", error);
    return MOCK_INTERVIEW_QUESTIONS.map((q, idx) => ({
      id: `q_fallback_${Date.now()}_${idx}`,
      number: idx + 1,
      question: q.question,
      category: (q.topic.includes("Behavioral") ? "Behavioral" : "Technical") as any,
      difficulty: (params.difficulty || "Medium") as any,
      competency: q.topic,
      relevanceReason: `Calibrated for ${params.role} (${params.difficulty} level).`,
      evidence: "Resume candidate experience",
      expectedKeyPoints: q.expectedKeyPoints,
      suggestedFollowUps: ["How did you measure the impact?"],
      isApproved: true,
      isCustom: false,
      isAiGenerated: false,
      source: "fallback",
    }));
  }
}

export async function evaluateAnswerWithGemini(params: {
  questionId: string;
  questionText: string;
  candidateAnswer: string;
  expectedKeyPoints?: string[];
  resumeContext?: string;
}): Promise<AIAnswerEvaluation> {
  const ai = getGeminiClient();

  if (!ai || !params.candidateAnswer.trim()) {
    const isShort = params.candidateAnswer.trim().length < 30;
    return {
      questionId: params.questionId,
      questionText: params.questionText,
      candidateAnswer: params.candidateAnswer || "No answer provided.",
      score: isShort ? 65 : 84,
      communicationScore: isShort ? 68 : 85,
      technicalScore: isShort ? 62 : 86,
      confidenceScore: isShort ? 60 : 82,
      keyPointsCovered: params.expectedKeyPoints?.slice(0, 2) || ["Core explanation", "Basic implementation"],
      keyPointsMissed: params.expectedKeyPoints?.slice(2) || ["Quantified metric outcomes", "Edge case handling"],
      starEvaluation: {
        situation: true,
        task: true,
        action: !isShort,
        result: !isShort,
      },
      feedback: isShort
        ? "Answer was brief. Expand on technical trade-offs and specific project outcomes using the STAR method."
        : "Strong structured answer with clear technical reasoning and relevant anecdote delivery.",
      improvementTip: "Include quantitative metrics (e.g. % latency reduction) to demonstrate impact.",
      isAiGenerated: false,
      source: "fallback",
    };
  }

  try {
    const prompt = `
You are an expert AI interview evaluator.
Evaluate the candidate's response to the following technical/behavioral interview question.

QUESTION:
"${params.questionText}"

EXPECTED KEY POINTS:
${params.expectedKeyPoints?.map((p) => `- ${p}`).join("\n") || "Technical accuracy, STAR structure, clarity"}

CANDIDATE ANSWER:
"""
${params.candidateAnswer.slice(0, 4000)}
"""

Respond ONLY with valid JSON matching this exact structure:
{
  "score": <overall score number 0-100>,
  "communicationScore": <number 0-100>,
  "technicalScore": <number 0-100>,
  "confidenceScore": <number 0-100>,
  "keyPointsCovered": ["<point1>", "<point2>"],
  "keyPointsMissed": ["<missed1>", "<missed2>"],
  "starEvaluation": {
    "situation": <boolean>,
    "task": <boolean>,
    "action": <boolean>,
    "result": <boolean>
  },
  "feedback": "<detailed feedback text>",
  "improvementTip": "<actionable 1-sentence tip for improvement>"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const parsed = JSON.parse(jsonText);

    return {
      questionId: params.questionId,
      questionText: params.questionText,
      candidateAnswer: params.candidateAnswer,
      score: typeof parsed.score === "number" ? parsed.score : 80,
      communicationScore: typeof parsed.communicationScore === "number" ? parsed.communicationScore : 82,
      technicalScore: typeof parsed.technicalScore === "number" ? parsed.technicalScore : 80,
      confidenceScore: typeof parsed.confidenceScore === "number" ? parsed.confidenceScore : 78,
      keyPointsCovered: Array.isArray(parsed.keyPointsCovered) ? parsed.keyPointsCovered : ["Problem statement"],
      keyPointsMissed: Array.isArray(parsed.keyPointsMissed) ? parsed.keyPointsMissed : ["Metrics"],
      starEvaluation: {
        situation: Boolean(parsed.starEvaluation?.situation),
        task: Boolean(parsed.starEvaluation?.task),
        action: Boolean(parsed.starEvaluation?.action),
        result: Boolean(parsed.starEvaluation?.result),
      },
      feedback: parsed.feedback || "Good response structure.",
      improvementTip: parsed.improvementTip || "State your specific role and measurable results.",
      isAiGenerated: true,
      source: "gemini",
    };
  } catch (error) {
    console.error("Gemini evaluateAnswer error:", error);
    return {
      questionId: params.questionId,
      questionText: params.questionText,
      candidateAnswer: params.candidateAnswer,
      score: 82,
      communicationScore: 84,
      technicalScore: 82,
      confidenceScore: 80,
      keyPointsCovered: ["Technical reasoning"],
      keyPointsMissed: ["Quantified outcomes"],
      starEvaluation: { situation: true, task: true, action: true, result: false },
      feedback: "Answer addressed main prompt requirements.",
      improvementTip: "Use STAR methodology with clear outcome metrics.",
      isAiGenerated: false,
      source: "fallback",
    };
  }
}
