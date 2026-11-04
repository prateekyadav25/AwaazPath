'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mic,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BotMessageSquare,
  Award,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  Play,
  HeartHandshake,
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE, CATEGORIES } from '@/lib/constants';

export default function LandingPage() {
  return (
    <div className="flex flex-col space-y-24 py-12 md:py-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-600/20 via-accent-violet/15 to-accent-cyan/15 blur-3xl -z-10 rounded-full pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-100 border border-brand-500/30 text-brand-300 text-xs font-semibold shadow-lg shadow-brand-500/10">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Great Indian AI Internship Challenge • Built with Gnani AI</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Your Voice.{' '}
            <span className="bg-gradient-to-r from-brand-400 via-accent-violet to-accent-cyan bg-clip-text text-transparent">
              Your Confidence.
            </span>{' '}
            Your Career.
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The voice-first AI career coach built for Indian college students. Speak freely in{' '}
            <strong className="text-white">Hindi, English, or Hinglish</strong> and get real-time
            speech feedback, structured answers, and spoken coaching powered by{' '}
            <strong className="text-brand-300">Gnani AI Prisma & Timbre</strong>.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/interview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white font-semibold text-sm shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02]"
          >
            <Mic className="w-4 h-4" />
            <span>Start Practice Interview</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-100 hover:bg-surface-50 border border-surface-50 text-gray-200 text-sm font-semibold transition-colors"
          >
            <span>Explore Dashboard</span>
          </Link>
        </div>

        {/* Trust & Model Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2 bg-surface-100/70 border border-surface-50 px-3.5 py-1.5 rounded-full">
            <Cpu className="w-3.5 h-3.5 text-brand-400" />
            <span>STT: Gnani Prisma v3.0 (Indic-Auto)</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-100/70 border border-surface-50 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-accent-violet" />
            <span>TTS: Gnani Timbre v3.0 Expressive</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-100/70 border border-surface-50 px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Credit Saver Protected</span>
          </div>
        </div>
      </section>

      {/* Target Audience Value Proposition: Built for Tier 2 & Tier 3 Freshers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-surface-100 to-surface-200 border border-surface-50 p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-cyan uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Democratizing Placement Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Why Tier 2 and Tier 3 College Students Love {APP_NAME}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              In India, millions of brilliant engineering and technical students excel in coding,
              mathematics, and core logic, but freeze during campus interviews because they think in
              their mother tongue. Traditional AI interview apps expect fluent Western English and
              penalize regional accents.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              <strong className="text-brand-300">AwaazPath bridges this divide.</strong> By leveraging
              Gnani AI’s state-of-the-art Indian language models, students can speak naturally in
              Hinglish or Hindi, understand feedback in their own language, and gradually transform into
              confident, fluent professionals ready for top tech MNCs and startups.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works (4-Step Pipeline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How AwaazPath Works
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            From speaking your mind to speaking with corporate impact in 4 seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Select Category',
              desc: 'Choose from HR, Placement, Technical, Behavioral, Internship, or Communication practice.',
              icon: Layers,
            },
            {
              step: '02',
              title: 'Speak Naturally',
              desc: 'Use your microphone. Speak in pure Hindi, fluent English, or conversational Hinglish.',
              icon: Mic,
            },
            {
              step: '03',
              title: 'Prisma STT Transcribes',
              desc: 'Gnani Prisma accurately recognizes code-mixed Indian speech and shows an editable transcript.',
              icon: Cpu,
            },
            {
              step: '04',
              title: 'Timbre Speaks Coaching',
              desc: 'Receive transparent 100-point rubric feedback and listen to improved answers via Gnani Timbre.',
              icon: Sparkles,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-surface-100 border border-surface-50 p-6 space-y-4 hover:border-brand-500/40 transition-all group"
              >
                <div className="text-3xl font-black text-surface-50 group-hover:text-brand-500/20 transition-colors font-mono">
                  {item.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-surface-200 border border-surface-50 flex items-center justify-center text-brand-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              6 Tailored Interview Categories
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Curated specifically for Indian campus recruitment and IT fresher hiring drives.
            </p>
          </div>
          <Link
            href="/interview"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View All Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/interview?category=${cat.id}`}
              className="p-6 rounded-2xl bg-surface-100 border border-surface-50 hover:border-brand-500/40 transition-all space-y-3 group hover:translate-y-[-2px]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-400 font-hindi">
                  {cat.hindiName}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-200 text-gray-400">
                  10+ Questions
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Gnani AI Integration Architecture Feature Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-surface-100 border border-surface-50 p-8 sm:p-12 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
              Deep Tech Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Genuinely Integrated with Gnani AI Speech Stack
            </h2>
            <p className="text-gray-300 text-sm max-w-2xl leading-relaxed">
              No simulated endpoints. AwaazPath connects directly to Gnani’s official Vachana
              infrastructure with enterprise security and token conservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-surface-200 border border-surface-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Gnani Prisma STT (v3.0)</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connects to <code>POST https://api.vachana.ai/stt/v3</code>. Handles Indian accents,
                code-mixed Hinglish, and automatic language detection with <code>codemix</code> and{' '}
                <code>transliterate</code> output formats.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-200 border border-surface-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-violet/20 text-accent-violet flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Gnani Timbre TTS (v3.0)</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connects to <code>POST https://api.vachana.ai/api/v1/tts/inference</code>. Streams
                high-fidelity linear PCM WAV audio with authentic Indian voices (Nalini, Rohan) for
                spoken pronunciation coaching.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-200 border border-surface-50 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Credit Conservation Mode</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Built specifically to protect your 5,000 Gnani credits: zero auto-calling on page
                load, explicit submission triggers, audio preview before synthesis, and full demo
                sandbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-brand-900/60 via-surface-100 to-purple-900/60 border border-brand-500/30 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Speak with Confidence in Your Next Interview?
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            Practice now for your upcoming campus placement, TCS NQT, Infosys, Wipro, or startup
            technical round.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/interview"
              className="px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm shadow-xl shadow-brand-500/30 transition-all hover:scale-105"
            >
              Start Free Practice
            </Link>
            <Link
              href="/assistant"
              className="px-6 py-3.5 rounded-xl bg-surface-200 hover:bg-surface-50 border border-surface-50 text-gray-200 font-semibold text-sm transition-colors"
            >
              Ask Voice Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
