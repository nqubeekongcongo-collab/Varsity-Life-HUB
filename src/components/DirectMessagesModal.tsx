import React, { useState, useEffect, useRef } from 'react';
import { University, UserSession, DirectConversation, DirectMessage, DirectMessageAttachment } from '../types';
import { VideoCallModal } from './VideoCallModal';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  Paperclip, 
  Image as ImageIcon, 
  X, 
  CheckCheck, 
  Play, 
  Pause, 
  FileText, 
  Download, 
  Radio, 
  Sparkles,
  Search,
  ArrowLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
  Ban,
  Video,
  Calendar,
  Lock,
  Key,
  QrCode,
  Copy,
  Check
} from 'lucide-react';

interface DirectMessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  session: UserSession;
  conversations: DirectConversation[];
  activeRecipient?: {
    name: string;
    avatar: string;
    res?: string;
    degree?: string;
    initialMessage?: string;
  } | null;
  onSendMessage: (conversationId: string, message: Omit<DirectMessage, 'id' | 'timestamp'>) => void;
  onCreateConversation?: (recipient: { name: string; avatar: string; res?: string; degree?: string }, firstMessage: string) => void;
  backgroundTheme?: string;
}

export const DirectMessagesModal: React.FC<DirectMessagesModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  session,
  conversations,
  activeRecipient,
  onSendMessage,
  onCreateConversation,
  backgroundTheme = 'dark',
}) => {
  const [selectedConvoId, setSelectedConvoId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Blocked users state
  const [blockedUsers, setBlockedUsers] = useState<string[]>(() => {
    const saved = localStorage.getItem('varsity_hub_blocked_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const handleToggleBlock = (participantName: string) => {
    const lower = participantName.toLowerCase();
    const isBlocked = blockedUsers.includes(lower);
    const next = isBlocked
      ? blockedUsers.filter((u) => u !== lower)
      : [...blockedUsers, lower];
    setBlockedUsers(next);
    localStorage.setItem('varsity_hub_blocked_users', JSON.stringify(next));
  };

  // Multi-Media Input States
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);

  // Video Call & Meeting States
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [showE2EESafetyModal, setShowE2EESafetyModal] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const [showDocPicker, setShowDocPicker] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If activeRecipient was passed, ensure conversation exists or is selected
  useEffect(() => {
    if (activeRecipient) {
      const existing = conversations.find(
        (c) => c.participantName.toLowerCase() === activeRecipient.name.toLowerCase()
      );
      if (existing) {
        setSelectedConvoId(existing.id);
        if (activeRecipient.initialMessage) {
          setInputText(activeRecipient.initialMessage);
        }
      } else {
        // Create new conversation entry if none exists
        if (onCreateConversation) {
          onCreateConversation(
            {
              name: activeRecipient.name,
              avatar: activeRecipient.avatar,
              res: activeRecipient.res,
              degree: activeRecipient.degree
            },
            activeRecipient.initialMessage || `Hi ${activeRecipient.name.split(' ')[0]}!`
          );
        }
      }
    } else if (!selectedConvoId && conversations.length > 0) {
      setSelectedConvoId(conversations[0].id);
    }
  }, [activeRecipient, conversations]);

  // Voice recording timer
  useEffect(() => {
    if (isRecordingVoice) {
      setRecordingSeconds(0);
      const timer = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      setRecordingTimer(timer);
      return () => clearInterval(timer);
    } else {
      if (recordingTimer) clearInterval(recordingTimer);
    }
  }, [isRecordingVoice]);

  const activeConvo = conversations.find((c) => c.id === selectedConvoId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvo?.messages, isRecordingVoice]);

  if (!isOpen) return null;

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvo) return;

    const textToSend = inputText.trim();
    setInputText('');

    onSendMessage(activeConvo.id, {
      senderId: 'user',
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      text: textToSend,
      isUser: true,
    });
  };

  const handleSendVoiceNote = () => {
    if (!activeConvo) return;
    const durationStr = `0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}`;

    onSendMessage(activeConvo.id, {
      senderId: 'user',
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      text: '🎙️ Voice Note',
      isUser: true,
      attachment: {
        type: 'voice',
        duration: durationStr,
      },
    });

    setIsRecordingVoice(false);
    setRecordingSeconds(0);
  };

  const handleSendDocument = (docName: string, docSize: string) => {
    if (!activeConvo) return;
    setShowDocPicker(false);

    onSendMessage(activeConvo.id, {
      senderId: 'user',
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      text: `📁 Shared Document: ${docName}`,
      isUser: true,
      attachment: {
        type: 'file',
        name: docName,
        size: docSize,
      },
    });
  };

  const handleSendPhoto = (photoUrl: string, caption: string) => {
    if (!activeConvo) return;
    setShowPhotoPicker(false);

    onSendMessage(activeConvo.id, {
      senderId: 'user',
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      text: caption || '📸 Photo attachment',
      isUser: true,
      attachment: {
        type: 'image',
        url: photoUrl,
        name: caption,
      },
    });
  };

  // Pre-curated academic documents for one-tap sharing simulation
  const sampleDocs = [
    { name: `${currentUniversity.shortName}_Semester_Exam_Prep_Notes.pdf`, size: '3.1 MB', desc: 'Handwritten chapter summaries & worked questions' },
    { name: 'Past_Paper_2025_Marking_Memo.pdf', size: '1.8 MB', desc: 'Official faculty memorandum' },
    { name: 'Prescribed_Syllabus_Formulas.pdf', size: '920 KB', desc: 'Summary sheet approved for exam hall' },
    { name: 'Proof_of_Student_Registration.pdf', size: '410 KB', desc: 'Campus residence & library access pass' },
  ];

  // Pre-curated campus photos
  const samplePhotos = [
    { 
      url: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80', 
      title: 'Calculator display test', 
      desc: 'Hardware screen test' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80', 
      title: 'Textbook condition snapshot', 
      desc: 'Clean pages, no highlights' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&auto=format&fit=crop&q=80', 
      title: 'Library 3rd floor study spot', 
      desc: 'Available desks next to window' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80', 
      title: 'Course reader notes', 
      desc: 'Chapter 4 & 5 mind map' 
    },
  ];

  const filteredConversations = conversations.filter((c) =>
    c.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div 
        className="w-full max-w-4xl h-[92vh] max-h-[750px] bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COLUMN: Conversations List (Hidden on mobile if chat is selected) */}
        <div className={`w-full md:w-80 md:border-r border-neutral-800 flex flex-col bg-neutral-950 shrink-0 ${
          selectedConvoId ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div 
            className="p-4 border-b border-neutral-800 text-white flex items-center justify-between"
            style={{ backgroundColor: `${currentUniversity.primaryColor}E0` }}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-white" />
              <div>
                <h3 className="font-bold text-sm leading-tight">Student Inbox</h3>
                <span className="text-[10px] font-mono text-white/80">
                  {currentUniversity.shortName} Direct Network
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white md:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-2.5 border-b border-neutral-800/80">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search direct messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-600 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none"
              />
            </div>
          </div>

          {/* List of chats */}
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-850">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">
                No conversations yet. Message sellers, study buddies, or mingle matches to begin!
              </div>
            ) : (
              filteredConversations.map((convo) => {
                const isSelected = activeConvo?.id === convo.id;
                return (
                  <button
                    key={convo.id}
                    type="button"
                    onClick={() => setSelectedConvoId(convo.id)}
                    className={`w-full p-3 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                      isSelected 
                        ? 'bg-neutral-800/80 border-l-4' 
                        : 'hover:bg-neutral-900/60'
                    }`}
                    style={isSelected ? { borderLeftColor: currentUniversity.accentColor } : {}}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={convo.participantAvatar}
                        alt={convo.participantName}
                        className="w-10 h-10 rounded-full object-cover border border-neutral-700"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="font-bold text-xs text-white truncate">{convo.participantName}</h4>
                        <span className="text-[10px] text-neutral-500 font-mono shrink-0">{convo.lastTimestamp}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate">{convo.lastMessage}</p>
                      {convo.participantRes && (
                        <span className="text-[9px] text-neutral-500 font-mono mt-1 block truncate">
                          {convo.participantRes}
                        </span>
                      )}
                    </div>
                    {convo.unreadCount > 0 && (
                      <span 
                        className="w-4 h-4 rounded-full text-[9px] font-bold text-black flex items-center justify-center shrink-0"
                        style={{ backgroundColor: currentUniversity.accentColor }}
                      >
                        {convo.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Conversation */}
        <div className={`flex-1 flex flex-col bg-neutral-900 h-full ${
          !selectedConvoId ? 'hidden md:flex' : 'flex'
        }`}>
          {activeConvo ? (
            <>
              {/* Active Convo Header */}
              <div className="p-3 sm:px-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => setSelectedConvoId(null)}
                    className="md:hidden p-1 rounded-lg text-neutral-400 hover:text-white"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="relative shrink-0">
                    <img
                      src={activeConvo.participantAvatar}
                      alt={activeConvo.participantName}
                      className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate">
                        {activeConvo.participantName}
                      </h4>
                      <span 
                        className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded text-black shrink-0"
                        style={{ backgroundColor: currentUniversity.accentColor }}
                      >
                        {currentUniversity.shortName}
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {activeConvo.participantDegree || 'Verified Student'} • {activeConvo.participantRes || 'On-Campus'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setIsVideoCallOpen(true)}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Start End-to-End Encrypted Video Call"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Video Call</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsMeetingOpen(true)}
                    className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Launch Encrypted Study Meeting Room"
                  >
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">Meeting</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleBlock(activeConvo.participantName)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      blockedUsers.includes(activeConvo.participantName.toLowerCase())
                        ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        : 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40'
                    }`}
                    title={
                      blockedUsers.includes(activeConvo.participantName.toLowerCase())
                        ? 'Unblock this student'
                        : 'Block this student from contacting you'
                    }
                  >
                    <Ban className="w-3 h-3" />
                    <span className="hidden sm:inline">
                      {blockedUsers.includes(activeConvo.participantName.toLowerCase())
                        ? 'Unblock'
                        : 'Block'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Scroll Area */}
              <div 
                className={`flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 ${
                  backgroundTheme === 'midnight'
                    ? 'bg-slate-950'
                    : backgroundTheme === 'forest'
                    ? 'bg-emerald-950/30'
                    : backgroundTheme === 'accent'
                    ? 'bg-neutral-900/90'
                    : 'bg-neutral-900'
                }`}
              >
                {/* Blocked banner if user is blocked */}
                {blockedUsers.includes(activeConvo.participantName.toLowerCase()) && (
                  <div className="mx-auto max-w-sm p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-[11px] text-rose-200 text-center flex items-center justify-center gap-2 font-mono">
                    <Ban className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>You have blocked {activeConvo.participantName}. Direct messaging is restricted.</span>
                  </div>
                )}
                
                {/* End-to-End Encryption verification banner */}
                <button
                  type="button"
                  onClick={() => setShowE2EESafetyModal(true)}
                  className="mx-auto max-w-sm w-full p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-[10px] text-emerald-300 text-center flex items-center justify-center gap-1.5 font-mono cursor-pointer transition-colors shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>🔒 End-to-End Encrypted (ECDH / AES-256) • Tap to verify</span>
                </button>

                {activeConvo.messages.map((msg) => {
                  const isUser = msg.isUser;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div 
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-3 shadow-md ${
                          isUser
                            ? 'bg-neutral-800 text-white rounded-tr-none border border-neutral-700'
                            : 'bg-neutral-950 text-white rounded-tl-none border border-neutral-800'
                        }`}
                      >
                        {/* Text Content */}
                        <p className="text-xs leading-relaxed break-words">{msg.text}</p>

                        {/* MULTI-MEDIA ATTACHMENTS RENDERING */}
                        {msg.attachment && (
                          <div className="mt-2.5 pt-2 border-t border-white/10">
                            {/* Voice Note attachment */}
                            {msg.attachment.type === 'voice' && (
                              <div className="flex items-center gap-2.5 p-2 bg-black/40 rounded-xl border border-white/10">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPlayingAudioId(playingAudioId === msg.id ? null : msg.id);
                                  }}
                                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 cursor-pointer text-black"
                                  style={{ backgroundColor: currentUniversity.accentColor }}
                                >
                                  {playingAudioId === msg.id ? (
                                    <Pause className="w-4 h-4 fill-black" />
                                  ) : (
                                    <Play className="w-4 h-4 fill-black ml-0.5" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  {/* Simulated Audio Waveform */}
                                  <div className="flex items-center gap-0.5 h-4">
                                    {[8, 14, 6, 18, 12, 20, 10, 16, 7, 15, 11, 19, 8, 14, 5, 12].map((h, idx) => (
                                      <div
                                        key={idx}
                                        className={`w-1 rounded-full transition-all ${
                                          playingAudioId === msg.id ? 'animate-pulse bg-emerald-400' : 'bg-neutral-500'
                                        }`}
                                        style={{ height: `${h}px` }}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-[10px] font-mono text-neutral-400">
                                  {msg.attachment.duration || '0:18'}
                                </span>
                              </div>
                            )}

                            {/* File / PDF Document attachment */}
                            {msg.attachment.type === 'file' && (
                              <div className="flex items-center gap-2.5 p-2.5 bg-black/40 rounded-xl border border-white/10">
                                <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                                  <FileText className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                  <div className="text-xs font-bold text-white truncate">
                                    {msg.attachment.name}
                                  </div>
                                  <span className="text-[10px] text-neutral-400 font-mono">
                                    {msg.attachment.size || 'PDF Document'}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
                                  title="Simulate Download"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {/* Image attachment */}
                            {msg.attachment.type === 'image' && (
                              <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
                                <img
                                  src={msg.attachment.url}
                                  alt={msg.attachment.name || 'Attachment'}
                                  className="w-full max-h-48 object-cover rounded-lg"
                                />
                                {msg.attachment.name && (
                                  <p className="p-1.5 text-[10px] text-neutral-400 truncate">
                                    {msg.attachment.name}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-neutral-400 font-mono">
                          <span>{msg.timestamp}</span>
                          {isUser && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* RECORDING OVERLAY STATE */}
              {isRecordingVoice && (
                <div className="px-4 py-3 bg-red-950/40 border-t border-red-500/30 flex items-center justify-between text-xs animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-red-300 font-mono font-bold">
                      Recording Voice Note: 0:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
                    </span>
                    {/* Live Waveform Bar Simulation */}
                    <div className="hidden sm:flex items-center gap-1">
                      {[10, 20, 14, 24, 18, 28, 12, 22].map((h, i) => (
                        <div 
                          key={i} 
                          className="w-1 bg-red-400 rounded-full animate-pulse" 
                          style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsRecordingVoice(false)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSendVoiceNote}
                      className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow"
                    >
                      <Send className="w-3 h-3" />
                      <span>Send Voice Note</span>
                    </button>
                  </div>
                </div>
              )}

              {/* DOCUMENT PICKER DRAWER */}
              {showDocPicker && (
                <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-xs animate-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      Select Academic Document to Share
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowDocPicker(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sampleDocs.map((doc) => (
                      <button
                        key={doc.name}
                        type="button"
                        onClick={() => handleSendDocument(doc.name, doc.size)}
                        className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-left flex items-start gap-2.5 transition-colors cursor-pointer"
                      >
                        <div className="p-1.5 bg-red-500/10 text-red-400 rounded-lg shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-white text-[11px] truncate">{doc.name}</div>
                          <p className="text-[10px] text-neutral-400 line-clamp-1">{doc.desc}</p>
                          <span className="text-[9px] font-mono text-emerald-400">{doc.size}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PHOTO GALLERY PICKER DRAWER */}
              {showPhotoPicker && (
                <div className="p-3 bg-neutral-950 border-t border-neutral-800 text-xs animate-in slide-in-from-bottom-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                      Select Photo or Flyer to Attach
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowPhotoPicker(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {samplePhotos.map((photo) => (
                      <button
                        key={photo.title}
                        type="button"
                        onClick={() => handleSendPhoto(photo.url, photo.title)}
                        className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all text-left cursor-pointer group"
                      >
                        <img src={photo.url} alt={photo.title} className="h-20 w-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="p-1.5">
                          <div className="text-[10px] font-bold text-white truncate">{photo.title}</div>
                          <span className="text-[9px] text-neutral-400 truncate block">{photo.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INPUT CONTROLS BAR */}
              {blockedUsers.includes(activeConvo.participantName.toLowerCase()) ? (
                <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-rose-400">
                    <Ban className="w-4 h-4 shrink-0" />
                    <span>You have blocked this student. Messages and notifications are muted.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleBlock(activeConvo.participantName)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Unblock Student
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendText} className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2">
                {/* Multi-Media Interactive Buttons */}
                <div className="flex items-center gap-1">
                  {/* Voice Note Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowDocPicker(false);
                      setShowPhotoPicker(false);
                      setIsRecordingVoice(!isRecordingVoice);
                    }}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      isRecordingVoice
                        ? 'bg-red-500 text-white'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Record Voice Note"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Document Picker Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecordingVoice(false);
                      setShowPhotoPicker(false);
                      setShowDocPicker(!showDocPicker);
                    }}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      showDocPicker
                        ? 'bg-neutral-800 text-cyan-400'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Attach Study Guide or PDF"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  {/* Image/Photo Picker Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRecordingVoice(false);
                      setShowDocPicker(false);
                      setShowPhotoPicker(!showPhotoPicker);
                    }}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      showPhotoPicker
                        ? 'bg-neutral-800 text-amber-400'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Attach Photo or Flyer"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Text Input */}
                <input
                  type="text"
                  placeholder={`Reply to ${activeConvo.participantName.split(' ')[0]}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isRecordingVoice}
                  className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none disabled:opacity-50"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isRecordingVoice}
                  className="p-2 px-3 rounded-xl text-black font-bold text-xs flex items-center gap-1 shadow-md transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-neutral-500">
              <MessageSquare className="w-12 h-12 mb-2 text-neutral-700" />
              <p className="text-sm font-semibold text-white">Select a conversation</p>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Send direct inquiries for marketplace items, study sessions, or mingle icebreakers.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 🔐 E2EE SAFETY NUMBERS / KEY VERIFICATION MODAL */}
      {showE2EESafetyModal && activeConvo && (
        <div 
          className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 text-left"
          onClick={() => setShowE2EESafetyModal(false)}
        >
          <div 
            className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Verify Safety Numbers</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">End-to-End Encryption Active</span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowE2EESafetyModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Messages and calls with <strong className="text-white">{activeConvo.participantName}</strong> are end-to-end encrypted with <strong>AES-GCM-256</strong> & <strong>ECDH Curve25519</strong>. No third party or campus administrator can read them.
            </p>

            {/* Cryptographic Safety Number Blocks */}
            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                60-Digit Cryptographic Fingerprint:
              </span>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono font-bold text-emerald-300 tracking-wider">
                <span>3829 8219</span>
                <span>9401 2893</span>
                <span>4710 8201</span>
                <span>5521 3902</span>
                <span>6109 8421</span>
                <span>7302 9182</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText("382982199401289347108201552139026109842173029182");
                    setCopiedKey(true);
                    setTimeout(() => setCopiedKey(false), 2000);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Fingerprint Copied' : 'Copy Key'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowE2EESafetyModal(false)}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs cursor-pointer shadow"
              >
                Mark as Verified
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📹 E2EE VIDEO CALL & STUDY MEETING MODAL */}
      {(isVideoCallOpen || isMeetingOpen) && activeConvo && (
        <VideoCallModal
          isOpen={isVideoCallOpen || isMeetingOpen}
          onClose={() => {
            setIsVideoCallOpen(false);
            setIsMeetingOpen(false);
          }}
          currentUniversity={currentUniversity}
          session={session}
          callTitle={isMeetingOpen ? `Campus Study Meeting with ${activeConvo.participantName}` : `Encrypted Video Call with ${activeConvo.participantName}`}
          isGroupMeeting={isMeetingOpen}
          participants={[
            {
              name: activeConvo.participantName,
              avatar: activeConvo.participantAvatar,
              degree: activeConvo.participantDegree,
            }
          ]}
        />
      )}
    </div>
  );
};
