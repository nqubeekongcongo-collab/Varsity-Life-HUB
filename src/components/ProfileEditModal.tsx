import React, { useState } from 'react';
import { University, UserSession, CourseModule } from '../types';
import { 
  User, 
  Camera, 
  BookOpen, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  GraduationCap, 
  Building, 
  FileText, 
  CheckCircle2, 
  Award, 
  Sliders,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUniversity: University;
  session: UserSession;
  courses: CourseModule[];
  onSaveProfile: (updatedSession: UserSession, updatedCourses: CourseModule[]) => void;
}

// Curated South African student avatar placeholders
const AVATAR_PLACEHOLDERS = [
  {
    id: 'av-1',
    label: 'Campus Casual',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    tag: 'Popular'
  },
  {
    id: 'av-2',
    label: 'Tech & Code',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    tag: 'Dev'
  },
  {
    id: 'av-3',
    label: 'Library Scholar',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    tag: 'Academic'
  },
  {
    id: 'av-4',
    label: 'Campus Leader',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    tag: 'SRC'
  },
  {
    id: 'av-5',
    label: 'Medical & Science',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    tag: 'Sci'
  },
  {
    id: 'av-6',
    label: 'Varsity Athlete',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    tag: 'Sports'
  },
  {
    id: 'av-7',
    label: 'Creative & Design',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    tag: 'Arts'
  },
  {
    id: 'av-8',
    label: 'Commerce & Law',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
    tag: 'Business'
  },
  {
    id: 'av-9',
    label: 'Nature & Ecology',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    tag: 'Eco'
  },
  {
    id: 'av-10',
    label: 'Media & Radio',
    url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    tag: 'Media'
  },
  {
    id: 'av-11',
    label: 'Engineering Lab',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    tag: 'Eng'
  },
  {
    id: 'av-12',
    label: 'Graduate & Alumni',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    tag: 'Grad'
  }
];

// South African relatable campus bio quick-insert prompts
const BIO_PROMPTS = [
  '☕️ Grabbing an iced latte at the student center before 08:00 lectures',
  '📚 Stationed on Level 3 of the library during semester test week',
  '🏉 Varsity Cup & campus rugby cheer leader on Monday nights',
  '💻 Building web & mobile apps when I am not in lectures',
  '🥩 Weekend residence braai master & amapiano playlist curator',
  '🎯 Aiming for Dean’s Merit List & distinction in final exams'
];

// Recommended campus modules for quick-addition
const RECOMMENDED_MODULES = [
  { code: 'COS 212', name: 'Data Structures and Algorithms', credits: 16, targetGrade: 75 },
  { code: 'INF 354', name: 'Software Engineering & Architecture', credits: 16, targetGrade: 80 },
  { code: 'ACCN 201', name: 'Financial Accounting & Reporting', credits: 16, targetGrade: 70 },
  { code: 'ECON 211', name: 'Macroeconomics & Monetary Policy', credits: 12, targetGrade: 72 },
  { code: 'LAWS 101', name: 'Introduction to South African Law', credits: 16, targetGrade: 68 },
  { code: 'MECN 212', name: 'Strength of Materials & Mechanics', credits: 16, targetGrade: 70 }
];

export const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentUniversity,
  session,
  courses,
  onSaveProfile,
}) => {
  // Active sub-tab within profile editing
  const [activeSection, setActiveSection] = useState<'bio' | 'avatar' | 'modules'>('bio');

  // Profile Form State
  const [fullName, setFullName] = useState(session.fullName);
  const [degree, setDegree] = useState(session.degree);
  const [yearOfStudy, setYearOfStudy] = useState(session.yearOfStudy);
  const [resHall, setResHall] = useState(session.resHall);
  const [bio, setBio] = useState(
    session.bio || 
    'Enthusiastic student exploring campus life, collaborating on group projects, and gearing up for semester tests. Catch me at the campus library or student center!'
  );
  const [avatarUrl, setAvatarUrl] = useState(session.avatarUrl);
  const [customAvatarInput, setCustomAvatarInput] = useState('');

  // Course Modules State
  const [moduleList, setModuleList] = useState<CourseModule[]>(courses);

  // New Module Form State
  const [showAddModuleForm, setShowAddModuleForm] = useState(false);
  const [newModCode, setNewModCode] = useState('');
  const [newModName, setNewModName] = useState('');
  const [newModCredits, setNewModCredits] = useState('16');
  const [newModTarget, setNewModTarget] = useState('75');

  // Success Feedback
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSelectAvatar = (url: string) => {
    setAvatarUrl(url);
  };

  const handleApplyCustomAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAvatarInput.trim().startsWith('http')) {
      setAvatarUrl(customAvatarInput.trim());
      setCustomAvatarInput('');
    }
  };

  const handleInsertBioPrompt = (promptText: string) => {
    if (bio.trim().length === 0) {
      setBio(promptText);
    } else {
      setBio((prev) => `${prev.trim()} • ${promptText}`);
    }
  };

  const handleRemoveModule = (modId: string) => {
    setModuleList((prev) => prev.filter((m) => m.id !== modId));
  };

  const handleAddNewModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModCode.trim() || !newModName.trim()) return;

    const newModule: CourseModule = {
      id: `course-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      code: newModCode.trim().toUpperCase(),
      name: newModName.trim(),
      credits: Number(newModCredits) || 16,
      targetGrade: Number(newModTarget) || 70,
      assignments: [
        {
          id: `a-${Date.now()}-1`,
          name: 'Semester Test 1',
          weight: 30,
          score: 75,
          maxScore: 100,
        },
        {
          id: `a-${Date.now()}-2`,
          name: 'Practical Lab / Assignment',
          weight: 20,
          score: 80,
          maxScore: 100,
        }
      ]
    };

    setModuleList((prev) => [newModule, ...prev]);
    setNewModCode('');
    setNewModName('');
    setShowAddModuleForm(false);
  };

  const handleQuickAddRecommended = (rec: typeof RECOMMENDED_MODULES[0]) => {
    if (moduleList.some((m) => m.code.toLowerCase() === rec.code.toLowerCase())) {
      return; // Already added
    }

    const newModule: CourseModule = {
      id: `course-rec-${Date.now()}`,
      code: rec.code,
      name: rec.name,
      credits: rec.credits,
      targetGrade: rec.targetGrade,
      assignments: [
        {
          id: `a-rec-${Date.now()}`,
          name: 'Semester Test 1',
          weight: 35,
          score: rec.targetGrade,
          maxScore: 100,
        }
      ]
    };

    setModuleList((prev) => [newModule, ...prev]);
  };

  const handleSave = () => {
    const updatedSession: UserSession = {
      ...session,
      fullName: fullName.trim() || session.fullName,
      degree: degree.trim() || session.degree,
      yearOfStudy: yearOfStudy.trim() || session.yearOfStudy,
      resHall: resHall.trim() || session.resHall,
      bio: bio.trim(),
      avatarUrl: avatarUrl,
      enrolledModules: moduleList.map((m) => m.code),
    };

    onSaveProfile(updatedSession, moduleList);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const totalCredits = moduleList.reduce((acc, m) => acc + (m.credits || 0), 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-neutral-900 border rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] text-left"
        style={{ borderColor: `${currentUniversity.accentColor}50` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with University Gradient */}
        <div 
          className="p-4 sm:p-5 text-white relative flex items-center justify-between border-b border-white/10"
          style={{ 
            background: `linear-gradient(135deg, ${currentUniversity.primaryColor} 0%, #171717 100%)` 
          }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black shadow-md shrink-0"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span 
                  className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded text-black tracking-wider"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  {currentUniversity.shortName}
                </span>
                <span className="text-xs text-neutral-300 font-mono">
                  {session.studentNumber}
                </span>
              </div>
              <h2 className="text-lg font-bold font-display text-white mt-0.5">
                Edit Student Profile & Modules
              </h2>
            </div>
          </div>

          <button
            type="button"
            id="close-profile-edit-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/40 hover:bg-black/60 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-4 pt-2 gap-2 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSection('bio')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeSection === 'bio'
                ? 'border-white text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
            style={{
              borderColor: activeSection === 'bio' ? currentUniversity.accentColor : 'transparent',
              color: activeSection === 'bio' ? '#FFFFFF' : undefined
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Bio & Identity</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('avatar')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeSection === 'avatar'
                ? 'border-white text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
            style={{
              borderColor: activeSection === 'avatar' ? currentUniversity.accentColor : 'transparent',
              color: activeSection === 'avatar' ? '#FFFFFF' : undefined
            }}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Profile Picture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('modules')}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeSection === 'modules'
                ? 'border-white text-white font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
            style={{
              borderColor: activeSection === 'modules' ? currentUniversity.accentColor : 'transparent',
              color: activeSection === 'modules' ? '#FFFFFF' : undefined
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Course Modules ({moduleList.length})</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 text-xs text-neutral-300">
          {/* TAB 1: BIO & PERSONAL INFO */}
          {activeSection === 'bio' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Profile Avatar Quick Snippet */}
              <div className="flex items-center gap-3.5 p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <img
                  src={avatarUrl}
                  alt={fullName}
                  className="w-12 h-12 rounded-xl object-cover border-2 shadow-md shrink-0"
                  style={{ borderColor: currentUniversity.accentColor }}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-white font-bold text-sm block truncate">{fullName}</span>
                  <span className="text-neutral-400 text-[11px] block truncate">{degree}</span>
                  <button
                    type="button"
                    onClick={() => setActiveSection('avatar')}
                    className="text-[10px] text-cyan-400 hover:underline mt-0.5 inline-flex items-center gap-1 cursor-pointer"
                  >
                    Change profile picture <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* Student Bio Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="bio-input" className="font-semibold text-white uppercase text-[10px] font-mono tracking-wider">
                    Student Bio
                  </label>
                  <span className={`text-[10px] font-mono ${bio.length > 250 ? 'text-amber-400' : 'text-neutral-500'}`}>
                    {bio.length}/280
                  </span>
                </div>
                <textarea
                  id="bio-input"
                  rows={4}
                  maxLength={280}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell campus peers about your studies, hobbies, favorite study spots, or varsity goals..."
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none leading-relaxed"
                />
              </div>

              {/* South African Campus Prompts */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Quick Tap-to-Insert Prompts:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {BIO_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInsertBioPrompt(prompt)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-[11px] text-neutral-300 hover:text-white border border-neutral-700 transition-all cursor-pointer text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Identity & Academic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label htmlFor="full-name-input" className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Full Name
                  </label>
                  <input
                    id="full-name-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="degree-input" className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Degree / Qualification
                  </label>
                  <input
                    id="degree-input"
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="year-select" className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Year of Study
                  </label>
                  <select
                    id="year-select"
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="1st Year (Fresher)">1st Year (Fresher)</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year (Honours)">4th Year (Honours)</option>
                    <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="res-input" className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Residence / Campus Area
                  </label>
                  <input
                    id="res-input"
                    type="text"
                    value={resHall}
                    onChange={(e) => setResHall(e.target.value)}
                    placeholder="e.g. Veritas Res, Off-Campus Bult"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE PICTURE PLACEHOLDER SELECTOR */}
          {activeSection === 'avatar' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Current Selection Spotlight */}
              <div 
                className="p-4 rounded-xl border flex items-center gap-4 text-white"
                style={{
                  backgroundColor: `${currentUniversity.primaryColor}20`,
                  borderColor: `${currentUniversity.accentColor}50`
                }}
              >
                <div className="relative shrink-0">
                  <img
                    src={avatarUrl}
                    alt="Active Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 shadow-lg"
                    style={{ borderColor: currentUniversity.accentColor }}
                  />
                  <div 
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center text-black shadow font-bold text-xs"
                    style={{ backgroundColor: currentUniversity.accentColor }}
                  >
                    ✓
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Selected Profile Picture
                  </span>
                  <h4 className="font-bold text-sm text-white">Active Photo Preview</h4>
                  <p className="text-[11px] text-neutral-300">
                    Tap any of the curated student avatars below or paste a custom image URL.
                  </p>
                </div>
              </div>

              {/* Grid of Curated Placeholders */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white uppercase text-[10px] font-mono tracking-wider">
                    Curated Student Avatars (12 Styles)
                  </span>
                  <span className="text-[10px] text-neutral-400">1-Tap Select</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {AVATAR_PLACEHOLDERS.map((placeholder) => {
                    const isSelected = avatarUrl === placeholder.url;
                    return (
                      <button
                        key={placeholder.id}
                        type="button"
                        onClick={() => handleSelectAvatar(placeholder.url)}
                        className={`group relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer p-1 bg-neutral-950 flex flex-col items-center ${
                          isSelected
                            ? 'scale-105 shadow-lg'
                            : 'hover:border-neutral-500 opacity-80 hover:opacity-100'
                        }`}
                        style={{
                          borderColor: isSelected ? currentUniversity.accentColor : '#262626'
                        }}
                      >
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                          <img
                            src={placeholder.url}
                            alt={placeholder.label}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {isSelected && (
                            <div 
                              className="absolute inset-0 bg-black/30 flex items-center justify-center font-bold text-white text-xs"
                            >
                              <div 
                                className="w-5 h-5 rounded-full flex items-center justify-center text-black"
                                style={{ backgroundColor: currentUniversity.accentColor }}
                              >
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            </div>
                          )}
                          <span 
                            className="absolute top-1 right-1 text-[8px] font-bold px-1 rounded bg-black/70 text-white uppercase tracking-tighter"
                          >
                            {placeholder.tag}
                          </span>
                        </div>
                        <span className="text-[10px] font-medium text-neutral-300 mt-1 truncate w-full text-center">
                          {placeholder.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Image URL Option */}
              <div className="pt-2 border-t border-neutral-800">
                <form onSubmit={handleApplyCustomAvatar} className="space-y-1.5">
                  <label htmlFor="custom-url-input" className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Or Enter Custom Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="custom-url-input"
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={customAvatarInput}
                      onChange={(e) => setCustomAvatarInput(e.target.value)}
                      className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <button
                      type="submit"
                      disabled={!customAvatarInput.trim().startsWith('http')}
                      className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE CHOSEN COURSE MODULES */}
          {activeSection === 'modules' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Summary Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <div>
                  <span className="text-white font-bold text-xs flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    Enrolled Modules: {moduleList.length} Active
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">
                    Total Credits: {totalCredits} SAQA Credits
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModuleForm(!showAddModuleForm)}
                  className="py-1.5 px-3 rounded-lg text-black font-extrabold text-[11px] flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow"
                  style={{ backgroundColor: currentUniversity.accentColor }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Module</span>
                </button>
              </div>

              {/* Inline Add Module Form */}
              {showAddModuleForm && (
                <form 
                  onSubmit={handleAddNewModule}
                  className="p-3.5 rounded-xl border border-neutral-700 bg-neutral-950 space-y-3 animate-in fade-in"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs">Add New Course Module</h4>
                    <button
                      type="button"
                      onClick={() => setShowAddModuleForm(false)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="new-mod-code" className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        Module Code (e.g. CMPG 311)
                      </label>
                      <input
                        id="new-mod-code"
                        type="text"
                        placeholder="CMPG 311"
                        value={newModCode}
                        onChange={(e) => setNewModCode(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white uppercase font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="new-mod-name" className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        Module Name
                      </label>
                      <input
                        id="new-mod-name"
                        type="text"
                        placeholder="Database Systems"
                        value={newModName}
                        onChange={(e) => setNewModName(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="new-mod-credits" className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        Credits (SAQA)
                      </label>
                      <input
                        id="new-mod-credits"
                        type="number"
                        min={4}
                        max={48}
                        value={newModCredits}
                        onChange={(e) => setNewModCredits(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-mod-target" className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                        Target Grade (%)
                      </label>
                      <input
                        id="new-mod-target"
                        type="number"
                        min={50}
                        max={100}
                        value={newModTarget}
                        onChange={(e) => setNewModTarget(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddModuleForm(false)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 text-neutral-300 text-xs hover:bg-neutral-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg text-black font-extrabold text-xs shadow hover:opacity-90"
                      style={{ backgroundColor: currentUniversity.accentColor }}
                    >
                      Save Module
                    </button>
                  </div>
                </form>
              )}

              {/* List of Enrolled Modules */}
              <div className="space-y-2">
                <span className="font-semibold text-white uppercase text-[10px] font-mono tracking-wider block">
                  Current Course Enrolment ({moduleList.length})
                </span>

                {moduleList.length === 0 ? (
                  <div className="p-6 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/50">
                    <BookOpen className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                    <p className="text-neutral-400 font-medium text-xs">No modules chosen yet</p>
                    <p className="text-neutral-600 text-[11px] mt-0.5">
                      Add your semester subjects to calculate target GPAs and pair with study buddies.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {moduleList.map((module) => (
                      <div
                        key={module.id}
                        className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex items-center gap-3">
                          <div 
                            className="px-2.5 py-1.5 rounded-lg font-mono font-black text-xs text-black shrink-0 tracking-wider shadow-sm"
                            style={{ backgroundColor: currentUniversity.accentColor }}
                          >
                            {module.code}
                          </div>
                          <div className="min-w-0">
                            <h5 className="font-bold text-white text-xs truncate">{module.name}</h5>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono mt-0.5">
                              <span>{module.credits} Credits</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-semibold">Target: {module.targetGrade}%</span>
                              <span>•</span>
                              <span>{module.assignments?.length || 0} Assessments</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveModule(module.id)}
                          className="p-2 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                          title="Drop / Remove Module"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommended Campus Modules Quick Add */}
              <div className="pt-2 border-t border-neutral-800">
                <span className="font-semibold text-white uppercase text-[10px] font-mono tracking-wider flex items-center gap-1 mb-2">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Quick-Add Campus Electives & Core Modules:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {RECOMMENDED_MODULES.map((rec) => {
                    const isAlreadyEnrolled = moduleList.some(
                      (m) => m.code.toLowerCase() === rec.code.toLowerCase()
                    );
                    return (
                      <div
                        key={rec.code}
                        className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/90 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-white text-[11px]">{rec.code}</span>
                            <span className="text-[10px] text-neutral-500">{rec.credits} cr</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 truncate">{rec.name}</p>
                        </div>

                        <button
                          type="button"
                          disabled={isAlreadyEnrolled}
                          onClick={() => handleQuickAddRecommended(rec)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer shrink-0 ${
                            isAlreadyEnrolled
                              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                              : 'bg-white/10 hover:bg-white text-white hover:text-black'
                          }`}
                        >
                          {isAlreadyEnrolled ? 'Added ✓' : '+ Add'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-neutral-400 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                Updated!
              </span>
            )}

            <button
              type="button"
              id="save-profile-btn"
              onClick={handleSave}
              className="py-2.5 px-5 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-1.5 shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
