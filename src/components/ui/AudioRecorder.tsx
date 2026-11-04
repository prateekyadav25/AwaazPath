'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Volume2,
} from 'lucide-react';

interface AudioRecorderProps {
  onAudioReady: (blob: Blob, durationSeconds: number) => void;
  maxDurationSeconds?: number;
  disabled?: boolean;
  creditSaverMode?: boolean;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onAudioReady,
  maxDurationSeconds = 30, // 30s recommended limit for Prisma short audio
  disabled = false,
  creditSaverMode = true,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startVisualizer = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
    } catch (e) {
      console.warn('AudioContext visualizer not supported or failed', e);
    }
  };

  const startRecording = async () => {
    setPermissionError(null);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Your browser does not support microphone audio recording.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 24000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      startVisualizer(stream);

      // Select supported mime type
      let mimeType = 'audio/webm;codecs=opus';
      if (typeof MediaRecorder.isTypeSupported === 'function') {
        if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/ogg;codecs=opus')) {
          mimeType = 'audio/ogg;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        }
      }

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const fullBlob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(fullBlob);
        const url = URL.createObjectURL(fullBlob);
        setAudioUrl(url);

        // Stop all stream tracks to free microphone hardware
        stream.getTracks().forEach((track) => track.stop());

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(() => {});
        }
      };

      recorder.start(250); // Record in 250ms chunks
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev + 1 >= maxDurationSeconds) {
            stopRecording();
            return maxDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err: unknown) {
      const errMessage =
        err instanceof Error ? err.message : 'Could not access microphone. Please check browser permissions.';
      setPermissionError(errMessage);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const resetRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setRecordingTime(0);
    setAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const togglePreview = () => {
    if (!previewAudioRef.current) return;
    if (isPlayingPreview) {
      previewAudioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      previewAudioRef.current.currentTime = 0;
      previewAudioRef.current.play().catch(() => {});
      setIsPlayingPreview(true);
    }
  };

  const submitRecording = () => {
    if (audioBlob) {
      onAudioReady(audioBlob, recordingTime || 5);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full rounded-2xl bg-surface-100 border border-surface-50 p-5 space-y-4 shadow-xl">
      {/* Header state */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording
                ? 'bg-rose-500 animate-pulse'
                : audioBlob
                ? 'bg-emerald-500'
                : 'bg-gray-500'
            }`}
          />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            {isRecording
              ? 'Recording Microphone...'
              : audioBlob
              ? 'Answer Recorded (Ready for Review)'
              : 'Microphone Standby'}
          </span>
        </div>

        <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface-200 border border-surface-50 text-gray-300">
          {formatTime(recordingTime)} / {formatTime(maxDurationSeconds)}
        </div>
      </div>

      {/* Permission or error alert */}
      {permissionError && (
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <p>{permissionError}</p>
        </div>
      )}

      {/* Visualizer during recording */}
      {isRecording && (
        <div className="space-y-2 py-3">
          <div className="h-12 w-full rounded-xl bg-surface-200 flex items-center justify-center gap-1.5 px-4 overflow-hidden border border-brand-500/20">
            {Array.from({ length: 24 }).map((_, i) => {
              const heightMultiplier = Math.sin((i / 24) * Math.PI) * (audioLevel / 100);
              const heightPx = Math.max(6, Math.round(heightMultiplier * 36));
              return (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-brand-500 to-accent-cyan transition-all duration-75"
                  style={{ height: `${heightPx}px` }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-400">
            <span>Speak naturally in Hindi, English, or Hinglish</span>
            {recordingTime > 23 && (
              <span className="text-amber-400 font-medium">Reaching 30s limit...</span>
            )}
          </div>
        </div>
      )}

      {/* Playback preview if audio recorded */}
      {audioBlob && audioUrl && !isRecording && (
        <div className="p-3 rounded-xl bg-surface-200 border border-surface-50 flex items-center justify-between gap-3">
          <audio
            ref={previewAudioRef}
            src={audioUrl}
            onEnded={() => setIsPlayingPreview(false)}
            className="hidden"
          />
          <button
            onClick={togglePreview}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-100 hover:bg-surface-50 text-xs font-medium text-gray-200 transition-colors"
          >
            {isPlayingPreview ? (
              <>
                <Pause className="w-3.5 h-3.5 text-brand-400" />
                <span>Pause Preview</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-brand-400" />
                <span>Play Recording ({formatTime(recordingTime)})</span>
              </>
            )}
          </button>

          <button
            onClick={resetRecording}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake</span>
          </button>
        </div>
      )}

      {/* Controls Action Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {!isRecording && !audioBlob && (
          <button
            onClick={startRecording}
            disabled={disabled}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-sm font-semibold shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50"
          >
            <Mic className="w-4 h-4" />
            <span>Start Speaking</span>
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-600/30 transition-all"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Stop Recording</span>
          </button>
        )}

        {audioBlob && !isRecording && (
          <>
            <button
              onClick={submitRecording}
              disabled={disabled}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Transcribe & Evaluate with Gnani AI</span>
            </button>
            <button
              onClick={resetRecording}
              className="p-3 rounded-xl bg-surface-200 hover:bg-surface-50 text-gray-400 hover:text-white transition-colors"
              title="Discard and retake"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Credit Saver reminder note */}
      {creditSaverMode && (
        <p className="text-[11px] text-gray-400 text-center pt-1">
          🛡️ <strong>Credit Saver Mode active:</strong> Audio is only submitted when you click the button above, preserving your 5,000 Gnani credits.
        </p>
      )}
    </div>
  );
};
