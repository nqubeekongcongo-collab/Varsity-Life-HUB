import React, { useState, useRef, useEffect } from 'react';
import { University, UserSession } from '../types';
import { AI_SUPPORT_KNOWLEDGE_BASE } from '../data/extendedData';
import { 
  HelpCircle, 
  Bot, 
  Send, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  FileQuestion, 
  Headphones,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  session: UserSession;
  onDeleteAccount?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const HelpSupportModal: React.FC<HelpSupportModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  session,
  onDeleteAccount,
}) => {
  const [activeTab, setActiveTab] = useState<'ai_chat' | 'faq' | 'ticket' | 'privacy_popia'>('ai_chat');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Dumelang & Hallo ${session.fullName.split(' ')[0]}! I am your ${currentUniversity.shortName} AI Campus Assistant. How can I assist you with Marketplace selling, Single & Mingle safety, or campus facilities today?`,
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isBotThinking, setIsBotThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // FAQ State
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Ticket State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Marketplace & Payments');
  const [ticketDescription, setTicketDescription] = useState('');
  const [submittedTicketRef, setSubmittedTicketRef] = useState<string | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isBotThinking]);

  if (!isOpen) return null;

  // AI Assistant logic
  const handleSendChat = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    setInputQuery('');
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsBotThinking(true);

    setTimeout(() => {
      setIsBotThinking(false);
      const lower = query.toLowerCase();

      // Find matching knowledge base entry
      const match = AI_SUPPORT_KNOWLEDGE_BASE.find((entry) =>
        entry.keywords.some((kw) => lower.includes(kw))
      );

      let replyText = '';
      if (match) {
        replyText = match.answer;
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        replyText = `Hello! How can I help you today with ${currentUniversity.name} campus life, marketplace trade, or safety tools?`;
      } else {
        replyText = `I understand you are asking about: "${query}". For specific inquiries regarding your ${currentUniversity.shortName} student record or disciplinary matters, our support staff is ready to help. You can also escalate directly to our team at varsitylifehub@gmail.com!`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  // FAQ Database
  const faqs = [
    {
      q: 'How do I verify my .ac.za university email?',
      a: `Varsity Life HUB automatically validates the domain corresponding to ${currentUniversity.name} (e.g. @mynwu.ac.za, @students.wits.ac.za, @myuct.ac.za). When signing up, a 6-digit one-time PIN is delivered to your student email to activate full marketplace and chat privileges.`
    },
    {
      q: 'How does payment work safely on the Marketplace?',
      a: 'We strictly recommend in-person handovers in high-traffic campus areas like the Student Centre or Library Foyer. Before handing over goods, ensure your banking app confirms clear funds (instant EFT) or accept cash. Never accept proof-of-payment SMS screenshots without verifying your own account balance.'
    },
    {
      q: 'Is Single & Mingle anonymous and safe?',
      a: 'Only your first name, age, faculty, and public profile photo are visible. Your student registration number, phone number, and physical room address are strictly hidden. Always meet in public campus dining spots or coffee shops for first dates.'
    },
    {
      q: 'What should I do during Loadshedding for my assignments?',
      a: `Check our top utility banner for your campus's current power stage. The main 24-hour libraries and IT labs across ${currentUniversity.name} are equipped with campus backup generators and unbroken Wi-Fi to support your assignment deadlines.`
    },
    {
      q: 'How do I report a suspicious listing or harassment?',
      a: 'Tap the ⚠️ Report button situated on every post, marketplace item, or profile. Choose the violation reason and our student moderation team will investigate and take disciplinary action.'
    },
    {
      q: 'How do I find my campus emergency numbers?',
      a: 'Tap the floating 🛡️ Emergency SOS icon in the top header to reveal direct dials to your campus protection unit, 24/7 guard posts, and national emergency lines (SAPS 10111).'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `TK-${currentUniversity.shortName.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedTicketRef(code);
  };

  const quickPrompts = [
    'How do I sell a book?',
    'Is Single & Mingle safe?',
    'Emergency help?',
    'Loadshedding schedule?'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in">
      <div 
        className="w-full max-w-2xl h-[90vh] max-h-[720px] bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col text-left relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div 
          className="p-4 text-white flex items-center justify-between"
          style={{ backgroundColor: `${currentUniversity.primaryColor}F0` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                <span>{currentUniversity.shortName} Help & Student Support</span>
              </h3>
              <span className="text-[10px] font-mono text-white/80">
                24/7 AI Assistance • Campus Safety & FAQs
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-black/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-3 pt-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('ai_chat')}
            className={`pb-2 px-3 font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'ai_chat'
                ? 'text-white border-cyan-400'
                : 'text-neutral-400 border-transparent hover:text-neutral-200'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI Campus Assistant</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faq')}
            className={`pb-2 px-3 font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'faq'
                ? 'text-white border-amber-400'
                : 'text-neutral-400 border-transparent hover:text-neutral-200'
            }`}
          >
            <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
            <span>Campus FAQs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ticket')}
            className={`pb-2 px-3 font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'ticket'
                ? 'text-white border-emerald-400'
                : 'text-neutral-400 border-transparent hover:text-neutral-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Submit Ticket</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy_popia')}
            className={`pb-2 px-3 font-bold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'privacy_popia'
                ? 'text-white border-purple-400'
                : 'text-neutral-400 border-transparent hover:text-neutral-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>POPIA & Privacy</span>
          </button>
        </div>

        {/* TAB 1: AI CAMPUS ASSISTANT LIVE CHAT */}
        {activeTab === 'ai_chat' && (
          <div className="flex-1 flex flex-col bg-neutral-900 overflow-hidden">
            {/* Quick suggestions pills */}
            <div className="p-2.5 bg-neutral-950/60 border-b border-neutral-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-[10px] text-neutral-500 font-mono shrink-0">Ask:</span>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSendChat(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white shrink-0 transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat message bubbles */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm text-black"
                        style={{ backgroundColor: currentUniversity.accentColor }}
                      >
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                        isBot
                          ? 'bg-neutral-950 text-neutral-200 border border-neutral-800 rounded-tl-none'
                          : 'bg-neutral-800 text-white rounded-tr-none border border-neutral-700'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] font-mono text-neutral-400 mt-1 block text-right">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isBotThinking && (
                <div className="flex items-center gap-2 text-xs text-neutral-400 p-2">
                  <div 
                    className="w-6 h-6 rounded-md flex items-center justify-center text-black animate-spin"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <span>Varsity AI is typing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleSendChat(); }} className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about marketplace, safety, campus rules..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 focus:border-neutral-600 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isBotThinking}
                className="p-2 px-3 rounded-xl text-black font-bold text-xs flex items-center gap-1 shadow-md transition-transform active:scale-95 disabled:opacity-40 cursor-pointer"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ask AI</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: EXPANDABLE FAQS */}
        {activeTab === 'faq' && (
          <div className="flex-1 flex flex-col bg-neutral-900 overflow-hidden p-4">
            {/* Search */}
            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search campus questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-600 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-500 outline-none"
              />
            </div>

            {/* Accordion list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-900/60 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-xs text-white pr-2">{faq.q}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 text-xs text-neutral-300 leading-relaxed border-t border-neutral-850 pt-2 bg-neutral-900/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SUBMIT SUPPORT TICKET */}
        {activeTab === 'ticket' && (
          <div className="flex-1 overflow-y-auto p-4 bg-neutral-900 text-xs">
            {submittedTicketRef ? (
              <div className="p-6 text-center space-y-3 bg-neutral-950 rounded-2xl border border-neutral-800 max-w-md mx-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Ticket Submitted to Student Affairs</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Your ticket has been dispatched to the <strong>{currentUniversity.name} Campus Support Desk</strong>. A representative will respond to your registered student email ({session.email}).
                </p>
                <div className="p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 font-mono text-neutral-400 text-xs">
                  Ticket Ref: <span className="text-white font-bold">{submittedTicketRef}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedTicketRef(null)}
                  className="mt-2 py-2 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3 max-w-lg mx-auto">
                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Issue Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-600 rounded-xl p-2.5 text-xs text-white outline-none"
                  >
                    <option value="Marketplace & Payments">Marketplace & Payments</option>
                    <option value="Account & Email Verification">Account & Email Verification</option>
                    <option value="Single & Mingle Safety">Single & Mingle Safety</option>
                    <option value="Campus Facilities & Power">Campus Facilities & Power</option>
                    <option value="Harassment or Abuse Report">Harassment or Abuse Report</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of the issue..."
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-600 rounded-xl p-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-medium mb-1">Detailed Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide context, names, or incident details..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-600 rounded-xl p-2.5 text-xs text-white outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-black font-extrabold text-xs shadow-md cursor-pointer transition-transform active:scale-98"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  Submit Ticket to {currentUniversity.shortName} Desk
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: POPIA COMPLIANCE & PRIVACY POLICY */}
        {activeTab === 'privacy_popia' && (
          <div className="flex-1 bg-neutral-900 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs text-neutral-300">
            {/* Primary Affirmation Banner */}
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">
                  Protection of Personal Information Act (POPIA) Statement
                </h4>
                <p className="text-[11px] text-neutral-300 leading-relaxed font-sans">
                  Varsity Life HUB strictly protects your student data under the POPIA Act. We do not sell your personal information, and your data is completely restricted to your isolated campus network.
                </p>
              </div>
            </div>

            {/* Five Core Legal Text Blocks */}
            <div className="space-y-3 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 max-h-72 overflow-y-auto">
              <div>
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">
                  1. Legal Compliance & POPIA Act
                </h5>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Varsity Life HUB ("the App") is fully committed to protecting student data in strict compliance with the South African Protection of Personal Information Act (POPIA), Act 4 of 2013. By registering, you consent to the processing of your personal information for the sole purpose of operating your campus network.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">
                  2. What Data We Collect & Why
                </h5>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Student email addresses (.ac.za) are collected strictly to verify campus accreditation and isolate feeds. Profile information (name, degree, residence) enables peer discovery. Uploaded media is stored securely and never harvested for commercial advertising.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">
                  3. Data Retention & Your Rights
                </h5>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Data is never sold to third parties or advertising brokers. You retain full ownership of your data under South African law and hold the absolute right to erasure at any time.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">
                  4. Limitation of Liability & Indemnity
                </h5>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Varsity Life HUB operates purely as a peer-to-peer technology connector. Platform developers and campus reps are not liable for marketplace payments, goods disputes, or personal physical interactions.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-white uppercase text-[11px] tracking-wider mb-1">
                  5. User Conduct & Acceptable Use
                </h5>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Strict zero-tolerance policy against scams, harassment, leaking exam papers, or hate speech. Infractions lead to permanent account termination and campus security reporting.
                </p>
              </div>
            </div>

            {/* Functional Right to Erasure / Delete Account Button */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <span>POPIA Right to Erasure (Article 24)</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">Irreversible Action</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Permanently erase your active student session, marketplace listings, chat logs, and preferences across this device.
              </p>

              {!showConfirmDelete ? (
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer transition-colors shadow"
                >
                  Delete Account & Clear Data
                </button>
              ) : (
                <div className="p-3 bg-neutral-900 rounded-xl border border-rose-800 space-y-2">
                  <p className="text-xs font-bold text-white">
                    Confirm Account Erasure
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Type <strong className="text-white font-mono">DELETE</strong> to confirm permanent deletion.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type DELETE"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="flex-1 bg-black border border-neutral-700 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono outline-none"
                    />
                    <button
                      type="button"
                      disabled={deleteConfirmText.toUpperCase() !== 'DELETE'}
                      onClick={() => {
                        if (deleteConfirmText.toUpperCase() === 'DELETE') {
                          if (onDeleteAccount) {
                            onDeleteAccount();
                          } else {
                            localStorage.clear();
                            window.location.reload();
                          }
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        deleteConfirmText.toUpperCase() === 'DELETE'
                          ? 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer'
                          : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      }`}
                    >
                      Erase Now
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowConfirmDelete(false);
                        setDeleteConfirmText('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-neutral-800 text-neutral-300 text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ESCALATION EMAIL FOOTER */}
        <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-neutral-400 text-[11px]">
              Need further human help? Direct escalation:
            </span>
          </div>
          <a
            href="mailto:varsitylifehub@gmail.com?subject=Varsity%20Life%20HUB%20Support%20Escalation"
            className="font-mono text-cyan-400 hover:underline text-[11px] font-bold flex items-center gap-1"
          >
            <span>varsitylifehub@gmail.com</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
