import React, { useState, useEffect, useRef } from 'react';
import { University, UserSession } from '../types';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  ShieldCheck, 
  Users, 
  Share2, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Hand, 
  MonitorUp, 
  MessageSquare, 
  Sparkles,
  Volume2
} from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  session: UserSession;
  callTitle: string;
  isGroupMeeting?: boolean;
  participants: Array<{
    name: string;
    avatar: string;
    degree?: string;
    role?: string;
  }>;
}

export const VideoCallModal: React.FC<VideoCallModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  session,
  callTitle,
  isGroupMeeting = false,
  participants,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [meetingChatOpen, setMeetingChatOpen] = useState(false);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [meetingChatInput, setMeetingChatInput] = useState('');
  const [meetingMessages, setMeetingMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Campus System', text: '🔒 Secure meeting room initialized with End-to-End Encryption.', time: 'Just now' },
    { sender: participants[0]?.name || 'Study Partner', text: 'Hey, I can hear you clearly! Ready to review the lecture slides?', time: 'Just now' }
  ]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Generate a deterministic room code for this call session
  const [roomCode] = useState(() => `${currentUniversity.shortName.toUpperCase()}-ROOM-${Math.floor(1000 + Math.random() * 9000)}`);

  // Call timer
  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      return;
    }
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Try real camera preview if available, otherwise fail gracefully to simulated campus stream
  useEffect(() => {
    if (!isOpen || isVideoOff) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
        mediaStreamRef.current = null;
      }
      return;
    }

    let isMounted = true;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (!isMounted) {
            stream.getTracks().forEach(t => t.stop());
            return;
          }
          mediaStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera permission denied or in iframe - fallback to stylized campus stream UI
        });
    }

    return () => {
      isMounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [isOpen, isVideoOff]);

  if (!isOpen) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyMeetingLink = () => {
    const link = `${window.location.origin}/#meeting=${roomCode}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSendMeetingMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingChatInput.trim()) return;
    setMeetingMessages(prev => [
      ...prev,
      {
        sender: session.fullName,
        text: meetingChatInput.trim(),
        time: formatDuration(callDuration),
      }
    ]);
    setMeetingChatInput('');
  };

  const handleHangUp = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col text-white select-none">
      {/* Top Meeting Header */}
      <div 
        className="px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0"
        style={{ backgroundColor: `${currentUniversity.primaryColor}ee` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/20 flex items-center justify-center text-emerald-400">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">{callTitle}</span>
              <span className="flex items-center gap-1 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                E2EE Active
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-white/70 mt-0.5">
              <span className="font-mono text-emerald-400 font-bold">{formatDuration(callDuration)}</span>
              <span>•</span>
              <span className="font-mono text-white/90">Room: {roomCode}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyMeetingLink}
            className="px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/60 border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Invite Link'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMeetingChatOpen(!meetingChatOpen)}
            className={`p-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              meetingChatOpen 
                ? 'bg-white text-black border-white' 
                : 'bg-black/40 hover:bg-black/60 border-white/20 text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">In-Call Chat</span>
          </button>
        </div>
      </div>

      {/* Main Video Area & In-Call Chat Sidebar */}
      <div className="flex-1 flex overflow-hidden p-3 gap-3">
        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 h-full min-h-0">
          {/* Tile 1: Remote Participant */}
          <div className="relative rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col items-center justify-center p-4 shadow-xl">
            {/* Background ambient lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

            {/* Remote Avatar / Simulation */}
            <div className="relative z-0 flex flex-col items-center">
              <div className="relative">
                <img
                  src={participants[0]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                  alt={participants[0]?.name || 'Participant'}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-emerald-500/40 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-neutral-900 flex items-center justify-center">
                  <Volume2 className="w-3 h-3 text-black animate-pulse" />
                </div>
              </div>

              <h4 className="font-bold text-base text-white mt-3">
                {participants[0]?.name || 'Campus Peer'}
              </h4>
              <p className="text-xs text-neutral-400 font-mono">
                {participants[0]?.degree || `${currentUniversity.shortName} Student`}
              </p>

              {/* Audio Wave Simulation */}
              <div className="flex items-center gap-1 mt-4 h-6">
                <div className="w-1 bg-emerald-400 rounded-full h-3 animate-pulse" />
                <div className="w-1 bg-emerald-400 rounded-full h-5 animate-pulse delay-75" />
                <div className="w-1 bg-emerald-400 rounded-full h-6 animate-pulse delay-150" />
                <div className="w-1 bg-emerald-400 rounded-full h-4 animate-pulse delay-100" />
                <div className="w-1 bg-emerald-400 rounded-full h-2 animate-pulse" />
              </div>
            </div>

            {/* Remote Tile Badge */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{participants[0]?.name || 'Partner'}</span>
              </div>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-md font-mono border border-emerald-500/40">
                1080p HD
              </span>
            </div>
          </div>

          {/* Tile 2: Local User Stream */}
          <div className="relative rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden flex flex-col items-center justify-center p-4 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

            {!isVideoOff ? (
              <>
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Fallback avatar behind video if video stream is blank */}
                <div className="relative z-0 flex flex-col items-center">
                  <img
                    src={session.avatarUrl}
                    alt={session.fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs text-neutral-400 mt-2 font-mono">Live Camera Stream</span>
                </div>
              </>
            ) : (
              <div className="relative z-0 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-neutral-800 border-2 border-neutral-700 flex items-center justify-center text-neutral-400">
                  <VideoOff className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-sm text-white mt-3">{session.fullName}</h4>
                <p className="text-xs text-neutral-400">Camera Paused</p>
              </div>
            )}

            {/* Screen Share Overlay Indicator */}
            {isScreenSharing && (
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold flex items-center gap-1.5">
                <MonitorUp className="w-3.5 h-3.5" />
                <span>Presenting Screen</span>
              </div>
            )}

            {/* Hand Raised Indicator */}
            {isHandRaised && (
              <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-lg bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-1.5 animate-bounce">
                <Hand className="w-3.5 h-3.5" />
                <span>Hand Raised</span>
              </div>
            )}

            {/* Local Tile Badge */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
              <div className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold flex items-center gap-1.5">
                <span>{session.fullName} (You)</span>
                {isMuted && <MicOff className="w-3 h-3 text-rose-400" />}
              </div>
            </div>
          </div>
        </div>

        {/* Optional Meeting Chat Sidebar */}
        {meetingChatOpen && (
          <div className="w-80 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col shrink-0 overflow-hidden shadow-2xl">
            <div className="p-3 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">In-Call Messages</span>
              </div>
              <button
                type="button"
                onClick={() => setMeetingChatOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
              {meetingMessages.map((msg, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
                    <span className="font-bold text-neutral-300">{msg.sender}</span>
                    <span className="font-mono">{msg.time}</span>
                  </div>
                  <p className="text-neutral-200 text-[11px] leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMeetingMessage} className="p-2 border-t border-neutral-800 bg-neutral-950 flex gap-1.5">
              <input
                type="text"
                value={meetingChatInput}
                onChange={(e) => setMeetingChatInput(e.target.value)}
                placeholder="Message in call..."
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Interactive Bottom Control Bar */}
      <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-center gap-3 sm:gap-4 shrink-0">
        {/* Toggle Mic */}
        <button
          type="button"
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3.5 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-lg ${
            isMuted 
              ? 'bg-rose-500 hover:bg-rose-600 text-white ring-4 ring-rose-500/20' 
              : 'bg-neutral-800 hover:bg-neutral-700 text-white'
          }`}
          title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {/* Toggle Camera */}
        <button
          type="button"
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3.5 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-lg ${
            isVideoOff 
              ? 'bg-rose-500 hover:bg-rose-600 text-white ring-4 ring-rose-500/20' 
              : 'bg-neutral-800 hover:bg-neutral-700 text-white'
          }`}
          title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
        >
          {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </button>

        {/* Toggle Screen Share */}
        <button
          type="button"
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`p-3.5 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-lg ${
            isScreenSharing 
              ? 'bg-cyan-500 hover:bg-cyan-600 text-black ring-4 ring-cyan-500/20' 
              : 'bg-neutral-800 hover:bg-neutral-700 text-white'
          }`}
          title={isScreenSharing ? 'Stop Screen Share' : 'Share Presentation Screen'}
        >
          <MonitorUp className="w-5 h-5" />
        </button>

        {/* Raise Hand */}
        <button
          type="button"
          onClick={() => setIsHandRaised(!isHandRaised)}
          className={`p-3.5 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-lg ${
            isHandRaised 
              ? 'bg-amber-500 hover:bg-amber-600 text-black ring-4 ring-amber-500/20' 
              : 'bg-neutral-800 hover:bg-neutral-700 text-white'
          }`}
          title={isHandRaised ? 'Lower Hand' : 'Raise Hand'}
        >
          <Hand className="w-5 h-5" />
        </button>

        {/* Hang Up Button */}
        <button
          type="button"
          onClick={handleHangUp}
          className="px-6 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-rose-600/30 transition-all cursor-pointer ml-2"
        >
          <PhoneOff className="w-5 h-5" />
          <span className="hidden sm:inline">Leave Call</span>
        </button>
      </div>
    </div>
  );
};
