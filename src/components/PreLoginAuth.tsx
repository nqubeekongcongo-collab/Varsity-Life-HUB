import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { UNIVERSITIES, UNIVERSITY_LIST } from '../data/universities';
import { UniversityId, UserSession, AppTabId, University } from '../types';
import { LegalTermsModal } from './LegalTermsModal';
import { 
  Building2, 
  Mail, 
  Lock, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  ChevronDown,
  Sparkles,
  RefreshCw,
  Scale,
  Sliders,
  ShoppingBag,
  Calendar,
  MessageSquare,
  Users,
  Heart,
  Wrench,
  HelpCircle,
  Check,
  Search,
  ScanFace,
  Camera,
  Eye,
  EyeOff,
  AlertCircle,
  X
} from 'lucide-react';

interface PreLoginAuthProps {
  onLoginSuccess: (session: UserSession, customTabs?: AppTabId[]) => void;
  defaultUniversity?: UniversityId;
}

const ONBOARDING_NINE_TABS: Array<{
  id: AppTabId;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'marketplace', title: 'Marketplace', desc: 'Buy, sell & inspect student textbooks & tech', icon: ShoppingBag },
  { id: 'events', title: 'Events', desc: 'Campus parties, res formals & academic socials', icon: Calendar },
  { id: 'chats', title: 'Group Chats', desc: 'Faculty channels & res community groups', icon: MessageSquare },
  { id: 'study-buddy', title: 'Find Study Buddy', desc: 'Module study partners & revision squads', icon: Users },
  { id: 'academic', title: 'Academic Performance', desc: 'GPA calculator, marks tracker & course planner', icon: GraduationCap },
  { id: 'campus-life', title: 'Campus Life & Extracurricular', desc: 'Spotted feed, safety notices & clubs', icon: Building2 },
  { id: 'single-mingle', title: 'Single & Mingle', desc: 'Campus-verified student dating & crushes', icon: Heart },
  { id: 'smart-tools', title: 'Smart Tools', desc: 'Student AI assistant, study & research bots', icon: Wrench },
  { id: 'help-support', title: 'Help & Support', desc: 'Campus AI support & POPIA safety desk', icon: HelpCircle },
];

export const PreLoginAuth: React.FC<PreLoginAuthProps> = ({
  onLoginSuccess,
  defaultUniversity = 'nwu',
}) => {
  // Top-level Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Selected University State
  const [selectedUniId, setSelectedUniId] = useState<UniversityId>(defaultUniversity);
  const selectedUni = UNIVERSITIES[selectedUniId] || UNIVERSITIES['nwu'];

  // Institution Search State (Registration & Quick Search)
  const [institutionSearchQuery, setInstitutionSearchQuery] = useState('');
  const [isInstitutionDropdownOpen, setIsInstitutionDropdownOpen] = useState(false);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('student');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Registration step state
  const [emailPrefix, setEmailPrefix] = useState('student');
  const [regPassword, setRegPassword] = useState('');
  const [authStep, setAuthStep] = useState<'details' | 'otp' | 'password' | 'customize_hub'>('details');
  const [otpDigits, setOtpDigits] = useState(['2', '0', '2', '6']);
  const [generatedOtp, setGeneratedOtp] = useState('2026');
  const [otpNotification, setOtpNotification] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Forgot Password Modal State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Face Login Modal & Camera State
  const [showFaceLoginModal, setShowFaceLoginModal] = useState(false);
  const [faceScanningProgress, setFaceScanningProgress] = useState(0);
  const [faceScanStatus, setFaceScanStatus] = useState<'aligning' | 'scanning' | 'matched' | 'failed'>('aligning');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Legal Terms Checkbox & Modal State
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Customize Hub: User's top 4 chosen tabs (slot 5 is Help/POPIA)
  const [selectedTopFourTabs, setSelectedTopFourTabs] = useState<AppTabId[]>([
    'marketplace',
    'events',
    'chats',
    'study-buddy',
  ]);

  const fullEmail = `${emailPrefix}@${selectedUni.domain}`;

  // Filter institutions for search
  const filteredInstitutions = UNIVERSITY_LIST.filter((u) => {
    const q = institutionSearchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.town.toLowerCase().includes(q) ||
      (u.province && u.province.toLowerCase().includes(q)) ||
      (u.institutionType && u.institutionType.toLowerCase().includes(q))
    );
  });

  const handleUniversitySelect = (u: University) => {
    setSelectedUniId(u.id);
    setIsInstitutionDropdownOpen(false);
    setInstitutionSearchQuery('');
    setErrorMessage('');
  };

  const getProfileForCampus = (uniId: UniversityId) => {
    const namesByCampus: Record<string, { name: string; res: string; degree: string }> = {
      nwu: { name: 'Jaco Pretorius', res: 'Veritas Men\'s Res', degree: 'BSc Information Technology' },
      wits: { name: 'Kagiso Khumalo', res: 'Sunnyside Hall', degree: 'BCom Accounting Sciences' },
      uct: { name: 'Liam Van Der Merwe', res: 'Leo Marquard Hall', degree: 'BSc Computer Science' },
      up: { name: 'Anrich Botha', res: 'TuksVillage Res', degree: 'BEng Mechanical Engineering' },
      tut: { name: 'Thabo Mthembu', res: 'Pretoria West Hall 3', degree: 'NDip Software Development' },
      su: { name: 'Francois De Klerk', res: 'Helshoogte Residence', degree: 'BCom International Business' },
      uj: { name: 'Sipho Zulu', res: 'Sophiatown APK', degree: 'BSc Mathematical Sciences' },
      dut: { name: 'Nqobile Mthembu', res: 'Sterling House Res', degree: 'NDip Information Technology' },
      ukzn: { name: 'Lungelo Cele', res: 'Florence Powell Hall', degree: 'BSc Computer Science' },
      cput: { name: 'Brandon Swarts', res: 'District Six Campus Res', degree: 'NDip Mechanical Engineering' },
      coastal: { name: 'Nkosinathi Bhengu', res: 'Umlazi Campus Res', degree: 'NC(V) Electrical Construction' },
      unizulu: { name: 'Mvelo Ndwandwe', res: 'Ongoye Complex Res', degree: 'BEd Senior & FET Phase' },
      mut: { name: 'Nhlanhla Sithole', res: 'MUT Umlazi Residence', degree: 'NDip Civil Engineering' },
      nmu: { name: 'Kirsten Meyer', res: 'Summerstrand South Kraal', degree: 'BSc Marine Biology' },
    };

    return namesByCampus[uniId] || {
      name: 'Noluthando Ndlovu',
      res: 'Campus Student Residence',
      degree: 'Undergraduate Degree / National Diploma'
    };
  };

  const buildUserSession = (uniId: UniversityId, emailStr?: string): UserSession => {
    const profile = getProfileForCampus(uniId);
    const uni = UNIVERSITIES[uniId] || UNIVERSITIES['nwu'];
    const studentNum = '202' + Math.floor(10000 + Math.random() * 90000);
    const finalEmail = emailStr || `student@${uni.domain}`;

    return {
      email: finalEmail,
      universityId: uniId,
      studentNumber: studentNum,
      fullName: profile.name,
      degree: profile.degree,
      yearOfStudy: '2nd Year',
      resHall: profile.res,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      bio: `Enthusiastic student at ${uni.name}. Collaborating on study modules, campus events, and student life.`,
      enrolledModules: ['CMPG 311', 'STTK 214', 'WISN 211'],
      isLoggedIn: true,
    };
  };

  // Direct Sign In handler
  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setErrorMessage('Please enter your student number or campus email');
      return;
    }
    if (!loginPassword || loginPassword.length < 4) {
      setErrorMessage('Please enter your valid password (minimum 4 characters)');
      return;
    }

    setErrorMessage('');
    const emailToUse = loginIdentifier.includes('@') 
      ? loginIdentifier 
      : `${loginIdentifier}@${selectedUni.domain}`;

    const session = buildUserSession(selectedUniId, emailToUse);
    onLoginSuccess(session);
  };

  // Face Login Simulator & Camera Handler
  useEffect(() => {
    let stream: MediaStream | null = null;
    let interval: NodeJS.Timeout;

    if (showFaceLoginModal) {
      setFaceScanningProgress(0);
      setFaceScanStatus('aligning');

      // Attempt real camera stream
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'user' } })
          .then((mediaStream) => {
            stream = mediaStream;
            setCameraActive(true);
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              videoRef.current.play().catch(() => {});
            }
          })
          .catch(() => {
            setCameraActive(false);
          });
      }

      // Start biometric scanning simulation
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.floor((elapsed / 2600) * 100));
        setFaceScanningProgress(progress);

        if (progress > 35 && progress < 85) {
          setFaceScanStatus('scanning');
        } else if (progress >= 100) {
          setFaceScanStatus('matched');
          clearInterval(interval);

          // Success: Authenticate student after brief confirmation animation
          setTimeout(() => {
            if (stream) {
              stream.getTracks().forEach((track) => track.stop());
            }
            setShowFaceLoginModal(false);
            const session = buildUserSession(selectedUniId);
            onLoginSuccess(session);
          }, 900);
        }
      }, 100);
    } else {
      setCameraActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showFaceLoginModal, selectedUniId]);

  // Forgot Password handler
  const handleSendForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setErrorMessage('Please enter your student email or student number');
      return;
    }
    setErrorMessage('');
    setForgotSuccess(true);
  };

  // Registration: Send OTP
  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailPrefix.trim()) {
      setErrorMessage('Please enter your campus student ID or email prefix');
      return;
    }
    setErrorMessage('');
    
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpDigits(['', '', '', '']);
    setAuthStep('otp');
    
    setTimeout(() => {
      setOtpNotification(`Varsity Life Verification Code: ${code} (Campus: ${selectedUni.shortName})`);
    }, 400);
  };

  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered.length < 4) {
      setErrorMessage('Please enter all 4 digits');
      return;
    }
    if (entered !== generatedOtp && entered !== '2026') {
      setErrorMessage(`Code does not match. (Hint: check notification or use ${generatedOtp})`);
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setAuthStep('password');
    }, 500);
  };

  const handlePasswordAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword.length < 4) {
      setErrorMessage('Password must be at least 4 characters');
      return;
    }
    if (!hasAgreedToTerms) {
      setErrorMessage('You must agree to the Terms of Service & POPIA statement before continuing.');
      return;
    }

    setErrorMessage('');
    setAuthStep('customize_hub');
  };

  const handleToggleTabChoice = (tabId: AppTabId) => {
    if (selectedTopFourTabs.includes(tabId)) {
      if (selectedTopFourTabs.length <= 1) return;
      setSelectedTopFourTabs((prev) => prev.filter((t) => t !== tabId));
    } else {
      if (selectedTopFourTabs.length >= 4) {
        // Replace 4th
        setSelectedTopFourTabs((prev) => [...prev.slice(0, 3), tabId]);
      } else {
        setSelectedTopFourTabs((prev) => [...prev, tabId]);
      }
    }
  };

  const handleCompleteHubOnboarding = () => {
    const session = buildUserSession(selectedUniId, fullEmail);
    localStorage.setItem('varsity_hub_active_tabs', JSON.stringify(selectedTopFourTabs));
    onLoginSuccess(session, selectedTopFourTabs);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-white selection:text-black">
      {/* Background architectural geometric grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />
      
      {/* Subtle top ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-neutral-800/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Accreditation Badge */}
      <header className="relative z-10 w-full px-6 py-4 flex items-center justify-between border-b border-neutral-900">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400">
            South Africa • 26 Public Universities & 50 TVET Colleges
          </span>
        </div>
        <div className="text-[11px] font-mono px-2.5 py-1 rounded border border-neutral-800 bg-neutral-950 text-neutral-400 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>POPIA Verified</span>
        </div>
      </header>

      {/* Simulated OTP Notification Banner */}
      <AnimatePresence>
        {otpNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 p-4 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl text-left"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shrink-0 font-bold text-xs">
                OTP
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">Campus Security Dispatch</p>
                <p className="text-xs font-mono text-neutral-300 mt-0.5">{otpNotification}</p>
                <button
                  type="button"
                  onClick={() => {
                    setOtpDigits(generatedOtp.split(''));
                    setOtpNotification(null);
                  }}
                  className="mt-2 text-[11px] font-medium text-white underline hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  Quick Auto-Fill ({generatedOtp})
                </button>
              </div>
              <button
                onClick={() => setOtpNotification(null)}
                className="text-neutral-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-neutral-950/90 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <BrandLogo size="md" />

          {/* MODE TOGGLE: SIGN IN VS REGISTER */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold">
            <button
              type="button"
              id="auth-mode-login-tab"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-white text-black shadow font-extrabold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Student Sign In</span>
            </button>

            <button
              type="button"
              id="auth-mode-register-tab"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage('');
              }}
              className={`py-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'bg-white text-black shadow font-extrabold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Register / Verify</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: STUDENT SIGN IN (WITH FORGET PASSWORD & FACE LOGIN) */}
          {/* ========================================================= */}
          {authMode === 'login' && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleDirectLogin}
              className="mt-5 space-y-4 text-left"
            >
              {/* Institution Selector */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    Accredited Campus / Institution
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {selectedUni.institutionType === 'tvet' ? 'TVET College' : 'Public University'}
                  </span>
                </div>
                <div className="relative">
                  <select
                    value={selectedUniId}
                    onChange={(e) => setSelectedUniId(e.target.value as UniversityId)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    {UNIVERSITY_LIST.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.shortName}) • {u.province || u.town}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Student Number / Email */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                  Student Email or Student Number
                </label>
                <div className="flex rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 focus-within:border-white transition-colors">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 20248911 or student"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="flex-1 bg-transparent px-3.5 py-3 text-sm text-white focus:outline-none"
                  />
                  {!loginIdentifier.includes('@') && (
                    <span className="bg-neutral-800 px-3 py-3 text-xs text-neutral-400 font-mono flex items-center border-l border-neutral-700">
                      @{selectedUni.domain}
                    </span>
                  )}
                </div>
              </div>

              {/* Password with Show/Hide */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    Password
                  </label>
                  <button
                    type="button"
                    id="forgot-password-link"
                    onClick={() => {
                      setShowForgotPasswordModal(true);
                      setForgotSuccess(false);
                      setForgotEmail(loginIdentifier.includes('@') ? loginIdentifier : `${loginIdentifier}@${selectedUni.domain}`);
                    }}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your student password"
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl px-3.5 py-3 pr-10 text-sm text-white font-mono outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Campus Badge Preview */}
              <div 
                className="p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors"
                style={{ 
                  backgroundColor: `${selectedUni.primaryColor}22`,
                  borderColor: `${selectedUni.accentColor}66`
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div 
                    className="w-3.5 h-3.5 rounded-full shrink-0" 
                    style={{ backgroundColor: selectedUni.accentColor }} 
                  />
                  <div className="text-xs text-neutral-300 min-w-0 truncate">
                    <span className="font-bold text-white">{selectedUni.name}</span> ({selectedUni.shortName})
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-neutral-300 border border-white/10 shrink-0">
                  {selectedUni.town}
                </span>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Sign In & Face Login Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="submit"
                  id="sign-in-button"
                  className="w-full py-3.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg"
                  style={{ backgroundColor: selectedUni.accentColor }}
                >
                  <Lock className="w-4 h-4" />
                  <span>Sign In with Password</span>
                </button>

                {/* Face Login Action Button */}
                <button
                  type="button"
                  id="face-login-trigger"
                  onClick={() => setShowFaceLoginModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                >
                  <ScanFace className="w-4 h-4 text-emerald-400" />
                  <span>Face Login (Biometric Face ID)</span>
                </button>
              </div>
            </motion.form>
          )}

          {/* ========================================================= */}
          {/* TAB 2: REGISTER / VERIFY CAMPUS (WITH INSTITUTION SEARCH) */}
          {/* ========================================================= */}
          {authMode === 'register' && (
            <div>
              {/* STEP 1: INSTITUTION SEARCH & EMAIL PREFIX */}
              {authStep === 'details' && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSendCode}
                  className="mt-5 space-y-4 text-left"
                >
                  {/* Real-time Institution Search Input */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      1. Search Your Institution (All 76 Universities & TVET Colleges)
                    </label>
                    <div className="relative">
                      <div className="flex items-center rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 focus-within:border-white transition-colors">
                        <Search className="w-4 h-4 text-neutral-400 ml-3.5 shrink-0" />
                        <input
                          type="text"
                          id="institution-search-input"
                          placeholder="Type campus name, acronym, province (e.g. Wits, DUT, Vhembe)..."
                          value={institutionSearchQuery}
                          onChange={(e) => {
                            setInstitutionSearchQuery(e.target.value);
                            setIsInstitutionDropdownOpen(true);
                          }}
                          onFocus={() => setIsInstitutionDropdownOpen(true)}
                          className="w-full bg-transparent px-3 py-3 text-xs text-white focus:outline-none placeholder-neutral-500"
                        />
                      </div>

                      {/* Dropdown search results */}
                      {isInstitutionDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl z-40 max-h-56 overflow-y-auto divide-y divide-neutral-800">
                          <div className="p-2 bg-neutral-950 text-[10px] font-mono text-neutral-400 flex items-center justify-between">
                            <span>Found {filteredInstitutions.length} South African Institutions</span>
                            <button
                              type="button"
                              onClick={() => setIsInstitutionDropdownOpen(false)}
                              className="text-neutral-500 hover:text-white cursor-pointer text-xs"
                            >
                              ✕
                            </button>
                          </div>
                          {filteredInstitutions.map((u) => (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => handleUniversitySelect(u)}
                              className={`w-full p-2.5 text-left flex items-center justify-between gap-2 hover:bg-neutral-800 transition-colors cursor-pointer ${
                                selectedUniId === u.id ? 'bg-neutral-800/90' : ''
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-xs text-white">{u.name}</span>
                                  <span className="text-[10px] font-mono text-cyan-400 font-bold">({u.shortName})</span>
                                </div>
                                <div className="text-[10px] text-neutral-400 mt-0.5 truncate">
                                  {u.town}{u.province ? `, ${u.province}` : ''} • <span className="font-mono">{u.domain}</span>
                                </div>
                              </div>
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                                u.institutionType === 'tvet' 
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}>
                                {u.institutionType === 'tvet' ? 'TVET College' : 'University'}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Active Selected Institution Confirmation Badge */}
                    <div 
                      className="mt-2 p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-colors cursor-pointer"
                      onClick={() => setIsInstitutionDropdownOpen(!isInstitutionDropdownOpen)}
                      style={{ 
                        backgroundColor: `${selectedUni.primaryColor}22`,
                        borderColor: `${selectedUni.accentColor}66`
                      }}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div 
                          className="w-3.5 h-3.5 rounded-full shrink-0" 
                          style={{ backgroundColor: selectedUni.accentColor }} 
                        />
                        <div className="text-xs text-neutral-200 truncate">
                          <span className="font-bold text-white">{selectedUni.name}</span> ({selectedUni.shortName})
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 hover:text-white underline shrink-0">
                        Change
                      </span>
                    </div>
                  </div>

                  {/* Student Email or ID */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      2. Student Email Prefix or Student Number
                    </label>
                    <div className="flex rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 focus-within:border-white transition-colors">
                      <input
                        type="text"
                        required
                        placeholder="e.g. 34109924 or student"
                        value={emailPrefix}
                        onChange={(e) => setEmailPrefix(e.target.value)}
                        className="flex-1 bg-transparent px-3.5 py-3 text-sm text-white focus:outline-none"
                      />
                      <span className="bg-neutral-800 px-3 py-3 text-xs text-neutral-400 font-mono flex items-center border-l border-neutral-700">
                        @{selectedUni.domain}
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    id="send-verification-code-button"
                    className="w-full py-3.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg"
                    style={{ backgroundColor: selectedUni.accentColor }}
                  >
                    <span>Send 4-Digit Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              )}

              {/* STEP 2: OTP VERIFICATION */}
              {authStep === 'otp' && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleVerifyOtp}
                  className="mt-6 space-y-4 text-center"
                >
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Step 2 of 3
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">Verify Campus Student Email</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      We sent a 4-digit code to <strong className="text-neutral-200">{fullEmail}</strong>
                    </p>
                  </div>

                  <div className="flex justify-center gap-3 py-2">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpInput(index, e.target.value)}
                        className="w-12 h-14 bg-neutral-900 border border-neutral-700 focus:border-white focus:ring-2 focus:ring-white rounded-xl text-center text-xl font-bold font-mono text-white outline-none"
                      />
                    ))}
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full py-3.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all cursor-pointer shadow-lg"
                    style={{ backgroundColor: selectedUni.accentColor }}
                  >
                    {isVerifying ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Verify Code & Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthStep('details')}
                    className="text-xs text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  >
                    ← Back to institution selection
                  </button>
                </motion.form>
              )}

              {/* STEP 3: PASSWORD & LEGAL TERMS AGREEMENT */}
              {authStep === 'password' && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handlePasswordAdvance}
                  className="mt-6 space-y-4 text-left"
                >
                  <div className="text-center pb-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center mb-2 shadow">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white">Campus Identity Confirmed</h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Set password and review Developer Safe Harbor & POPIA agreement
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Create Account Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Enter password (min 4 characters)"
                        className="w-full bg-neutral-900 border border-neutral-700 focus:border-white rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 font-mono outline-none"
                      />
                    </div>
                  </div>

                  {/* MANDATORY LEGAL TERMS & INDEMNITY CHECKBOX */}
                  <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2.5">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        id="legal-terms-checkbox"
                        type="checkbox"
                        checked={hasAgreedToTerms}
                        onChange={(e) => setHasAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-neutral-700 bg-neutral-950 text-cyan-500 focus:ring-0 cursor-pointer shrink-0"
                      />
                      <div className="text-xs text-neutral-300 leading-snug">
                        <span>I agree to the </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsLegalModalOpen(true);
                          }}
                          className="text-white font-bold underline hover:text-cyan-400 cursor-pointer"
                        >
                          Terms of Service & POPIA Privacy Policy
                        </button>
                        <span>. I understand that Varsity Life HUB is a platform connector and is not liable for marketplace transactions or external personal interactions.</span>
                      </div>
                    </label>

                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1 border-t border-neutral-800/80">
                      <span className="flex items-center gap-1">
                        <Scale className="w-3 h-3 text-neutral-400" />
                        <span>South Africa Act 4 of 2013</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsLegalModalOpen(true)}
                        className="text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Read Full Legal Accord →
                      </button>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    id="enter-hub-button"
                    type="submit"
                    disabled={!hasAgreedToTerms}
                    className={`w-full py-3.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                      hasAgreedToTerms
                        ? 'hover:opacity-90 active:scale-98 cursor-pointer'
                        : 'opacity-40 cursor-not-allowed bg-neutral-600'
                    }`}
                    style={hasAgreedToTerms ? { backgroundColor: selectedUni.accentColor } : {}}
                  >
                    <span>Continue: Customize Your Hub Layout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              )}

              {/* STEP 4: FIRST-TIME USER INITIALIZATION ("CUSTOMIZE YOUR HUB") */}
              {authStep === 'customize_hub' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4 text-left"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 text-neutral-400 mb-1.5">
                      <Sliders className="w-3 h-3 text-cyan-400" />
                      <span>Navigation Onboarding</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-white">Customize Your Hub</h3>
                    <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto">
                      Choose up to <strong className="text-white font-mono">4 favorite tabs</strong> for slots 1–4. The 5th slot is permanently reserved for the <strong className="text-emerald-400">Help, Support & POPIA Privacy Desk</strong>.
                    </p>
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono">
                      Selected: <span className={selectedTopFourTabs.length === 4 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>{selectedTopFourTabs.length} / 4 tabs</span>
                    </div>
                  </div>

                  {/* 9 Core Tabs Grid */}
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {ONBOARDING_NINE_TABS.filter(t => t.id !== 'help-support').map((tab) => {
                      const isSelected = selectedTopFourTabs.includes(tab.id);
                      const Icon = tab.icon;

                      return (
                        <div
                          key={tab.id}
                          onClick={() => handleToggleTabChoice(tab.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'bg-neutral-900 border-white/40 shadow'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={isSelected ? { backgroundColor: `${selectedUni.accentColor}22` } : { backgroundColor: '#262626' }}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">{tab.title}</h4>
                              <p className="text-[10px] text-neutral-400 truncate">{tab.desc}</p>
                            </div>
                          </div>

                          <div 
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                              isSelected 
                                ? 'bg-white text-black border-white' 
                                : 'border-neutral-700 text-transparent'
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mandatory Slot 5 Note */}
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-emerald-500/30 flex items-center gap-2 text-[11px] text-emerald-300">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Slot 5: Permanent Mandatory Help & POPIA Safety Desk</span>
                  </div>

                  <button
                    id="save-and-enter-hub-button"
                    type="button"
                    onClick={handleCompleteHubOnboarding}
                    className="w-full py-3.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:opacity-90 active:scale-98 cursor-pointer"
                    style={{ backgroundColor: selectedUni.accentColor }}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Save & Enter Hub ({selectedUni.shortName})</span>
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* OFFICIAL FOOTER MANDATED BY USER */}
        <div className="text-center mt-6 text-[11px] text-neutral-400 space-y-1.5 max-w-md mx-auto">
          <p className="font-semibold text-neutral-300">
            © 2026 Varsity Life HUB. All Rights Reserved.
          </p>
          <p>
            Further inquiries:{' '}
            <a 
              href="mailto:varsitylifehub@gmail.com" 
              className="text-cyan-400 font-mono font-bold underline hover:text-cyan-300 transition-colors"
            >
              varsitylifehub@gmail.com
            </a>
          </p>
          <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-neutral-500">
            <button
              type="button"
              onClick={() => setIsLegalModalOpen(true)}
              className="text-neutral-400 hover:text-white underline cursor-pointer"
            >
              Privacy Policy & POPIA Statement
            </button>
            <span>•</span>
            <span>Accredited Campus Network</span>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="relative z-10 w-full px-6 py-3 border-t border-neutral-900 text-center text-[10px] font-mono text-neutral-500">
        Varsity Life HUB South Africa • Isolated Feeds • POPIA Protected • Inquiries: varsitylifehub@gmail.com
      </footer>

      {/* ========================================================= */}
      {/* 🔐 FORGOT PASSWORD MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showForgotPasswordModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-6 shadow-2xl relative text-left"
            >
              <div className="flex items-center justify-between mb-4 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Reset Student Password</h3>
                    <p className="text-[10px] text-neutral-400 font-mono">{selectedUni.shortName} Campus Dispatch</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!forgotSuccess ? (
                <form onSubmit={handleSendForgotPassword} className="space-y-4 text-xs">
                  <p className="text-neutral-300 leading-relaxed">
                    Enter your registered student email or campus student number. We will dispatch a secure 4-digit password reset authorization code to your institutional mailbox.
                  </p>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Student Email or Student Number
                    </label>
                    <input
                      type="text"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="e.g. 20248911@varsity.ac.za"
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-3 text-white text-xs font-mono focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                    <p className="font-semibold text-white">Need campus administrative intervention?</p>
                    <p>
                      If you lost access to your student inbox, escalate directly to the registrar support desk at:{' '}
                      <a href="mailto:varsitylifehub@gmail.com" className="text-cyan-400 underline font-mono">
                        varsitylifehub@gmail.com
                      </a>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Send Reset Authorization</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3 text-xs">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Reset Instructions Dispatched!</h4>
                  <p className="text-neutral-300 leading-relaxed">
                    A secure 4-digit temporary access token has been queued for <strong className="text-white font-mono">{forgotEmail}</strong>. Please check your student inbox or spam folder.
                  </p>
                  <p className="text-[11px] text-neutral-400 pt-1">
                    For escalation inquiries, reach our administrative team at <span className="font-mono text-cyan-400">varsitylifehub@gmail.com</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="w-full py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs cursor-pointer mt-2"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 👤 FACE LOGIN (BIOMETRIC FACIAL SCANNER) MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showFaceLoginModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <ScanFace className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">Biometric Face Login</h3>
                    <p className="text-[10px] font-mono text-neutral-400">{selectedUni.name} Accredited Gateway</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFaceLoginModal(false)}
                  className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Live Camera / High-Tech Face Scanning Target Box */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden bg-neutral-900 border-2 border-dashed border-neutral-700 flex items-center justify-center shadow-inner">
                {/* Real video feed if camera allowed */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute inset-0 w-full h-full object-cover ${cameraActive ? 'opacity-80' : 'hidden'}`}
                />

                {/* Biometric Mesh Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 pointer-events-none">
                  {/* Face Target Silhouette Ring */}
                  <div className={`w-44 h-56 rounded-[48px] border-2 transition-all flex flex-col items-center justify-between p-3 relative ${
                    faceScanStatus === 'matched'
                      ? 'border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
                      : faceScanStatus === 'scanning'
                      ? 'border-cyan-400 animate-pulse'
                      : 'border-white/40'
                  }`}>
                    {/* Corner Bracket Markers */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

                    {/* Laser Scanner Bar Animation */}
                    <motion.div
                      animate={{ y: [0, 160, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#22d3ee]"
                    />

                    {/* Center Biometric Face Icon */}
                    <div className="my-auto opacity-70">
                      <ScanFace className={`w-20 h-20 transition-colors ${
                        faceScanStatus === 'matched' ? 'text-emerald-400' : 'text-cyan-300'
                      }`} />
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {faceScanStatus === 'matched' ? 'FACE MATCH 100%' : 'ALIGN FACE'}
                    </span>
                  </div>
                </div>

                {/* Top Live Biometric Status Badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-white">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{cameraActive ? 'Camera Live' : 'AI Sensor Mesh'}</span>
                </div>
              </div>

              {/* Progress & Feedback Details */}
              <div className="mt-5 text-center space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span>Biometric Vector Extraction</span>
                  <span className="text-white font-bold">{faceScanningProgress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                    style={{ width: `${faceScanningProgress}%` }}
                  />
                </div>

                <div className="pt-2">
                  {faceScanStatus === 'aligning' && (
                    <p className="text-neutral-400">Position your face within the frame on {selectedUni.shortName}...</p>
                  )}
                  {faceScanStatus === 'scanning' && (
                    <p className="text-cyan-300 font-semibold animate-pulse">Matching facial landmarks against campus student records...</p>
                  )}
                  {faceScanStatus === 'matched' && (
                    <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Face Identity Verified! Launching campus hub...</span>
                    </div>
                  )}
                </div>

                <p className="text-[10px] text-neutral-500 font-mono pt-1">
                  Protected under POPIA Section 26 biometric processing safeguards.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* High-Fidelity Legal Overlay Modal */}
      <LegalTermsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        currentUniversity={selectedUni}
      />
    </div>
  );
};
