'use client';

import React from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

interface CreditSaverBadgeProps {
  enabled: boolean;
  onToggle?: () => void;
  compact?: boolean;
}

export const CreditSaverBadge: React.FC<CreditSaverBadgeProps> = ({
  enabled,
  onToggle,
  compact = false,
}) => {
  if (compact) {
    return (
      <button
        onClick={onToggle}
        title={
          enabled
            ? 'Credit Saver Mode ON (Protects your 5,000 Gnani credits)'
            : 'Credit Saver Mode OFF'
        }
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
          enabled
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
            : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{enabled ? 'Credit Saver Active' : 'Saver Disabled'}</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-surface-100 border border-surface-50 text-xs">
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}
        >
          {enabled ? <ShieldCheck className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
        </div>
        <div>
          <div className="font-semibold text-gray-200">
            {enabled ? 'Credit Saver Protection Enabled' : 'Credit Saver Disabled'}
          </div>
          <div className="text-gray-400 text-[11px]">
            {enabled
              ? 'Voice APIs require manual confirmation to protect your 5,000 Gnani credits.'
              : 'Auto-playback enabled. Be careful with remaining credits.'}
          </div>
        </div>
      </div>
      {onToggle && (
        <button
          onClick={onToggle}
          className={`px-3 py-1.5 rounded-lg font-medium text-xs border transition-all ${
            enabled
              ? 'bg-surface-200 border-surface-50 text-gray-300 hover:text-white'
              : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500'
          }`}
        >
          {enabled ? 'Configure' : 'Enable Saver'}
        </button>
      )}
    </div>
  );
};
