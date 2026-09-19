import React, { useState } from 'react';
import { 
  University, 
  AppTabId, 
  AppFontFamily, 
  AppFontSize, 
  AppFontStyle, 
  AppBackgroundTheme 
} from '../types';
import { 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  Users, 
  GraduationCap, 
  Building2, 
  Heart, 
  Wrench, 
  HelpCircle,
  X, 
  Plus, 
  Minus, 
  Sliders, 
  Palette, 
  Check, 
  Sparkles,
  ArrowRight,
  Share2,
  UserPlus,
  QrCode,
  Copy
} from 'lucide-react';

interface ManageTabsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  activeTabs: AppTabId[]; // 4 active tabs (5th is always More/Manage)
  onChangeActiveTabs: (tabs: AppTabId[]) => void;
  onSelectTab: (tabId: AppTabId) => void;
  // Typography Personalization
  fontFamily: AppFontFamily;
  onChangeFontFamily: (font: AppFontFamily) => void;
  fontSize: AppFontSize;
  onChangeFontSize: (size: AppFontSize) => void;
  fontStyle: AppFontStyle;
  onChangeFontStyle: (style: AppFontStyle) => void;
  // Background Theme
  backgroundTheme: AppBackgroundTheme;
  onChangeBackgroundTheme: (theme: AppBackgroundTheme) => void;
}

export const ALL_TABS_CONFIG: Array<{
  id: AppTabId;
  label: string;
  shortLabel: string;
  description: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}> = [
  { id: 'marketplace', label: 'Marketplace', shortLabel: 'Market', description: 'Buy, sell & inspect student gear', icon: ShoppingBag },
  { id: 'events', label: 'Campus Events', shortLabel: 'Events', description: 'Verified campus socials & parties', icon: Calendar },
  { id: 'chats', label: 'Group Chats', shortLabel: 'Chats', description: 'Res, faculty & campus channels', icon: MessageSquare },
  { id: 'study-buddy', label: 'Study Buddy', shortLabel: 'Buddy', description: 'Find course peers & study groups', icon: Users },
  { id: 'academic', label: 'Academic Performance', shortLabel: 'Grades', description: 'Track GPA, marks & assignments', icon: GraduationCap },
  { id: 'campus-life', label: 'Campus Life & Extra', shortLabel: 'Life', description: 'Notices, spotted & varsity clubs', icon: Building2 },
  { id: 'single-mingle', label: 'Single & Mingle', shortLabel: 'Mingle', description: 'Verified campus student dating', icon: Heart },
  { id: 'smart-tools', label: 'Smart Tools', shortLabel: 'Tools', description: 'AI research, study & GPA calculators', icon: Wrench },
  { id: 'help-support', label: 'Help & Support', shortLabel: 'Help', description: 'AI campus assistant & POPIA support', icon: HelpCircle },
];

export const ManageTabsModal: React.FC<ManageTabsModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  activeTabs,
  onChangeActiveTabs,
  onSelectTab,
  fontFamily,
  onChangeFontFamily,
  fontSize,
  onChangeFontSize,
  fontStyle,
  onChangeFontStyle,
  backgroundTheme,
  onChangeBackgroundTheme,
}) => {
  const [activeSubSection, setActiveSubSection] = useState<'tabs' | 'theme' | 'share'>('tabs');
  const [inviteCopied, setInviteCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  if (!isOpen) return null;

  const accentColor = currentUniversity.accentColor;

  const handleCopyInvite = () => {
    const inviteText = `Hey! Join me on Varsity Life HUB (${currentUniversity.shortName}) to access campus marketplace, study groups, notices and student life: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(inviteText);
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2500);
    }
  };

  const handleShareApp = async () => {
    const shareData = {
      title: `Varsity Life HUB - ${currentUniversity.shortName}`,
      text: `Connect with fellow students at ${currentUniversity.name} for marketplace, study groups, notes and campus safety.`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to copy
        handleCopyShareLink();
      }
    } else {
      handleCopyShareLink();
    }
  };

  const handleCopyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  // Active tabs (max 4 chosen by user, 5th slot is permanent Mandatory Help, Support & POPIA)
  const activeTabConfigs = ALL_TABS_CONFIG.filter((t) => activeTabs.includes(t.id) && t.id !== 'help-support');
  const hiddenTabConfigs = ALL_TABS_CONFIG.filter((t) => !activeTabs.includes(t.id) && t.id !== 'help-support');

  const handleRemoveTab = (id: AppTabId) => {
    if (activeTabs.length <= 1) return; // Keep at least 1 tab
    onChangeActiveTabs(activeTabs.filter((t) => t !== id));
  };

  const handleAddTab = (id: AppTabId) => {
    if (activeTabs.length >= 4) {
      // Replace the last tab to maintain max 4
      const next = [...activeTabs.slice(0, 3), id];
      onChangeActiveTabs(next);
    } else {
      onChangeActiveTabs([...activeTabs, id]);
    }
  };

  const handleDirectLaunchTab = (id: AppTabId) => {
    onSelectTab(id);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 text-left"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div 
          className="p-4 sm:p-5 border-b border-neutral-800 text-white flex items-center justify-between"
          style={{ backgroundColor: `${currentUniversity.primaryColor}ee` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/20 flex items-center justify-center">
              <Sliders className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  {currentUniversity.shortName} Preferences
                </span>
                <span 
                  className="text-[9px] font-bold px-1.5 py-0.2 rounded text-black uppercase"
                  style={{ backgroundColor: accentColor }}
                >
                  Personalize
                </span>
              </div>
              <h3 className="text-base font-bold font-display text-white mt-0.5">
                Manage Tabs, Preferences & Share
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

        {/* Navigation Sub-Tabs (Typography removed as requested) */}
        <div className="grid grid-cols-3 border-b border-neutral-800 bg-neutral-950 p-1 gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveSubSection('tabs')}
            className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubSection === 'tabs'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" style={activeSubSection === 'tabs' ? { color: accentColor } : {}} />
            <span>Active Tabs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubSection('theme')}
            className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubSection === 'theme'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Theme</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubSection('share')}
            className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeSubSection === 'share'
                ? 'bg-neutral-800 text-white shadow'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Invite, Share & QR</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs text-neutral-300">
          {/* SECTION 1: MANAGE TABS */}
          {activeSubSection === 'tabs' && (
            <div className="space-y-5">
              {/* Mandatory 5th Slot Notice */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-emerald-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">Help, Support & POPIA Privacy Desk</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">
                        Mandatory Slot 5
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Permanently pinned as your 5th tab for direct access to AI student assistance, compliance and data safety.
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Tabs Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Active Primary Tabs (Choose up to 4)
                    </h4>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {activeTabConfigs.length} of 4 slots used
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mb-2.5">
                  These 4 tabs appear in slots 1–4 on your bottom navigation bar alongside the mandatory Help & POPIA tab.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTabConfigs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <div
                        key={tab.id}
                        className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-2"
                      >
                        <div 
                          className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                          onClick={() => handleDirectLaunchTab(tab.id)}
                          title="Click to jump to tab"
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${accentColor}22` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: accentColor }} />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-white truncate">{tab.label}</h5>
                            <p className="text-[10px] text-neutral-400 truncate">{tab.description}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveTab(tab.id)}
                          className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors shrink-0"
                        >
                          <Minus className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hidden Remaining Tabs Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-600" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Available Feature Tabs ({hiddenTabConfigs.length})
                    </h4>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    Tap Add (+) to swap
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {hiddenTabConfigs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <div
                        key={tab.id}
                        className="p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-700 flex items-center justify-between gap-2"
                      >
                        <div 
                          className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                          onClick={() => handleDirectLaunchTab(tab.id)}
                          title="Click to jump to tab"
                        >
                          <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-neutral-400" />
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-xs text-neutral-200 truncate">{tab.label}</h5>
                            <p className="text-[10px] text-neutral-500 truncate">{tab.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleAddTab(tab.id)}
                            className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: BACKGROUND THEME SELECTOR */}
          {activeSubSection === 'theme' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Favorite Background Theme
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Customize the canvas atmosphere for Direct Messages, Study Buddy, Grades & Group Chats. Marketplace, Events & Campus Life feeds retain clean high-contrast white card backings for readability.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'dark' as AppBackgroundTheme, name: 'Obsidian Night (Default)', desc: 'Ultra-dark OLED blacks', previewBg: 'bg-neutral-950', border: 'border-neutral-800' },
                  { id: 'accent' as AppBackgroundTheme, name: `${currentUniversity.shortName} Varsity Tint`, desc: 'Dynamic campus color glow', previewBg: 'bg-neutral-900', border: 'border-white/20' },
                  { id: 'midnight' as AppBackgroundTheme, name: 'Midnight Slate', desc: 'Deep navy blue tones', previewBg: 'bg-slate-950', border: 'border-slate-800' },
                  { id: 'minimal' as AppBackgroundTheme, name: 'Minimal Ivory & Light', desc: 'Crisp high-contrast theme', previewBg: 'bg-neutral-100', border: 'border-neutral-300', light: true },
                  { id: 'forest' as AppBackgroundTheme, name: 'Forest Emerald', desc: 'Subtle calm evergreen dark', previewBg: 'bg-emerald-950', border: 'border-emerald-900' },
                ].map((th) => {
                  const isSelected = backgroundTheme === th.id;
                  return (
                    <div
                      key={th.id}
                      onClick={() => onChangeBackgroundTheme(th.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-neutral-800 text-white shadow-lg'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                      style={isSelected ? { borderColor: accentColor } : {}}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg ${th.previewBg} ${th.border} border shrink-0 flex items-center justify-center text-xs`}>
                          {th.light ? '☀️' : '🌙'}
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-white truncate">{th.name}</h5>
                          <p className="text-[10px] text-neutral-400 truncate">{th.desc}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center text-black shrink-0"
                          style={{ backgroundColor: accentColor }}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4: INVITE, SHARE & CAMPUS QR CODE */}
          {activeSubSection === 'share' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Invite Classmates, Share & Campus QR
                </h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Bring your study buddies, res hall friends, and faculty classmates into {currentUniversity.shortName}&apos;s verified digital ecosystem.
                </p>
              </div>

              {/* Action Buttons: Invite & Share */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  id="more-invite-btn"
                  onClick={handleCopyInvite}
                  className="p-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 text-left transition-all active:scale-98 cursor-pointer flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">Invite Classmates</span>
                      {inviteCopied && (
                        <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Copy WhatsApp & SMS invite message with campus link
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  id="more-share-btn"
                  onClick={handleShareApp}
                  className="p-3 rounded-xl bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 text-left transition-all active:scale-98 cursor-pointer flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">Share Hub Link</span>
                      {shareCopied && (
                        <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Copied!
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-0.5">
                      Share via device sheet or copy web application URL
                    </p>
                  </div>
                </button>
              </div>

              {/* Campus QR Code Visualizer */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
                {/* Simulated High-Res QR Visual */}
                <div className="p-3 bg-white rounded-xl shadow-lg shrink-0 flex flex-col items-center">
                  <div className="w-28 h-28 relative flex items-center justify-center bg-white">
                    {/* SVG Vector Stylized QR Matrix */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      {/* Corner Position Detection Patterns */}
                      <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                      <rect x="11" y="11" width="16" height="16" fill="currentColor" rx="1" />

                      <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                      <rect x="73" y="11" width="16" height="16" fill="currentColor" rx="1" />

                      <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="4" rx="2" />
                      <rect x="11" y="73" width="16" height="16" fill="currentColor" rx="1" />

                      {/* Data dots matrix */}
                      <circle cx="42" cy="12" r="3" fill="currentColor" />
                      <circle cx="54" cy="12" r="3" fill="currentColor" />
                      <circle cx="48" cy="24" r="3" fill="currentColor" />
                      <circle cx="40" cy="36" r="3" fill="currentColor" />
                      <circle cx="56" cy="36" r="3" fill="currentColor" />
                      
                      <circle cx="16" cy="46" r="3" fill="currentColor" />
                      <circle cx="28" cy="46" r="3" fill="currentColor" />
                      <circle cx="72" cy="46" r="3" fill="currentColor" />
                      <circle cx="84" cy="46" r="3" fill="currentColor" />

                      <circle cx="42" cy="56" r="3" fill="currentColor" />
                      <circle cx="54" cy="56" r="3" fill="currentColor" />
                      <circle cx="48" cy="68" r="3" fill="currentColor" />
                      <circle cx="40" cy="80" r="3" fill="currentColor" />
                      <circle cx="56" cy="80" r="3" fill="currentColor" />

                      <circle cx="72" cy="68" r="3" fill="currentColor" />
                      <circle cx="84" cy="68" r="3" fill="currentColor" />
                      <circle cx="76" cy="82" r="3" fill="currentColor" />

                      {/* Center Campus Badge */}
                      <rect x="38" y="38" width="24" height="24" rx="4" fill="#0F172A" />
                      <text x="50" y="53" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                        {currentUniversity.shortName.slice(0, 3)}
                      </text>
                    </svg>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-neutral-800 mt-1 uppercase">
                    Scan to Open HUB
                  </span>
                </div>

                {/* QR Instructions & Actions */}
                <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <QrCode className="w-4 h-4" style={{ color: accentColor }} />
                    <span className="text-xs font-bold text-white">
                      Instant Campus QR Pass
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Have friends scan this QR with their smartphone camera on campus or in residence to immediately open Varsity Life HUB on {currentUniversity.shortName}.
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyShareLink}
                      className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{shareCopied ? 'Link Copied!' : 'Copy Direct Link'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleShareApp}
                      className="px-3 py-1.5 rounded-lg text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:px-6 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs">
          <span className="text-[11px] text-neutral-400 font-mono">
            Auto-saved to your campus device
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow"
            style={{ backgroundColor: accentColor }}
          >
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
