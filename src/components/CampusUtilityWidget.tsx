import React from 'react';
import { University, UserSession } from '../types';
import { CAMPUS_UTILITY_DATA } from '../data/extendedData';
import { Zap, Droplets, Shield, MapPin, Radio, AlertCircle } from 'lucide-react';

interface CampusUtilityWidgetProps {
  currentUniversity: University;
  onOpenEmergency?: () => void;
  session?: UserSession;
}

export const CampusUtilityWidget: React.FC<CampusUtilityWidgetProps> = ({
  currentUniversity,
  onOpenEmergency,
  session,
}) => {
  const status = CAMPUS_UTILITY_DATA[currentUniversity.id] || CAMPUS_UTILITY_DATA.nwu;

  return (
    <div className="w-full mb-3 px-3 py-2 rounded-xl bg-neutral-950/90 border border-neutral-800 shadow-sm backdrop-blur-md flex items-center justify-between gap-2 overflow-x-auto text-xs">
      <div className="flex items-center gap-3 min-w-0 flex-wrap sm:flex-nowrap">
        {/* Loadshedding Status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className={`p-1 rounded-md ${
            status.loadsheddingStage === 'No Loadshedding' 
              ? 'bg-emerald-500/20 text-emerald-400' 
              : 'bg-amber-500/20 text-amber-400'
          }`}>
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="text-[11px] leading-tight">
            <span className="text-neutral-400 block font-mono text-[9px] uppercase">Power / Loadshedding</span>
            <span className="font-bold text-white font-mono">
              {status.loadsheddingStage} <span className="text-neutral-400 font-normal">({status.loadsheddingTime})</span>
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-neutral-800 hidden sm:block shrink-0" />

        {/* Water Status */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
            <Droplets className="w-3.5 h-3.5" />
          </div>
          <div className="text-[11px] leading-tight">
            <span className="text-neutral-400 block font-mono text-[9px] uppercase">Campus Water</span>
            <span className="font-bold text-white font-mono">
              {status.waterStatus} <span className="text-neutral-400 font-normal">({status.waterReservoir})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Quick Pill */}
      <button
        type="button"
        onClick={onOpenEmergency}
        className="shrink-0 py-1 px-2.5 rounded-lg border border-red-500/40 bg-red-950/30 hover:bg-red-900/40 text-red-300 font-mono font-bold text-[10px] flex items-center gap-1.5 transition-colors cursor-pointer shadow"
        title="Open Emergency SOS & Walk Buddy"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
        <Shield className="w-3 h-3 text-red-400" />
        <span>SOS & Walk Buddy</span>
      </button>
    </div>
  );
};
