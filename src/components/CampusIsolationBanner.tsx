import React, { useState } from 'react';
import { University, UniversityId } from '../types';
import { CampusIsolationService, CampusIsolationAudit } from '../services/dataIsolation';
import { ShieldCheck, Lock, ChevronRight, X, Database, CheckCircle2, ShieldAlert } from 'lucide-react';

interface CampusIsolationBannerProps {
  currentUniversity: University;
  sectionName: string;
  itemCount: number;
}

export const CampusIsolationBanner: React.FC<CampusIsolationBannerProps> = ({
  currentUniversity,
  sectionName,
  itemCount,
}) => {
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <>
      <div 
        className="w-full mb-4 px-3.5 py-2.5 rounded-xl border flex flex-wrap items-center justify-between gap-2 shadow-sm backdrop-blur-sm transition-all"
        style={{
          backgroundColor: `${currentUniversity.primaryColor}15`,
          borderColor: `${currentUniversity.accentColor}35`
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: `${currentUniversity.accentColor}25`,
              borderColor: `${currentUniversity.accentColor}50`,
              color: currentUniversity.accentColor
            }}
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                CAMPUS DATA ISOLATION ACTIVE
              </span>
              <span 
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full border text-white"
                style={{
                  backgroundColor: `${currentUniversity.primaryColor}80`,
                  borderColor: `${currentUniversity.accentColor}60`
                }}
              >
                {currentUniversity.shortName} Campus Partition
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 truncate">
              Only verified {currentUniversity.shortName} students can view & post in this {sectionName.toLowerCase()} feed.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAuditModal(true)}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 transition-colors cursor-pointer shrink-0"
        >
          <span>Audit Shield</span>
          <ChevronRight className="w-3 h-3 text-neutral-400" />
        </button>
      </div>

      {/* Campus Isolation Security Audit Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-neutral-900 border rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            style={{ borderColor: `${currentUniversity.accentColor}50` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${currentUniversity.accentColor}25`,
                    borderColor: `${currentUniversity.accentColor}50`,
                    color: currentUniversity.accentColor
                  }}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-display">
                    Campus Data Isolation Audit
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Zero Cross-Campus Leakage Engine
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* University Details Card */}
            <div 
              className="p-3.5 rounded-xl border space-y-2 text-xs"
              style={{
                backgroundColor: `${currentUniversity.primaryColor}20`,
                borderColor: `${currentUniversity.accentColor}40`
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono text-[10px] uppercase">Designated Institution</span>
                <span className="font-bold text-white">{currentUniversity.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono text-[10px] uppercase">Tenant Identifier</span>
                <span className="font-mono text-emerald-400">tenant-za-{currentUniversity.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono text-[10px] uppercase">Domain Boundary</span>
                <span className="font-mono text-cyan-300">@{currentUniversity.domain}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 font-mono text-[10px] uppercase">Data Isolation State</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  STRICT TENANT LOCKED
                </span>
              </div>
            </div>

            {/* Scope Explanation */}
            <div className="space-y-2.5 text-xs text-neutral-300">
              <h4 className="font-semibold text-white uppercase text-[11px] font-mono tracking-wider">
                Cryptographic Privacy Fencing
              </h4>
              <ul className="space-y-2 bg-neutral-950/70 p-3 rounded-xl border border-neutral-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Marketplace:</strong> Only students verified with <code className="text-amber-300">@{currentUniversity.domain}</code> can post, browse, or message sellers on this campus. Students at Wits, UCT, DUT, etc. cannot access these listings.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Campus Events:</strong> Events and RSVPs are restricted to {currentUniversity.shortName} students. Cross-university attendance tracking is strictly segmented.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Group Chats:</strong> Residence and campus chat channels (#ResLife, #CampusGossip, #ExamPrep, #RideShare) operate on private isolated websockets per university tenant.
                  </span>
                </li>
              </ul>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-base font-extrabold text-white font-mono">{itemCount}</div>
                <div className="text-[10px] text-neutral-400">Current Items</div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-base font-extrabold text-emerald-400 font-mono">100%</div>
                <div className="text-[10px] text-neutral-400">Isolated</div>
              </div>
              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                <div className="text-base font-extrabold text-cyan-400 font-mono">0</div>
                <div className="text-[10px] text-neutral-400">Cross Leaks</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAuditModal(false)}
              className="w-full py-2.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-neutral-200 transition-colors"
            >
              Close Audit
            </button>
          </div>
        </div>
      )}
    </>
  );
};
