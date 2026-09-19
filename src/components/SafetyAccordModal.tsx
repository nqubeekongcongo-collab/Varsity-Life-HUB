import React from 'react';
import { University, UserSession } from '../types';
import { ShieldCheck, MapPin, AlertTriangle, CheckCircle2, Lock, EyeOff } from 'lucide-react';

interface SafetyAccordModalProps {
  isOpen: boolean;
  onAgree?: () => void;
  onAccept?: () => void;
  currentUniversity: University;
  session?: UserSession;
  featureName?: 'Marketplace' | 'Single & Mingle' | 'Campus Life' | 'General';
}

export const SafetyAccordModal: React.FC<SafetyAccordModalProps> = ({
  isOpen,
  onAgree,
  onAccept,
  currentUniversity,
  featureName = 'General',
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onAccept) onAccept();
    else if (onAgree) onAgree();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* University Header Banner */}
        <div 
          className="p-5 text-white relative overflow-hidden"
          style={{ backgroundColor: `${currentUniversity.primaryColor}F0` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span 
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded text-black shadow-sm"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              {currentUniversity.shortName} CAMPUS ACCORD
            </span>
            <span className="text-[11px] font-mono text-white/80 flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              Student Safety Protocol
            </span>
          </div>

          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0" />
            <span>Safety Guidelines Agreement</span>
          </h3>
          <p className="text-xs text-neutral-200 mt-1 leading-relaxed">
            Welcome to <strong className="text-white">{currentUniversity.name} {featureName}</strong>. 
            Before browsing or interacting, all students must agree to these essential safety standards:
          </p>
        </div>

        {/* Guidelines List */}
        <div className="p-5 space-y-3.5 bg-neutral-900 text-xs">
          <div className="flex items-start gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold"
              style={{ 
                backgroundColor: `${currentUniversity.accentColor}20`,
                color: currentUniversity.accentColor 
              }}
            >
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Meet Exclusively in Public Campus Spaces</h4>
              <p className="text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
                Always arrange meetups in busy, well-lit university zones (e.g. Student Centre, Library Foyer, Cafeteria, or Residence Guard Posts). Never meet in secluded off-campus alleys or private rooms alone.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold"
              style={{ 
                backgroundColor: `${currentUniversity.accentColor}20`,
                color: currentUniversity.accentColor 
              }}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Zero Tolerance for Harassment & Misconduct</h4>
              <p className="text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
                Respect every student’s boundaries. Unsolicited explicit media, stalking, insults, or harassment will result in an immediate hardware ban and referral to {currentUniversity.shortName} Disciplinary Committee.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
            <div 
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold"
              style={{ 
                backgroundColor: `${currentUniversity.accentColor}20`,
                color: currentUniversity.accentColor 
              }}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-xs">Verify Payments Before Handover</h4>
              <p className="text-neutral-400 text-[11px] mt-0.5 leading-relaxed">
                Verify immediate EFT cleared in your banking app or accept cash in hand before handing over textbooks or electronics. Never click suspicious SMS payment links or share banking OTPs.
              </p>
            </div>
          </div>
        </div>

        {/* Footer & Agree Button */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex flex-col gap-2">
          <button
            id="safety-accord-agree-btn"
            type="button"
            onClick={handleConfirm}
            className="w-full py-3 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            style={{ backgroundColor: currentUniversity.accentColor }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Understand & Agree to Campus Guidelines</span>
          </button>
          <p className="text-[10px] text-center text-neutral-500 font-mono">
            Agreement recorded for your verified student session • {currentUniversity.shortName}
          </p>
        </div>
      </div>
    </div>
  );
};
