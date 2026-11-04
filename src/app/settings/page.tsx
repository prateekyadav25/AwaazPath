'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  ShieldCheck,
  Cpu,
  Key,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Volume2,
  Languages,
  Zap,
  Info,
  Server,
  Lock,
} from 'lucide-react';
import {
  getUserPreferences,
  saveUserPreferences,
  getApiUsageStats,
  clearAllLocalData,
} from '@/lib/storage';
import { UserPreferences, ApiUsageStats } from '@/types';
import { GNANI_VOICES, LANGUAGES } from '@/lib/constants';

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<UserPreferences>(getUserPreferences());
  const [apiUsage, setApiUsage] = useState<ApiUsageStats>(getApiUsageStats());
  const [serverStatus, setServerStatus] = useState<{
    isConfigured: boolean;
    apiKeyPresent: boolean;
    sttModel: string;
    ttsModel: string;
    endpoints: { stt: string; tts: string };
  } | null>(null);

  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [saveBanner, setSaveBanner] = useState(false);

  useEffect(() => {
    // Check server Gnani API status
    fetch('/api/gnani/status')
      .then((res) => res.json())
      .then((data) => {
        if (data?.gnani) {
          setServerStatus(data.gnani);
        }
      })
      .catch(() => {});
  }, []);

  const updatePreference = <K extends keyof UserPreferences>(key: K, val: UserPreferences[K]) => {
    const updated = saveUserPreferences({ [key]: val });
    setPreferences(updated);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 2000);
  };

  const handleResetData = () => {
    clearAllLocalData();
    setApiUsage(getApiUsageStats());
    setPreferences(getUserPreferences());
    setResetConfirmOpen(false);
    window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="space-y-1 pb-6 border-b border-surface-50">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-400">
          <Settings className="w-4 h-4" />
          <span>System Configuration & Security</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Settings & API Integration Status
        </h1>
        <p className="text-sm text-gray-400">
          Manage your Gnani AI configuration, audio voices, and monitor application credit usage.
        </p>
      </div>

      {saveBanner && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Preferences saved successfully.</span>
        </div>
      )}

      {/* 1. Gnani AI Live Integration Status Card */}
      <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Gnani AI Integration Status</h3>
              <p className="text-xs text-gray-400">
                Official Vachana speech recognition & synthesis endpoints
              </p>
            </div>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
              serverStatus?.isConfigured
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {serverStatus?.isConfigured ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>API Key Connected</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Demo Sandbox (Key Missing)</span>
              </>
            )}
          </div>
        </div>

        {/* Server status alert */}
        {!serverStatus?.isConfigured && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <Info className="w-4 h-4 text-amber-400" />
              <span>How to Configure Your Live Gnani AI API Key</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              To connect live Gnani speech APIs, add your key to <code>.env</code> file:
            </p>
            <div className="p-2.5 rounded-lg bg-surface-200 font-mono text-[11px] text-gray-200 border border-surface-50">
              GNANI_API_KEY=your_gnani_api_key_here<br />
              GNANI_STT_MODEL=prisma-v3.0<br />
              GNANI_TTS_MODEL=timbre-v3.0
            </div>
            <p className="text-[11px] text-gray-400">
              The application remains 100% operational in Demo Mode until an API key is configured.
            </p>
          </div>
        )}

        {/* Configured Models & Security specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-200 border border-surface-50 space-y-1.5">
            <span className="text-gray-400 block font-medium">Speech-to-Text Model</span>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-brand-400" />
              <span>{serverStatus?.sttModel || 'prisma-v3.0'}</span>
            </div>
            <span className="text-[11px] text-gray-400 block font-mono">
              POST https://api.vachana.ai/stt/v3
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-surface-200 border border-surface-50 space-y-1.5">
            <span className="text-gray-400 block font-medium">Text-to-Speech Model</span>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-accent-violet" />
              <span>{serverStatus?.ttsModel || 'timbre-v3.0'}</span>
            </div>
            <span className="text-[11px] text-gray-400 block font-mono">
              POST https://api.vachana.ai/api/v1/tts/inference
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2.5 text-xs text-gray-400 p-3 rounded-xl bg-surface-200/50 border border-surface-50">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Zero Client Leakage:</strong> All Gnani credentials remain securely on the
            server. API keys are never bundled into client JavaScript.
          </span>
        </div>
      </div>

      {/* 2. Credit Conservation Strategy Card */}
      <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Credit Conservation Mode</h3>
              <p className="text-xs text-gray-400">
                Architected to strictly safeguard your 5,000 Gnani programme credits
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              updatePreference('creditSaverMode', !preferences.creditSaverMode)
            }
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              preferences.creditSaverMode
                ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-surface-200 border-surface-50 text-gray-400'
            }`}
          >
            {preferences.creditSaverMode ? 'Protected (ON)' : 'Disabled (OFF)'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
          <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-50 space-y-1">
            <span className="font-semibold text-white">Explicit Confirmation Only</span>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Microphone recordings and Timbre audio are never submitted automatically. User must
              click deliberately.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-200 border border-surface-50 space-y-1">
            <span className="font-semibold text-white">Zero Polling / No Duplicate Retries</span>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Paid endpoints are never called in background loops, page reloads, or automated unit
              tests.
            </p>
          </div>
        </div>
      </div>

      {/* 3. API Usage Dashboard */}
      <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Local API Usage Dashboard</h3>
              <p className="text-xs text-gray-400">
                Application request logs (not official remaining platform credits)
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-200 border border-surface-50 text-center space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              STT Requests
            </span>
            <span className="text-2xl font-black text-white">{apiUsage.sttRequests}</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-200 border border-surface-50 text-center space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
              TTS Requests
            </span>
            <span className="text-2xl font-black text-white">{apiUsage.ttsRequests}</span>
          </div>

          <div className="p-4 rounded-xl bg-surface-200 border border-surface-50 text-center space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block">
              Successful
            </span>
            <span className="text-2xl font-black text-emerald-400">
              {apiUsage.successfulRequests}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-surface-200 border border-surface-50 text-center space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-rose-400 font-semibold block">
              Failed
            </span>
            <span className="text-2xl font-black text-rose-400">{apiUsage.failedRequests}</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 italic">
          *Note: Official Gnani programme credit balance is maintained on your Gnani AI platform
          account (https://app.gnani.ai). The counters above record local application dispatch metrics.
        </p>

        {/* Recent API Call Log */}
        {apiUsage.history && apiUsage.history.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-surface-50">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Recent Application API Dispatch Log
            </span>
            <div className="divide-y divide-surface-50 max-h-48 overflow-y-auto">
              {apiUsage.history.slice(0, 8).map((h) => (
                <div
                  key={h.id}
                  className="py-2 flex items-center justify-between text-xs text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        h.status === 'success' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                    <span className="font-mono uppercase font-bold text-white">{h.type}</span>
                    <span className="text-gray-400">{h.details || 'Inference call'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 font-mono text-[11px]">
                    <span>{h.durationMs}ms</span>
                    <span>{new Date(h.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. User Preferences Card */}
      <div className="rounded-3xl bg-surface-100 border border-surface-50 p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-white">User Coaching Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Preferred Language */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 block">
              Speech Recognition Default Language
            </label>
            <select
              value={preferences.preferredLanguage}
              onChange={(e) => updatePreference('preferredLanguage', e.target.value as any)}
              className="w-full rounded-xl bg-surface-200 border border-surface-50 p-3 text-xs text-gray-100 focus:outline-none"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          {/* Voice Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300 block">
              Gnani Timbre Coach Voice
            </label>
            <select
              value={preferences.voiceGender === 'female' ? 'Nalini' : 'Rohan'}
              onChange={(e) =>
                updatePreference(
                  'voiceGender',
                  e.target.value === 'Rohan' ? 'male' : 'female'
                )
              }
              className="w-full rounded-xl bg-surface-200 border border-surface-50 p-3 text-xs text-gray-100 focus:outline-none"
            >
              {GNANI_VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 5. Danger Zone / Reset */}
      <div className="p-6 rounded-2xl bg-surface-100 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Reset Local Practice Data</h4>
          <p className="text-xs text-gray-400">
            Clears saved interview sessions, progress statistics, and local request counters.
          </p>
        </div>
        {!resetConfirmOpen ? (
          <button
            onClick={() => setResetConfirmOpen(true)}
            className="px-4 py-2 rounded-xl bg-surface-200 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-surface-50 transition-colors"
          >
            Clear Data
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetData}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
            >
              Confirm Clear
            </button>
            <button
              onClick={() => setResetConfirmOpen(false)}
              className="px-3 py-1.5 rounded-xl bg-surface-200 text-gray-300 text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
