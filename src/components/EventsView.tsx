import React, { useState } from 'react';
import { CampusEvent, University, UserSession } from '../types';
import { CampusIsolationService } from '../services/dataIsolation';
import { CampusIsolationBanner } from './CampusIsolationBanner';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Users, 
  CheckCircle, 
  Search, 
  Sparkles,
  PartyPopper,
  Trophy,
  GraduationCap,
  AlertTriangle,
  Upload,
  X,
  ShieldCheck,
  Scale,
  FileText,
  AlertOctagon,
  Phone,
  UserCheck,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

interface EventsViewProps {
  currentUniversity: University;
  session: UserSession;
  events: CampusEvent[];
  onAddEvent: (event: Omit<CampusEvent, 'id' | 'rsvpCount' | 'isRsvpd'>) => void;
  onToggleRsvp: (eventId: string) => void;
  onReportItem?: (title: string, author?: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  currentUniversity,
  session,
  events,
  onAddEvent,
  onToggleRsvp,
  onReportItem,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Party' | 'Sports' | 'Academic' | 'Career' | 'Arts'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createStep, setCreateStep] = useState<'details' | 'guidelines'>('details');

  // Form State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('This Friday');
  const [time, setTime] = useState('18:00 - 22:00');
  const [location, setLocation] = useState('Student Amphitheatre');
  const [category, setCategory] = useState<'Party' | 'Academic' | 'Sports' | 'Career' | 'Arts'>('Party');
  const [description, setDescription] = useState('');
  const [priceTag, setPriceTag] = useState('Free with Student ID');
  const [eventFlyer, setEventFlyer] = useState<{ name: string; url: string } | null>(null);

  // Organizer details for liability accountability
  const [organizerName, setOrganizerName] = useState(session.fullName);
  const [organizerStudentId, setOrganizerStudentId] = useState(session.studentNumber);
  const [organizerContact, setOrganizerContact] = useState(session.email);
  const [organizerPhone, setOrganizerPhone] = useState('+27 ');
  const [organizerRes, setOrganizerRes] = useState(session.resHall || '');

  // Terms & Conditions and Guidelines Checkboxes
  const [agreeRules, setAgreeRules] = useState(false);
  const [agreeLiability, setAgreeLiability] = useState(false);

  // Modal to view organizer accountability details
  const [selectedAccountableEvent, setSelectedAccountableEvent] = useState<CampusEvent | null>(null);

  // Strictly isolate events to current university partition using CampusIsolationService
  const campusIsolatedEvents = CampusIsolationService.filterEvents(events, currentUniversity.id);

  // Filter events isolated to this university by category and search
  const filteredEvents = campusIsolatedEvents.filter((e) => {
    const matchesCategory = selectedFilter === 'All' || e.category === selectedFilter;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      !query ||
      e.title.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query) ||
      e.location.toLowerCase().includes(query) ||
      e.organizer.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleProceedToGuidelines = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !description.trim()) return;
    setCreateStep('guidelines');
  };

  const handleFinalSubmitEvent = () => {
    if (!agreeRules || !agreeLiability) return;

    onAddEvent({
      universityId: currentUniversity.id,
      title: title.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      category,
      description: description.trim(),
      organizer: organizerName.trim() || session.fullName,
      organizerAvatar: session.avatarUrl,
      organizerStudentId: organizerStudentId.trim() || session.studentNumber,
      organizerContact: organizerPhone.trim() || organizerContact.trim() || session.email,
      priceTag: priceTag.trim() || 'Free',
      coverImage: eventFlyer?.url,
      termsAccepted: true,
      organizerPledgeAgreed: true,
      organizerLiabilityTimestamp: new Date().toISOString(),
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setEventFlyer(null);
    setAgreeRules(false);
    setAgreeLiability(false);
    setCreateStep('details');
    setShowCreateModal(false);
  };

  const handleSimulateFlyerUpload = () => {
    setEventFlyer({
      name: `${currentUniversity.shortName}_Campus_Flyer_${Date.now().toString().slice(-4)}.jpg`,
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80'
    });
  };

  const categoryIcons = {
    Party: PartyPopper,
    Sports: Trophy,
    Academic: GraduationCap,
    Career: Sparkles,
    Arts: Sparkles,
  };

  return (
    <div className="space-y-4 pb-24 text-left relative">
      {/* Real-time Campus Data Isolation & Security Partition Banner */}
      <CampusIsolationBanner 
        currentUniversity={currentUniversity} 
        sectionName="Events" 
        itemCount={filteredEvents.length} 
      />

      {/* Top Banner with Open Posting Option for Anyone */}
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
                {currentUniversity.shortName} CAMPUS CALENDAR
              </span>
              <span className="text-xs text-neutral-300">• Open to all verified students & societies</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">Campus Events & Socials</h2>
            <p className="text-xs text-neutral-300 max-w-lg mt-0.5 leading-relaxed">
              Varsity Cup matches, residence socials, academic circles, braais, and club nights. Any student can post an event under our verified organizer accountability guidelines.
            </p>
          </div>

          <button
            id="create-event-button"
            type="button"
            onClick={() => {
              setCreateStep('details');
              setShowCreateModal(true);
            }}
            className="self-start sm:self-auto py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            style={{ backgroundColor: currentUniversity.accentColor }}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Post an Event (Any Student)</span>
          </button>
        </div>
      </div>

      {/* Enhanced Global Search Bar & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${currentUniversity.shortName} events, braais, sports, hackathons...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs">
          {(['All', 'Party', 'Sports', 'Academic', 'Career', 'Arts'] as const).map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-2 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'text-black font-bold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
                style={isActive ? { backgroundColor: currentUniversity.accentColor } : {}}
              >
                {cat === 'All' ? 'All Events' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/60 rounded-2xl border border-neutral-800">
          <Calendar className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-white">No campus events found</h4>
          <p className="text-xs text-neutral-400 mt-1">
            Host a study group, residence braai, or party at {currentUniversity.shortName}! Anyone can post an event.
          </p>
          <button
            onClick={() => {
              setCreateStep('details');
              setShowCreateModal(true);
            }}
            className="mt-4 px-4 py-2 rounded-xl text-black font-bold text-xs cursor-pointer shadow"
            style={{ backgroundColor: currentUniversity.accentColor }}
          >
            Post First Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5">
          {filteredEvents.map((evt) => {
            const Icon = categoryIcons[evt.category] || Sparkles;
            return (
              <div
                key={evt.id}
                className="bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 transition-all hover:shadow-xl group text-left relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wider bg-neutral-800 text-neutral-300 flex items-center gap-1">
                          <Icon className="w-3 h-3 text-amber-400" />
                          <span>{evt.category}</span>
                        </span>
                        <span className="text-[10px] bg-neutral-800 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                          {evt.priceTag}
                        </span>

                        {/* Organizer Accountability Shield Badge */}
                        <button
                          type="button"
                          onClick={() => setSelectedAccountableEvent(evt)}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 font-semibold flex items-center gap-1 hover:bg-emerald-900/80 transition-colors cursor-pointer"
                          title="View verified organizer accountability pledge"
                        >
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Organizer Accountable ✓</span>
                        </button>
                      </div>

                      {/* Report button */}
                      {onReportItem && (
                        <button
                          type="button"
                          onClick={() => onReportItem(evt.title, evt.organizer)}
                          className="text-neutral-500 hover:text-amber-400 p-1 text-[10px] flex items-center gap-0.5"
                          title="Report event"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span className="hidden sm:inline">Report</span>
                        </button>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-neutral-200">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono">
                      <div className="flex items-center gap-1.5 text-neutral-200">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-200">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-200">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                        <UserCheck className="w-3 h-3 text-neutral-400" />
                        <span>Host: <strong className="text-neutral-200">{evt.organizer}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* RSVP Button */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      <span className="font-bold text-white">{evt.rsvpCount}</span> attending
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleRsvp(evt.id)}
                      className={`py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        evt.isRsvpd
                          ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                      }`}
                    >
                      <CheckCircle className={`w-3.5 h-3.5 ${evt.isRsvpd ? 'text-black' : 'text-neutral-400'}`} />
                      <span>{evt.isRsvpd ? "I'm Going! ✓" : "RSVP / I'm Going"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FLOATING ACTION BUTTON TO POST EVENT FROM ANYWHERE */}
      <button
        id="fab-post-event"
        type="button"
        onClick={() => {
          setCreateStep('details');
          setShowCreateModal(true);
        }}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full text-black font-extrabold text-xs shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/20"
        style={{ backgroundColor: currentUniversity.accentColor }}
        title="Post a campus event"
      >
        <Plus className="w-4 h-4 stroke-[3]" />
        <span className="hidden sm:inline">Post an Event</span>
      </button>

      {/* CREATE EVENT MODAL WITH 2-STEP ACCOUNTABILITY FLOW */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="p-4 text-white flex items-center justify-between border-b border-neutral-800"
              style={{ backgroundColor: `${currentUniversity.primaryColor}ee` }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center border border-white/10">
                  {createStep === 'details' ? (
                    <Calendar className="w-4 h-4 text-white" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/80 block">
                    {createStep === 'details' ? 'Step 1 of 2 • Event Logistics' : 'Step 2 of 2 • Organizer Liability Accord'}
                  </span>
                  <h3 className="text-base font-bold font-display">
                    {createStep === 'details' ? 'Post Campus Event' : 'Organizer Terms & Guidelines'}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  setCreateStep('details');
                }}
                className="w-7 h-7 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* STEP 1: EVENT DETAILS */}
            {createStep === 'details' && (
              <form onSubmit={handleProceedToGuidelines} className="p-5 space-y-3.5 max-h-[78vh] overflow-y-auto text-xs">
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-[11px] text-neutral-300 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>
                    Any student or club at {currentUniversity.name} may post an event. On the next step, you will review the <strong>Organizer Liability & Conduct Guidelines</strong>.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Event Name / Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. End of Semester Sunset Braai & Acoustic Set"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Date *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Friday, 03 Oct"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Time *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 17:00 - 22:00"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    >
                      <option value="Party">Party / Social</option>
                      <option value="Sports">Sports / Varsity Cup</option>
                      <option value="Academic">Academic & Study Circle</option>
                      <option value="Career">Career & Industry</option>
                      <option value="Arts">Arts & Music</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Admission / Ticket Price
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Free with Student ID or R50"
                      value={priceTag}
                      onChange={(e) => setPriceTag(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* MEDIA FLYER UPLOAD */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Event Flyer / Poster Image
                  </label>
                  {eventFlyer ? (
                    <div className="flex items-center justify-between p-2.5 bg-neutral-950 rounded-xl border border-neutral-700">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={eventFlyer.url} alt="Flyer" className="w-10 h-10 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white truncate block">{eventFlyer.name}</span>
                          <span className="text-[10px] text-emerald-400 font-mono">Poster Attached ✓</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEventFlyer(null)}
                        className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSimulateFlyerUpload}
                      className="w-full py-2.5 px-3 rounded-xl border border-dashed border-neutral-700 hover:border-neutral-500 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Upload Event Flyer or Poster</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Location / Venue *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fanie du Toit Sports Grounds / Jammie Plaza / Res Quad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Event Details & Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Bring your student ID, braai packs, laptops, or comfortable sneakers..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                {/* Organizer Contact Info for Accountability */}
                <div className="pt-2 border-t border-neutral-800">
                  <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider block mb-2">
                    Designated Host / Organizer Information
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Organizer Full Name</label>
                      <input
                        type="text"
                        required
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Student Number</label>
                      <input
                        type="text"
                        required
                        value={organizerStudentId}
                        onChange={(e) => setOrganizerStudentId(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Emergency Phone / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="+27 82 123 4567"
                        value={organizerPhone}
                        onChange={(e) => setOrganizerPhone(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Residence / Department</label>
                      <input
                        type="text"
                        placeholder="e.g. Men's Res / Health Sciences"
                        value={organizerRes}
                        onChange={(e) => setOrganizerRes(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    <span>Continue to Organizer Guidelines & Terms</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: ORGANIZER LIABILITY GUIDELINES & TERMS & CONDITIONS */}
            {createStep === 'guidelines' && (
              <div className="p-5 space-y-4 max-h-[78vh] overflow-y-auto text-xs">
                {/* Accord Header Notice */}
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-200">
                  <Scale className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-white">
                      Organizer Accountability & Legal Responsibility Accord
                    </h4>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      To safeguard student welfare and campus facilities at {currentUniversity.name}, all organizers are held personally, administratively, and legally responsible for the events they publish.
                    </p>
                  </div>
                </div>

                {/* 6 Key Guidelines for Organizers */}
                <div className="space-y-2.5">
                  <h5 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Mandatory Organizer Guidelines & Code of Conduct
                  </h5>

                  {/* Rule 1 */}
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-sky-400 flex items-center justify-center text-[10px] font-mono">1</span>
                      <span>Sole Coordinator Liability & Legal Responsibility</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                      The publisher ({organizerName}, Student #{organizerStudentId}) is officially logged as the primary coordinator. You are directly accountable to Campus Protection Services (CPS), university disciplinary tribunals, and South African civil authorities for attendee conduct and incidents.
                    </p>
                  </div>

                  {/* Rule 2 */}
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-amber-400 flex items-center justify-center text-[10px] font-mono">2</span>
                      <span>Campus Alcohol & Substance Prohibition</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                      No unauthorized commercial sale of alcohol without a municipal liquor license. Strictly zero alcohol supply to minors under 18. Complete prohibition of illicit narcotics, nitrous oxide, and hazardous fireworks.
                    </p>
                  </div>

                  {/* Rule 3 */}
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-rose-400 flex items-center justify-center text-[10px] font-mono">3</span>
                      <span>Noise Curfew & Municipal Bylaws</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                      All outdoor or amplified sound must strictly comply with city noise bylaws and university quiet hours (amplified sound must cease strictly by 22:00 Sunday–Thursday and 23:00 Friday–Saturday).
                    </p>
                  </div>

                  {/* Rule 4 */}
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-emerald-400 flex items-center justify-center text-[10px] font-mono">4</span>
                      <span>Facility Restitution & Clean-Up Obligation</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                      The organizer accepts personal financial liability for any property damages, broken glass, fire extinguisher discharge, or venue cleaning surcharges assessed by campus management.
                    </p>
                  </div>

                  {/* Rule 5 */}
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-purple-400 flex items-center justify-center text-[10px] font-mono">5</span>
                      <span>Emergency Access & Crowd Safety</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                      Emergency exits and roads for ambulances/fire services must remain unblocked at all times. The organizer must have campus emergency numbers programmed and be available on phone {organizerPhone}.
                    </p>
                  </div>

                  {/* Rule 6 */}
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-white font-bold text-xs mb-1">
                      <span className="w-5 h-5 rounded-full bg-neutral-800 text-indigo-400 flex items-center justify-center text-[10px] font-mono">6</span>
                      <span>Accuracy & Anti-Fraud Guarantee</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-7">
                      All advertised ticket prices, guest performers, and venues must be authentic. Publishing misleading notices or fraudulent gate fees will result in immediate permanent banning and academic sanction.
                    </p>
                  </div>
                </div>

                {/* Organizer Verification Summary Card */}
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Signing Organizer Identity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-neutral-500 block">Designated Host:</span>
                      <strong className="text-white">{organizerName}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Student Number:</span>
                      <strong className="text-white font-mono">{organizerStudentId}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Direct Emergency Tel:</span>
                      <strong className="text-white font-mono">{organizerPhone}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Institution:</span>
                      <strong className="text-white">{currentUniversity.name}</strong>
                    </div>
                  </div>
                </div>

                {/* Mandatory Checkboxes */}
                <div className="space-y-3 pt-2 border-t border-neutral-800">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeRules}
                      onChange={(e) => setAgreeRules(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-neutral-700 text-emerald-500 focus:ring-emerald-500 bg-neutral-950"
                    />
                    <span className="text-xs text-neutral-200 leading-snug">
                      I have read, understood, and agree to the <strong>Campus Event Organizer Guidelines, Noise Bylaws, and Safety Standards</strong> for {currentUniversity.shortName}.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeLiability}
                      onChange={(e) => setAgreeLiability(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-neutral-700 text-emerald-500 focus:ring-emerald-500 bg-neutral-950"
                    />
                    <span className="text-xs text-neutral-200 leading-snug">
                      <strong>Sole Responsibility Pledge:</strong> I solemnly acknowledge that as the primary event organizer, I am <strong>personally, administratively, and legally held responsible</strong> for attendee conduct, safety standards, and any property restitution resulting from this event.
                    </span>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateStep('details')}
                    className="py-3 px-4 rounded-xl border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={!agreeRules || !agreeLiability}
                    onClick={handleFinalSubmitEvent}
                    className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                      agreeRules && agreeLiability
                        ? 'text-black hover:opacity-95 active:scale-98 cursor-pointer'
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    }`}
                    style={agreeRules && agreeLiability ? { backgroundColor: currentUniversity.accentColor } : {}}
                  >
                    <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                    <span>I Accept Full Liability & Publish Event</span>
                  </button>
                </div>

                {(!agreeRules || !agreeLiability) && (
                  <p className="text-[11px] text-amber-400/90 text-center">
                    * Please review and check both accountability agreements to publish.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACCOUNTABILITY ACCORD AUDIT MODAL (WHEN STUDENTS CLICK "ORGANIZER ACCOUNTABLE ✓") */}
      {selectedAccountableEvent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl p-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Organizer Accountability Certificate</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAccountableEvent(null)}
                className="w-6 h-6 rounded-full bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] uppercase text-neutral-400 font-mono block">Event</span>
                <strong className="text-white text-sm block">{selectedAccountableEvent.title}</strong>
                <span className="text-[11px] text-neutral-400">{selectedAccountableEvent.date} • {selectedAccountableEvent.location}</span>
              </div>

              <div className="space-y-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-[10px] uppercase text-neutral-400 font-mono block">Registered Organizer</span>
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedAccountableEvent.organizerAvatar}
                    alt={selectedAccountableEvent.organizer}
                    className="w-9 h-9 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <div className="text-white font-bold text-xs">{selectedAccountableEvent.organizer}</div>
                    <div className="text-neutral-400 text-[10px] font-mono">
                      Student ID: {selectedAccountableEvent.organizerStudentId || 'Verified Student'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Verified Legal & Disciplinary Accord Signed</span>
                </div>
                <p className="leading-relaxed">
                  The host has solemnly agreed to the Campus Event Organizer Code of Conduct and accepts personal liability for attendee safety, municipal noise curfew, and venue cleanliness.
                </p>
                {selectedAccountableEvent.organizerLiabilityTimestamp && (
                  <div className="text-[10px] text-neutral-400 font-mono pt-1">
                    Accord Signed: {new Date(selectedAccountableEvent.organizerLiabilityTimestamp).toLocaleString()}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedAccountableEvent(null)}
                className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
