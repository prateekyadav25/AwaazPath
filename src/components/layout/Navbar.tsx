'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mic,
  LayoutDashboard,
  BotMessageSquare,
  Sparkles,
  BarChart3,
  Settings,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { getUserPreferences, saveUserPreferences } from '@/lib/storage';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [creditSaver, setCreditSaver] = useState(true);
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    const prefs = getUserPreferences();
    setCreditSaver(prefs.creditSaverMode);

    // Check Gnani API status once on mount
    fetch('/api/gnani/status')
      .then((res) => res.json())
      .then((data) => {
        setApiConfigured(Boolean(data?.gnani?.isConfigured));
      })
      .catch(() => setApiConfigured(false));
  }, []);

  const toggleCreditSaver = () => {
    const nextVal = !creditSaver;
    setCreditSaver(nextVal);
    saveUserPreferences({ creditSaverMode: nextVal });
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/interview', label: 'Mock Interview', icon: Mic },
    { href: '/assistant', label: 'Voice Assistant', icon: BotMessageSquare },
    { href: '/studio', label: 'Answer Studio', icon: Sparkles },
    { href: '/progress', label: 'Analytics', icon: BarChart3 },
    { href: '/settings', label: 'API & Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080B11]/90 backdrop-blur-md border-b border-surface-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-accent-violet to-accent-cyan p-0.5 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all">
              <div className="w-full h-full bg-[#080B11] rounded-[10px] flex items-center justify-center">
                <Mic className="w-5 h-5 text-brand-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                  {APP_NAME}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  Gnani AI
                </span>
              </div>
              <p className="text-[10px] text-gray-400 hidden sm:block">
                Your Voice. Your Confidence. Your Career.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-surface-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-gray-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden lg:flex items-center gap-3">
            {/* API Status Badge */}
            <Link
              href="/settings"
              title={
                apiConfigured
                  ? 'Gnani API Key Configured'
                  : 'Gnani API Key Missing - Operating in Demo Mode'
              }
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                apiConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}
            >
              {apiConfigured ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Gnani Live</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Demo Mode</span>
                </>
              )}
            </Link>

            {/* Credit Saver Toggle Pill */}
            <button
              onClick={toggleCreditSaver}
              title="Toggle Credit Saver Mode (Preserves your 5,000 Gnani credits)"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                creditSaver
                  ? 'bg-brand-500/10 text-brand-300 border-brand-500/30 hover:bg-brand-500/20'
                  : 'bg-surface-100 text-gray-400 border-surface-50 hover:bg-surface-50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              <span>{creditSaver ? 'Credit Saver: ON' : 'Credit Saver: OFF'}</span>
            </button>

            {/* Quick Practice CTA */}
            <Link
              href="/interview"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-brand-600 to-accent-violet hover:from-brand-500 hover:to-accent-violet text-white text-xs font-semibold shadow-md shadow-brand-500/20 hover:shadow-brand-500/40 transition-all"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Practice Now</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-surface-50 bg-[#080B11]/98 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'text-gray-300 hover:bg-surface-100'
                }`}
              >
                <Icon className="w-4 h-4 text-brand-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-surface-50 flex flex-col gap-2">
            <button
              onClick={toggleCreditSaver}
              className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-surface-100 text-xs text-gray-300"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                Credit Saver Mode
              </span>
              <span className={creditSaver ? 'text-emerald-400 font-semibold' : 'text-gray-400'}>
                {creditSaver ? 'ON' : 'OFF'}
              </span>
            </button>

            <Link
              href="/interview"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 text-white text-sm font-semibold shadow-md"
            >
              <Mic className="w-4 h-4" />
              <span>Start Mock Interview</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
