'use client';

import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  Layers,
  Sparkles,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { EvaluationResult } from '@/types';

interface ScoreCardProps {
  evaluation: EvaluationResult;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ evaluation }) => {
  const { scores, overallScore, grade, strengths, weaknesses, missingPoints, actionableTip, hindiExplanation } =
    evaluation;

  const getGradeColor = (g: string) => {
    switch (g) {
      case 'Excellent':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Good':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'Needs Improvement':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const rubricBreakdown = [
    {
      label: 'Relevance',
      hindi: 'प्रासंगिकता',
      score: scores.relevance,
      max: 25,
      color: 'bg-blue-500',
      description: 'Coverage of core question themes and key technical concepts',
    },
    {
      label: 'Clarity',
      hindi: 'स्पष्टता',
      score: scores.clarity,
      max: 20,
      color: 'bg-emerald-500',
      description: 'Pacing, brevity, and elimination of conversational filler words',
    },
    {
      label: 'Communication',
      hindi: 'संवाद प्रवाह',
      score: scores.communication,
      max: 20,
      color: 'bg-purple-500',
      description: 'Vocabulary richness, professional phrasing, and sentence transitions',
    },
    {
      label: 'Structure',
      hindi: 'संरचना (STAR)',
      score: scores.structure,
      max: 20,
      color: 'bg-cyan-500',
      description: 'STAR layout: Situation, Task, Action, and measurable Result',
    },
    {
      label: 'Confidence Indicators',
      hindi: 'आत्मविश्वास संकेतक',
      score: scores.confidence,
      max: 15,
      color: 'bg-amber-500',
      description: 'Transcript-based ownership verbs vs hesitant, apologetic phrases',
    },
  ];

  return (
    <div className="rounded-2xl bg-surface-100 border border-surface-50 p-6 space-y-6 shadow-2xl">
      {/* Top Header: Total Score & Grade */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-surface-50">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-200 border border-brand-500/30 shadow-inner">
            <div className="text-center">
              <span className="text-3xl font-black bg-gradient-to-tr from-white via-brand-200 to-accent-cyan bg-clip-text text-transparent">
                {overallScore}
              </span>
              <span className="text-[10px] text-gray-400 block -mt-1">/ 100</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Interview Readiness Score</h3>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getGradeColor(
                  grade
                )}`}
              >
                {grade}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Evaluated against standard Indian campus recruitment rubrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-gray-400 block">Total Word Count</span>
            <span className="text-sm font-semibold text-gray-200">{evaluation.wordCount} words</span>
          </div>
        </div>
      </div>

      {/* Rubric Dimensions Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <span>Scoring Rubric Breakdown (100 Points)</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {rubricBreakdown.map((item) => {
            const pct = Math.round((item.score / item.max) * 100);
            return (
              <div
                key={item.label}
                className="p-3.5 rounded-xl bg-surface-200 border border-surface-50 space-y-2 hover:border-brand-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-200">{item.label}</span>
                  <span className="text-xs font-bold text-brand-300">
                    {item.score}/{item.max}
                  </span>
                </div>
                <div className="w-full bg-surface-300 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[10px] text-gray-400 leading-tight">
                  <span className="text-gray-400 block font-hindi">{item.hindi}</span>
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actionable Tip Spotlight */}
      {actionableTip && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/60 to-purple-950/60 border border-brand-500/30 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
              High Impact Improvement Tip
            </span>
            <p className="text-xs text-gray-200 leading-relaxed">{actionableTip}</p>
          </div>
        </div>
      )}

      {/* Strengths & Weaknesses 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-4 rounded-xl bg-surface-200 border border-surface-50 space-y-2.5">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Demonstrated Strengths</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-300">
            {strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">•</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses / Focus Areas */}
        <div className="p-4 rounded-xl bg-surface-200 border border-surface-50 space-y-2.5">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Priority Focus Areas</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-300">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>{w}</span>
              </li>
            ))}
            {missingPoints && missingPoints.length > 0 && (
              <li className="pt-1 text-[11px] text-gray-400 border-t border-surface-50">
                <strong className="text-gray-300">Missing Key Points:</strong>{' '}
                {missingPoints.join('; ')}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Hindi & Hinglish Guidance Card for Tier 2/3 Students */}
      {hindiExplanation && (
        <div className="p-4 rounded-xl bg-surface-200/70 border border-brand-500/20 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>हिंदी / हिंग्लिश में सुझाव (Bilingual Guidance for Regional Freshers)</span>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed font-hindi">
            {hindiExplanation}
          </p>
        </div>
      )}
    </div>
  );
};
