'use client';

import React, { useState } from 'react';
import { Edit3, Check, RotateCcw, FileText, Globe } from 'lucide-react';

interface TranscriptEditorProps {
  initialTranscript: string;
  detectedLanguage?: string;
  onSave: (newTranscript: string) => void;
  isEvaluating?: boolean;
}

export const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  initialTranscript,
  detectedLanguage,
  onSave,
  isEvaluating = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [transcript, setTranscript] = useState(initialTranscript);

  const handleSave = () => {
    setIsEditing(false);
    onSave(transcript);
  };

  const handleReset = () => {
    setTranscript(initialTranscript);
    setIsEditing(false);
  };

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;

  return (
    <div className="rounded-2xl bg-surface-100 border border-surface-50 p-5 space-y-3 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-400" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
            Gnani Prisma Speech Transcript
          </h4>
          {detectedLanguage && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
              <Globe className="w-3 h-3" />
              {detectedLanguage}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-200 hover:bg-surface-50 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <Edit3 className="w-3 h-3 text-brand-400" />
              <span>Edit Transcript</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSave}
                disabled={isEvaluating}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow transition-colors"
              >
                <Check className="w-3 h-3" />
                <span>Save & Re-evaluate</span>
              </button>
              <button
                onClick={handleReset}
                className="p-1 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-400 hover:text-white transition-colors"
                title="Discard edits"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={4}
            className="w-full rounded-xl bg-surface-200 border border-brand-500/40 p-3 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-y font-sans leading-relaxed"
            placeholder="Edit or refine your transcript here..."
          />
          <div className="flex justify-between items-center text-[11px] text-gray-400">
            <span>You can fix minor speech-to-text recognition discrepancies before final evaluation.</span>
            <span>{wordCount} words</span>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-surface-200/80 border border-surface-50 text-sm text-gray-200 leading-relaxed font-sans">
          {transcript}
          <div className="mt-2 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Click &apos;Edit Transcript&apos; if any Indian words or technical terms were misrecognized.</span>
            <span>{wordCount} words</span>
          </div>
        </div>
      )}
    </div>
  );
};
