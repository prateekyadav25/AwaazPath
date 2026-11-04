'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mic,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { getSessions, saveSession } from '@/lib/storage';
import { InterviewSession } from '@/types';
import { MOCK_PAST_SESSIONS } from '@/lib/sample-data';
import { CATEGORIES } from '@/lib/constants';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaded = getSessions();
    if (loaded.length === 0) {
      // Seed with mock past sessions so user immediately sees rich dashboard metrics
      MOCK_PAST_SESSIONS.forEach((s) => saveSession(s));
      setSessions(MOCK_PAST_SESSIONS);
    } else {
      setSessions(loaded);
    }
    setLoading(false);
  }, []);

  // Compute metrics
  const totalInterviews = sessions.length;
  const avgReadiness =
    totalInterviews > 0
      ? Math.round(
          sessions.reduce((acc, s) => acc + (s.evaluation?.overallScore || 0), 0) / totalInterviews
        )
      : 0;

  const avgCommunication =
    totalInterviews > 0
      ? Math.round(
          (sessions.reduce(
            (acc, s) => acc + (s.evaluation?.scores?.communication || 0),
            0
          ) /
            (totalInterviews * 20)) *
            100
        )
      : 0;

  const avgClarity =
    totalInterviews > 0
      ? Math.round(
          (sessions.reduce((acc, s) => acc + (s.evaluation?.scores?.clarity || 0), 0) /
            (totalInterviews * 20)) *
            100
        )
      : 0;

  // Weekly progression mock data or calculated from sessions
  const weeklyData = [
    { day: 'Mon', score: 62 },
    { day: 'Tue', score: 68 },
    { day: 'Wed', score: 71 },
    { day: 'Thu', score: 76 },
    { day: 'Fri', score: 81 },
    { day: 'Sat', score: 84 },
    { day: 'Sun', score: avgReadiness || 85 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome & Quick Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-surface-50">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to AwaazPath AI Career Hub</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Your Placement Readiness Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            Track your verbal fluency, reduce filler words, and master Hindi-to-English transition.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-sm font-semibold shadow-lg shadow-brand-500/25 transition-all"
          >
            <Mic className="w-4 h-4" />
            <span>Start Practice Interview</span>
          </Link>
          <Link
            href="/studio"
            className="px-4 py-3 rounded-xl bg-surface-100 hover:bg-surface-50 border border-surface-50 text-gray-300 text-sm font-medium transition-colors"
          >
            <span>Answer Studio</span>
          </Link>
        </div>
      </div>

      {/* Primary Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Readiness Score
            </span>
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{avgReadiness}</span>
            <span className="text-xs text-gray-400">/ 100 pts</span>
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14% improvement over first session</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Completed Sessions
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{totalInterviews}</span>
            <span className="text-xs text-gray-400">interviews</span>
          </div>
          <div className="text-[11px] text-gray-400">
            Across 6 placement categories
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Communication Index
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{avgCommunication}%</span>
            <span className="text-xs text-emerald-400 font-semibold">Strong</span>
          </div>
          <div className="text-[11px] text-gray-400">
            Assesses professional phrasing & connectors
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-surface-100 border border-surface-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Clarity & Fluency
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">{avgClarity}%</span>
            <span className="text-xs text-brand-300 font-semibold">Reduced Fillers</span>
          </div>
          <div className="text-[11px] text-gray-400">
            Minimal &apos;basically&apos; or &apos;matlab&apos; hesitations
          </div>
        </div>
      </div>

      {/* Grid: Weekly Improvement Chart + Recommended Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-surface-100 border border-surface-50 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Weekly Verbal Improvement Trajectory
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Composite evaluation score across your mock practice rounds
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
              7-Day Trend
            </span>
          </div>

          {/* Bar Chart Representation */}
          <div className="pt-4 flex items-end justify-between gap-3 h-48 border-b border-surface-50 pb-2">
            {weeklyData.map((d, idx) => {
              const heightPct = Math.round((d.score / 100) * 100);
              const isToday = idx === weeklyData.length - 1;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-mono font-semibold text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.score}
                  </span>
                  <div
                    className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-brand-600 to-accent-cyan shadow-lg shadow-brand-500/30'
                        : 'bg-surface-50 hover:bg-brand-500/50'
                    }`}
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-xs text-gray-400 font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span>Current Score: {avgReadiness}/100</span>
            </span>
            <span className="text-gray-400">Target for Tier-1 Product MNC: 85+</span>
          </div>
        </div>

        {/* Recommended Practice Activities */}
        <div className="p-6 rounded-2xl bg-surface-100 border border-surface-50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recommended Drills
            </h3>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>

          <div className="space-y-3">
            <Link
              href="/interview?category=fresher"
              className="p-3.5 rounded-xl bg-surface-200 border border-surface-50 hover:border-brand-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                <Play className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                  Final Year Project Defense
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Explain tech stack choices & offline sync in English.
                </p>
              </div>
            </Link>

            <Link
              href="/assistant"
              className="p-3.5 rounded-xl bg-surface-200 border border-surface-50 hover:border-brand-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                  Corporate Vocabulary Coach
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Learn what &apos;bandwidth&apos; and &apos;idempotent&apos; mean in Hindi.
                </p>
              </div>
            </Link>

            <Link
              href="/interview?category=behavioral"
              className="p-3.5 rounded-xl bg-surface-200 border border-surface-50 hover:border-brand-500/40 transition-all flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                  STAR Framework Sprint
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Practice answering mistake & conflict questions.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Practice Sessions Section */}
      <div className="p-6 rounded-2xl bg-surface-100 border border-surface-50 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Interview Sessions</h3>
            <p className="text-xs text-gray-400">
              Review your past responses, transcripts, and rubric ratings.
            </p>
          </div>
          <Link
            href="/progress"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View All Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-xs">
            No practice sessions yet. Start your first mock interview above!
          </div>
        ) : (
          <div className="divide-y divide-surface-50">
            {sessions.slice(0, 5).map((s) => {
              const catMeta = CATEGORIES.find((c) => c.id === s.category);
              return (
                <div key={s.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-surface-200 text-brand-300 border border-surface-50">
                        {catMeta?.name || s.category}
                      </span>
                      {s.isDemo && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                          Demo Sample
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(s.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-200">
                      {s.questionText}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-1 italic">
                      &ldquo;{s.transcript}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                    <div className="text-right">
                      <span className="text-lg font-black text-white">
                        {s.evaluation?.overallScore || 0}
                      </span>
                      <span className="text-[10px] text-gray-400 block -mt-1">/ 100</span>
                    </div>
                    <Link
                      href="/progress"
                      className="p-2 rounded-lg bg-surface-200 hover:bg-surface-50 text-gray-300 hover:text-white transition-colors"
                      title="Inspect full evaluation"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

