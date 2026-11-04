'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Mic,
  ArrowRight,
  Volume2,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Languages,
} from 'lucide-react';
import { AudioRecorder } from '@/components/ui/AudioRecorder';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { evaluateAnswer } from '@/lib/evaluation';
import { EvaluationResult } from '@/types';
import { getUserPreferences } from '@/lib/storage';

export default function AnswerImprovementStudio() {
  const [inputText, setInputText] = useState(
    'Sir humne college me ek attendance tracker banaya tha. Basically teachers ko manually register fill nahi karna padta. Mera role database design aur frontend React me connect karna tha.'
  );

  const [activeTab, setActiveTab] = useState<'text' | 'mic'>('text');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<'Shivani' | 'Avinash'>('Shivani');

  const handleImprove = () => {
    if (!inputText.trim()) return;
    const result = evaluateAnswer(inputText, 'fresher-1');
    setEvaluation(result);
  };

  const handleAudioTranscribed = async (blob: Blob, duration: number) => {
    try {
      const formData = new FormData();
      formData.append('audio', blob, 'dictation.wav');
      formData.append('language_code', 'indic-auto');
      formData.append('format', 'codemix');
      formData.append('model', 'prisma-v3.0');

      const response = await fetch('/api/gnani/stt', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.transcript && data.transcript.trim().length > 0) {
        setInputText(data.transcript);
        const result = evaluateAnswer(data.transcript, 'fresher-1');
        setEvaluation(result);
        return;
      }
    } catch (e) {
      console.warn('Studio live STT fallback', e);
    }

    // Fallback demonstration text
    const demoText =
      'Sir humara final year project KisanDirect portal tha. Basically farmers aur local mandi ko connect karne ke liye banaya tha. Mera role backend me Node js aur PostgreSQL handle karna tha.';
    setInputText(demoText);
    const result = evaluateAnswer(demoText, 'fresher-1');
    setEvaluation(result);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-1 pb-6 border-b border-surface-50">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-violet">
          <Sparkles className="w-4 h-4" />
          <span>Speech & Answer Enhancement Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Answer Improvement Studio
        </h1>
        <p className="text-sm text-gray-400">
          Enter your rough answer or dictate it in Hinglish. Transform it into 3 polished versions
          with bilingual explanations.
        </p>
      </div>

      {/* Input Selector & Editor */}
      <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'text'
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-200 text-gray-400 hover:text-white'
              }`}
            >
              Type or Paste Answer
            </button>
            <button
              onClick={() => setActiveTab('mic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'mic'
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-200 text-gray-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Dictate with Microphone</span>
            </button>
          </div>

          <button
            onClick={() => {
              setInputText(
                'Sir humne college me ek attendance tracker banaya tha. Basically teachers ko manually register fill nahi karna padta. Mera role database design aur frontend React me connect karna tha.'
              );
              setEvaluation(null);
            }}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sample</span>
          </button>
        </div>

        {activeTab === 'text' ? (
          <div className="space-y-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={4}
              placeholder="Paste your rough answer here in Hindi, Hinglish, or English..."
              className="w-full rounded-2xl bg-surface-200 border border-surface-50 p-4 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-y leading-relaxed font-sans"
            />
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Supports code-mixed Hinglish and colloquial regional phrasing.</span>
              <span>{inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words</span>
            </div>
          </div>
        ) : (
          <AudioRecorder
            onAudioReady={handleAudioTranscribed}
            onReset={() => setEvaluation(null)}
            maxDurationSeconds={30}
          />
        )}

        <button
          onClick={handleImprove}
          disabled={!inputText.trim()}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-accent-violet to-accent-cyan hover:from-brand-500 hover:to-accent-violet text-white text-sm font-semibold shadow-xl shadow-brand-500/25 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate 3 Improved Versions & Bilingual Coaching</span>
        </button>
      </div>

      {/* 3 Versions Output Grid */}
      {evaluation && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Version 1: Original Spoken Answer */}
            <div className="rounded-2xl bg-surface-100 border border-surface-50 p-5 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Version 1: Original
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-200 text-gray-400">
                    Raw Spoken Input
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">Your Unfiltered Answer</h4>
                <div className="p-3.5 rounded-xl bg-surface-200 text-xs text-gray-300 leading-relaxed font-sans">
                  {inputText}
                </div>
              </div>

              <div className="pt-3 border-t border-surface-50 flex items-center justify-between text-xs text-gray-400">
                <span>Overall: {evaluation.overallScore}/100</span>
                <button
                  onClick={() => copyToClipboard(inputText, 1)}
                  className="flex items-center gap-1 hover:text-white"
                >
                  {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Version 2: Improved Professional Answer */}
            <div className="rounded-2xl bg-gradient-to-b from-brand-950/40 to-surface-100 border border-brand-500/30 p-5 space-y-4 flex flex-col justify-between shadow-xl relative">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                    Version 2: Professional (MNC Ready)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold">
                    STAR Formatted
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">Corporate Interview Standard</h4>
                <div className="p-3.5 rounded-xl bg-surface-200/90 text-xs text-gray-200 leading-relaxed font-sans">
                  {evaluation.betterSampleAnswer}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-surface-50">
                <AudioPlayer
                  textToSpeak={evaluation.betterSampleAnswer}
                  language="en-IN"
                  voice={selectedVoice}
                  label={`Listen with Timbre (${selectedVoice})`}
                />
                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <span>Pacing: Measured • Confident</span>
                  <button
                    onClick={() => copyToClipboard(evaluation.betterSampleAnswer, 2)}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === 2 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Version 3: Simple Natural Fresher Answer */}
            <div className="rounded-2xl bg-surface-100 border border-surface-50 p-5 space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Version 3: Simple & Natural
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300">
                    Fresher Friendly
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white">Easy to Speak & Memorize</h4>
                <div className="p-3.5 rounded-xl bg-surface-200 text-xs text-gray-200 leading-relaxed font-sans">
                  {evaluation.simpleFresherAnswer}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-surface-50">
                <AudioPlayer
                  textToSpeak={evaluation.simpleFresherAnswer}
                  language="en-IN"
                  voice="Avinash"
                  label="Listen (Natural Voice)"
                />
                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <span>Clean • Direct • Honest</span>
                  <button
                    onClick={() => copyToClipboard(evaluation.simpleFresherAnswer, 3)}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === 3 ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bilingual Explanations Section */}
          <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Languages className="w-4 h-4 text-brand-400" />
              <span>Bilingual Explanations & Transition Coaching</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Hindi Explanation */}
              <div className="p-4 rounded-2xl bg-surface-200 border border-surface-50 space-y-2">
                <span className="text-xs font-bold text-brand-300 font-hindi block">
                  हिंदी में मार्गदर्शन (Hindi Insight)
                </span>
                <p className="text-xs text-gray-300 leading-relaxed font-hindi">
                  {evaluation.hindiExplanation}
                </p>
              </div>

              {/* Hinglish Explanation */}
              <div className="p-4 rounded-2xl bg-surface-200 border border-surface-50 space-y-2">
                <span className="text-xs font-bold text-accent-violet block">
                  Hinglish Friendly Transition
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Apne answer me &quot;Mera role tha&quot; ke jagah &quot;I was responsible for
                  architecting the database schema&quot; bolne se interviewers ko clear ownership
                  dikhti hai.
                </p>
              </div>

              {/* English Explanation */}
              <div className="p-4 rounded-2xl bg-surface-200 border border-surface-50 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">
                  English Actionable Rule
                </span>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {evaluation.actionableTip}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

