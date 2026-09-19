import React, { useState } from 'react';
import { MarketplaceItem, MarketplaceCategory, University, UserSession, StudentGig, MarketplaceComment } from '../types';
import { CampusIsolationService } from '../services/dataIsolation';
import { CampusIsolationBanner } from './CampusIsolationBanner';
import { 
  Plus, 
  Search, 
  ShoppingBag, 
  Briefcase, 
  MapPin, 
  MessageSquare, 
  Sparkles,
  AlertTriangle,
  Upload,
  Image as ImageIcon,
  Clock,
  Video,
  Play,
  Heart,
  MessageCircle,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Film,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

interface MarketplaceViewProps {
  currentUniversity: University;
  session: UserSession;
  items: MarketplaceItem[];
  gigs: StudentGig[];
  onAddItem: (item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'likes'>) => void;
  onAddGig: (gig: Omit<StudentGig, 'id' | 'createdAt' | 'applicantsCount'>) => void;
  onToggleLikeItem?: (itemId: string) => void;
  onAddComment?: (
    itemId: string, 
    comment: { 
      text: string; 
      authorName: string; 
      authorAvatar: string; 
      authorStudentId?: string; 
      authorRes?: string 
    }
  ) => void;
  onOpenDirectMessage: (recipient: { name: string; avatar: string; res?: string; degree?: string; initialMessage?: string }) => void;
  onReportItem: (title: string, author?: string) => void;
}

interface MediaAttachment {
  id: string;
  type: 'image' | 'video';
  name: string;
  url: string;
  thumbnail?: string;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  currentUniversity,
  session,
  items,
  gigs,
  onAddItem,
  onAddGig,
  onToggleLikeItem,
  onAddComment,
  onOpenDirectMessage,
  onReportItem,
}) => {
  // Main Sub-Tab: "Items & Services" vs "Student Gigs / Side Hustles"
  const [activeSubTab, setActiveSubTab] = useState<'items' | 'gigs'>('items');

  // Search & Category Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Product' | 'Service'>('All');
  const [selectedGigCategory, setSelectedGigCategory] = useState<string>('All');

  // Modals
  const [showPostModal, setShowPostModal] = useState(false);
  const [showGigModal, setShowGigModal] = useState(false);

  // Active expanded comments accordion: map of itemId -> boolean
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  // Comment draft input text: map of itemId -> string
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Active slide index for item card image carousels: map of itemId -> number
  const [activeSlideIndex, setActiveSlideIndex] = useState<Record<string, number>>({});

  // Video Lightbox Modal State
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; videoUrl: string; seller: string } | null>(null);

  // Item Form State
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<MarketplaceCategory>('Product');
  const [subcategory, setSubcategory] = useState('Textbooks');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [location, setLocation] = useState(session.resHall || 'Campus Student Centre');
  
  // Media attachments for seller (multiple photos and videos)
  const [mediaList, setMediaList] = useState<MediaAttachment[]>([]);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [showVideoUrlBox, setShowVideoUrlBox] = useState(false);

  // Gig Form State
  const [gigTitle, setGigTitle] = useState('');
  const [gigPay, setGigPay] = useState('R180 / hour');
  const [gigCategory, setGigCategory] = useState<'Tutoring' | 'Moving & Res' | 'Creative & Media' | 'Admin & Research' | 'Delivery & Chores'>('Tutoring');
  const [gigDesc, setGigDesc] = useState('');
  const [gigLocation, setGigLocation] = useState(session.resHall || 'Campus Library / Lab');
  const [gigDuration, setGigDuration] = useState('Flexible / Semester prep');

  // User's weekly posting quota tracking (Limit: 2 posts per week)
  const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
  const storageKey = `varsity_post_timestamps_${session.studentNumber || 'student'}`;

  const getWeeklyPosts = (): number[] => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const timestamps: number[] = JSON.parse(stored);
        const valid = timestamps.filter(t => Date.now() - t < SEVEN_DAYS_MS);
        return valid;
      }
    } catch {}
    return [];
  };

  const [weeklyPostTimestamps, setWeeklyPostTimestamps] = useState<number[]>(getWeeklyPosts);
  const [postLimitError, setPostLimitError] = useState('');

  const weeklyPostsUsed = weeklyPostTimestamps.length;
  const isWeeklyLimitReached = weeklyPostsUsed >= 2;

  // Strictly isolate items and gigs to current university partition
  const campusIsolatedItems = CampusIsolationService.filterMarketplace(items, currentUniversity.id);
  const campusIsolatedGigs = gigs.filter((g) => g.universityId === currentUniversity.id);

  // Filter items by search & category
  const filteredItems = campusIsolatedItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.subcategory.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Filter gigs by search & category
  const filteredGigs = campusIsolatedGigs.filter((gig) => {
    const matchesCategory = selectedGigCategory === 'All' || gig.category === selectedGigCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      !query ||
      gig.title.toLowerCase().includes(query) ||
      gig.description.toLowerCase().includes(query) ||
      gig.location.toLowerCase().includes(query) ||
      gig.payRate.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Handle Item Creation with Multi-Photos and Video
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWeeklyLimitReached) {
      setPostLimitError('Weekly Limit Reached (2/2): Students are permitted to post 2 listings per week to maintain quality and fair feed distribution.');
      return;
    }
    if (!title.trim() || !price || !description.trim()) return;

    const imageAttachments = mediaList.filter(m => m.type === 'image').map(m => m.url);
    const videoAttachment = mediaList.find(m => m.type === 'video');

    onAddItem({
      universityId: currentUniversity.id,
      title: title.trim(),
      price: Number(price),
      category,
      subcategory,
      description: description.trim(),
      condition: category === 'Product' ? condition : undefined,
      location: location.trim(),
      sellerName: session.fullName,
      sellerStudentId: session.studentNumber,
      sellerAvatar: session.avatarUrl,
      sellerContact: session.email,
      imageUrl: imageAttachments[0] || (mediaList[0]?.url),
      images: imageAttachments.length > 0 ? imageAttachments : undefined,
      videoUrl: videoAttachment?.url,
      videoThumbnail: videoAttachment?.thumbnail || imageAttachments[0],
      isLikedByMe: false,
      comments: [],
    });

    // Record weekly post timestamp to enforce 2 posts per week
    const updated = [...weeklyPostTimestamps, Date.now()];
    setWeeklyPostTimestamps(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {}

    // Reset Form
    setTitle('');
    setPrice('');
    setDescription('');
    setMediaList([]);
    setVideoUrlInput('');
    setShowVideoUrlBox(false);
    setShowPostModal(false);
    setPostLimitError('');
  };

  // Handle Gig Creation
  const handleCreateGig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gigTitle.trim() || !gigPay.trim() || !gigDesc.trim()) return;

    onAddGig({
      universityId: currentUniversity.id,
      title: gigTitle.trim(),
      payRate: gigPay.trim(),
      category: gigCategory,
      description: gigDesc.trim(),
      location: gigLocation.trim(),
      duration: gigDuration.trim(),
      posterName: session.fullName,
      posterAvatar: session.avatarUrl,
      posterContact: session.email,
    });

    setGigTitle('');
    setGigDesc('');
    setShowGigModal(false);
  };

  // Preset Photo Samples for South African Students
  const photoPresets = [
    {
      name: 'Textbook Inspection Photo',
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Laptop & Charger Photo',
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Res Room Appliance Photo',
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Campus Jacket & Apparel',
      url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80'
    }
  ];

  // Preset Video Samples (Accessible demo clips)
  const videoPresets = [
    {
      name: 'Electronics / Laptop Power-On Test Video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Textbook Highlight & Page Inspection Walk-through',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Appliance / Kettle Heating Demo Video',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const handleAddPresetPhoto = (preset: { name: string; url: string }) => {
    if (mediaList.length >= 6) return;
    setMediaList((prev) => [
      ...prev,
      {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        type: 'image',
        name: preset.name,
        url: preset.url
      }
    ]);
  };

  const handleAddPresetVideo = (preset: { name: string; url: string; thumbnail: string }) => {
    // Check if video already exists
    const hasVideo = mediaList.some(m => m.type === 'video');
    if (hasVideo) {
      setMediaList(prev => prev.filter(m => m.type !== 'video'));
    }
    setMediaList(prev => [
      ...prev,
      {
        id: `vid-${Date.now()}`,
        type: 'video',
        name: preset.name,
        url: preset.url,
        thumbnail: preset.thumbnail
      }
    ]);
  };

  const handleAddCustomVideoUrl = () => {
    if (!videoUrlInput.trim()) return;
    setMediaList(prev => [
      ...prev.filter(m => m.type !== 'video'),
      {
        id: `vid-custom-${Date.now()}`,
        type: 'video',
        name: 'Seller Video Walk-through',
        url: videoUrlInput.trim(),
        thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80'
      }
    ]);
    setVideoUrlInput('');
    setShowVideoUrlBox(false);
  };

  const handleRemoveMedia = (id: string) => {
    setMediaList(prev => prev.filter(m => m.id !== id));
  };

  // Toggle Like Handler
  const handleLike = (itemId: string) => {
    if (onToggleLikeItem) {
      onToggleLikeItem(itemId);
    }
  };

  // Toggle Comment Accordion
  const handleToggleComments = (itemId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Submit Comment Handler
  const handleSubmitComment = (itemId: string) => {
    const text = commentInputs[itemId]?.trim();
    if (!text || !onAddComment) return;

    onAddComment(itemId, {
      text,
      authorName: session.fullName,
      authorAvatar: session.avatarUrl,
      authorStudentId: session.studentNumber,
      authorRes: session.resHall,
    });

    setCommentInputs(prev => ({
      ...prev,
      [itemId]: ''
    }));

    // Ensure comments section is opened
    setExpandedComments(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  // Carousel navigation
  const handlePrevSlide = (itemId: string, max: number) => {
    setActiveSlideIndex(prev => {
      const cur = prev[itemId] || 0;
      return { ...prev, [itemId]: cur === 0 ? max - 1 : cur - 1 };
    });
  };

  const handleNextSlide = (itemId: string, max: number) => {
    setActiveSlideIndex(prev => {
      const cur = prev[itemId] || 0;
      return { ...prev, [itemId]: (cur + 1) % max };
    });
  };

  return (
    <div className="space-y-4 pb-20 text-left">
      {/* Real-time Campus Data Isolation & Security Partition Banner */}
      <CampusIsolationBanner 
        currentUniversity={currentUniversity} 
        sectionName={activeSubTab === 'items' ? 'Marketplace' : 'Student Gigs'} 
        itemCount={activeSubTab === 'items' ? filteredItems.length : filteredGigs.length} 
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
            <div className="flex items-center gap-2 flex-wrap">
              <span 
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider text-black"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                {currentUniversity.shortName} CAMPUS TRADE & GIGS
              </span>
              <span className="text-xs text-neutral-300">• Verified Student Network</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">
              {activeSubTab === 'items' ? 'Student Marketplace' : 'Student Gigs & Side Hustles'}
            </h2>
            <p className="text-xs text-neutral-300 max-w-lg mt-0.5 leading-relaxed">
              {activeSubTab === 'items'
                ? `Buy, sell, and inspect items with pictures, condition video walk-throughs, and peer questions at ${currentUniversity.name}.`
                : `Find or post student-friendly jobs: peer tutoring, res room moving, event DJing, or campus assistance.`}
            </p>
          </div>

          {/* Action Button & Quota Indicator */}
          {activeSubTab === 'items' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <div className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300">
                Weekly Quota: <span className={isWeeklyLimitReached ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{weeklyPostsUsed}/2 posts</span>
              </div>
              <button
                id="post-item-button"
                type="button"
                onClick={() => setShowPostModal(true)}
                className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Post an Item (Photos & Video)</span>
              </button>
            </div>
          ) : (
            <button
              id="post-gig-button"
              type="button"
              onClick={() => setShowGigModal(true)}
              className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Post a Student Gig</span>
            </button>
          )}
        </div>
      </div>

      {/* TWO PRIMARY SUB-TABS: "Items & Services" vs "Student Gigs / Side Hustles" */}
      <div className="flex border-b border-neutral-800 bg-neutral-950 p-1 rounded-xl gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('items')}
          className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'items'
              ? 'bg-neutral-800 text-white shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
          <span>Items & Services ({campusIsolatedItems.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('gigs')}
          className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'gigs'
              ? 'bg-neutral-800 text-white shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 text-amber-400" />
          <span>Student Gigs & Hustles ({campusIsolatedGigs.length})</span>
        </button>
      </div>

      {/* Functional Top Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeSubTab === 'items'
                ? `Search ${currentUniversity.shortName} textbooks, laptops, notes, appliances...`
                : `Search student gigs, tutoring, moving help at ${currentUniversity.shortName}...`
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none"
          />
        </div>

        {/* Filter Pills */}
        {activeSubTab === 'items' ? (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {(['All', 'Product', 'Service'] as const).map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'text-black font-bold shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                  style={isActive ? { backgroundColor: currentUniversity.accentColor } : {}}
                >
                  {cat === 'All' ? 'All Listings' : cat === 'Product' ? '📦 Products' : '⚡️ Services & Tutors'}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
            {['All', 'Tutoring', 'Moving & Res', 'Creative & Media', 'Delivery & Chores'].map((cat) => {
              const isActive = selectedGigCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedGigCategory(cat)}
                  className={`px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'text-black font-bold shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                  style={isActive ? { backgroundColor: currentUniversity.accentColor } : {}}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* TAB 1: ITEMS & SERVICES GRID WITH PICTURES, VIDEOS, LIKES & COMMENTS */}
      {activeSubTab === 'items' && (
        <>
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/60 rounded-2xl border border-neutral-800">
              <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">No listings found</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Be the first student to post a product or service with photos and video at {currentUniversity.shortName}!
              </p>
              <button
                onClick={() => setShowPostModal(true)}
                className="mt-4 px-4 py-2 rounded-xl text-black font-bold text-xs cursor-pointer"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                Post First Item
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                // Determine item images
                const itemImages: string[] = item.images && item.images.length > 0 
                  ? item.images 
                  : item.imageUrl 
                    ? [item.imageUrl] 
                    : [];
                
                const slideIndex = activeSlideIndex[item.id] || 0;
                const currentImage = itemImages[slideIndex] || itemImages[0];
                const hasMultipleImages = itemImages.length > 1;
                const hasVideo = Boolean(item.videoUrl);
                const comments = item.comments || [];
                const isCommentsOpen = Boolean(expandedComments[item.id]);
                const commentText = commentInputs[item.id] || '';

                return (
                  <div
                    key={item.id}
                    className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-750 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-xl group text-left relative"
                  >
                    <div>
                      {/* MEDIA CAROUSEL / VIDEO PREVIEW SECTION */}
                      {(itemImages.length > 0 || hasVideo) && (
                        <div className="relative w-full h-48 sm:h-52 bg-neutral-950 overflow-hidden select-none">
                          {currentImage && (
                            <img
                              src={currentImage}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                            />
                          )}

                          {/* Top Badges overlay on media */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span 
                                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider shadow backdrop-blur-md ${
                                  item.category === 'Product' 
                                    ? 'bg-black/70 text-white border border-white/10' 
                                    : 'bg-amber-500/80 text-black font-extrabold'
                                }`}
                              >
                                {item.category === 'Product' ? '📦 Product' : '⚡️ Service'}
                              </span>
                              {item.condition && (
                                <span className="text-[10px] bg-black/70 text-emerald-300 px-1.5 py-0.5 rounded backdrop-blur-md border border-white/10 font-semibold">
                                  {item.condition}
                                </span>
                              )}
                            </div>

                            {/* Media indicators (Photos / Video count) */}
                            <div className="flex items-center gap-1">
                              {hasMultipleImages && (
                                <span className="text-[10px] bg-black/70 text-neutral-200 px-2 py-0.5 rounded-full font-mono font-bold backdrop-blur-md border border-white/10 flex items-center gap-1">
                                  <ImageIcon className="w-3 h-3 text-cyan-400" />
                                  <span>{slideIndex + 1}/{itemImages.length}</span>
                                </span>
                              )}
                              {hasVideo && (
                                <span className="text-[10px] bg-rose-600/90 text-white px-2 py-0.5 rounded-full font-bold backdrop-blur-md shadow flex items-center gap-1">
                                  <Film className="w-3 h-3" />
                                  <span>Video Demo</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Left/Right Carousel Controls if multiple images */}
                          {hasMultipleImages && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePrevSlide(item.id, itemImages.length);
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-opacity cursor-pointer"
                                aria-label="Previous image"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNextSlide(item.id, itemImages.length);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-opacity cursor-pointer"
                                aria-label="Next image"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          {/* Video Walkthrough CTA Button if item has video */}
                          {hasVideo && (
                            <button
                              type="button"
                              onClick={() => {
                                if (item.videoUrl) {
                                  setActiveVideoModal({
                                    title: item.title,
                                    videoUrl: item.videoUrl,
                                    seller: item.sellerName
                                  });
                                }
                              }}
                              className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-rose-600 text-white text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
                            >
                              <Play className="w-3 h-3 fill-current text-rose-400" />
                              <span>Play Video Walk-through</span>
                            </button>
                          )}

                          {/* Carousel Dots */}
                          {hasMultipleImages && (
                            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                              {itemImages.map((_, i) => (
                                <span
                                  key={i}
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    i === slideIndex ? 'w-3 bg-white' : 'bg-white/40'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Item Content Details */}
                      <div className="p-4 pb-2">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800/60 px-2 py-0.5 rounded">
                              {item.subcategory}
                            </span>
                            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-800/40 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              <span>2-Day Listing</span>
                            </span>
                            {Boolean(item.reportCount && item.reportCount > 0) && (
                              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-1.5 py-0.5 rounded">
                                ⚠️ {item.reportCount}/5 Reports
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Price */}
                            <div className="text-base font-black font-mono text-white px-2.5 py-0.5 rounded-lg bg-neutral-950 border border-neutral-800">
                              R{item.price.toLocaleString()}
                            </div>
                            {/* Report */}
                            <button
                              type="button"
                              onClick={() => onReportItem(item.title, item.sellerName)}
                              className="text-neutral-500 hover:text-amber-400 p-1 rounded transition-colors text-[10px]"
                              title="Report listing"
                            >
                              <AlertTriangle className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-white group-hover:text-neutral-100 line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* INTERACTIVE SOCIAL ACTIONS BAR: LIKE, COMMENT, AND DIRECT DM */}
                    <div className="p-4 pt-2">
                      <div className="flex items-center justify-between border-t border-neutral-800/80 pt-2.5 text-xs">
                        {/* Left: Like & Comment Buttons */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          {/* LIKE BUTTON */}
                          <button
                            type="button"
                            onClick={() => handleLike(item.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              item.isLikedByMe
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                                : 'bg-neutral-800/80 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/60'
                            }`}
                            title={item.isLikedByMe ? 'Liked! Click to unlike' : 'Like this item'}
                          >
                            <Heart 
                              className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                                item.isLikedByMe ? 'fill-rose-500 text-rose-500' : 'text-neutral-400'
                              }`} 
                            />
                            <span>{item.likes}</span>
                          </button>

                          {/* COMMENT BUTTON (TOGGLE COMMENTS ACCORDION) */}
                          <button
                            type="button"
                            onClick={() => handleToggleComments(item.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                              isCommentsOpen
                                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                                : 'bg-neutral-800/80 hover:bg-neutral-750 text-neutral-300 border border-neutral-700/60'
                            }`}
                            title="View and ask questions publicly"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{comments.length}</span>
                            <span className="hidden sm:inline text-[11px] font-normal text-neutral-400">
                              {comments.length === 1 ? 'Comment' : 'Comments'}
                            </span>
                          </button>
                        </div>

                        {/* Right: Seller Avatar & Direct DM Button */}
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenDirectMessage({
                              name: item.sellerName,
                              avatar: item.sellerAvatar,
                              res: item.location,
                              initialMessage: `Hi ${item.sellerName.split(' ')[0]}, is "${item.title}" still available at ${currentUniversity.shortName}?`
                            })}
                            className="px-3 py-1.5 rounded-xl text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow"
                            style={{ backgroundColor: currentUniversity.accentColor }}
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>DM Seller</span>
                          </button>
                        </div>
                      </div>

                      {/* Location & Seller Footnote */}
                      <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-400">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <img
                            src={item.sellerAvatar}
                            alt={item.sellerName}
                            className="w-4 h-4 rounded-full object-cover border border-neutral-700"
                          />
                          <span className="truncate">{item.sellerName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-neutral-400 truncate">
                          <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </div>

                      {/* EXPANDABLE COMMENTS & QUESTIONS SECTION */}
                      {isCommentsOpen && (
                        <div className="mt-3 pt-3 border-t border-neutral-800 bg-neutral-950/60 rounded-xl p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Public Inquiries & Comments ({comments.length})</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => handleToggleComments(item.id)}
                              className="text-[10px] text-neutral-500 hover:text-neutral-300"
                            >
                              Close
                            </button>
                          </div>

                          {/* Quick question chips */}
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[10px]">
                            {[
                              'Is this still available?',
                              'Is price negotiable?',
                              'Can we meet at the campus library?',
                              'Can I test it in person?'
                            ].map((chip) => (
                              <button
                                key={chip}
                                type="button"
                                onClick={() => {
                                  setCommentInputs(prev => ({
                                    ...prev,
                                    [item.id]: chip
                                  }));
                                }}
                                className="px-2 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 whitespace-nowrap cursor-pointer transition-colors"
                              >
                                {chip}
                              </button>
                            ))}
                          </div>

                          {/* Comment List */}
                          {comments.length === 0 ? (
                            <p className="text-[11px] text-neutral-500 text-center py-2 italic">
                              No questions yet. Be the first student to ask about this listing!
                            </p>
                          ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {comments.map((comment) => (
                                <div 
                                  key={comment.id}
                                  className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 flex items-start gap-2"
                                >
                                  <img 
                                    src={comment.authorAvatar} 
                                    alt={comment.authorName} 
                                    className="w-6 h-6 rounded-full object-cover border border-neutral-700 shrink-0 mt-0.5" 
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-bold text-neutral-200 truncate">
                                        {comment.authorName}
                                      </span>
                                      <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                                        {comment.timestamp}
                                      </span>
                                    </div>
                                    <p className="text-xs text-neutral-300 mt-0.5 leading-snug">
                                      {comment.text}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Add Comment Input */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Ask seller a public question..."
                              value={commentText}
                              onChange={(e) => setCommentInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleSubmitComment(item.id);
                                }
                              }}
                              className="flex-1 bg-neutral-900 border border-neutral-700 focus:border-neutral-500 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none"
                            />
                            <button
                              type="button"
                              disabled={!commentText.trim()}
                              onClick={() => handleSubmitComment(item.id)}
                              className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                                commentText.trim()
                                  ? 'bg-cyan-500 text-black shadow'
                                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                              }`}
                              title="Post public comment"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* TAB 2: STUDENT GIGS / SIDE HUSTLES GRID */}
      {activeSubTab === 'gigs' && (
        <>
          {filteredGigs.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/60 rounded-2xl border border-neutral-800">
              <Briefcase className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">No active student gigs found</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Need extra cash or looking for a tutor or helper at {currentUniversity.shortName}?
              </p>
              <button
                onClick={() => setShowGigModal(true)}
                className="mt-4 px-4 py-2 rounded-xl text-black font-bold text-xs cursor-pointer"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                Post First Gig
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredGigs.map((gig) => (
                <div
                  key={gig.id}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-xl group text-left relative"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {gig.category}
                      </span>
                      <div className="text-sm font-extrabold font-mono text-emerald-400 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                        {gig.payRate}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-neutral-200">
                      {gig.title}
                    </h3>

                    <p className="text-xs text-neutral-300 mt-1.5 line-clamp-3 leading-relaxed">
                      {gig.description}
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-[11px] text-neutral-400 font-mono">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {gig.location}
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {gig.duration}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={gig.posterAvatar}
                        alt={gig.posterName}
                        className="w-7 h-7 rounded-full object-cover border border-neutral-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-neutral-300 font-semibold text-[11px] truncate">
                          {gig.posterName}
                        </div>
                        <div className="text-[10px] text-neutral-500">{gig.createdAt}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenDirectMessage({
                        name: gig.posterName,
                        avatar: gig.posterAvatar,
                        res: gig.location,
                        initialMessage: `Hi ${gig.posterName.split(' ')[0]}, I would like to apply for your gig: "${gig.title}"!`
                      })}
                      className="px-3 py-1.5 rounded-xl text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow"
                      style={{ backgroundColor: currentUniversity.accentColor }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Apply / Message</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* POST ITEM MODAL (WITH MULTI-PICTURES AND VIDEO UPLOAD OPTIONS) */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="p-4 text-white flex items-center justify-between border-b border-neutral-800"
              style={{ backgroundColor: `${currentUniversity.primaryColor}ee` }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">
                  {currentUniversity.shortName} Campus Trade
                </span>
                <h3 className="text-base font-bold font-display">Post Item with Photos & Video</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPostModal(false)}
                className="w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 space-y-3.5 max-h-[82vh] overflow-y-auto text-xs">
              {/* Weekly Post Limit Notice & 2-Day Expiry Notice */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Weekly Student Allowance:</span>
                  <span className={isWeeklyLimitReached ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {weeklyPostsUsed}/2 Posts Used {isWeeklyLimitReached ? '(Max 2/wk Reached)' : `(${2 - weeklyPostsUsed} remaining)`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400 pt-1 border-t border-neutral-800/80">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Listings automatically expire and are pruned from feeds after <strong>2 days</strong>.</span>
                </div>
              </div>

              {isWeeklyLimitReached && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-700/80 text-rose-200 text-xs">
                  <strong>Weekly Limit Reached (2/2):</strong> Students are limited to 2 posts per week to keep campus feeds relevant and clutter-free. Please wait for your next weekly window.
                </div>
              )}

              {postLimitError && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-200 text-xs">
                  {postLimitError}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Item or Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TI-Nspire CX II CAS Calculator, Anatomy Flashcards, Dorm Steamer..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Price in ZAR (R) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="e.g. 450"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Listing Type
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as MarketplaceCategory)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Product">📦 Physical Product</option>
                    <option value="Service">⚡️ Campus Service</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Subcategory
                  </label>
                  <select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Textbooks">Textbooks</option>
                    <option value="Electronics">Electronics & Laptops</option>
                    <option value="Res Essentials">Res / Dorm Essentials</option>
                    <option value="Tutoring">Academic Tutoring</option>
                    <option value="Apparel">Campus Apparel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {category === 'Product' && (
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Condition
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Brand New">Brand New / Sealed</option>
                      <option value="Like New">Like New (Mint)</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good (Minor wear)</option>
                      <option value="Fair">Fair (Fully functional)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* MEDIA SECTION: PICTURES & VIDEOS */}
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-neutral-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Photos & Video Walk-through ({mediaList.length})</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">Buyers love seeing proof</span>
                </div>

                {/* Uploaded Media Thumbnails */}
                {mediaList.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {mediaList.map((m, idx) => (
                      <div key={m.id} className="relative group rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 h-20">
                        {m.type === 'image' ? (
                          <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center relative">
                            {m.thumbnail && <img src={m.thumbnail} alt="video thumb" className="absolute inset-0 w-full h-full object-cover opacity-50" />}
                            <Film className="w-6 h-6 text-rose-500 relative z-10" />
                            <span className="text-[9px] text-white font-bold relative z-10 mt-1 bg-black/60 px-1.5 py-0.2 rounded">Video</span>
                          </div>
                        )}
                        
                        {/* Cover badge for first image */}
                        {idx === 0 && m.type === 'image' && (
                          <span className="absolute top-1 left-1 bg-amber-400 text-black text-[9px] font-black uppercase px-1 rounded">
                            Cover
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRemoveMedia(m.id)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 1. Add Picture Presets / File Simulation */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Option 1: Add Pictures (Select or Upload)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {photoPresets.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleAddPresetPhoto(preset)}
                        className="py-1.5 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] text-neutral-300 hover:text-white flex items-center gap-1.5 truncate cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Add Video Options (Video Demo / Walk-through) */}
                <div className="pt-2 border-t border-neutral-800">
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1.5 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-rose-400" />
                    <span>Option 2: Add Video Walk-through / Demo</span>
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {videoPresets.map((vid) => (
                      <button
                        key={vid.name}
                        type="button"
                        onClick={() => handleAddPresetVideo(vid)}
                        className="py-1.5 px-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] text-neutral-300 hover:text-white flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <Play className="w-3 h-3 text-rose-400 shrink-0" />
                          <span className="truncate">{vid.name}</span>
                        </span>
                        <span className="text-[10px] text-rose-400 font-mono">Demo Video</span>
                      </button>
                    ))}
                  </div>

                  {/* Or Custom Video Link */}
                  {!showVideoUrlBox ? (
                    <button
                      type="button"
                      onClick={() => setShowVideoUrlBox(true)}
                      className="mt-2 text-[11px] text-neutral-400 hover:text-cyan-400 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Attach custom video URL / link</span>
                    </button>
                  ) : (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/video.mp4"
                        value={videoUrlInput}
                        onChange={(e) => setVideoUrlInput(e.target.value)}
                        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomVideoUrl}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                      >
                        Attach
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowVideoUrlBox(false)}
                        className="p-1 text-neutral-400"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Description & Details *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Mention condition, module code, inclusions, warranty, reason for selling..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Campus Meetup / Pickup Spot *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Main Library foyer, Res Quad, or Student Union"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Publish to {currentUniversity.shortName} Feed</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POST STUDENT GIG MODAL */}
      {showGigModal && (
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
                  {currentUniversity.shortName} Gigs & Hustles
                </span>
                <h3 className="text-base font-bold font-display">Post a Student Gig</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGigModal(false)}
                className="w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateGig} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Gig Role / Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maths 111 Tutor, Res Moving Helper, Social DJ..."
                  value={gigTitle}
                  onChange={(e) => setGigTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Pay Rate in ZAR (R) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. R180 / hr or R300 flat"
                    value={gigPay}
                    onChange={(e) => setGigPay(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    value={gigCategory}
                    onChange={(e) => setGigCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  >
                    <option value="Tutoring">Tutoring</option>
                    <option value="Moving & Res">Moving & Res</option>
                    <option value="Creative & Media">Creative & Media</option>
                    <option value="Admin & Research">Admin & Research</option>
                    <option value="Delivery & Chores">Delivery & Chores</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Task Description & Requirements *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe duties, specific course modules, hours needed, etc."
                  value={gigDesc}
                  onChange={(e) => setGigDesc(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Campus Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Library Lab 4, Res Quad"
                    value={gigLocation}
                    onChange={(e) => setGigLocation(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Duration / Commitment *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2 hours, Weekly"
                    value={gigDuration}
                    onChange={(e) => setGigDuration(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Publish Gig to {currentUniversity.shortName}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULLSCREEN / LIGHTBOX VIDEO MODAL */}
      {activeVideoModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveVideoModal(null)}
        >
          <div 
            className="w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-white truncate max-w-sm">
                  {activeVideoModal.title}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  by {activeVideoModal.seller}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative bg-black aspect-video flex items-center justify-center">
              <video
                src={activeVideoModal.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3 bg-neutral-950 text-neutral-400 text-[11px] flex items-center justify-between">
              <span>Verified student condition demo video</span>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold cursor-pointer"
              >
                Done Watching
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
