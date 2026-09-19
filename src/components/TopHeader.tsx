import React, { useState } from 'react';
import { University, UniversityId, UserSession } from '../types';
import { UNIVERSITIES, UNIVERSITY_LIST } from '../data/universities';
import { BrandLogo } from './BrandLogo';
import { 
  Building, 
  ChevronDown, 
  LogOut, 
  Bell, 
  User, 
  Shield, 
  Sparkles, 
  Check, 
  QrCode,
  MapPin,
  Flame,
  Edit3,
  Sliders,
  BookOpen,
  MessageSquare,
  LifeBuoy,
  Smartphone,
  Footprints
} from 'lucide-react';

interface TopHeaderProps {
  currentUniversity: University;
  session: UserSession;
  onSwitchUniversity: (uniId: UniversityId) => void;
  onLogout: () => void;
  onOpenProfileEdit?: () => void;
  unreadCount?: number;
  onOpenDirectMessages?: () => void;
  unreadDirectMessages?: number;
  onOpenWalkBuddy?: () => void;
  onOpenHelpSupport?: () => void;
  onOpenAppDownload?: () => void;
  onOpenManageTabs?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentUniversity,
  session,
  onSwitchUniversity,
  onLogout,
  onOpenProfileEdit,
  unreadCount = 3,
  onOpenDirectMessages,
  unreadDirectMessages = 1,
  onOpenWalkBuddy,
  onOpenHelpSupport,
  onOpenAppDownload,
  onOpenManageTabs,
}) => {
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <header 
        className="sticky top-0 z-30 w-full transition-colors duration-500 border-b backdrop-blur-md"
        style={{ 
          backgroundColor: `${currentUniversity.primaryColor}F0`,
          borderColor: `${currentUniversity.accentColor}33`
        }}
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
          {/* Brand + Campus Identifier */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <BrandLogo size="sm" showText={false} accentColor={currentUniversity.accentColor} themeMode="themed" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white font-display uppercase">
                    Varsity Life
                  </span>
                  <span 
                    className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-widest text-black shadow-sm"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    HUB
                  </span>
                </div>
                <p className="text-[10px] text-white/80 font-medium flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate max-w-[90px] sm:max-w-[170px]">{currentUniversity.name}</span>
                </p>
              </div>
            </div>

            {/* Accredited Campus Badge (Fixed to verified student institution) */}
            <div 
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-black/30 border border-white/20 shrink-0 shadow-sm"
              title={`Accredited Network: ${currentUniversity.name}`}
            >
              <span 
                className="w-2 h-2 rounded-full ring-2 ring-white/40"
                style={{ backgroundColor: currentUniversity.accentColor }}
              />
              <span className="font-mono tracking-wider">{currentUniversity.shortName}</span>
            </div>
          </div>

          {/* Right Header Actions: SOS Walk Buddy, Inbox, Notifications, Student Card */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* 🚨 SOS Walk Buddy Button */}
            {onOpenWalkBuddy && (
              <button
                type="button"
                id="header-sos-walk-btn"
                onClick={onOpenWalkBuddy}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-500/60 text-rose-200 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer shrink-0 animate-pulse"
                title="Emergency Walk Buddy - Live Security Alert & Night Escort"
              >
                <Shield className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20 shrink-0" />
                <span className="hidden md:inline font-mono text-[11px]">SOS Walk</span>
              </button>
            )}

            {/* 💬 Inbox / Direct Messages Trigger */}
            {onOpenDirectMessages && (
              <button
                type="button"
                id="header-inbox-btn"
                onClick={onOpenDirectMessages}
                className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 text-white flex items-center justify-center transition-all relative cursor-pointer shrink-0"
                title="Direct Messages / Inbox"
              >
                <MessageSquare className="w-4 h-4" />
                {unreadDirectMessages > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-black rounded-full text-black flex items-center justify-center shadow-md animate-bounce"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    {unreadDirectMessages}
                  </span>
                )}
              </button>
            )}

            {/* Notification Bell */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 rounded-full bg-black/25 hover:bg-black/40 border border-white/20 text-white flex items-center justify-center transition-colors relative cursor-pointer"
                title="Campus Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[9px] font-bold rounded-full text-black flex items-center justify-center shadow"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl z-50 overflow-hidden text-left">
                    <div className="p-3 border-b border-neutral-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5" /> Campus Alerts ({currentUniversity.shortName})
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono">Isolated</span>
                    </div>
                    <div className="divide-y divide-neutral-800 text-xs">
                      <div className="p-3 hover:bg-neutral-800/50">
                        <div className="flex items-center gap-1.5 text-white font-semibold">
                          <Flame className="w-3.5 h-3.5 text-amber-400" /> New Campus Notice
                        </div>
                        <p className="text-neutral-400 text-[11px] mt-0.5">
                          SRC uploaded an announcement regarding student shuttle schedules.
                        </p>
                      </div>
                      <div className="p-3 hover:bg-neutral-800/50">
                        <div className="text-white font-semibold">New Marketplace Item</div>
                        <p className="text-neutral-400 text-[11px] mt-0.5">
                          A student posted an engineering calculator at your campus!
                        </p>
                      </div>
                      <div className="p-3 hover:bg-neutral-800/50">
                        <div className="text-white font-semibold">Study Buddy Request</div>
                        <p className="text-neutral-400 text-[11px] mt-0.5">
                          Someone taking your modules wants to connect for test prep.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Student Avatar / View Student Card Trigger (Houses Edit Profile) */}
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 transition-all cursor-pointer shrink-0"
                title="View Student Card & Edit Profile"
              >
                <img
                  src={session.avatarUrl}
                  alt={session.fullName}
                  className="w-6 h-6 rounded-full object-cover border border-white/40"
                />
                <span className="text-xs font-medium text-white max-w-[70px] truncate hidden md:inline">
                  {session.fullName.split(' ')[0]}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Accent Strip at bottom of header */}
        <div 
          className="h-1 w-full transition-colors duration-500"
          style={{ backgroundColor: currentUniversity.accentColor }}
        />
      </header>

      {/* Student Profile & Digital Student Card Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* University Card Banner */}
            <div 
              className="p-5 text-white relative overflow-hidden shrink-0"
              style={{ backgroundColor: currentUniversity.primaryColor }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80">
                    Official Student Pass
                  </span>
                  <h3 className="text-lg font-bold font-display">{currentUniversity.name}</h3>
                  <p className="text-xs opacity-90">{currentUniversity.town}</p>
                </div>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-6 h-6 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div 
                className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold text-black"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                <Shield className="w-3 h-3" />
                <span>Verified South African Student Identity</span>
              </div>
            </div>

            {/* Student Details Card Body */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              <div className="flex items-center gap-3">
                <img
                  src={session.avatarUrl}
                  alt={session.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-neutral-700 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-white">{session.fullName}</h4>
                  <p className="text-xs text-neutral-400">{session.degree} • Year {session.yearOfStudy}</p>
                  <p className="text-[11px] font-mono text-neutral-500">{session.faculty}</p>
                </div>
              </div>

              {/* Residence & Email Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 text-[10px] uppercase font-mono block">Residence / Res</span>
                  <span className="text-white font-medium truncate block">{session.resHall || 'Off-Campus Private'}</span>
                </div>
                <div className="bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 text-[10px] uppercase font-mono block">Student Number</span>
                  <span className="text-white font-mono font-bold">{session.studentNumber}</span>
                </div>
              </div>

              {/* Student Bio snippet */}
              {session.bio && (
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs">
                  <span className="text-neutral-500 text-[10px] uppercase font-mono block mb-1">Student Bio</span>
                  <p className="text-neutral-300 italic text-[11px] leading-relaxed">
                    "{session.bio}"
                  </p>
                </div>
              )}

              {/* Enrolled Modules summary */}
              {session.enrolledModules && session.enrolledModules.length > 0 && (
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-neutral-500 text-[10px] uppercase font-mono">
                      Chosen Modules ({session.enrolledModules.length})
                    </span>
                    <BookOpen className="w-3 h-3 text-neutral-400" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {session.enrolledModules.map((code) => (
                      <span 
                        key={code} 
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-800 text-white border border-neutral-700"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Edit Profile Features on View Student Card */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" style={{ color: currentUniversity.accentColor }} />
                    <span>Profile & Student Card Settings</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Verified</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Update your campus profile picture, student bio, residence accommodation, and enrolled course modules to enhance Study Buddy matches.
                </p>
                <button
                  id="open-profile-edit-btn"
                  type="button"
                  onClick={() => {
                    setShowProfileModal(false);
                    onOpenProfileEdit?.();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile, Bio, Picture & Modules</span>
                </button>
              </div>

              {/* Extra Shortcuts: Mobile App, AI Support */}
              <div className="grid grid-cols-2 gap-2">
                {onOpenAppDownload && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileModal(false);
                      onOpenAppDownload();
                    }}
                    className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Mobile App</span>
                  </button>
                )}
                {onOpenHelpSupport && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileModal(false);
                      onOpenHelpSupport();
                    }}
                    className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LifeBuoy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Help & Support</span>
                  </button>
                )}
              </div>

              {/* Simulated Barcode */}
              <div className="p-2.5 bg-white rounded-xl flex flex-col items-center justify-center">
                <div className="h-8 w-full flex items-center justify-between px-2">
                  {Array.from({ length: 34 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full bg-black ${i % 3 === 0 ? 'w-1' : i % 2 === 0 ? 'w-0.5' : 'w-1.5'}`}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-black font-semibold mt-0.5">
                  *{session.studentNumber}*
                </span>
              </div>

              {/* Logout button */}
              <button
                id="logout-button"
                type="button"
                onClick={() => {
                  setShowProfileModal(false);
                  onLogout();
                }}
                className="w-full py-2 px-4 rounded-xl border border-red-500/40 bg-red-950/20 hover:bg-red-900/30 text-red-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
