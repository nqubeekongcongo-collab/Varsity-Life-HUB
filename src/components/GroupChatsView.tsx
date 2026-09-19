import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, University, UserSession, DirectMessageAttachment } from '../types';
import { CampusIsolationService } from '../services/dataIsolation';
import { CampusIsolationBanner } from './CampusIsolationBanner';
import { VideoCallModal } from './VideoCallModal';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Hash, 
  Smile, 
  Sparkles, 
  Heart, 
  Flame, 
  Coffee,
  CheckCheck,
  Mic,
  Paperclip,
  Image as ImageIcon,
  X,
  Play,
  Pause,
  FileText,
  Download,
  AlertTriangle,
  Radio,
  Video,
  Calendar,
  UserPlus,
  Plus,
  Lock,
  ShieldCheck,
  Check
} from 'lucide-react';

export interface FriendsGroup {
  id: string;
  name: string;
  desc: string;
  icon: string;
  category: string;
  isEncrypted: boolean;
  memberCount: number;
}

interface GroupChatsViewProps {
  currentUniversity: University;
  session: UserSession;
  chatData: Record<string, ChatMessage[]>;
  onSendMessage: (channelId: string, message: Omit<ChatMessage, 'id' | 'timestamp' | 'isUser'>) => void;
  onReportMessage?: (text: string, sender: string) => void;
}

export const GroupChatsView: React.FC<GroupChatsViewProps> = ({
  currentUniversity,
  session,
  chatData,
  onSendMessage,
  onReportMessage,
}) => {
  const [activeChannel, setActiveChannel] = useState<string>('#ResLife');
  const [inputText, setInputText] = useState('');
  const [isTypingSimulated, setIsTypingSimulated] = useState(false);

  // Video Call & Meeting States
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);

  // Friends Groups state
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupIcon, setNewGroupIcon] = useState('🎓');
  const [newGroupCategory, setNewGroupCategory] = useState('Friends & Res');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [newGroupEncrypted, setNewGroupEncrypted] = useState(true);

  const [friendsGroups, setFriendsGroups] = useState<FriendsGroup[]>(() => {
    try {
      const saved = localStorage.getItem(`varsity_hub_friends_groups_${currentUniversity.id}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'group-law-squad',
        name: 'Law Faculty & Moot Squad',
        desc: 'Case law prep, study desk reservations and tutorial notes',
        icon: '⚖️',
        category: 'Study Circle',
        isEncrypted: true,
        memberCount: 5,
      },
      {
        id: 'group-res-braai',
        name: 'Res Flat 4B & Braai Crew',
        desc: 'Weekend cooking rosters, groceries and chill sessions',
        icon: '🥩',
        category: 'Friends & Res',
        isEncrypted: true,
        memberCount: 7,
      }
    ];
  });

  // Multi-Media Input States
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState<NodeJS.Timeout | null>(null);
  const [showDocPicker, setShowDocPicker] = useState(false);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const defaultChannels: Array<{ id: string; name: string; desc: string; icon: string; isEncrypted?: boolean }> = [
    { id: '#ResLife', name: '#ResLife', desc: 'Dining halls, res braais & dorm chatter', icon: '🏡' },
    { id: '#CampusGossip', name: '#CampusGossip', desc: 'Geese, lecturers & anonymous campus juice', icon: '👀' },
    { id: '#ExamPrep', name: '#ExamPrep', desc: 'Past papers, formulas & study circles', icon: '📚' },
    { id: '#RideShare', name: '#RideShare-CampusLift', desc: 'Weekend lifts, Gautrain & carpools', icon: '🚗' },
  ];

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const newGroup: FriendsGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName.trim(),
      desc: newGroupDesc.trim() || 'Private campus peer group',
      icon: newGroupIcon,
      category: newGroupCategory,
      isEncrypted: newGroupEncrypted,
      memberCount: 2,
    };

    const updated = [...friendsGroups, newGroup];
    setFriendsGroups(updated);
    try {
      localStorage.setItem(`varsity_hub_friends_groups_${currentUniversity.id}`, JSON.stringify(updated));
    } catch {}

    // Switch to the newly created group
    setActiveChannel(newGroup.name);
    setNewGroupName('');
    setNewGroupDesc('');
    setShowCreateGroupModal(false);
  };

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

  // Strictly isolate chats to current university partition
  const isolatedChatData = CampusIsolationService.filterGroupChats(chatData, currentUniversity.id);
  const currentChannelMessages = isolatedChatData[activeChannel] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChannelMessages, activeChannel, isRecordingVoice]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsgText = inputText.trim();
    setInputText('');

    onSendMessage(activeChannel, {
      universityId: currentUniversity.id,
      channelId: activeChannel,
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      senderRes: session.resHall,
      text: userMsgText,
      likes: 1,
    });

    // Simulate authentic campus peer reply
    setTimeout(() => {
      setIsTypingSimulated(true);
      setTimeout(() => {
        setIsTypingSimulated(false);
        const repliesByChannel: Record<string, string[]> = {
          '#ResLife': [
            `100%! Also don't forget to lock your door if you're heading out to the library tonight.`,
            `True! Anyone going down to the dining hall right now?`,
            `Shout out to whoever left the extra heater in the laundry room!`,
          ],
          '#CampusGossip': [
            `NO WAY 😂 That actually happened right in front of the student center!`,
            `Campus security had no chance haha!`,
            `That's classic ${currentUniversity.shortName} behavior right there.`,
          ],
          '#ExamPrep': [
            `Good point. Does anyone have the worked solutions for Question 3 from the 2025 paper?`,
            `I am at table 4 in the 24hr lab right now if you want to compare notes!`,
            `That section will definitely be on the exam, the lecturer hinted at it yesterday.`,
          ],
          '#RideShare': [
            `DMed you for a spot! Heading that way as well.`,
            `Safe travels! Road works on the N1 near the toll plaza so head out early.`,
            `Thanks for organizing this carpool!`,
          ],
        };

        const channelReplies = repliesByChannel[activeChannel] || ['Noted, thanks for sharing!'];
        const randomReply = channelReplies[Math.floor(Math.random() * channelReplies.length)];

        onSendMessage(activeChannel, {
          universityId: currentUniversity.id,
          channelId: activeChannel,
          senderName: 'Lindiwe Dube',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          senderRes: 'Campus Student',
          text: randomReply,
          likes: 2,
        });
      }, 1600);
    }, 800);
  };

  const handleSendVoiceNote = () => {
    const durationStr = `0:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}`;

    onSendMessage(activeChannel, {
      universityId: currentUniversity.id,
      channelId: activeChannel,
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      senderRes: session.resHall,
      text: `🎙️ Voice Note (${durationStr})`,
      likes: 1,
      attachment: {
        type: 'voice',
        duration: durationStr,
        name: `Voice_Note_${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    });

    setIsRecordingVoice(false);
  };

  const handleSendDocument = (docName: string, docSize: string) => {
    onSendMessage(activeChannel, {
      universityId: currentUniversity.id,
      channelId: activeChannel,
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      senderRes: session.resHall,
      text: `📁 Shared Document: ${docName}`,
      likes: 2,
      attachment: {
        type: 'document',
        name: docName,
        size: docSize,
      }
    });

    setShowDocPicker(false);
  };

  const handleSendPhoto = (photoUrl: string, caption: string) => {
    onSendMessage(activeChannel, {
      universityId: currentUniversity.id,
      channelId: activeChannel,
      senderName: session.fullName,
      senderAvatar: session.avatarUrl,
      senderRes: session.resHall,
      text: caption,
      likes: 3,
      attachment: {
        type: 'image',
        url: photoUrl,
        name: 'Campus_Photo.jpg'
      }
    });

    setShowPhotoPicker(false);
  };

  const quickReactions = ['🔥', '😂', '💯', '☕️', '🙏', '❤️'];

  const sampleStudyDocs = [
    { name: `${currentUniversity.shortName}_Semester1_Exam_Scope.pdf`, size: '2.4 MB' },
    { name: `Calculus_W101_CheatSheet_Formulas.pdf`, size: '1.1 MB' },
    { name: `ResLife_Braai_Budget_Spreadsheet.xlsx`, size: '420 KB' },
  ];

  const samplePhotos = [
    { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80', label: 'Study Group at Student Centre' },
    { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80', label: 'Campus Sunset Lawn' },
    { url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80', label: 'Varsity Social & Braai' },
  ];

  return (
    <div className="space-y-3 pb-20 text-left">
      {/* Real-time Campus Data Isolation & Security Partition Banner */}
      <CampusIsolationBanner 
        currentUniversity={currentUniversity} 
        sectionName="Group Chats" 
        itemCount={currentChannelMessages.length} 
      />

      {/* Top Channel Switcher Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {/* Default channels */}
        {defaultChannels.map((ch) => {
          const isActive = activeChannel === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChannel(ch.id)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'text-black font-bold shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
              style={isActive ? { backgroundColor: currentUniversity.accentColor } : {}}
            >
              <span>{ch.icon}</span>
              <span>{ch.name}</span>
            </button>
          );
        })}

        {/* User Created Friends Groups */}
        {friendsGroups.map((group) => {
          const isActive = activeChannel === group.name;
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => setActiveChannel(group.name)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'text-black font-bold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border border-emerald-500/30'
              }`}
              style={isActive ? { backgroundColor: currentUniversity.accentColor } : {}}
            >
              <span>{group.icon}</span>
              <span>{group.name}</span>
              {group.isEncrypted && <Lock className="w-2.5 h-2.5 text-emerald-400" />}
            </button>
          );
        })}

        {/* Create Friends Group Button */}
        <button
          type="button"
          onClick={() => setShowCreateGroupModal(true)}
          className="px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>+ Friends Group</span>
        </button>
      </div>

      {/* Chat Room Window */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col h-[520px] shadow-xl">
        {/* Room Header */}
        <div 
          className="p-3.5 border-b border-neutral-800 text-white flex items-center justify-between gap-2"
          style={{ backgroundColor: `${currentUniversity.primaryColor}33` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Hash className="w-4 h-4 text-neutral-400 shrink-0" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">{activeChannel}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-neutral-300 shrink-0">
                  {currentUniversity.shortName} Campus
                </span>
                {friendsGroups.some(g => g.name === activeChannel && g.isEncrypted) && (
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30 shrink-0">
                    <Lock className="w-2.5 h-2.5" /> E2EE
                  </span>
                )}
              </div>
              <p className="text-[10px] text-neutral-400 truncate">
                {defaultChannels.find((c) => c.id === activeChannel)?.desc ||
                 friendsGroups.find((g) => g.name === activeChannel)?.desc ||
                 'Campus student collaboration room'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Start Live Video Call Button */}
            <button
              type="button"
              onClick={() => setIsVideoCallOpen(true)}
              className="px-2 sm:px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Start live video call with peers"
            >
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Call</span>
            </button>

            {/* Start Study Meeting Room Button */}
            <button
              type="button"
              onClick={() => setIsMeetingOpen(true)}
              className="px-2 sm:px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Launch online study meeting with screen sharing"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Meet</span>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-neutral-950/60">
          {currentChannelMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-xs">
              <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
              <p>No messages in {activeChannel} yet.</p>
              <p className="text-[10px] text-neutral-600">Start the conversation for {currentUniversity.shortName}!</p>
            </div>
          ) : (
            currentChannelMessages.map((msg) => {
              const isMe = msg.senderName === session.fullName;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 items-start ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover border border-neutral-700 shrink-0 mt-0.5"
                  />

                  <div className={`max-w-[80%] sm:max-w-[70%] space-y-1 ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className={`flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-neutral-300 font-semibold">{msg.senderName}</span>
                      {msg.senderRes && <span>• {msg.senderRes}</span>}
                      <span>• {msg.timestamp}</span>

                      {!isMe && onReportMessage && (
                        <button
                          type="button"
                          onClick={() => onReportMessage(msg.text, msg.senderName)}
                          className="text-neutral-500 hover:text-amber-400 ml-1 p-0.5"
                          title="Report message"
                        >
                          <AlertTriangle className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed break-words shadow-md space-y-2 ${
                        isMe
                          ? 'text-white rounded-br-xs'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-xs'
                      }`}
                      style={isMe ? { backgroundColor: currentUniversity.primaryColor } : {}}
                    >
                      {/* Attached Voice Note */}
                      {msg.attachment?.type === 'voice' && (
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/40 border border-white/10">
                          <button
                            type="button"
                            onClick={() => setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)}
                            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors shrink-0"
                          >
                            {playingAudioId === msg.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300">
                              <span>Voice Note</span>
                              <span>{msg.attachment.duration || '0:12'}</span>
                            </div>
                            {/* Animated sound wave bars */}
                            <div className="flex items-center gap-0.5 mt-1 h-3">
                              {[3, 8, 12, 6, 10, 14, 8, 4, 11, 7, 5, 10, 4].map((h, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1 rounded-full bg-white/80 ${playingAudioId === msg.id ? 'animate-pulse' : ''}`}
                                  style={{ height: `${h}px` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Attached Document */}
                      {msg.attachment?.type === 'document' && (
                        <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileText className="w-5 h-5 text-cyan-400 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-white truncate block">{msg.attachment.name}</span>
                              <span className="text-[10px] text-neutral-400 font-mono">{msg.attachment.size}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800 shrink-0">
                            Download
                          </span>
                        </div>
                      )}

                      {/* Attached Image */}
                      {msg.attachment?.type === 'image' && (
                        <div className="rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={msg.attachment.url}
                            alt="Attached campus photo"
                            className="w-full max-h-48 object-cover"
                          />
                        </div>
                      )}

                      <div>{msg.text}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing indicator */}
          {isTypingSimulated && (
            <div className="flex items-center gap-2 text-xs text-neutral-400 italic font-mono pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0.4s]" />
              <span>Peer is typing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reaction Tray */}
        <div className="px-3 py-1 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-neutral-500 font-mono shrink-0">Quick React:</span>
          <div className="flex items-center gap-1">
            {quickReactions.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setInputText((prev) => prev + ' ' + emoji)}
                className="p-1 hover:bg-neutral-800 rounded text-xs transition-colors cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE VOICE RECORDING SIMULATION BANNER */}
        {isRecordingVoice ? (
          <div className="p-3 bg-rose-950/70 border-t border-rose-800 flex items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-2 text-xs text-rose-200">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="font-bold">Recording Voice Note...</span>
              <span className="font-mono text-xs text-white bg-black/40 px-2 py-0.5 rounded">
                0:{recordingSeconds < 10 ? '0' : ''}{recordingSeconds}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRecordingVoice(false)}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendVoiceNote}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow"
              >
                <Send className="w-3 h-3" />
                <span>Send Note</span>
              </button>
            </div>
          </div>
        ) : (
          /* Input Message Form with MULTI-MEDIA ICON BUTTONS */
          <form onSubmit={handleSend} className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center gap-2">
            {/* Multi-media action buttons */}
            <div className="flex items-center gap-1">
              {/* 🎙️ Voice Note Button */}
              <button
                type="button"
                onClick={() => setIsRecordingVoice(true)}
                className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors cursor-pointer"
                title="Record Voice Note"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* 📁 File Upload Button */}
              <button
                type="button"
                onClick={() => setShowDocPicker(!showDocPicker)}
                className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-cyan-400 border border-neutral-800 transition-colors cursor-pointer"
                title="Share Study Guide or Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* 📸 Photo/Video Attachment Button */}
              <button
                type="button"
                onClick={() => setShowPhotoPicker(!showPhotoPicker)}
                className="p-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 border border-neutral-800 transition-colors cursor-pointer"
                title="Attach Campus Photo or Video"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              placeholder={`Message ${activeChannel} as ${session.fullName.split(' ')[0]}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="py-2.5 px-4 rounded-xl text-black font-extrabold text-xs flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition-all cursor-pointer shrink-0 shadow-md"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        )}

        {/* DOCUMENT PICKER TRAY */}
        {showDocPicker && (
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1">
                <Paperclip className="w-3 h-3" /> Select Campus Study Guide / PDF to Share
              </span>
              <button onClick={() => setShowDocPicker(false)} className="text-neutral-500 hover:text-white text-xs">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sampleStudyDocs.map((doc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendDocument(doc.name, doc.size)}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-white truncate">{doc.name}</p>
                    <p className="text-[10px] font-mono text-neutral-400">{doc.size}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PHOTO PICKER TRAY */}
        {showPhotoPicker && (
          <div className="p-3 bg-neutral-950 border-t border-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> Attach Campus Photo
              </span>
              <button onClick={() => setShowPhotoPicker(false)} className="text-neutral-500 hover:text-white text-xs">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {samplePhotos.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendPhoto(photo.url, photo.label)}
                  className="relative rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-400 group transition-colors cursor-pointer h-16"
                >
                  <img src={photo.url} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1 text-center">
                    <span className="text-[10px] text-white font-bold truncate">{photo.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 👥 CREATE FRIENDS GROUP MODAL */}
      {showCreateGroupModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-left"
          onClick={() => setShowCreateGroupModal(false)}
        >
          <div 
            className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Create Friends Group</h4>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {currentUniversity.shortName} Campus Circle
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowCreateGroupModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Res 3rd Floor Squad, Moot Court Team..."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                    Group Emoji
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['🎓', '⚖️', '🍕', '💻', '⚽️', '🎉', '☕️', '📚'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setNewGroupIcon(emoji)}
                        className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center transition-all ${
                          newGroupIcon === emoji
                            ? 'bg-neutral-700 ring-2 ring-emerald-400 scale-110'
                            : 'bg-neutral-800 hover:bg-neutral-700'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newGroupCategory}
                    onChange={(e) => setNewGroupCategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                  >
                    <option value="Friends & Res">Friends & Res</option>
                    <option value="Study Circle">Study Circle</option>
                    <option value="Campus Society">Campus Society</option>
                    <option value="Sports & Fitness">Sports & Fitness</option>
                    <option value="Hackathon & Tech">Hackathon & Tech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                  Purpose / Description
                </label>
                <textarea
                  rows={2}
                  placeholder="What is this group for? (e.g. Exam past papers, weekend lifts, res dinners)"
                  value={newGroupDesc}
                  onChange={(e) => setNewGroupDesc(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none resize-none"
                />
              </div>

              {/* End-to-End Encryption toggle */}
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newGroupEncrypted}
                  onChange={(e) => setNewGroupEncrypted(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 bg-neutral-900 border-neutral-700 focus:ring-0"
                />
                <div className="flex-1 text-[11px]">
                  <span className="font-semibold text-white flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> End-to-End Encrypted Group
                  </span>
                  <span className="text-[10px] text-neutral-400 block">
                    Messages and video streams stay encrypted among group members only.
                  </span>
                </div>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-black font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📹 VIDEO CALL & STUDY MEETING MODAL */}
      {(isVideoCallOpen || isMeetingOpen) && (
        <VideoCallModal
          isOpen={isVideoCallOpen || isMeetingOpen}
          onClose={() => {
            setIsVideoCallOpen(false);
            setIsMeetingOpen(false);
          }}
          currentUniversity={currentUniversity}
          session={session}
          callTitle={isMeetingOpen ? `Virtual Study Meeting — ${activeChannel}` : `Group Video Call — ${activeChannel}`}
          isGroupMeeting={true}
          participants={[
            {
              name: session.fullName,
              avatar: session.avatarUrl,
              degree: session.degree,
            },
            {
              name: 'Sipho Dlamini',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              degree: 'BSc Computer Science',
            },
            {
              name: 'Liam Van Zyl',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              degree: 'BEng Mechatronics',
            }
          ]}
        />
      )}
    </div>
  );
};
