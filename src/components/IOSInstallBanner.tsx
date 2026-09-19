import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { University } from '../types';
import { X, PlusSquare } from 'lucide-react';

interface IOSInstallBannerProps {
  currentUniversity?: University;
  forceShow?: boolean;
  onDismiss?: () => void;
}

export const IOSInstallBanner: React.FC<IOSInstallBannerProps> = ({
  currentUniversity,
  forceShow = false,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return localStorage.getItem('varsity_ios_pwa_dismissed') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    // Detect iOS device (iPhone, iPad, iPod)
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Detect if running as standalone PWA
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    // Show only when viewed on iOS in a browser (not yet installed) and not dismissed
    if (forceShow || (isIOSDevice && !isStandalone && !isDismissed)) {
      // Short delay for natural entrance after initial paint
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 900);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [forceShow, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    try {
      localStorage.setItem('varsity_ios_pwa_dismissed', 'true');
    } catch (e) {}
    if (onDismiss) {
      onDismiss();
    }
  };

  const accent = currentUniversity?.accentColor || '#38bdf8';
  const primary = currentUniversity?.primaryColor || '#171717';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="ios-pwa-install-banner"
          role="region"
          aria-label="Install Varsity Life HUB on iOS"
          initial={{ y: 120, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.96 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 pointer-events-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-neutral-700/80 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10 text-left">
            {/* Top university brand accent line */}
            <div 
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${accent}, ${primary}, ${accent})` }}
            />

            <div className="flex items-start gap-3.5 pt-1">
              {/* Minimalist Black & White Varsity Life HUB App Icon */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-black border border-neutral-700 p-1 flex items-center justify-center shadow-md relative overflow-hidden group">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path d="M50 16 L84 28 L50 40 L16 28 Z" fill="#ffffff" />
                  <path d="M32 35 L50 41 L68 35 V42 C68 47 60 51 50 51 C40 51 32 47 32 42 Z" fill="#d4d4d4" />
                  <path d="M20 29.5 L18 42 C17 44 19 46 21 46 C23 46 25 44 24 42 L22 29.5" stroke="#e5e5e5" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="21" cy="44" r="2.5" fill="#ffffff" />
                  <path d="M25 42 C25 66 38 78 50 84 C62 78 75 66 75 42" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M35 52 L50 71 L88 28" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Text & Guidance */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-md border border-neutral-700">
                    iOS Web App
                  </span>
                  <span className="text-[11px] text-amber-400 font-semibold flex items-center gap-0.5">
                    Full-Screen Mode
                  </span>
                </div>

                <p className="text-xs font-semibold text-neutral-100 leading-snug">
                  Install Varsity Life HUB on your iPhone 📲: Tap the Share button{' '}
                  <span className="inline-flex items-center justify-center w-5 h-5 mx-1 align-middle rounded bg-neutral-800 border border-neutral-600 text-sky-400 shadow-sm">
                    {/* Official Safari Share Icon Representation (Square with upward arrow) */}
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </span>{' '}
                  at the bottom of Safari, then scroll down and select{' '}
                  <span className="inline-flex items-center gap-1 text-white font-bold bg-neutral-800/90 px-1.5 py-0.5 rounded border border-neutral-600 text-[11px]">
                    <PlusSquare className="w-3 h-3 text-sky-400" />
                    'Add to Home Screen'
                  </span>
                  .
                </p>
              </div>

              {/* Close / Dismiss Cross */}
              <button
                id="ios-pwa-dismiss-x"
                type="button"
                onClick={handleDismiss}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-3 pt-2.5 border-t border-neutral-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero App Store downloads required</span>
              </div>

              <button
                id="ios-pwa-dismiss-btn"
                type="button"
                onClick={handleDismiss}
                className="px-3 py-1 text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700/80 border border-neutral-700 rounded-lg transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
