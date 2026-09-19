import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';
import { University } from '../types';

interface MobileFrameProps {
  children: React.ReactNode;
  currentUniversity?: University;
  isLoggedIn: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  currentUniversity,
  isLoggedIn,
}) => {
  const [deviceMode, setDeviceMode] = useState<'responsive' | 'phone'>('responsive');

  // Format current SA time
  const currentTime = new Date().toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Top Floating Viewport Switcher Toolbar (discreet and clean) */}
      <div className="w-full bg-neutral-900/90 border-b border-neutral-800 px-4 py-1.5 flex items-center justify-between text-xs text-neutral-400 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] text-neutral-300">
            Varsity Life HUB {isLoggedIn && currentUniversity ? `• ${currentUniversity.shortName} (${currentUniversity.name})` : '• Pre-Login MVP'}
          </span>
        </div>

        {/* Toggle between smartphone simulator & responsive screen */}
        <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setDeviceMode('phone')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'phone'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Preview inside mobile smartphone frame"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Phone Frame</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('responsive')}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'responsive'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Preview standard full-width responsive view"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fluid Responsive</span>
          </button>
        </div>
      </div>

      {/* Main Content Render */}
      {deviceMode === 'phone' ? (
        <div className="py-6 px-3 flex items-center justify-center w-full">
          {/* Smartphone Bezel */}
          <div className="relative w-full max-w-[410px] h-[860px] bg-black rounded-[48px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.95)] border-[5px] border-neutral-800 ring-1 ring-white/10 flex flex-col overflow-hidden">
            {/* Phone Top Speaker & Dynamic Island */}
            <div className="h-7 w-full flex items-center justify-between px-6 z-50 text-white shrink-0">
              <span className="text-[12px] font-semibold tracking-tight font-mono">{currentTime}</span>
              {/* Island */}
              <div className="w-24 h-4 bg-neutral-950 rounded-full border border-neutral-800 flex items-center justify-end px-2 gap-1">
                <div className="w-2 h-2 rounded-full bg-neutral-800" />
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Inner Phone Screen Content */}
            <div className="flex-1 w-full overflow-y-auto rounded-[36px] bg-neutral-950 flex flex-col relative no-scrollbar">
              {children}
            </div>

            {/* Home Indicator Bar */}
            <div className="h-4 w-full flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-neutral-600 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
};
