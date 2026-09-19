import React from 'react';
import { University, AppTabId } from '../types';
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
  Sliders,
  Inbox
} from 'lucide-react';

export type ActiveTab = AppTabId;

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentUniversity: University;
  activeTabs: ActiveTab[]; // 4 user-chosen slots
  onOpenManageTabs: () => void;
  unreadChats?: number;
  unreadDirectMessages?: number;
  onOpenInbox?: () => void;
}

const ALL_TAB_DEFS: Record<ActiveTab, {
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}> = {
  'marketplace': { label: 'Marketplace', shortLabel: 'Market', icon: ShoppingBag },
  'events': { label: 'Events', shortLabel: 'Events', icon: Calendar },
  'chats': { label: 'Group Chats', shortLabel: 'Chats', icon: MessageSquare },
  'study-buddy': { label: 'Study Buddy', shortLabel: 'Buddy', icon: Users },
  'academic': { label: 'Academics & GPA', shortLabel: 'Grades', icon: GraduationCap },
  'campus-life': { label: 'Campus Life', shortLabel: 'Life', icon: Building2 },
  'single-mingle': { label: 'Single & Mingle', shortLabel: 'Mingle', icon: Heart },
  'smart-tools': { label: 'Smart Tools', shortLabel: 'Tools', icon: Wrench },
  'help-support': { label: 'Help, Support & POPIA', shortLabel: 'Help & POPIA', icon: HelpCircle },
};

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  currentUniversity,
  activeTabs = ['marketplace', 'events', 'chats', 'study-buddy'],
  onOpenManageTabs,
  unreadChats = 2,
  unreadDirectMessages = 1,
  onOpenInbox,
}) => {
  // Slots 1 to 4: User's 4 active tabs (excluding help-support which is permanently in slot 5)
  const primaryFourTabs = activeTabs.filter((t) => t !== 'help-support').slice(0, 4);

  const isHelpActive = activeTab === 'help-support';
  const isMoreActive = !(primaryFourTabs as ActiveTab[]).includes(activeTab) && activeTab !== 'help-support';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-3xl mx-auto px-1.5 sm:px-3 py-1.5 grid grid-cols-6 gap-0.5 sm:gap-1 items-center justify-between">
        {/* SLOTS 1 TO 4: USER'S CHOSEN ACTIVE TABS */}
        {primaryFourTabs.map((tabId) => {
          const tabDef = ALL_TAB_DEFS[tabId] || ALL_TAB_DEFS['marketplace'];
          const Icon = tabDef.icon;
          const isActive = activeTab === tabId;
          const badge = tabId === 'chats' ? unreadChats : undefined;

          return (
            <button
              key={tabId}
              id={`nav-${tabId}`}
              type="button"
              onClick={() => onSelectTab(tabId)}
              className={`relative flex flex-col items-center justify-center py-1 px-0.5 sm:px-1 rounded-xl transition-all select-none cursor-pointer ${
                isActive
                  ? 'text-white font-bold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {/* Active Pill Glow */}
              {isActive && (
                <div 
                  className="absolute inset-0 rounded-xl opacity-20 transition-opacity"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                />
              )}

              {/* Icon Container with Badge */}
              <div className="relative mb-0.5">
                <Icon 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'hover:scale-105'
                  }`}
                  style={isActive ? { color: currentUniversity.accentColor } : {}}
                />
                {badge && badge > 0 && !isActive && (
                  <span 
                    className="absolute -top-1 -right-2 w-3.5 h-3.5 text-[9px] font-bold rounded-full text-black flex items-center justify-center shadow"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    {badge}
                  </span>
                )}
              </div>

              {/* Text Label */}
              <span className={`text-[9px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap ${
                isActive ? 'text-white font-bold' : 'text-neutral-400'
              }`}>
                <span className="hidden sm:inline">{tabDef.label}</span>
                <span className="sm:hidden">{tabDef.shortLabel}</span>
              </span>

              {/* Bottom Dot Indicator */}
              {isActive && (
                <div 
                  className="w-1 h-1 rounded-full mt-0.5"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                />
              )}
            </button>
          );
        })}

        {/* 5TH SLOT: MANDATORY 'HELP, SUPPORT & POPIA PRIVACY' TAB */}
        <button
          id="nav-help-support"
          type="button"
          onClick={() => onSelectTab('help-support')}
          className={`relative flex flex-col items-center justify-center py-1 px-0.5 sm:px-1 rounded-xl transition-all select-none cursor-pointer ${
            isHelpActive
              ? 'text-white font-bold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Mandatory: Help, Support & POPIA Privacy Desk"
        >
          {isHelpActive && (
            <div 
              className="absolute inset-0 rounded-xl opacity-20 transition-opacity"
              style={{ backgroundColor: currentUniversity.accentColor }}
            />
          )}

          <div className="relative mb-0.5">
            <HelpCircle 
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                isHelpActive ? 'scale-110' : 'hover:scale-105'
              }`}
              style={isHelpActive ? { color: currentUniversity.accentColor } : {}}
            />
            {/* Mandatory indicator icon / dot */}
            <span 
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full ring-2 ring-neutral-950"
              style={{ backgroundColor: '#10B981' }}
              title="Official Mandatory Student Protection & Support"
            />
          </div>

          <span className={`text-[9px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap ${
            isHelpActive ? 'text-white font-bold' : 'text-neutral-400'
          }`}>
            <span className="hidden sm:inline">Help & POPIA</span>
            <span className="sm:hidden">Help</span>
          </span>

          {isHelpActive && (
            <div 
              className="w-1 h-1 rounded-full mt-0.5"
              style={{ backgroundColor: currentUniversity.accentColor }}
            />
          )}
        </button>

        {/* 6TH SLOT: 'MORE' OPTION (MANAGE TABS, THEMES, ALL CAMPUS MODULES) */}
        <button
          id="nav-more-options"
          type="button"
          onClick={onOpenManageTabs}
          className={`relative flex flex-col items-center justify-center py-1 px-0.5 sm:px-1 rounded-xl transition-all select-none cursor-pointer ${
            isMoreActive
              ? 'text-white font-bold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="More Campus Modules, Tabs, Themes & Personalization"
        >
          {isMoreActive && (
            <div 
              className="absolute inset-0 rounded-xl opacity-20 transition-opacity"
              style={{ backgroundColor: currentUniversity.accentColor }}
            />
          )}

          <div className="relative mb-0.5">
            <Sliders 
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                isMoreActive ? 'scale-110' : 'hover:scale-105'
              }`}
              style={isMoreActive ? { color: currentUniversity.accentColor } : {}}
            />
          </div>

          <span className={`text-[9px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap ${
            isMoreActive ? 'text-white font-bold' : 'text-neutral-400'
          }`}>
            More
          </span>

          {isMoreActive && (
            <div 
              className="w-1 h-1 rounded-full mt-0.5"
              style={{ backgroundColor: currentUniversity.accentColor }}
            />
          )}
        </button>
      </div>
    </nav>
  );
};
