'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Mic,
  RotateCcw,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Layers,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import {
  InterviewCategory,
  LanguageCode,
  InterviewQuestion,
  EvaluationResult,
  InterviewSession,
} from '@/types';
import { CATEGORIES, LANGUAGES, GNANI_VOICES } from '@/lib/constants';
import { getQuestionsByCategory } from '@/lib/questions';
import { AudioRecorder } from '@/components/ui/AudioRecorder';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { ScoreCard } from '@/components/ui/ScoreCard';
import { TranscriptEditor } from '@/components/ui/TranscriptEditor';
import { evaluateAnswer } from '@/lib/evaluation';
import { saveSession, getUserPreferences, recordApiCall } from '@/lib/storage';
import { DEMO_SAMPLES } from '@/lib/sample-data';

function MockInterviewContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as InterviewCategory) || 'hr';

  const [category, setCategory] = useState<InterviewCategory>(initialCategory);
  const [language, setLanguage] = useState<LanguageCode>('indic-auto');
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Flow State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [transcript, setTranscript] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [sessionCompleted, setSessionCompleted] = useState<boolean>(false);

  // Preferences
  const [creditSaver, setCreditSaver] = useState(true);

  useEffect(() => {
    const prefs = getUserPreferences();
    setCreditSaver(prefs.creditSaverMode);
  }, []);

  useEffect(() => {
    const qList = getQuestionsByCategory(category);
    setQuestions(qList);
    setCurrentIndex(0);
    resetQuestionState();
  }, [category]);

  const currentQuestion: InterviewQuestion | undefined = questions[currentIndex];

  const resetQuestionState = () => {
    setTranscript(null);
    setDetectedLanguage(null);
    setEvaluation(null);
    setApiError(null);
    setIsLiveApi(false);
    setSessionCompleted(false);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      resetQuestionState();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetQuestionState();
    }
  };

  // Called when user completes audio recording and clicks "Transcribe & Evaluate"
  const handleAudioSubmitted = async (audioBlob: Blob, durationSeconds: number) => {
    setIsProcessing(true);
    setProcessingStatus('Uploading audio to Gnani Prisma STT (prisma-v3.0)...');
    setApiError(null);

    const startTime = Date.now();

    try {
      // 1. Send audio to secure backend route
      const formData = new FormData();
      formData.append('audio', audioBlob, 'interview_answer.wav');
      formData.append('language_code', language);
      formData.append('format', 'codemix');
      formData.append('model', 'prisma-v3.0');

      const response = await fetch('/api/gnani/stt', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      const callDuration = Date.now() - startTime;

      if (!response.ok || !data.success) {
        // Record API attempt failure in local usage statistics
        recordApiCall('stt', 'failure', callDuration, data.error || 'STT failed', durationSeconds);

        // If API key is missing or invalid, inform the user cleanly
        if (data.code === 'GNANI_API_KEY_MISSING') {
          setApiError(
            'Gnani API key is not configured in .env. We will provide a demonstration transcription so you can test the evaluation flow.'
          );
          // Fallback to sample transcription
          const fallbackSample =
            DEMO_SAMPLES.find((d) => d.category === category) || DEMO_SAMPLES[0];
          handleTranscriptReceived(
            fallbackSample.prismaTranscriptOutput,
            fallbackSample.detectedLanguage,
            false
          );
          return;
        }

        throw new Error(data.error || 'Failed to transcribe audio via Gnani Prisma.');
      }

      // Record successful STT call
      recordApiCall('stt', 'success', callDuration, 'Prisma STT v3.0 success', durationSeconds);

      handleTranscriptReceived(data.transcript, data.detectedLanguageCode || 'indic-auto', true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error processing audio.';
      setApiError(msg);
      // Give the user the option to use demo answer
    } finally {
      setIsProcessing(false);
      setProcessingStatus('');
    }
  };

  // Load Transcript and trigger evaluation
  const handleTranscriptReceived = (
    text: string,
    detectedLang?: string,
    liveApi: boolean = false
  ) => {
    setTranscript(text);
    if (detectedLang) setDetectedLanguage(detectedLang);
    setIsLiveApi(liveApi);

    // Evaluate answer against current question rubric
    if (currentQuestion) {
      setProcessingStatus('Evaluating answer with 100-point rubric...');
      const evalResult = evaluateAnswer(text, currentQuestion);
      setEvaluation(evalResult);

      // Persist session
      const session: InterviewSession = {
        id: 'session_' + Date.now(),
        timestamp: Date.now(),
        category,
        questionId: currentQuestion.id,
        questionText: currentQuestion.questionText,
        transcript: text,
        detectedLanguage: detectedLang,
        evaluation: evalResult,
        isDemo: !liveApi,
      };
      saveSession(session);
    }
  };

  // User edits transcript in TranscriptEditor
  const handleTranscriptEdited = (newText: string) => {
    setTranscript(newText);
    if (currentQuestion) {
      const updatedEval = evaluateAnswer(newText, currentQuestion);
      setEvaluation(updatedEval);

      // Save updated session
      const session: InterviewSession = {
        id: 'session_' + Date.now(),
        timestamp: Date.now(),
        category,
        questionId: currentQuestion.id,
        questionText: currentQuestion.questionText,
        transcript: newText,
        detectedLanguage: detectedLanguage || undefined,
        evaluation: updatedEval,
        isDemo: !isLiveApi,
      };
      saveSession(session);
    }
  };

  // One-click demo filler for testing without speaking or burning credits
  const loadDemoAnswer = () => {
    const matchingSample =
      DEMO_SAMPLES.find((d) => d.category === category) || DEMO_SAMPLES[0];
    handleTranscriptReceived(
      matchingSample.spokenHinglishInput,
      matchingSample.detectedLanguage,
      false
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Category & Language Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-50">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
            Interactive AI Mock Interview
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Practice Your Interview Answers
          </h1>
        </div>

        {/* Category & Language Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 hidden sm:inline">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as InterviewCategory)}
              className="rounded-xl bg-surface-100 border border-surface-50 px-3 py-2 text-xs font-semibold text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Language Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400 hidden sm:inline">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="rounded-xl bg-surface-100 border border-surface-50 px-3 py-2 text-xs font-semibold text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Practice Stage */}
      {currentQuestion && (
        <div className="space-y-6">
          {/* Question Card */}
          <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-5 shadow-2xl relative overflow-hidden">
            {/* Top row: counter & difficulty */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="font-mono font-bold text-brand-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-200 text-gray-300 text-[10px] font-semibold border border-surface-50">
                  {currentQuestion.difficulty}
                </span>
              </div>

              {/* Demo button to test without mic */}
              <button
                onClick={loadDemoAnswer}
                title="Test full Hinglish transcript & evaluation flow without using microphone"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-200 hover:bg-surface-50 text-xs font-medium text-brand-300 border border-brand-500/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                <span>Test with Hinglish Demo Answer</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {currentQuestion.questionText}
              </h2>
              {currentQuestion.questionHindi && (
                <p className="text-sm text-gray-400 font-hindi leading-relaxed">
                  {currentQuestion.questionHindi}
                </p>
              )}
            </div>

            {/* Context & What Interviewer Looks For */}
            <div className="p-4 rounded-2xl bg-surface-200/60 border border-surface-50 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-brand-300 font-semibold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Interviewer&apos;s Core Objective:</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{currentQuestion.context}</p>

              <div className="pt-2 border-t border-surface-50/80">
                <span className="font-semibold text-gray-400 block mb-1">
                  Key Points to Include in Your Answer:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-gray-300">
                  {currentQuestion.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-brand-400 font-bold shrink-0">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-surface-50">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentIndex === 0}
                className="text-xs font-semibold text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
              >
                ← Previous Question
              </button>

              <button
                onClick={resetQuestionState}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear & Retry Question</span>
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={currentIndex === questions.length - 1}
                className="text-xs font-semibold text-brand-400 hover:text-brand-300 disabled:opacity-30 transition-colors flex items-center gap-1"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* API Error / Guidance Alert */}
          {apiError && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{apiError}</p>
                <p className="text-[11px] text-amber-300/80">
                  Tip: Make sure you speak clearly into the microphone. You can also click &ldquo;Test with Hinglish Demo Answer&rdquo; above to verify the complete evaluation and coaching flow.
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Microphone Audio Recorder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                <Mic className="w-3.5 h-3.5 text-brand-400" />
                <span>Step 1: Record Your Spoken Response</span>
              </h3>
              <span className="text-[11px] text-gray-400">
                Supports Hindi, English, & Hinglish
              </span>
            </div>

            <AudioRecorder
              onAudioReady={handleAudioSubmitted}
              maxDurationSeconds={30}
              disabled={isProcessing}
              creditSaverMode={creditSaver}
            />
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="p-6 rounded-2xl bg-surface-100 border border-brand-500/30 flex items-center justify-center gap-3 text-sm font-semibold text-brand-300 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
              <span>{processingStatus}</span>
            </div>
          )}

          {/* Step 2: Transcript Review & Editor */}
          {transcript && (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Step 2: Review Speech Transcript</span>
                  </h3>
                  {isLiveApi ? (
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Live Gnani Prisma Output
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-amber-400">
                      Sample Hinglish Demonstration
                    </span>
                  )}
                </div>

                <TranscriptEditor
                  initialTranscript={transcript}
                  detectedLanguage={detectedLanguage || undefined}
                  onSave={handleTranscriptEdited}
                />
              </div>

              {/* Step 3: Evaluation ScoreCard */}
              {evaluation && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-accent-violet" />
                      <span>Step 3: AI Answer Evaluation & Rubric Scores</span>
                    </h3>
                  </div>

                  <ScoreCard evaluation={evaluation} />

                  {/* Step 4: Improved Answer & Timbre Voice Synthesis */}
                  <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-6 shadow-2xl">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-400 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>Step 4: Answer Improvement & Pronunciation Coach</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        Recommended High-Impact Answer
                      </h3>
                      <p className="text-xs text-gray-400">
                        Compare your original answer with this corporate-ready STAR formulation.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-surface-200 border border-brand-500/20 text-sm text-gray-200 leading-relaxed font-sans">
                      {evaluation.betterSampleAnswer}
                    </div>

                    {/* Gnani Timbre Voice Synthesis Player */}
                    <div className="space-y-2">
                      <AudioPlayer
                        textToSpeak={evaluation.betterSampleAnswer}
                        language="en-IN"
                        voice="Shivani"
                        label="Listen to Improved Answer with Gnani Timbre"
                        creditSaverMode={creditSaver}
                      />
                    </div>

                    {/* Next Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-surface-50">
                      <button
                        onClick={resetQuestionState}
                        className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Try Another Recording for this Question</span>
                      </button>

                      <button
                        onClick={handleNextQuestion}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition-all"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MockInterviewPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-3 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-brand-400" />
          <p className="text-sm">Loading interview session...</p>
        </div>
      }
    >
      <MockInterviewContent />
    </Suspense>
  );
}
