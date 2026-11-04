import { InterviewCategory, LanguageCode } from '@/types';

export const APP_NAME = 'AwaazPath';
export const APP_TAGLINE = 'Your Voice. Your Confidence. Your Career.';
export const APP_CHALLENGE = 'Great Indian AI Internship Challenge by Gnani AI';

export const CATEGORIES: {
  id: InterviewCategory;
  name: string;
  hindiName: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    id: 'hr',
    name: 'HR Interview',
    hindiName: 'एचआर साक्षात्कार',
    description: 'Personal background, strengths, weaknesses, cultural fit, and long-term goals.',
    icon: 'UserCheck',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'fresher',
    name: 'Fresher Placement',
    hindiName: 'कैंपस प्लेसमेंट',
    description: 'Campus placement essentials, final year project defense, and college-to-workplace transition.',
    icon: 'GraduationCap',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'internship',
    name: 'Internship Interview',
    hindiName: 'इंटर्नशिप साक्षात्कार',
    description: 'Internship expectations, curiosity, problem solving, and willingness to learn.',
    icon: 'Briefcase',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'technical',
    name: 'Technical Interview',
    hindiName: 'तकनीकी साक्षात्कार',
    description: 'Explaining code, architecture, problem-solving approach, and technical decisions simply.',
    icon: 'Code2',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'behavioral',
    name: 'Behavioral (STAR)',
    hindiName: 'व्यवहारिक प्रश्न',
    description: 'Conflict resolution, leadership under pressure, and teamwork using the STAR framework.',
    icon: 'Sparkles',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    hindiName: 'संवाद कौशल',
    description: 'Fluency, clarity, reduction of filler words, and switching smoothly from Hinglish to English.',
    icon: 'MessageSquare',
    color: 'from-violet-500 to-fuchsia-600',
  },
];

export const LANGUAGES: {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  description: string;
}[] = [
  {
    code: 'indic-auto',
    label: 'Auto Detect (Hinglish/Indian)',
    nativeLabel: 'ऑटो डिटेक्ट (हिंग्लिश / हिंदी / इंग्लिश)',
    description: 'Prisma automatically detects Hindi, English, or Code-mixed Hinglish speech.',
  },
  {
    code: 'hi-IN',
    label: 'Hindi (hi-IN)',
    nativeLabel: 'हिंदी',
    description: 'Optimized for pure Hindi and Devnagari pronunciation.',
  },
  {
    code: 'en-IN',
    label: 'Indian English (en-IN)',
    nativeLabel: 'भारतीय अंग्रेजी',
    description: 'Optimized for Indian accents, intonations, and common expressions.',
  },
];

export const GNANI_VOICES = [
  { id: 'Shivani', label: 'Shivani (Female, Expressive Indian - Recommended)', gender: 'female' },
  { id: 'Avinash', label: 'Avinash (Male, Professional Indian - Recommended)', gender: 'male' },
  { id: 'Lakshmi', label: 'Lakshmi (Female, Gentle Career Guide)', gender: 'female' },
  { id: 'Shubham', label: 'Shubham (Male, Clear Articulation)', gender: 'male' },
  { id: 'Kalpana', label: 'Kalpana (Female, Senior Corporate Tone)', gender: 'female' },
  { id: 'Devansh', label: 'Devansh (Male, Dynamic Tone)', gender: 'male' },
];

export const STORAGE_KEYS = {
  SESSIONS: 'awaazpath_sessions_v1',
  PREFERENCES: 'awaazpath_preferences_v1',
  API_USAGE: 'awaazpath_api_usage_v1',
  ASSISTANT_CHAT: 'awaazpath_assistant_chat_v1',
};

export const RUBRIC_WEIGHTS = {
  relevance: 25,
  clarity: 20,
  communication: 20,
  structure: 20,
  confidence: 15,
};

