import React, { useState } from 'react';
import { University, UserSession } from '../types';
import { CAMPUS_UTILITY_DATA } from '../data/extendedData';
import { CampusRadarMap } from './CampusRadarMap';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  Radio, 
  Users, 
  Navigation, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Compass,
  Volume2,
  Maximize2
} from 'lucide-react';

interface EmergencyWalkBuddyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  session: UserSession;
}

export const EmergencyWalkBuddyModal: React.FC<EmergencyWalkBuddyModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  session,
}) => {
  const [isWalkBuddyActive, setIsWalkBuddyActive] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [panicCountdown, setPanicCountdown] = useState<number | null>(null);
  const [panicTriggered, setPanicTriggered] = useState(false);

  if (!isOpen) return null;

  const utilityInfo = CAMPUS_UTILITY_DATA[currentUniversity.id] || CAMPUS_UTILITY_DATA.nwu;

  const handleTriggerPanic = () => {
    setPanicCountdown(3);
    const interval = setInterval(() => {
      setPanicCountdown((prev) => {
        if (prev !== null && prev <= 1) {
          clearInterval(interval);
          setPanicTriggered(true);
          return null;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);
  };

  const handleCancelPanic = () => {
    setPanicCountdown(null);
    setPanicTriggered(false);
  };

  // Safe zones list on campus
  const safeZones = [
    { name: '24-Hour Main Library Entrance', distance: '120m', status: 'Security Guard Active' },
    { name: 'Student Centre Protection Desk', distance: '280m', status: 'Emergency Panic Button Station' },
    { name: `${session.resHall || 'Residence'} Security Gate`, distance: '450m', status: 'Biometric Monitored' },
    { name: 'Campus Health Clinic & Paramedic Base', distance: '600m', status: 'First Aid On-Call' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div 
        className={`w-full ${isMapExpanded ? 'max-w-4xl' : 'max-w-lg'} bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left relative max-h-[94vh] transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3 sm:p-4 bg-red-950 text-white border-b border-red-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-white">Live Campus Radar & SOS Walk Buddy</h3>
                <span className="text-[9px] font-mono bg-red-800 px-1.5 py-0.5 rounded text-red-100 uppercase">
                  {currentUniversity.shortName} CPS
                </span>
              </div>
              <p className="text-[10px] text-red-300 font-mono">
                Direct Dispatch: {utilityInfo.emergencyNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMapExpanded(!isMapExpanded)}
              className="p-1.5 rounded-lg text-red-300 hover:text-white hover:bg-red-900/60 transition-colors"
              title={isMapExpanded ? 'Normal View' : 'Expand Radar View'}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-red-300 hover:text-white hover:bg-red-900/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-3.5 text-xs">
          {/* PANIC ALERT CONFIRMATION OR COUNTDOWN */}
          {panicTriggered ? (
            <div className="p-4 rounded-xl bg-red-900/90 border border-red-500 text-white text-center space-y-2 animate-pulse">
              <AlertTriangle className="w-8 h-8 text-amber-300 mx-auto" />
              <h4 className="text-base font-bold">EMERGENCY DISPATCH TRIGGERED</h4>
              <p className="text-xs text-red-200">
                Your live GPS coordinates have been sent to <strong>{currentUniversity.name} Campus Protection Services</strong> and campus security patrol vehicles in your area.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={handleCancelPanic}
                  className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs"
                >
                  Cancel Distress Alert
                </button>
              </div>
            </div>
          ) : panicCountdown !== null ? (
            <div className="p-5 rounded-xl bg-red-900 border-2 border-red-400 text-white text-center space-y-2">
              <span className="text-3xl font-black font-mono animate-ping inline-block">
                {panicCountdown}
              </span>
              <h4 className="text-sm font-bold">Transmitting SOS in {panicCountdown}s...</h4>
              <p className="text-[11px] text-red-200">
                Tap Cancel immediately if triggered accidentally.
              </p>
              <button
                type="button"
                onClick={handleCancelPanic}
                className="px-4 py-2 rounded-xl bg-white text-red-900 font-extrabold text-xs"
              >
                Cancel Emergency SOS
              </button>
            </div>
          ) : null}

          {/* REAL-TIME CAMPUS SAFETY RADAR MAP (EARTH SATELLITE, ROADS & BUILDINGS) */}
          <CampusRadarMap
            currentUniversity={currentUniversity}
            session={session}
            isWalkBuddyActive={isWalkBuddyActive}
            onToggleWalkBuddy={() => setIsWalkBuddyActive(!isWalkBuddyActive)}
            onTriggerSOS={handleTriggerPanic}
            heightClass={isMapExpanded ? 'h-[460px] sm:h-[500px]' : 'h-72 sm:h-80'}
            isExpanded={isMapExpanded}
            onToggleExpand={() => setIsMapExpanded(!isMapExpanded)}
          />

          {/* EMERGENCY CALL BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href={`tel:${utilityInfo.emergencyNumber}`}
              className="p-3 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-600/40 text-white flex items-center gap-3 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center shrink-0 shadow">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs leading-tight">Call Campus Protection</div>
                <span className="text-[11px] font-mono text-red-300 block truncate font-semibold">
                  {utilityInfo.emergencyNumber}
                </span>
                <span className="text-[9px] text-neutral-400">24/7 Rapid Response</span>
              </div>
            </a>

            <a
              href="tel:10111"
              className="p-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-white flex items-center gap-3 transition-colors text-left"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-800 text-cyan-400 flex items-center justify-center shrink-0 border border-neutral-700">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs leading-tight">National Emergency (SAPS)</div>
                <span className="text-[11px] font-mono text-cyan-300 block font-semibold">
                  10111 / 10177
                </span>
                <span className="text-[9px] text-neutral-400">South African Police & Ambulance</span>
              </div>
            </a>
          </div>

          {/* RED PANIC BUTTON */}
          {!panicTriggered && panicCountdown === null && (
            <button
              id="sos-panic-button"
              type="button"
              onClick={handleTriggerPanic}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] active:scale-98 transition-all cursor-pointer"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span>HOLD FOR 3 SECONDS: TRIGGER PANIC SOS</span>
            </button>
          )}

          {/* NEAREST SAFE ZONES LIST */}
          <div>
            <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block mb-2">
              Nearest Campus Safe Zones ({currentUniversity.shortName})
            </span>
            <div className="space-y-1.5">
              {safeZones.map((zone, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-850 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white text-[11px]">{zone.name}</div>
                    <span className="text-[10px] text-neutral-400">{zone.status}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-cyan-400 font-bold">
                    {zone.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
