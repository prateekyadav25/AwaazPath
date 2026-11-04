import React from 'react';
import Link from 'next/link';
import { Mic, Shield, Sparkles, Heart } from 'lucide-react';
import { APP_NAME, APP_CHALLENGE, APP_TAGLINE } from '@/lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-surface-50 bg-[#06080D] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white">
                <Mic className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">{APP_NAME}</span>
            </div>
            <p className="text-gray-300 text-sm font-medium">{APP_TAGLINE}</p>
            <p className="text-gray-400 text-xs leading-relaxed max-w-md">
              A voice-first AI career coach built for Indian college students, especially candidates
              from Tier 2 and Tier 3 cities who think in Hindi or Hinglish and strive for fluency and
              confidence in campus placements and technical interviews.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{APP_CHALLENGE}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              Application Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/interview" className="hover:text-white transition-colors">
                  AI Mock Interview
                </Link>
              </li>
              <li>
                <Link href="/assistant" className="hover:text-white transition-colors">
                  Multilingual Voice Coach
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Answer Improvement Studio
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-white transition-colors">
                  Progress Analytics
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-white transition-colors">
                  API & Credit Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Gnani AI Integration Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200">
              Gnani AI Speech Models
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                <span>
                  STT: <strong className="text-gray-300">Prisma v3.0</strong> (hi-IN, en-IN, Hinglish codemix)
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-violet"></span>
                <span>
                  TTS: <strong className="text-gray-300">Timbre v3.0</strong> (Expressive Indian voices)
                </span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Credit Saver: 5,000 Credit Conservation</span>
              </li>
              <li className="text-[11px] text-gray-400 pt-1">
                Local-first architecture. No raw audio stored permanently.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-surface-50/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} AwaazPath. Developed for the Great Indian AI Internship Challenge.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Indian engineering students.
          </p>
        </div>
      </div>
    </footer>
  );
};

