import React, { useState } from 'react';
import { University, UserSession, ReportReason } from '../types';
import { AlertOctagon, X, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ContentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle?: string;
  itemAuthor?: string;
  authorName?: string;
  currentUniversity: University;
  session?: UserSession;
  onSubmitReport?: (targetTitle: string) => { removed: boolean; totalReports: number } | void;
}

export const ContentReportModal: React.FC<ContentReportModalProps> = ({
  isOpen,
  onClose,
  itemTitle = 'Report Item',
  itemAuthor,
  authorName,
  currentUniversity,
  session,
  onSubmitReport,
}) => {
  const displayAuthor = authorName || itemAuthor || 'Author / Seller';
  const [selectedReason, setSelectedReason] = useState<ReportReason>('Spam or Advertising');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reportReference, setReportReference] = useState('');
  const [removalStatus, setRemovalStatus] = useState<{ removed: boolean; totalReports: number } | null>(null);

  if (!isOpen) return null;

  const reasons: ReportReason[] = [
    'Spam or Advertising',
    'Scams / Fraudulent Payment',
    'Inappropriate or Offensive',
    'Harassment or Bullying',
    'Impersonation or False Information',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refCode = `RP-${currentUniversity.shortName.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReportReference(refCode);

    const res = onSubmitReport?.(itemTitle);
    if (res) {
      setRemovalStatus(res);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-4 text-white flex items-center justify-between border-b border-neutral-800"
          style={{ backgroundColor: `${currentUniversity.primaryColor}ee` }}
        >
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-300" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                {currentUniversity.shortName} Campus Moderation
              </span>
              <h3 className="text-sm font-bold font-display">Report Content / Post</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-black/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-6 text-center space-y-3 bg-neutral-900">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              removalStatus?.removed 
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {removalStatus?.removed ? <AlertOctagon className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
            </div>
            
            <h4 className="text-base font-bold text-white">
              {removalStatus?.removed ? 'Content Automatically Removed' : 'Report Submitted Successfully'}
            </h4>

            {removalStatus?.removed ? (
              <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-200 text-xs leading-relaxed">
                <strong>Safety Policy Enforced:</strong> This item has reached <strong>5 community reports</strong> and has been permanently removed from all feeds on {currentUniversity.shortName}.
              </div>
            ) : (
              <p className="text-xs text-neutral-300 max-w-xs mx-auto leading-relaxed">
                Thank you for keeping <strong className="text-white">{currentUniversity.name}</strong> safe. 
                Our community safety threshold automatically purges content that receives 5 student reports.
              </p>
            )}

            <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
              <span>Reference: <strong className="text-white">{reportReference}</strong></span>
              <span>Reports: <strong className="text-amber-400">{removalStatus?.totalReports || 1}/5</strong></span>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-2 w-full py-2.5 px-4 rounded-xl text-black font-bold text-xs shadow-md cursor-pointer"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 bg-neutral-900 text-xs">
            {/* Target Item summary */}
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[10px] text-neutral-500 font-mono uppercase block">Reported Post / Profile:</span>
              <p className="font-semibold text-white truncate text-xs mt-0.5">"{itemTitle}"</p>
              {itemAuthor && (
                <span className="text-[10px] text-neutral-400">By: {itemAuthor}</span>
              )}
            </div>

            {/* Reasons Picker */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1.5">
                Why are you reporting this content?
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {reasons.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      selectedReason === reason
                        ? 'border-white/40 bg-neutral-800 text-white'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className="accent-emerald-400"
                    />
                    <span className="text-xs">{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional details */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explain what violates campus rules or guidelines..."
                rows={2}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-500 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-3 rounded-xl text-black font-extrabold text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
