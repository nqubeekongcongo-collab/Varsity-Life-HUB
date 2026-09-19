import React, { useState } from 'react';
import { ShieldCheck, X, Trash2, AlertTriangle, CheckCircle2, Lock, Scale, FileText } from 'lucide-react';
import { University } from '../types';

interface LegalTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity?: University;
  onConfirmDeleteAccount?: () => void;
  showDeleteOption?: boolean;
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  onConfirmDeleteAccount,
  showDeleteOption = false,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteInputConfirmation, setDeleteInputConfirmation] = useState('');

  if (!isOpen) return null;

  const accentColor = currentUniversity?.accentColor || '#38bdf8';
  const primaryColor = currentUniversity?.primaryColor || '#1e293b';
  const uniName = currentUniversity?.shortName || 'Campus';

  const handleDelete = () => {
    if (deleteInputConfirmation.toUpperCase() !== 'DELETE') return;
    if (onConfirmDeleteAccount) {
      onConfirmDeleteAccount();
    }
    setShowConfirmDelete(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 text-left"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between text-white"
          style={{ backgroundColor: `${primaryColor}ee` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  POPIA Act & Legal Safeguards
                </span>
                <span 
                  className="text-[9px] font-bold px-1.5 py-0.2 rounded text-black uppercase"
                  style={{ backgroundColor: accentColor }}
                >
                  {uniName} Compliance
                </span>
              </div>
              <h3 className="text-base font-bold font-display text-white mt-0.5">
                Privacy Policy & Terms of Service
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable High-Fidelity Legal Text Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs text-neutral-300 leading-relaxed font-sans">
          {/* POPIA Security Affirmation Notice */}
          <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-white">
                Protection of Personal Information Act (POPIA) Shield
              </h4>
              <p className="text-[11px] text-neutral-400">
                Varsity Life HUB strictly protects your student data under the POPIA Act. We do not sell your personal information, and your data is completely restricted to your isolated campus network.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                1
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                LEGAL COMPLIANCE & POPIA ACT
              </h4>
            </div>
            <p className="pl-7 text-neutral-300">
              Varsity Life HUB ("the App") is fully committed to protecting student data in strict compliance with the South African Protection of Personal Information Act (POPIA), Act 4 of 2013. By registering, you consent to the processing of your personal information for the sole purpose of operating your campus network.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                2
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                WHAT DATA WE COLLECT & WHY
              </h4>
            </div>
            <ul className="pl-7 space-y-1.5 list-disc text-neutral-300">
              <li>
                <strong className="text-neutral-200">Student Email Address (.ac.za):</strong> Collected strictly to verify that you are an active student at a registered South African tertiary institution and to route you to your specific campus hub.
              </li>
              <li>
                <strong className="text-neutral-200">Profile Details (Name, Major, Campus):</strong> Used to personalize your experience across the Marketplace, Study Buddy, and Social tabs.
              </li>
              <li>
                <strong className="text-neutral-200">Media Uploads (Voice Notes, Files, Images):</strong> Temporarily processed to enable in-app sharing features. We do not monitor private direct messages unless they are officially flagged for safety violations.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                3
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                DATA RETENTION & YOUR RIGHTS
              </h4>
            </div>
            <ul className="pl-7 space-y-1.5 list-disc text-neutral-300">
              <li>
                <strong className="text-neutral-200">No Third-Party Sharing:</strong> Your data is strictly locked into your isolated campus network. We never sell, trade, or share your data with advertisers or outside entities.
              </li>
              <li>
                <strong className="text-neutral-200">Right to Erasure:</strong> In compliance with POPIA, you retain full ownership of your data. You can permanently delete your account and wipe all your associated data instantly via the "Delete Account" button in your profile settings.
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                4
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                LIMITATION OF LIABILITY & INDEMNITY (DEVELOPER SAFE HARBOR)
              </h4>
            </div>
            <ul className="pl-7 space-y-1.5 list-disc text-neutral-300">
              <li>
                <strong className="text-neutral-200">Platform Provider Status:</strong> Varsity Life HUB is a pure peer-to-peer technology connector. The developer(s), campus representatives, and affiliates are not responsible or legally liable for any interactions, transactions, disputes, physical injuries, or financial losses resulting from the use of the Marketplace, Single & Mingle, or Events tabs.
              </li>
              <li>
                <strong className="text-neutral-200">Verify Before You Transact:</strong> Users are explicitly warned to meet in safe, public, gate-secured campus locations during daylight hours and to verify electronic funds transfers (EFTs) before handing over items.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                5
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                USER CONDUCT & ACCEPTABLE USE
              </h4>
            </div>
            <p className="pl-7 text-neutral-300">
              <strong className="text-rose-300">Zero-Tolerance Policy:</strong> Harassment, hate speech, bullying, scamming, distribution of explicit adult content, or leaking of official university examination materials will result in an immediate, permanent hardware and email ban from the platform without prior warning. Severe infractions will be escalated to University Campus Protection Services.
            </p>
          </div>

          {/* Section 6: Legal Inquiries & Compliance Contact */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono font-bold">
                6
              </span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                POPIA COMPLIANCE & LEGAL INQUIRIES
              </h4>
            </div>
            <p className="pl-7 text-neutral-400 text-[11px] leading-relaxed">
              For any privacy concerns, data subject requests, copyright or safety reports, contact the Information Officer directly at:{' '}
              <a 
                href="mailto:varsitylifehub@gmail.com?subject=POPIA%20Privacy%20Inquiry" 
                className="text-white underline font-mono font-semibold hover:text-emerald-400 transition-colors"
              >
                varsitylifehub@gmail.com
              </a>.
            </p>
            <p className="pl-7 text-[10px] font-mono text-neutral-500 pt-1">
              © 2026 Varsity Life HUB. All Rights Reserved. Further inquiries: varsitylifehub@gmail.com
            </p>
          </div>

          {/* Optional Right to Erasure / Delete Data Action in Settings or Help & Support */}
          {showDeleteOption && (
            <div className="pt-4 mt-6 border-t border-neutral-800 p-4 rounded-xl bg-red-950/20 border-red-900/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>POPIA Right to Erasure (Article 24)</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Exercise your right to permanently delete your student account, marketplace postings, chat history, and stored preferences across this device.
              </p>
              
              {!showConfirmDelete ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Account & Clear Data</span>
                </button>
              ) : (
                <div className="p-3 bg-neutral-900 rounded-xl border border-rose-800/80 space-y-2.5">
                  <p className="text-xs font-bold text-white">
                    Are you sure you want to permanently delete your account?
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Type <strong className="text-white font-mono">DELETE</strong> below to confirm. This action cannot be undone.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type DELETE"
                      value={deleteInputConfirmation}
                      onChange={(e) => setDeleteInputConfirmation(e.target.value)}
                      className="flex-1 bg-black border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none"
                    />
                    <button
                      type="button"
                      disabled={deleteInputConfirmation.toUpperCase() !== 'DELETE'}
                      onClick={handleDelete}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                        deleteInputConfirmation.toUpperCase() === 'DELETE'
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Confirm Erasure</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmDelete(false);
                        setDeleteInputConfirmation('');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:px-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>Official POPIA Compliant Student Gateway</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-sans text-xs font-bold transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
