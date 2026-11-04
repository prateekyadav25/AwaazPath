export type InterviewCategory =
  | 'hr'
  | 'technical'
  | 'behavioral'
  | 'communication'
  | 'internship'
  | 'fresher';

export type LanguageCode = 'hi-IN' | 'en-IN' | 'indic-auto';

export type PrismaFormat = 'codemix' | 'transliterate' | 'transcribe' | 'verbatim';

export interface InterviewQuestion {
  id: string;
  category: InterviewCategory;
  title: string;
  questionText: string;
  questionHindi?: string;
  context: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  keyPoints: string[];
  sampleGoodAnswer: string;
  sampleWeakAnswer: string;
}

export interface RubricScores {
  relevance: number; // Max 25
  clarity: number; // Max 20
  communication: number; // Max 20
  structure: number; // Max 20
  confidence: number; // Max 15 (transcript-based confidence indicators)
  total: number; // Max 100
}

export interface EvaluationResult {
  scores: RubricScores;
  overallScore: number;
  grade: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical Focus';
  strengths: string[];
  weaknesses: string[];
  missingPoints: string[];
  suggestedImprovements: string[];
  betterSampleAnswer: string;
  simpleFresherAnswer: string;
  hindiExplanation: string;
  actionableTip: string;
  fillerWordsFound: string[];
  speakingDurationSeconds?: number;
  wordCount: number;
  confidencePhrases: string[];
  hesitationPhrases: string[];
}

export interface InterviewSession {
  id: string;
  timestamp: number;
  category: InterviewCategory;
  questionId: string;
  questionText: string;
  transcript: string;
  detectedLanguage?: string;
  evaluation: EvaluationResult;
  isDemo?: boolean;
}

export interface ApiUsageStats {
  sttRequests: number;
  ttsRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalAudioSecondsProcessed: number;
  lastRequestTimestamp: number | null;
  history: {
    id: string;
    type: 'stt' | 'tts';
    status: 'success' | 'failure';
    timestamp: number;
    durationMs: number;
    details?: string;
  }[];
}

export interface UserPreferences {
  preferredLanguage: LanguageCode;
  creditSaverMode: boolean;
  demoMode: boolean;
  voiceGender: 'female' | 'male';
  ttsSpeed: number;
  autoPlayAudio: boolean;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hindiText?: string;
  audioUrl?: string | null;
  timestamp: number;
  category?: 'explanation' | 'hinglish-conversion' | 'vocabulary' | 'structure' | 'general';
}

