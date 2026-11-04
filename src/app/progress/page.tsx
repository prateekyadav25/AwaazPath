'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Award,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getSessions, clearAllLocalData } from '@/lib/storage';
import { InterviewSession, InterviewCategory } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { ScoreCard } from '@/components/ui/ScoreCard';

export default function ProgressPage() {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const loaded = getSessions();
    setSessions(loaded);
    if (loaded.length > 0) {
      setSelectedSession(loaded[0]);
    }
  }, []);

  // Filtered list
  const filteredSessions =
    filterCategory === 'all'
      ? sessions
      : sessions.filter((s) => s.category === filterCategory);

  // Compute category averages
  const categoryStats = CATEGORIES.map((cat) => {
    const catSessions = sessions.filter((s) => s.category === cat.id);
    const count = catSessions.length;
    const avgScore =
      count > 0
        ? Math.round(
            catSessions.reduce((acc, s) => acc + (s.evaluation?.overallScore || 0), 0) / count
          )
        : 0;

    return {
      id: cat.id,
      name: cat.name,
      hindiName: cat.hindiName,
      count,
      avgScore,
    };
  });

  const practicedCategories = categoryStats.filter((c) => c.count > 0);
  practicedCategories.sort((a, b) => b.avgScore - a.avgScore);

  const strongestCategory = practicedCategories[0];
  const weakestCategory = practicedCategories[practicedCategories.length - 1];

  const overallAvg =
    sessions.length > 0
      ? Math.round(
          sessions.reduce((acc, s) => acc + (s.evaluation?.overallScore || 0), 0) / sessions.length
        )
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-50">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
            <BarChart3 className="w-4 h-4" />
            <span>Placement Intelligence & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Interview Performance Analytics
          </h1>
          <p className="text-sm text-gray-400">
            Real data from your mock practice rounds. Track fluency growth across all 6 categories.
          </p>
        </div>

        <Link
          href="/interview"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-xs font-semibold shadow-lg shadow-brand-500/20 transition-all self-start md:self-auto"
        >
          <span>Practice Next Question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Average Interview Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{overallAvg}</span>
            <span className="text-xs text-gray-400">/ 100</span>
          </div>
          <p className="text-[11px] text-gray-400">Across {sessions.length} completed sessions</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strongest Category</span>
          </span>
          <div className="text-lg font-bold text-white truncate">
            {strongestCategory ? strongestCategory.name : 'Not enough data'}
          </div>
          <p className="text-[11px] text-gray-400">
            {strongestCategory ? `${strongestCategory.avgScore}/100 avg rating` : 'Practice 1 round'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Priority Focus Area</span>
          </span>
          <div className="text-lg font-bold text-white truncate">
            {weakestCategory ? weakestCategory.name : 'Not enough data'}
          </div>
          <p className="text-[11px] text-gray-400">
            {weakestCategory ? `${weakestCategory.avgScore}/100 avg rating` : 'Practice 1 round'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
            Target Readiness Goal
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">85+</span>
            <span className="text-xs text-emerald-400 font-semibold">Tier-1 MNC</span>
          </div>
          <p className="text-[11px] text-gray-400">Recommended score for top product roles</p>
        </div>
      </div>

      {/* Category Performance Breakdown Bars */}
      <div className="p-6 rounded-3xl bg-surface-100 border border-surface-50 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Performance by Category</span>
          </h3>
          <span className="text-xs text-gray-400">6 Specialized Placement Streams</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-surface-200 border border-surface-50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{cat.name}</h4>
                  <span className="text-[10px] text-gray-400 font-hindi">{cat.hindiName}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-brand-300">
                    {cat.count > 0 ? cat.avgScore : '--'}
                  </span>
                  <span className="text-[10px] text-gray-400 block -mt-1">/ 100</span>
                </div>
              </div>

              <div className="w-full bg-surface-300 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-accent-cyan rounded-full transition-all duration-500"
                  style={{ width: `${cat.count > 0 ? cat.avgScore : 0}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400">
                <span>{cat.count} practice session{cat.count !== 1 ? 's' : ''}</span>
                <Link
                  href={`/interview?category=${cat.id}`}
                  className="text-brand-400 hover:text-brand-300 font-semibold"
                >
                  Practice →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Session History & Inspection */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Completed Practice Sessions</h3>
            <p className="text-xs text-gray-400">
              Select any past session below to inspect its detailed evaluation report.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Filter:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-xl bg-surface-100 border border-surface-50 px-3 py-1.5 text-xs text-gray-200 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="p-8 rounded-2xl bg-surface-100 border border-surface-50 text-center text-gray-400 text-xs">
            No sessions match this filter. Complete practice interviews to build your analytics history!
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Session List */}
            <div className="space-y-3 lg:col-span-1 max-h-[550px] overflow-y-auto pr-1">
              {filteredSessions.map((s) => {
                const isSelected = selectedSession?.id === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSession(s)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-brand-500/10 border-brand-500/40 shadow-lg'
                        : 'bg-surface-100 border-surface-50 hover:bg-surface-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                      <span className="font-semibold text-brand-300 uppercase tracking-wider text-[10px]">
                        {s.category}
                      </span>
                      <span>{new Date(s.timestamp).toLocaleDateString()}</span>
                    </div>
                    <h4 className="text-xs font-bold text-white line-clamp-2">
                      {s.questionText}
                    </h4>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-gray-400 line-clamp-1 italic max-w-[180px]">
                        &ldquo;{s.transcript}&rdquo;
                      </span>
                      <span className="font-black text-brand-400 shrink-0">
                        {s.evaluation?.overallScore}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Session Full Inspection */}
            <div className="lg:col-span-2 space-y-4">
              {selectedSession ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Question & Transcript
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {selectedSession.questionText}
                    </h3>
                    <div className="p-3.5 rounded-xl bg-surface-200 text-xs text-gray-300 leading-relaxed font-sans italic">
                      &ldquo;{selectedSession.transcript}&rdquo;
                    </div>
                  </div>

                  {selectedSession.evaluation && (
                    <ScoreCard evaluation={selectedSession.evaluation} />
                  )}
                </div>
              ) : (
                <div className="p-12 rounded-2xl bg-surface-100 border border-surface-50 text-center text-gray-400 text-xs">
                  Click on any session on the left to inspect its complete scoring breakdown.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
