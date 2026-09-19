import React, { useState, useEffect } from 'react';
import { 
  UniversityId, 
  UserSession, 
  MarketplaceItem, 
  MarketplaceComment,
  CampusEvent, 
  ChatMessage, 
  CourseModule, 
  CampusNotice, 
  SingleProfile,
  StudentGig,
  CampusSpottedPost,
  DirectConversation,
  DirectMessage,
  AppTabId,
  AppFontFamily,
  AppFontSize,
  AppFontStyle,
  AppBackgroundTheme,
} from './types';
import { UNIVERSITIES } from './data/universities';
import { CampusIsolationService } from './services/dataIsolation';
import { 
  INITIAL_MARKETPLACE, 
  INITIAL_EVENTS, 
  INITIAL_CHATS, 
  INITIAL_STUDY_BUDDIES, 
  INITIAL_COURSES, 
  INITIAL_NOTICES, 
  INITIAL_SINGLES 
} from './data/mockData';
import { 
  INITIAL_STUDENT_GIGS, 
  INITIAL_SPOTTED_POSTS, 
  INITIAL_CONVERSATIONS 
} from './data/extraMockData';
import { PreLoginAuth } from './components/PreLoginAuth';
import { TopHeader } from './components/TopHeader';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { MarketplaceView } from './components/MarketplaceView';
import { EventsView } from './components/EventsView';
import { GroupChatsView } from './components/GroupChatsView';
import { StudyBuddyView } from './components/StudyBuddyView';
import { AcademicPerformanceView } from './components/AcademicPerformanceView';
import { CampusLifeView } from './components/CampusLifeView';
import { SingleAndMingleView } from './components/SingleAndMingleView';
import { SmartToolsView } from './components/SmartToolsView';
import { MobileFrame } from './components/MobileFrame';
import { ProfileEditModal } from './components/ProfileEditModal';
import { DirectMessagesModal } from './components/DirectMessagesModal';
import { EmergencyWalkBuddyModal } from './components/EmergencyWalkBuddyModal';
import { SafetyAccordModal } from './components/SafetyAccordModal';
import { ContentReportModal } from './components/ContentReportModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { AppDownloadModal } from './components/AppDownloadModal';
import { IOSInstallBanner } from './components/IOSInstallBanner';
import { ManageTabsModal } from './components/ManageTabsModal';
import { LifeBuoy, ShieldCheck } from 'lucide-react';

export default function App() {
  // Session State - starts in Pre-login Window 1
  const [session, setSession] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('varsity_hub_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Active Tab in Window 2
  const [activeTab, setActiveTab] = useState<ActiveTab>('marketplace');

  // Dynamic 4-Nav Tabs Chosen By User (5th slot reserved for More / Manage)
  const [activeNavTabs, setActiveNavTabs] = useState<AppTabId[]>(() => {
    const saved = localStorage.getItem('varsity_hub_active_tabs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 4) {
          return parsed.slice(0, 4) as AppTabId[];
        }
      } catch (e) {}
    }
    return ['marketplace', 'events', 'chats', 'study-buddy'];
  });

  // Personalization States: Font Family, Font Size, Font Style & Background Theme
  const [fontFamily, setFontFamily] = useState<AppFontFamily>(() => {
    return (localStorage.getItem('varsity_hub_font_family') as AppFontFamily) || 'modern';
  });
  const [fontSize, setFontSize] = useState<AppFontSize>(() => {
    return (localStorage.getItem('varsity_hub_font_size') as AppFontSize) || 'medium';
  });
  const [fontStyle, setFontStyle] = useState<AppFontStyle>(() => {
    return (localStorage.getItem('varsity_hub_font_style') as AppFontStyle) || 'regular';
  });
  const [backgroundTheme, setBackgroundTheme] = useState<AppBackgroundTheme>(() => {
    return (localStorage.getItem('varsity_hub_bg_theme') as AppBackgroundTheme) || 'dark';
  });

  // Manage Tabs & Personalization Modal
  const [isManageTabsOpen, setIsManageTabsOpen] = useState(false);

  // Sync personalization to localStorage
  useEffect(() => {
    localStorage.setItem('varsity_hub_font_family', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_font_style', fontStyle);
  }, [fontStyle]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_bg_theme', backgroundTheme);
  }, [backgroundTheme]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_active_tabs', JSON.stringify(activeNavTabs));
  }, [activeNavTabs]);

  // Profile & Course Modules Edit Modal State
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  // Direct Messages & Inbox Modal State
  const [isDirectMessagesOpen, setIsDirectMessagesOpen] = useState(false);
  const [activeDMRecipient, setActiveDMRecipient] = useState<{
    name: string;
    avatar: string;
    res?: string;
    degree?: string;
    initialMessage?: string;
  } | null>(null);

  // Safety Accord Modal State (Mandatory on first visit)
  const [isSafetyAccordOpen, setIsSafetyAccordOpen] = useState(() => {
    const accepted = localStorage.getItem('varsity_safety_accord_accepted');
    return !accepted;
  });

  // Emergency Walk Buddy Modal State
  const [isWalkBuddyOpen, setIsWalkBuddyOpen] = useState(false);

  // Content Reporting Modal State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportItemTarget, setReportItemTarget] = useState<{ title: string; author?: string }>({
    title: '',
    author: '',
  });

  // AI Help & Human Support Escalation Modal State
  const [isHelpSupportOpen, setIsHelpSupportOpen] = useState(false);

  // Mobile App Download & QR Screen Modal State
  const [isAppDownloadOpen, setIsAppDownloadOpen] = useState(false);
  // iOS Smart PWA Install Banner trigger/test state
  const [forceShowIOSBanner, setForceShowIOSBanner] = useState(false);

  // Campus Isolated Data Stores
  const [marketplaceData, setMarketplaceData] = useState<Record<UniversityId, MarketplaceItem[]>>(() => {
    const saved = localStorage.getItem('varsity_hub_marketplace');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return { ...INITIAL_MARKETPLACE, ...parsed };
      } catch (e) {}
    }
    return INITIAL_MARKETPLACE;
  });

  const [gigsData, setGigsData] = useState<Record<UniversityId, StudentGig[]>>(() => {
    const saved = localStorage.getItem('varsity_hub_gigs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_STUDENT_GIGS;
  });

  const [spottedData, setSpottedData] = useState<Record<UniversityId, CampusSpottedPost[]>>(() => {
    const saved = localStorage.getItem('varsity_hub_spotted');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_SPOTTED_POSTS;
  });

  const [eventsData, setEventsData] = useState<Record<UniversityId, CampusEvent[]>>(() => {
    const saved = localStorage.getItem('varsity_hub_events');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return { ...INITIAL_EVENTS, ...parsed };
      } catch (e) {}
    }
    return INITIAL_EVENTS;
  });

  const [chatsData, setChatsData] = useState<Record<UniversityId, Record<string, ChatMessage[]>>>(() => {
    const saved = localStorage.getItem('varsity_hub_chats');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return { ...INITIAL_CHATS, ...parsed };
      } catch (e) {}
    }
    return INITIAL_CHATS;
  });

  const [conversations, setConversations] = useState<DirectConversation[]>(() => {
    const saved = localStorage.getItem('varsity_hub_direct_conversations');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_CONVERSATIONS;
  });

  const [studyBuddiesData] = useState<Record<UniversityId, any[]>>(INITIAL_STUDY_BUDDIES);
  const [coursesData, setCoursesData] = useState<CourseModule[]>(() => {
    const saved = localStorage.getItem('varsity_hub_courses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_COURSES;
  });
  const [noticesData, setNoticesData] = useState<Record<UniversityId, CampusNotice[]>>(INITIAL_NOTICES);
  const [singlesData] = useState<Record<UniversityId, SingleProfile[]>>(INITIAL_SINGLES);

  // Sync state to localStorage
  useEffect(() => {
    if (session) {
      localStorage.setItem('varsity_hub_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('varsity_hub_session');
    }
  }, [session]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_marketplace', JSON.stringify(marketplaceData));
  }, [marketplaceData]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_gigs', JSON.stringify(gigsData));
  }, [gigsData]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_spotted', JSON.stringify(spottedData));
  }, [spottedData]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_events', JSON.stringify(eventsData));
  }, [eventsData]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_chats', JSON.stringify(chatsData));
  }, [chatsData]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_direct_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('varsity_hub_courses', JSON.stringify(coursesData));
  }, [coursesData]);

  // Current active university (defaults to NWU or session uni)
  const currentUniId: UniversityId = session ? session.universityId : 'nwu';
  const currentUniversity = UNIVERSITIES[currentUniId] || UNIVERSITIES.nwu;

  // Handlers
  const handleLoginSuccess = (newSession: UserSession, customTabs?: AppTabId[]) => {
    setSession(newSession);
    if (customTabs && customTabs.length >= 4) {
      setActiveNavTabs(customTabs.slice(0, 4));
      setActiveTab(customTabs[0] as ActiveTab);
    } else {
      setActiveTab('marketplace');
    }
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    setSession(null);
    setIsHelpSupportOpen(false);
    setIsDirectMessagesOpen(false);
    setIsProfileEditOpen(false);
    setIsManageTabsOpen(false);
    setActiveTab('marketplace');
  };

  const handleLogout = () => {
    setSession(null);
  };

  const handleSwitchUniversity = (newUniId: UniversityId) => {
    if (session) {
      setSession({
        ...session,
        universityId: newUniId,
      });
    }
  };

  const handleSaveProfile = (updatedSession: UserSession, updatedCourses: CourseModule[]) => {
    setSession(updatedSession);
    setCoursesData(updatedCourses);
  };

  // Safety Accord Acceptance
  const handleAcceptSafetyAccord = () => {
    localStorage.setItem('varsity_safety_accord_accepted', 'true');
    setIsSafetyAccordOpen(false);
  };

  // Open Direct Message from any listing or profile
  const handleOpenDirectMessage = (recipient: {
    name: string;
    avatar: string;
    res?: string;
    degree?: string;
    initialMessage?: string;
  }) => {
    setActiveDMRecipient(recipient);
    setIsDirectMessagesOpen(true);
  };

  // Open Content Report Modal from any item/post
  const handleOpenReport = (title: string, author?: string) => {
    setReportItemTarget({ title, author });
    setIsReportModalOpen(true);
  };

  // Content Reporting Logic: Remove after 5 reports
  const handleReportSubmit = (targetTitle: string) => {
    let removed = false;
    let totalReports = 1;

    setMarketplaceData((prev) => {
      const currentList = prev[currentUniId] || [];
      const updatedList: MarketplaceItem[] = [];

      for (const item of currentList) {
        if (item.title === targetTitle || item.id === targetTitle) {
          const newReports = (item.reportCount || 0) + 1;
          totalReports = newReports;
          if (newReports >= 5) {
            removed = true;
            // Automatically purged & removed from feeds after 5 community reports!
            continue;
          }
          updatedList.push({
            ...item,
            reportCount: newReports,
          });
        } else {
          updatedList.push(item);
        }
      }

      return {
        ...prev,
        [currentUniId]: updatedList,
      };
    });

    return { removed, totalReports };
  };

  // Marketplace: Add Item with 2-day expiration & tracking
  const handleAddMarketplaceItem = (item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'likes'>) => {
    const lockedItem = CampusIsolationService.lockToCampus(item, currentUniId);
    const now = Date.now();
    const newItem: MarketplaceItem = {
      ...lockedItem,
      id: `m-${currentUniId}-${now}`,
      createdAt: 'Just now',
      createdAtTimestamp: now,
      expiresAt: new Date(now + 2 * 24 * 60 * 60 * 1000).toISOString(),
      reportCount: 0,
      likes: 0,
      isLikedByMe: false,
      comments: [],
    };

    setMarketplaceData((prev) => ({
      ...prev,
      [currentUniId]: [newItem, ...(prev[currentUniId] || [])],
    }));
  };

  // Marketplace: Toggle Like
  const handleToggleLikeMarketplaceItem = (itemId: string) => {
    setMarketplaceData((prev) => {
      const currentList = prev[currentUniId] || [];
      const updated = currentList.map((item) => {
        if (item.id === itemId) {
          const newLiked = !item.isLikedByMe;
          return {
            ...item,
            isLikedByMe: newLiked,
            likes: newLiked ? item.likes + 1 : Math.max(0, item.likes - 1),
          };
        }
        return item;
      });
      return { ...prev, [currentUniId]: updated };
    });
  };

  // Marketplace: Add Comment
  const handleAddMarketplaceComment = (
    itemId: string,
    commentData: {
      text: string;
      authorName: string;
      authorAvatar: string;
      authorStudentId?: string;
      authorRes?: string;
    }
  ) => {
    const newComment: MarketplaceComment = {
      id: `mc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      authorName: commentData.authorName,
      authorAvatar: commentData.authorAvatar,
      authorStudentId: commentData.authorStudentId,
      authorRes: commentData.authorRes,
      text: commentData.text,
      timestamp: 'Just now',
    };

    setMarketplaceData((prev) => {
      const currentList = prev[currentUniId] || [];
      const updated = currentList.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            comments: [...(item.comments || []), newComment],
          };
        }
        return item;
      });
      return { ...prev, [currentUniId]: updated };
    });
  };

  // Marketplace: Add Gig
  const handleAddGig = (gig: Omit<StudentGig, 'id' | 'createdAt' | 'applicantsCount'>) => {
    const lockedGig = CampusIsolationService.lockToCampus(gig, currentUniId);
    const newGig: StudentGig = {
      ...lockedGig,
      id: `gig-${currentUniId}-${Date.now()}`,
      createdAt: 'Just now',
      applicantsCount: 0,
    };

    setGigsData((prev) => ({
      ...prev,
      [currentUniId]: [newGig, ...(prev[currentUniId] || [])],
    }));
  };

  // Events: Add Event
  const handleAddEvent = (evt: Omit<CampusEvent, 'id' | 'rsvpCount' | 'isRsvpd'>) => {
    const lockedEvent = CampusIsolationService.lockToCampus(evt, currentUniId);
    const newEvent: CampusEvent = {
      ...lockedEvent,
      id: `e-${currentUniId}-${Date.now()}`,
      rsvpCount: 1,
      isRsvpd: true,
    };

    setEventsData((prev) => ({
      ...prev,
      [currentUniId]: [newEvent, ...(prev[currentUniId] || [])],
    }));
  };

  // Events: Toggle RSVP
  const handleToggleRsvp = (eventId: string) => {
    setEventsData((prev) => {
      const currentList = prev[currentUniId] || [];
      const updated = currentList.map((e) => {
        if (e.id === eventId) {
          return {
            ...e,
            isRsvpd: !e.isRsvpd,
            rsvpCount: e.isRsvpd ? e.rsvpCount - 1 : e.rsvpCount + 1,
          };
        }
        return e;
      });
      return { ...prev, [currentUniId]: updated };
    });
  };

  // Group Chats: Send Message
  const handleSendMessage = (channelId: string, message: Omit<ChatMessage, 'id' | 'timestamp' | 'isUser'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const lockedMsg = CampusIsolationService.lockToCampus(message, currentUniId);

    const newMsg: ChatMessage = {
      ...lockedMsg,
      id: `chat-${Date.now()}-${Math.random()}`,
      timestamp: timeStr,
      isUser: message.senderName === (session?.fullName || 'You'),
    };

    setChatsData((prev) => {
      const campusChats = prev[currentUniId] || {};
      const channelMsgs = campusChats[channelId] || [];
      return {
        ...prev,
        [currentUniId]: {
          ...campusChats,
          [channelId]: [...channelMsgs, newMsg],
        },
      };
    });
  };

  // Direct Messages: Send Message
  const handleSendDirectMessage = (conversationId: string, message: Omit<DirectMessage, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: DirectMessage = {
      ...message,
      id: `dm-${Date.now()}-${Math.random()}`,
      timestamp: timeStr,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: newMsg.attachment ? `${newMsg.attachment.type.toUpperCase()}: ${newMsg.text}` : newMsg.text,
            lastTimestamp: timeStr,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  // Direct Messages: Create New Conversation
  const handleCreateConversation = (
    recipient: { name: string; avatar: string; res?: string; degree?: string },
    firstMessage: string
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newConvoId = `dm-convo-${Date.now()}`;

    const newConvo: DirectConversation = {
      id: newConvoId,
      universityId: currentUniId,
      participantName: recipient.name,
      participantAvatar: recipient.avatar,
      participantRes: recipient.res,
      participantDegree: recipient.degree,
      lastMessage: firstMessage,
      lastTimestamp: timeStr,
      unreadCount: 0,
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: 'user',
          senderName: session?.fullName || 'You',
          senderAvatar: session?.avatarUrl || '',
          text: firstMessage,
          timestamp: timeStr,
          isUser: true,
        },
      ],
    };

    setConversations((prev) => [newConvo, ...prev]);
  };

  // Campus Life: Add Notice
  const handleAddNotice = (notice: Omit<CampusNotice, 'id' | 'likes'>) => {
    const newNotice: CampusNotice = {
      ...notice,
      id: `notice-${Date.now()}`,
      likes: 1,
    };

    setNoticesData((prev) => ({
      ...prev,
      [currentUniId]: [newNotice, ...(prev[currentUniId] || [])],
    }));
  };

  // Campus Life: Add Anonymous Spotted Post
  const handleAddSpottedPost = (post: Omit<CampusSpottedPost, 'id' | 'likes' | 'commentsCount'>) => {
    const lockedPost = CampusIsolationService.lockToCampus(post, currentUniId);
    const newPost: CampusSpottedPost = {
      ...lockedPost,
      id: `spot-${Date.now()}`,
      likes: 1,
      commentsCount: 0,
    };

    setSpottedData((prev) => ({
      ...prev,
      [currentUniId]: [newPost, ...(prev[currentUniId] || [])],
    }));
  };

  // Academic: Add Course
  const handleAddCourse = (course: CourseModule) => {
    setCoursesData((prev) => [course, ...prev]);
  };

  // Academic: Add Assignment
  const handleAddAssignment = (courseId: string, assignment: any) => {
    setCoursesData((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          return {
            ...c,
            assignments: [...c.assignments, assignment],
          };
        }
        return c;
      })
    );
  };

  // Campus isolated slices of data for the active university
  // Automatically remove marketplace listings after 2 days (48 hours) or with >=5 reports
  const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
  const nowTs = Date.now();
  const currentMarketplaceItems = (marketplaceData[currentUniId] || []).filter((item) => {
    // Purge if 5 or more reports
    if ((item.reportCount || 0) >= 5) return false;
    // Auto-remove if created more than 2 days ago
    if (item.createdAtTimestamp && nowTs - item.createdAtTimestamp > TWO_DAYS_MS) {
      return false;
    }
    return true;
  });
  const currentGigs = gigsData[currentUniId] || [];
  const currentSpotted = spottedData[currentUniId] || [];
  const currentEvents = eventsData[currentUniId] || [];
  const currentChats = chatsData[currentUniId] || {};
  const currentBuddies = studyBuddiesData[currentUniId] || [];
  const currentNotices = noticesData[currentUniId] || [];
  const currentSingles = singlesData[currentUniId] || [];
  const isolatedConversations = CampusIsolationService.filterConversations(conversations, currentUniId);
  const totalUnreadDMs = isolatedConversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <MobileFrame currentUniversity={currentUniversity} isLoggedIn={!!session}>
      {!session ? (
        /* WINDOW 1: PRE-LOGIN AUTHENTICATION (Black & White Minimalist Design) */
        <PreLoginAuth
          onLoginSuccess={handleLoginSuccess}
          defaultUniversity={currentUniId}
        />
      ) : (
        /* WINDOW 2: THE MAIN HUB (University Theme Triggered & Isolated Data) */
        <div 
          className={`min-h-screen flex flex-col selection:bg-white selection:text-black app-font-${fontFamily} app-size-${fontSize} app-style-${fontStyle} ${
            backgroundTheme === 'midnight'
              ? 'bg-slate-950 text-slate-100'
              : backgroundTheme === 'forest'
              ? 'bg-[#031d13] text-emerald-100'
              : backgroundTheme === 'accent'
              ? 'bg-neutral-900 text-neutral-100'
              : 'bg-neutral-950 text-neutral-100'
          }`}
        >
          {/* Top Dynamic University Banner with Multi-Media & Inbox Actions */}
          <TopHeader
            currentUniversity={currentUniversity}
            session={session}
            onSwitchUniversity={handleSwitchUniversity}
            onLogout={handleLogout}
            onOpenProfileEdit={() => setIsProfileEditOpen(true)}
            onOpenDirectMessages={() => setIsDirectMessagesOpen(true)}
            unreadDirectMessages={totalUnreadDMs}
            onOpenWalkBuddy={() => setIsWalkBuddyOpen(true)}
            onOpenHelpSupport={() => setIsHelpSupportOpen(true)}
            onOpenAppDownload={() => setIsAppDownloadOpen(true)}
            onOpenManageTabs={() => setIsManageTabsOpen(true)}
          />

          {/* Main Content Area: Renders active section */}
          <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-3">
            {/* White Background Feeds: Marketplace, Events & Campus Life */}
            {activeTab === 'marketplace' && (
              <div className="bg-white text-neutral-900 rounded-2xl shadow-sm p-2 sm:p-4 my-1 border border-neutral-200">
                <MarketplaceView
                  currentUniversity={currentUniversity}
                  session={session}
                  items={currentMarketplaceItems}
                  gigs={currentGigs}
                  onAddItem={handleAddMarketplaceItem}
                  onAddGig={handleAddGig}
                  onToggleLikeItem={handleToggleLikeMarketplaceItem}
                  onAddComment={handleAddMarketplaceComment}
                  onOpenDirectMessage={handleOpenDirectMessage}
                  onReportItem={handleOpenReport}
                />
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-white text-neutral-900 rounded-2xl shadow-sm p-2 sm:p-4 my-1 border border-neutral-200">
                <EventsView
                  currentUniversity={currentUniversity}
                  session={session}
                  events={currentEvents}
                  onAddEvent={handleAddEvent}
                  onToggleRsvp={handleToggleRsvp}
                  onReportItem={handleOpenReport}
                />
              </div>
            )}

            {activeTab === 'campus-life' && (
              <div className="bg-white text-neutral-900 rounded-2xl shadow-sm p-2 sm:p-4 my-1 border border-neutral-200">
                <CampusLifeView
                  currentUniversity={currentUniversity}
                  session={session}
                  notices={currentNotices}
                  spottedPosts={currentSpotted}
                  onAddNotice={handleAddNotice}
                  onAddSpottedPost={handleAddSpottedPost}
                  onReportItem={handleOpenReport}
                />
              </div>
            )}

            {/* Background Theme Feeds: Chats, Study Buddy, Grades / Academic */}
            {activeTab === 'chats' && (
              <div className={`rounded-2xl shadow-md p-1 sm:p-3 my-1 border transition-colors ${
                backgroundTheme === 'midnight'
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                  : backgroundTheme === 'forest'
                  ? 'bg-emerald-950/60 border-emerald-900/40 text-emerald-100'
                  : backgroundTheme === 'accent'
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
                  : backgroundTheme === 'minimal'
                  ? 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-100'
              }`}>
                <GroupChatsView
                  currentUniversity={currentUniversity}
                  session={session}
                  chatData={currentChats}
                  onSendMessage={handleSendMessage}
                  onReportMessage={(text, sender) => handleOpenReport(text, sender)}
                />
              </div>
            )}

            {activeTab === 'study-buddy' && (
              <div className={`rounded-2xl shadow-md p-1 sm:p-3 my-1 border transition-colors ${
                backgroundTheme === 'midnight'
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                  : backgroundTheme === 'forest'
                  ? 'bg-emerald-950/60 border-emerald-900/40 text-emerald-100'
                  : backgroundTheme === 'accent'
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
                  : backgroundTheme === 'minimal'
                  ? 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-100'
              }`}>
                <StudyBuddyView
                  currentUniversity={currentUniversity}
                  session={session}
                  buddies={currentBuddies}
                  onOpenDirectMessage={handleOpenDirectMessage}
                  onReportProfile={(name) => handleOpenReport(`Study Buddy Profile: ${name}`, name)}
                />
              </div>
            )}

            {activeTab === 'academic' && (
              <div className={`rounded-2xl shadow-md p-1 sm:p-3 my-1 border transition-colors ${
                backgroundTheme === 'midnight'
                  ? 'bg-slate-900/90 border-slate-800 text-slate-100'
                  : backgroundTheme === 'forest'
                  ? 'bg-emerald-950/60 border-emerald-900/40 text-emerald-100'
                  : backgroundTheme === 'accent'
                  ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
                  : backgroundTheme === 'minimal'
                  ? 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-100'
              }`}>
                <AcademicPerformanceView
                  currentUniversity={currentUniversity}
                  session={session}
                  courses={coursesData}
                  onAddCourse={handleAddCourse}
                  onAddAssignment={handleAddAssignment}
                  onOpenProfileEdit={() => setIsProfileEditOpen(true)}
                />
              </div>
            )}

            {activeTab === 'single-mingle' && (
              <SingleAndMingleView
                currentUniversity={currentUniversity}
                session={session}
                profiles={currentSingles}
                onOpenDirectMessage={handleOpenDirectMessage}
                onReportProfile={(name) => handleOpenReport(`Dating Profile: ${name}`, name)}
              />
            )}

            {activeTab === 'smart-tools' && (
              <SmartToolsView
                currentUniversity={currentUniversity}
                session={session}
              />
            )}

            {activeTab === 'help-support' && (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <LifeBuoy className="w-5 h-5 text-cyan-400" />
                    <span>Help, Support & POPIA Privacy</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsHelpSupportOpen(true)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs hover:bg-cyan-500/30 cursor-pointer"
                  >
                    Open Support Desk
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>POPIA Compliance Statement</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Varsity Life HUB strictly protects your student data under the POPIA Act. We do not sell your personal information, and your data is completely restricted to your isolated campus network.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsHelpSupportOpen(true)}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-cyan-500/50 text-left transition-all cursor-pointer"
                  >
                    <span className="font-bold text-xs text-white block mb-1">🤖 24/7 AI Campus Assistant</span>
                    <span className="text-[11px] text-neutral-400">Ask campus questions, verify safety tips, or check student res regulations.</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsHelpSupportOpen(true)}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/50 text-left transition-all cursor-pointer"
                  >
                    <span className="font-bold text-xs text-white block mb-1">🛡️ Privacy Policy & POPIA Erasure</span>
                    <span className="text-[11px] text-neutral-400">Review full legal protections and exercise Article 24 data deletion.</span>
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Bottom Navigation Bar with Dynamic Custom Tabs */}
          <BottomNav
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            currentUniversity={currentUniversity}
            unreadDirectMessages={totalUnreadDMs}
            onOpenInbox={() => setIsDirectMessagesOpen(true)}
            activeTabs={activeNavTabs}
            onOpenManageTabs={() => setIsManageTabsOpen(true)}
          />

          {/* Dynamic 5th Slot / Personalization Overlay Modal */}
          <ManageTabsModal
            isOpen={isManageTabsOpen}
            onClose={() => setIsManageTabsOpen(false)}
            currentUniversity={currentUniversity}
            activeTabs={activeNavTabs}
            onChangeActiveTabs={setActiveNavTabs}
            onSelectTab={(tabId) => setActiveTab(tabId as ActiveTab)}
            fontFamily={fontFamily}
            onChangeFontFamily={setFontFamily}
            fontSize={fontSize}
            onChangeFontSize={setFontSize}
            fontStyle={fontStyle}
            onChangeFontStyle={setFontStyle}
            backgroundTheme={backgroundTheme}
            onChangeBackgroundTheme={setBackgroundTheme}
          />

          {/* Profile & Course Modules Edit Modal */}
          <ProfileEditModal
            isOpen={isProfileEditOpen}
            onClose={() => setIsProfileEditOpen(false)}
            currentUniversity={currentUniversity}
            session={session}
            courses={coursesData}
            onSaveProfile={handleSaveProfile}
          />

          {/* 1-on-1 DIRECT MESSAGING (INBOX) MODAL WITH MULTI-MEDIA & THEME */}
          <DirectMessagesModal
            isOpen={isDirectMessagesOpen}
            onClose={() => {
              setIsDirectMessagesOpen(false);
              setActiveDMRecipient(null);
            }}
            currentUniversity={currentUniversity}
            session={session}
            conversations={isolatedConversations}
            activeRecipient={activeDMRecipient}
            onSendMessage={handleSendDirectMessage}
            onCreateConversation={handleCreateConversation}
            backgroundTheme={backgroundTheme}
          />

          {/* 🚨 SOS EMERGENCY WALK BUDDY MODAL */}
          <EmergencyWalkBuddyModal
            isOpen={isWalkBuddyOpen}
            onClose={() => setIsWalkBuddyOpen(false)}
            currentUniversity={currentUniversity}
            session={session}
          />

          {/* 🛡️ CAMPUS SAFETY ACCORD (FIRST VISIT POPUP) */}
          <SafetyAccordModal
            isOpen={isSafetyAccordOpen}
            onAccept={handleAcceptSafetyAccord}
            currentUniversity={currentUniversity}
            session={session}
          />

          {/* ⚠️ CONTENT REPORTING MODAL */}
          <ContentReportModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
            currentUniversity={currentUniversity}
            session={session}
            itemTitle={reportItemTarget.title}
            authorName={reportItemTarget.author}
            onSubmitReport={handleReportSubmit}
          />

          {/* 🤖 AI LIVE HELP & HUMAN SUPPORT ESCALATION MODAL (WITH POPIA ERASURE) */}
          <HelpSupportModal
            isOpen={isHelpSupportOpen}
            onClose={() => setIsHelpSupportOpen(false)}
            currentUniversity={currentUniversity}
            session={session}
            onDeleteAccount={handleDeleteAccount}
          />

          {/* 📱 MOBILE APP DOWNLOAD & QR CODE SCREEN */}
          <AppDownloadModal
            isOpen={isAppDownloadOpen}
            onClose={() => setIsAppDownloadOpen(false)}
            currentUniversity={currentUniversity}
            onTriggerIOSPrompt={() => setForceShowIOSBanner(true)}
          />
        </div>
      )}

      {/* 📲 SMART IOS INSTALLATION PROMPT (PWA FLOATING BANNER) */}
      <IOSInstallBanner
        currentUniversity={currentUniversity}
        forceShow={forceShowIOSBanner}
        onDismiss={() => setForceShowIOSBanner(false)}
      />
    </MobileFrame>
  );
}
