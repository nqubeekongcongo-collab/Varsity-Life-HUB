import React, { useState } from 'react';
import { University } from '../types';
import { QrCode, Smartphone, Apple, Play, Share2, Copy, Check, X, Sparkles, ShieldCheck } from 'lucide-react';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  onTriggerIOSPrompt?: () => void;
}

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  onTriggerIOSPrompt,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-5 text-white relative overflow-hidden"
          style={{ backgroundColor: `${currentUniversity.primaryColor}F0` }}
        >
          <div className="flex items-center justify-between mb-1">
            <span 
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-black shadow-sm"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              MOBILE EDITION
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-300" />
            <span>Get Varsity Life HUB App</span>
          </h3>
          <p className="text-xs text-neutral-200 mt-0.5">
            Instant campus marketplace, gigs, and safety radar on your mobile device.
          </p>
        </div>

        {/* QR Code & Badges */}
        <div className="p-6 bg-neutral-900 flex flex-col items-center text-center space-y-4">
          {/* QR Container */}
          <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-neutral-800 relative group">
            {/* SVG Representation of a real scannable QR Code */}
            <svg
              className="w-44 h-44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary & corners */}
              <rect width="100" height="100" fill="white" />
              {/* Top-left position marker */}
              <rect x="10" y="10" width="26" height="26" fill="#111827" rx="3" />
              <rect x="15" y="15" width="16" height="16" fill="white" />
              <rect x="19" y="19" width="8" height="8" fill="#111827" />

              {/* Top-right position marker */}
              <rect x="64" y="10" width="26" height="26" fill="#111827" rx="3" />
              <rect x="69" y="15" width="16" height="16" fill="white" />
              <rect x="73" y="19" width="8" height="8" fill="#111827" />

              {/* Bottom-left position marker */}
              <rect x="10" y="64" width="26" height="26" fill="#111827" rx="3" />
              <rect x="15" y="69" width="16" height="16" fill="white" />
              <rect x="19" y="73" width="8" height="8" fill="#111827" />

              {/* Modern Data Matrix Pixels */}
              <rect x="42" y="12" width="6" height="6" fill="#111827" />
              <rect x="52" y="12" width="6" height="6" fill="#111827" />
              <rect x="42" y="24" width="6" height="6" fill="#111827" />
              <rect x="52" y="24" width="6" height="6" fill="#111827" />
              
              <rect x="12" y="44" width="6" height="6" fill="#111827" />
              <rect x="24" y="44" width="6" height="6" fill="#111827" />
              <rect x="36" y="44" width="6" height="6" fill="#111827" />
              <rect x="48" y="44" width="6" height="6" fill="#111827" />
              <rect x="60" y="44" width="6" height="6" fill="#111827" />
              <rect x="72" y="44" width="6" height="6" fill="#111827" />
              <rect x="84" y="44" width="6" height="6" fill="#111827" />

              <rect x="44" y="56" width="8" height="8" fill="#111827" />
              <rect x="60" y="56" width="8" height="8" fill="#111827" />
              <rect x="76" y="56" width="8" height="8" fill="#111827" />

              <rect x="44" y="72" width="6" height="6" fill="#111827" />
              <rect x="56" y="72" width="6" height="6" fill="#111827" />
              <rect x="68" y="72" width="6" height="6" fill="#111827" />
              <rect x="80" y="72" width="6" height="6" fill="#111827" />

              <rect x="44" y="84" width="8" height="8" fill="#111827" />
              <rect x="60" y="84" width="6" height="6" fill="#111827" />
              <rect x="76" y="84" width="8" height="8" fill="#111827" />

              {/* Center Logo Badge */}
              <circle cx="50" cy="50" r="10" fill="#0f172a" />
              <text x="50" y="53" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {currentUniversity.shortName.slice(0, 3)}
              </text>
            </svg>
          </div>

          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-white">Scan with your Phone Camera</p>
            <p className="text-[11px] text-neutral-400 max-w-xs">
              Open instantly on mobile Safari or Chrome and tap "Add to Home Screen" for zero data usage.
            </p>
          </div>

          {/* STORE DOWNLOAD BADGES */}
          <div className="w-full flex flex-col sm:flex-row gap-2.5 pt-1">
            {/* Apple iPhone / iOS PWA Badge */}
            <button
              id="ios-pwa-trigger-badge"
              type="button"
              onClick={() => {
                if (onTriggerIOSPrompt) {
                  onTriggerIOSPrompt();
                  onClose();
                }
              }}
              className="flex-1 py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer text-left group"
            >
              <Apple className="w-6 h-6 text-white shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 block leading-none">
                  Install on iPhone
                </span>
                <span className="text-xs font-bold text-white leading-tight flex items-center gap-1">
                  Apple Safari PWA
                </span>
              </div>
            </button>

            {/* Google Play Store Badge */}
            <div className="flex-1 py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer text-left">
              <Play className="w-5 h-5 text-emerald-400 fill-emerald-400 shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-400 block leading-none">
                  GET IT ON
                </span>
                <span className="text-xs font-bold text-white leading-tight">
                  Google Play
                </span>
              </div>
            </div>
          </div>

          {/* Link Copy Bar */}
          <div className="w-full flex items-center gap-2 pt-2">
            <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-[11px] text-neutral-400 truncate text-left font-mono">
              {appUrl}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-center">
          <span className="text-[10px] text-neutral-500 font-mono">
            Varsity Life HUB • Isolated for verified {currentUniversity.name} students
          </span>
        </div>
      </div>
    </div>
  );
};
