import React, { useState } from 'react';
import { CampusNotice, University, UserSession, CampusSpottedPost } from '../types';
import { CampusIsolationBanner } from './CampusIsolationBanner';
import { 
  Building, 
  ShieldAlert, 
  Trophy, 
  Users, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar,
  Sparkles,
  Flame,
  EyeOff,
  AlertTriangle,
  Search,
  Lock,
  Ghost
} from 'lucide-react';

interface CampusLifeViewProps {
  currentUniversity: University;
  session: UserSession;
  notices: CampusNotice[];
  spottedPosts: CampusSpottedPost[];
  onAddNotice: (notice: Omit<CampusNotice, 'id' | 'likes'>) => void;
  onAddSpottedPost: (post: Omit<CampusSpottedPost, 'id' | 'likes' | 'commentsCount'>) => void;
  onReportItem: (title: string, author?: string) => void;
}

export const CampusLifeView: React.FC<CampusLifeViewProps> = ({
  currentUniversity,
  session,
  notices,
  spottedPosts,
  onAddNotice,
  onAddSpottedPost,
  onReportItem,
}) => {
  // Main view mode
  const [viewMode, setViewMode] = useState<'notices' | 'spotted'>('notices');

  // Notices state
  const [activeTab, setActiveTab] = useState<'All' | 'SRC' | 'Sports' | 'Club'>('All');
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [likedNotices, setLikedNotices] = useState<Record<string, boolean>>({});

  // Spotted Posts state
  const [spottedSearch, setSpottedSearch] = useState('');
  const [spottedCategory, setSpottedCategory] = useState<string>('All');
  const [showAddSpottedModal, setShowAddSpottedModal] = useState(false);
  const [likedSpotted, setLikedSpotted] = useState<Record<string, boolean>>({});

  // Notice Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'SRC' | 'Sports' | 'Club'>('Club');
  const [content, setContent] = useState('');
  const [badge, setBadge] = useState('Campus Club');
  const [urgent, setUrgent] = useState(false);

  // Spotted Form State
  const [spottedText, setSpottedText] = useState('');
  const [spottedCat, setSpottedCat] = useState<'Library' | 'Crush' | 'ResLife' | 'Lecture' | 'Shoutout'>('Crush');

  const filteredNotices = notices.filter((n) => {
    if (activeTab === 'All') return true;
    return n.type === activeTab;
  });

  const campusSpotted = spottedPosts.filter((p) => p.universityId === currentUniversity.id);
  const filteredSpotted = campusSpotted.filter((p) => {
    const matchesCat = spottedCategory === 'All' || p.category === spottedCategory;
    const query = spottedSearch.toLowerCase();
    const matchesSearch = !query || p.text.toLowerCase().includes(query) || p.anonymousTag.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddNotice({
      universityId: currentUniversity.id,
      type,
      title: title.trim(),
      author: session.fullName,
      authorRole: type === 'SRC' ? 'Student Representative' : `${currentUniversity.shortName} Student Leader`,
      date: 'Just now',
      content: content.trim(),
      badge: badge.trim(),
      urgent,
    });

    setTitle('');
    setContent('');
    setShowAddNoticeModal(false);
  };

  const handleCreateSpotted = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spottedText.trim()) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const tag = `#Spotted_${currentUniversity.shortName.toUpperCase()}_${randomNum}`;

    onAddSpottedPost({
      universityId: currentUniversity.id,
      anonymousTag: tag,
      text: spottedText.trim(),
      timestamp: 'Just now',
      category: spottedCat,
    });

    setSpottedText('');
    setShowAddSpottedModal(false);
  };

  return (
    <div className="space-y-4 pb-20 text-left">
      {/* Real-time Campus Data Isolation & Security Partition Banner */}
      <CampusIsolationBanner 
        currentUniversity={currentUniversity} 
        sectionName={viewMode === 'notices' ? 'Campus Life' : 'Campus Spotted'} 
        itemCount={viewMode === 'notices' ? filteredNotices.length : filteredSpotted.length} 
      />

      {/* Top Banner */}
      <div 
        className="p-4 sm:p-5 rounded-2xl border text-white relative overflow-hidden transition-colors shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${currentUniversity.primaryColor}E6 0%, #171717 100%)`,
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
                {currentUniversity.shortName} COMMUNITY
              </span>
              <span className="text-xs text-neutral-300">• Verified Student Pulse</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">
              {viewMode === 'notices' ? 'Campus Life & Societies' : 'Anonymous Campus Spotted'}
            </h2>
            <p className="text-xs text-neutral-300 max-w-md mt-0.5">
              {viewMode === 'notices'
                ? `Official Student Council bulletins, sports fixtures, and varsity clubs across ${currentUniversity.name}.`
                : `100% anonymous campus confessions, library crushes, and candid campus chatter.`}
            </p>
          </div>

          {viewMode === 'notices' ? (
            <button
              id="post-announcement-button"
              type="button"
              onClick={() => setShowAddNoticeModal(true)}
              className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Post Notice / Fixture</span>
            </button>
          ) : (
            <button
              id="post-spotted-button"
              type="button"
              onClick={() => setShowAddSpottedModal(true)}
              className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <Ghost className="w-4 h-4" />
              <span>Post Anonymous Confession</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW TOGGLE SUB-TABS */}
      <div className="flex border-b border-neutral-800 bg-neutral-950 p-1 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setViewMode('notices')}
          className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            viewMode === 'notices'
              ? 'bg-neutral-800 text-white shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-cyan-400" />
          <span>Official Notices & SRC ({filteredNotices.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('spotted')}
          className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            viewMode === 'spotted'
              ? 'bg-neutral-800 text-white shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <EyeOff className="w-3.5 h-3.5 text-purple-400" />
          <span>Anonymous "Campus Spotted" ({filteredSpotted.length})</span>
        </button>
      </div>

      {/* MODE 1: NOTICES VIEW */}
      {viewMode === 'notices' && (
        <>
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'All', label: 'All Notices' },
              { id: 'SRC', label: '🏛️ SRC Official Bulletins' },
              { id: 'Sports', label: '🏉 Varsity Cup & Sports' },
              { id: 'Club', label: '🎭 Clubs & Societies' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'text-black font-bold shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                  style={isActive ? { backgroundColor: currentUniversity.accentColor } : {}}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Notices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredNotices.map((notice) => (
              <div
                key={notice.id}
                className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-all text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                      {notice.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => onReportItem(notice.title, notice.author)}
                      className="text-neutral-500 hover:text-amber-400 p-1 text-[10px] flex items-center gap-0.5"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      <span className="hidden sm:inline">Report</span>
                    </button>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{notice.title}</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">{notice.content}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <div>
                    <span className="text-neutral-300 font-semibold text-[11px] block">{notice.author}</span>
                    <span className="text-[10px] text-neutral-500">{notice.authorRole}</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{notice.date}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODE 2: ANONYMOUS "CAMPUS SPOTTED" FEED */}
      {viewMode === 'spotted' && (
        <div className="space-y-3">
          {/* Privacy disclaimer banner */}
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center gap-2.5 text-xs text-purple-200">
            <Lock className="w-4 h-4 text-purple-400 shrink-0" />
            <p className="text-[11px] leading-relaxed">
              <strong>100% Anonymous:</strong> No student names, emails, or room addresses are stored or shown on this board. Please adhere to campus decency rules.
            </p>
          </div>

          {/* Search bar & Tag filters */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campus confessions, crushes, library spots..."
                value={spottedSearch}
                onChange={(e) => setSpottedSearch(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
              {['All', 'Crush', 'Library', 'ResLife', 'Lecture', 'Shoutout'].map((cat) => {
                const isActive = spottedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSpottedCategory(cat)}
                    className={`px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-purple-600 text-white font-bold shadow'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    #{cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spotted Cards Feed */}
          {filteredSpotted.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/60 rounded-2xl border border-neutral-800 space-y-2">
              <Ghost className="w-10 h-10 text-neutral-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">No confessions spotted yet</h4>
              <p className="text-xs text-neutral-400">
                Be the first to share an anonymous campus observation or shoutout!
              </p>
              <button
                type="button"
                onClick={() => setShowAddSpottedModal(true)}
                className="mt-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Post First Confession
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredSpotted.map((post) => {
                const isLiked = !!likedSpotted[post.id];
                return (
                  <div
                    key={post.id}
                    className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between shadow-sm text-left relative"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
                            {post.anonymousTag}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            #{post.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-neutral-500 font-mono">{post.timestamp}</span>
                          <button
                            type="button"
                            onClick={() => onReportItem(post.text, post.anonymousTag)}
                            className="text-neutral-500 hover:text-amber-400 p-1 text-[10px]"
                            title="Report post"
                          >
                            <AlertTriangle className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-xs text-neutral-200 leading-relaxed font-sans mt-1">
                        "{post.text}"
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setLikedSpotted((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                            isLiked
                              ? 'bg-rose-950/40 border-rose-500/50 text-rose-400'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-400' : ''}`} />
                          <span className="font-mono text-[11px] font-bold">
                            {post.likes + (isLiked ? 1 : 0)}
                          </span>
                        </button>

                        <div className="flex items-center gap-1 text-neutral-400 text-[11px] font-mono">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.commentsCount} comments</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-neutral-500 font-mono">
                        {currentUniversity.shortName} Pulse
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* POST NOTICE MODAL */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-4 text-white flex items-center justify-between border-b border-neutral-800"
              style={{ backgroundColor: `${currentUniversity.primaryColor}ee` }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  {currentUniversity.shortName} Notices
                </span>
                <h3 className="text-base font-bold font-display">Post Notice or Event</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddNoticeModal(false)}
                className="w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SRC Mass Meeting, Varsity Cup Bus Tickets..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="SRC">🏛️ SRC Bulletin</option>
                    <option value="Sports">🏉 Sports / Varsity Cup</option>
                    <option value="Club">🎭 Club / Society</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Badge</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Announcement</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Details, venue, times, and contact points..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent-check"
                  checked={urgent}
                  onChange={(e) => setUrgent(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-950 text-red-500"
                />
                <label htmlFor="urgent-check" className="text-xs text-neutral-300 cursor-pointer">
                  Mark as High Priority / Urgent Notice
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Publish Notice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POST ANONYMOUS SPOTTED MODAL */}
      {showAddSpottedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-purple-950 text-white flex items-center justify-between border-b border-purple-800">
              <div className="flex items-center gap-2">
                <Ghost className="w-5 h-5 text-purple-300" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-300">
                    100% Anonymous Post
                  </span>
                  <h3 className="text-base font-bold font-display">Campus Spotted / Confession</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSpottedModal(false)}
                className="w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSpotted} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Tag Category</label>
                <select
                  value={spottedCat}
                  onChange={(e) => setSpottedCat(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="Crush">#Crush - Library or campus crush</option>
                  <option value="Library">#Library - Study spots & lab juice</option>
                  <option value="ResLife">#ResLife - Dining halls & dorm moments</option>
                  <option value="Lecture">#Lecture - Hilarious lecturer moments</option>
                  <option value="Shoutout">#Shoutout - Kind students & good vibes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Anonymous Confession / Spotted Message</label>
                <textarea
                  required
                  rows={4}
                  value={spottedText}
                  onChange={(e) => setSpottedText(e.target.value)}
                  placeholder="e.g. To the girl reading economics in the yellow hoodie at the 2nd floor library..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400">
                🔒 Your name, email, and IP address are never tied to this message.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Ghost className="w-4 h-4" />
                <span>Publish Anonymously to {currentUniversity.shortName}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
