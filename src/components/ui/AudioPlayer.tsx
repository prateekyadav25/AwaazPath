'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, Loader2, RotateCcw } from 'lucide-react';

interface AudioPlayerProps {
  textToSpeak: string;
  language?: 'hi-IN' | 'en-IN' | string;
  voice?: string;
  label?: string;
  creditSaverMode?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  language = 'hi-IN',
  voice = 'Shivani',
  label = 'Listen to Improved Answer',
  creditSaverMode = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [engineUsed, setEngineUsed] = useState<'gnani' | 'browser' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const fetchTimbreAudio = async () => {
    if (!textToSpeak.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/gnani/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          voice,
          language,
          speed: 1.0,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `TTS Server error (${response.status})`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setEngineUsed('gnani');

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }, 100);
    } catch (err: unknown) {
      console.warn('Gnani Timbre TTS unavailable or not configured, falling back to browser synthesis', err);
      // Fallback: Browser Web SpeechSynthesis API for demo / development
      playBrowserSpeech();
    } finally {
      setIsLoading(false);
    }
  };

  const playBrowserSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setError('Text-to-speech is not supported by your browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi-IN' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => {
      setIsPlaying(true);
      setEngineUsed('browser');
    };
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlayToggle = () => {
    if (isLoading) return;

    // If audioUrl already generated from Gnani Timbre
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }

    // Otherwise, generate audio on-demand (credit conscious)
    fetchTimbreAudio();
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  return (
    <div className="rounded-xl bg-surface-200 border border-surface-50 p-3.5 space-y-2">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handlePlayToggle}
          disabled={isLoading || !textToSpeak.trim()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-xs font-semibold shadow-md shadow-brand-500/20 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Generating Gnani Audio...</span>
            </>
          ) : isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 text-white" />
              <span>Pause Speech</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-white fill-white" />
              <span>{label}</span>
            </>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={stopAudio}
            className="p-2 rounded-lg bg-surface-100 hover:bg-surface-50 text-gray-400 hover:text-white transition-colors"
            title="Stop playback"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Engine status indicator */}
        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
          {engineUsed === 'gnani' && (
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Sparkles className="w-3 h-3" />
              Gnani Timbre ({voice})
            </span>
          )}
          {engineUsed === 'browser' && (
            <span className="text-amber-400 font-medium">
              Demo Fallback Voice
            </span>
          )}
          {!engineUsed && (
            <span className="text-gray-400 flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              Timbre v3.0 Ready
            </span>
          )}
        </div>
      </div>

      {creditSaverMode && !audioUrl && (
        <p className="text-[10px] text-gray-400">
          🛡️ Audio generated only on click to preserve Gnani AI programme credits.
        </p>
      )}

      {error && <p className="text-[11px] text-rose-400">{error}</p>}
    </div>
  );
};

