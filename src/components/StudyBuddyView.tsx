import React, { useState } from 'react';
import { StudyBuddy, University, UserSession } from '../types';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  MapPin, 
  Clock, 
  Sparkles, 
  UserPlus, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Coffee, 
  Calendar,
  Send,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface StudyBuddyViewProps {
  currentUniversity: University;
  session: UserSession;
  buddies: StudyBuddy[];
  onOpenDirectMessage?: (recipient: { name: string; avatar: string; res?: string; degree?: string; initialMessage?: string }) => void;
  onReportProfile?: (name: string) => void;
}

export const StudyBuddyView: React.FC<StudyBuddyViewProps> = ({
  currentUniversity,
  session,
  buddies,
  onOpenDirectMessage,
  onReportProfile,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [connectedBuddies, setConnectedBuddies] = useState<Record<string, boolean>>({});
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [inviteTime, setInviteTime] = useState('Tomorrow 14:00');
  const [inviteSpot, setInviteSpot] = useState('Campus Library 2nd Floor');
  const [inviteSent, setInviteSent] = useState(false);

  const activeBuddy = buddies[currentIndex];

  const handleConnect = () => {
    if (!activeBuddy) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });

    setConnectedBuddies((prev) => ({ ...prev, [activeBuddy.id]: true }));
    setInviteSpot(activeBuddy.librarySpot);
    setShowConnectModal(true);
  };

  const handleNext = () => {
    if (currentIndex < buddies.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Cycle back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(buddies.length - 1);
    }
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSent(true);
    setTimeout(() => {
      setInviteSent(false);
      setShowConnectModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 pb-20 text-left">
      {/* Top Banner */}
      <div 
        className="p-4 rounded-2xl border text-white relative overflow-hidden transition-colors shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${currentUniversity.primaryColor}dd 0%, #171717 100%)`,
          borderColor: `${currentUniversity.accentColor}44`
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider text-black"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                {currentUniversity.shortName} Academic Match
              </span>
              <span className="text-xs text-neutral-300">• Smart Course Pairing</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">Find a Study Buddy</h2>
            <p className="text-xs text-neutral-300 max-w-md">
              Connect with fellow {currentUniversity.shortName} students taking your exact modules, cramming for exams, or forming study circles.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 shrink-0">
            <span>Buddy {currentIndex + 1} of {buddies.length}</span>
          </div>
        </div>
      </div>

      {/* Main Swipeable Study Buddy Card */}
      {!activeBuddy ? (
        <div className="p-12 text-center bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-400">
          No more study buddy profiles in {currentUniversity.shortName} at this time.
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Card Hero: Image + Quick Info */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950">
              <img
                src={activeBuddy.avatar}
                alt={activeBuddy.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />

              {/* Match Score Badge */}
              <div 
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black tracking-wider text-black flex items-center gap-1 shadow-lg"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeBuddy.matchScore}% Match</span>
              </div>

              {/* Report button */}
              {onReportProfile && (
                <button
                  type="button"
                  onClick={() => onReportProfile(activeBuddy.name)}
                  className="absolute top-4 left-4 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-neutral-400 hover:text-amber-400 text-xs flex items-center gap-1"
                  title="Report Profile"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Report</span>
                </button>
              )}

              {/* Bottom Hero Overlay Info */}
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="text-xl font-extrabold font-display leading-tight">{activeBuddy.name}</h3>
                <p className="text-xs font-semibold opacity-90">{activeBuddy.degree} ({activeBuddy.year})</p>
                <p className="text-[11px] font-mono text-neutral-300">{activeBuddy.faculty}</p>
              </div>
            </div>

            {/* Card Content Details */}
            <div className="p-5 space-y-4 text-xs">
              {/* Bio */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
                  About & Goals
                </span>
                <p className="text-neutral-300 leading-relaxed italic bg-neutral-950/60 p-3 rounded-xl border border-neutral-800/80">
                  "{activeBuddy.bio}"
                </p>
              </div>

              {/* PRIMARY "SEND DM" BUTTON */}
              {onOpenDirectMessage && (
                <button
                  type="button"
                  onClick={() => onOpenDirectMessage({
                    name: activeBuddy.name,
                    avatar: activeBuddy.avatar,
                    degree: activeBuddy.degree,
                    initialMessage: `Hi ${activeBuddy.name.split(' ')[0]}! Would you like to study together for ${activeBuddy.modules[0] || 'our modules'}?`
                  })}
                  className="w-full py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message (DM)</span>
                </button>
              )}

              {/* Modules in Common */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1.5">
                  Modules Needing Study Buddy
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeBuddy.modules.map((mod) => (
                    <span
                      key={mod}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-200 border border-neutral-700 font-mono text-[11px] font-semibold"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              {/* Library Spot & Study Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase font-mono mb-1">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>Preferred Study Spot</span>
                  </div>
                  <div className="text-neutral-200 text-xs font-medium truncate">
                    {activeBuddy.librarySpot}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] uppercase font-mono mb-1">
                    <Coffee className="w-3 h-3 text-amber-400" />
                    <span>Study Style</span>
                  </div>
                  <div className="text-neutral-200 text-xs font-medium truncate">
                    {activeBuddy.studyStyle}
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-neutral-400 text-[11px] font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Available: {activeBuddy.availability}</span>
              </div>

              {/* Card Action Controls: Pass vs Connect */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 transition-all cursor-pointer"
                  title="Previous profile"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs border border-neutral-700 transition-all cursor-pointer text-center"
                >
                  Next Buddy
                </button>

                <button
                  id="connect-study-buddy-button"
                  type="button"
                  onClick={handleConnect}
                  className="flex-2 py-3 px-4 rounded-2xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <UserPlus className="w-4 h-4 stroke-[3]" />
                  <span>{connectedBuddies[activeBuddy.id] ? 'Connected ✓' : 'Plan Meetup'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONNECT / STUDY SESSION PLANNER MODAL */}
      {showConnectModal && activeBuddy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-2xl text-left">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  {currentUniversity.shortName} Study Match
                </span>
                <h4 className="text-base font-bold text-white">Plan Study Session with {activeBuddy.name.split(' ')[0]}</h4>
              </div>
              <button
                onClick={() => setShowConnectModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            {inviteSent ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-center space-y-1">
                <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-emerald-200">Session Invite Sent!</p>
                <p className="text-[11px] text-emerald-300/80">
                  {activeBuddy.name} received your invitation to meet at {inviteSpot} on {inviteTime}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Meeting Time / Date
                  </label>
                  <input
                    type="text"
                    value={inviteTime}
                    onChange={(e) => setInviteTime(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Campus Library / Study Venue
                  </label>
                  <input
                    type="text"
                    value={inviteSpot}
                    onChange={(e) => setInviteSpot(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-white outline-none"
                    required
                  />
                </div>

                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] text-neutral-400">
                  Focus modules: <strong className="text-neutral-200">{activeBuddy.modules.join(', ')}</strong>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-black font-extrabold text-xs tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Study Session</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
