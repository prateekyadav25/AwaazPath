import { STORAGE_KEYS } from './constants';
import { InterviewSession, ApiUsageStats, UserPreferences } from '@/types';

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredLanguage: 'indic-auto',
  creditSaverMode: true, // Default to true to conserve the 5,000 Gnani credits!
  demoMode: false,
  voiceGender: 'female',
  ttsSpeed: 1.0,
  autoPlayAudio: false, // Default to false to avoid unwanted playback
};

const DEFAULT_API_USAGE: ApiUsageStats = {
  sttRequests: 0,
  ttsRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalAudioSecondsProcessed: 0,
  lastRequestTimestamp: null,
  history: [],
};

function isClient(): boolean {
  return typeof window !== 'undefined';
}

export function getSessions(): InterviewSession[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load sessions from storage', e);
    return [];
  }
}

export function saveSession(session: InterviewSession): void {
  if (!isClient()) return;
  try {
    const sessions = getSessions();
    const updated = [session, ...sessions.filter((s) => s.id !== session.id)];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated.slice(0, 50)));
  } catch (e) {
    console.error('Failed to save session to storage', e);
  }
}

export function deleteSession(id: string): void {
  if (!isClient()) return;
  try {
    const sessions = getSessions();
    const filtered = sessions.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete session', e);
  }
}

export function getUserPreferences(): UserPreferences {
  if (!isClient()) return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): UserPreferences {
  if (!isClient()) return DEFAULT_PREFERENCES;
  try {
    const current = getUserPreferences();
    const merged = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(merged));
    return merged;
  } catch (e) {
    console.error('Failed to save user preferences', e);
    return DEFAULT_PREFERENCES;
  }
}

export function getApiUsageStats(): ApiUsageStats {
  if (!isClient()) return DEFAULT_API_USAGE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.API_USAGE);
    if (!raw) return DEFAULT_API_USAGE;
    return { ...DEFAULT_API_USAGE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_API_USAGE;
  }
}

export function recordApiCall(
  type: 'stt' | 'tts',
  status: 'success' | 'failure',
  durationMs: number,
  details?: string,
  audioDurationSeconds?: number
): ApiUsageStats {
  if (!isClient()) return DEFAULT_API_USAGE;
  try {
    const current = getApiUsageStats();
    const isSuccess = status === 'success';

    const newStats: ApiUsageStats = {
      ...current,
      sttRequests: type === 'stt' ? current.sttRequests + 1 : current.sttRequests,
      ttsRequests: type === 'tts' ? current.ttsRequests + 1 : current.ttsRequests,
      successfulRequests: isSuccess ? current.successfulRequests + 1 : current.successfulRequests,
      failedRequests: !isSuccess ? current.failedRequests + 1 : current.failedRequests,
      totalAudioSecondsProcessed:
        current.totalAudioSecondsProcessed + (audioDurationSeconds || 0),
      lastRequestTimestamp: Date.now(),
      history: [
        {
          id: 'req_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          type,
          status,
          timestamp: Date.now(),
          durationMs,
          details,
        },
        ...current.history.slice(0, 49),
      ],
    };

    localStorage.setItem(STORAGE_KEYS.API_USAGE, JSON.stringify(newStats));
    return newStats;
  } catch (e) {
    console.error('Failed to record API call', e);
    return DEFAULT_API_USAGE;
  }
}

export function clearAllLocalData(): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(STORAGE_KEYS.SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.API_USAGE);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    localStorage.removeItem(STORAGE_KEYS.ASSISTANT_CHAT);
  } catch (e) {
    console.error('Failed to clear local data', e);
  }
}
