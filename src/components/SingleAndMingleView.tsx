import React, { useState } from 'react';
import { SingleProfile, University, UserSession } from '../types';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  X, 
  Sparkles, 
  Send, 
  MapPin, 
  MessageCircle, 
  Check, 
  HelpCircle,
  EyeOff,
  Flame,
  Coffee,
  RotateCcw,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

interface SingleAndMingleViewProps {
  currentUniversity: University;
  session: UserSession;
  profiles: SingleProfile[];
  onOpenDirectMessage?: (recipient: { name: string; avatar: string; res?: string; degree?: string; initialMessage?: string }) => void;
  onReportProfile?: (name: string) => void;
}

export const SingleAndMingleView: React.FC<SingleAndMingleViewProps> = ({
  currentUniversity,
  session,
  profiles,
  onOpenDirectMessage,
  onReportProfile,
}) => {
  const [profileIndex, setProfileIndex] = useState(0);
  const [selectedIcebreaker, setSelectedIcebreaker] = useState<string | null>(null);
  const [customIcebreaker, setCustomIcebreaker] = useState('');
  const [showIcebreakerModal, setShowIcebreakerModal] = useState(false);
  const [icebreakerSent, setIcebreakerSent] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<Record<string, boolean>>({});

  const activeProfile = profiles[profileIndex];

  const handleNext = () => {
    if (profileIndex < profiles.length - 1) {
      setProfileIndex((prev) => prev + 1);
    } else {
      setProfileIndex(0); // Loop back
    }
  };

  const handleLike = () => {
    if (!activeProfile) return;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
    });

    setLikedProfiles((prev) => ({ ...prev, [activeProfile.id]: true }));
    setShowIcebreakerModal(true);
  };

  const handleSendIcebreaker = (e: React.FormEvent) => {
    e.preventDefault();
    setIcebreakerSent(true);
    setTimeout(() => {
      setIcebreakerSent(false);
      setShowIcebreakerModal(false);
      setSelectedIcebreaker(null);
      setCustomIcebreaker('');
      handleNext();
    }, 1600);
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
                {currentUniversity.shortName} Social Lounge
              </span>
              <span className="text-xs text-neutral-300">• Verified Campus Singles</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">Single & Mingle</h2>
            <p className="text-xs text-neutral-300 max-w-md">
              Low-pressure student dating & friendship matching. Send direct messages or drop anonymous icebreakers right on your campus.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-300 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 shrink-0 font-mono">
            <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
            <span>Anonymous Prompts</span>
          </div>
        </div>
      </div>

      {/* Profile Card Container */}
      {!activeProfile ? (
        <div className="p-12 text-center bg-neutral-900 rounded-2xl border border-neutral-800 text-neutral-400">
          <Heart className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-white">You've seen all profiles for now!</h4>
          <p className="text-xs text-neutral-500 mt-1">Check back later for new {currentUniversity.shortName} singles.</p>
          <button
            onClick={() => setProfileIndex(0)}
            className="mt-4 px-4 py-2 rounded-xl text-black font-bold text-xs"
            style={{ backgroundColor: currentUniversity.accentColor }}
          >
            Start Over
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Hero Image */}
            <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-950">
              <img
                src={activeProfile.photo}
                alt={activeProfile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Verified Campus Badge */}
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Verified {currentUniversity.shortName} Student</span>
              </div>

              {/* Report profile button */}
              {onReportProfile && (
                <button
                  type="button"
                  onClick={() => onReportProfile(activeProfile.name)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-neutral-400 hover:text-amber-400 text-xs flex items-center gap-1"
                  title="Report Profile"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Report</span>
                </button>
              )}

              {/* Name & Basic Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-2xl font-black font-display">{activeProfile.name}</h3>
                  <span className="text-lg font-mono text-neutral-300">{activeProfile.age}</span>
                </div>
                <p className="text-xs font-semibold text-neutral-200 mt-0.5">{activeProfile.faculty}</p>
                <p className="text-[11px] font-mono text-neutral-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {activeProfile.resHall}
                </p>
              </div>
            </div>

            {/* Profile Bio & Interests */}
            <div className="p-5 space-y-4 text-xs">
              {/* Bio */}
              <p className="text-neutral-300 text-xs leading-relaxed italic bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
                "{activeProfile.bio}"
              </p>

              {/* PRIMARY "SEND DM" / MESSAGE BUTTON */}
              {onOpenDirectMessage && (
                <button
                  type="button"
                  onClick={() => onOpenDirectMessage({
                    name: activeProfile.name,
                    avatar: activeProfile.photo,
                    res: activeProfile.resHall,
                    degree: activeProfile.faculty,
                    initialMessage: `Hi ${activeProfile.name}! Spotted your profile on ${currentUniversity.shortName} Single & Mingle.`
                  })}
                  className="w-full py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-98 transition-all cursor-pointer"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Direct Message (DM)</span>
                </button>
              )}

              {/* Interests Chips */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1.5">
                  Passions & Hobbies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 border border-neutral-700 font-medium text-[11px]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompt Answers */}
              {activeProfile.prompts.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    {p.question}
                  </div>
                  <div className="text-xs font-semibold text-white leading-relaxed">
                    {p.answer}
                  </div>
                </div>
              ))}

              {/* Quick Icebreaker Options */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Anonymous Icebreaker Prompts
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono">1-Tap Send</span>
                </div>

                <div className="space-y-1.5">
                  {activeProfile.icebreakerOptions.map((option, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setSelectedIcebreaker(option);
                        setShowIcebreakerModal(true);
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer flex items-center justify-between"
                    >
                      <span>{option}</span>
                      <Send className="w-3 h-3 text-neutral-500 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Card Controls: Pass, Custom Icebreaker, Like */}
              <div className="pt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow"
                  title="Pass"
                >
                  <X className="w-5 h-5 stroke-[2.5]" />
                </button>

                <button
                  id="icebreaker-custom-button"
                  type="button"
                  onClick={() => setShowIcebreakerModal(true)}
                  className="px-4 py-2.5 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                  <span>Custom Icebreaker</span>
                </button>

                <button
                  id="like-profile-button"
                  type="button"
                  onClick={handleLike}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                  title="Match / Send Love"
                >
                  <Heart className="w-5 h-5 text-black fill-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANONYMOUS ICEBREAKER MODAL */}
      {showIcebreakerModal && activeProfile && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-2xl text-left">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1">
                  <EyeOff className="w-3 h-3" /> Anonymous Campus Icebreaker
                </span>
                <h4 className="text-base font-bold text-white">Send Prompt to {activeProfile.name}</h4>
              </div>
              <button
                onClick={() => setShowIcebreakerModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            {icebreakerSent ? (
              <div className="p-4 rounded-xl bg-pink-950/60 border border-pink-800 text-center space-y-1">
                <Heart className="w-6 h-6 text-pink-400 fill-pink-400 mx-auto" />
                <p className="text-xs font-bold text-pink-200">Icebreaker Dispatched!</p>
                <p className="text-[11px] text-pink-300/80">
                  {activeProfile.name} has received your anonymous prompt. If they accept, you'll be matched in a private chat!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendIcebreaker} className="space-y-3 text-xs">
                {selectedIcebreaker ? (
                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 font-mono block">Selected Prompt:</span>
                    <p className="text-white font-semibold mt-0.5">{selectedIcebreaker}</p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-neutral-300 font-semibold mb-1">
                      Write Your Icebreaker
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="e.g. Which dining hall food is actually top tier? Or what's your go-to study spot?"
                      value={customIcebreaker}
                      onChange={(e) => setCustomIcebreaker(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-white outline-none"
                    />
                  </div>
                )}

                <div className="p-2.5 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your identity is kept secret until both parties mutual-like!</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-black font-extrabold text-xs tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Drop Anonymous Icebreaker</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
