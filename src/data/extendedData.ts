import { UniversityId, SmartTool, StudentGig, CampusSpottedPost, DirectConversation } from '../types';

export interface CampusUtilityStatus {
  loadsheddingStage: string;
  loadsheddingTime: string;
  waterStatus: string;
  waterReservoir: string;
  gridZone: string;
  emergencyNumber: string;
  campusSecurityPost: string;
}

export const CAMPUS_UTILITY_DATA: Record<UniversityId, CampusUtilityStatus> = {
  nwu: {
    loadsheddingStage: 'Stage 1',
    loadsheddingTime: '14:00 - 16:30',
    waterStatus: 'Normal Pressure',
    waterReservoir: '94% Campus Reservoir',
    gridZone: 'JB Marks Substation 3',
    emergencyNumber: '018 299 2211',
    campusSecurityPost: 'Ferdinand Postma Main Gate & Fanie du Toit'
  },
  wits: {
    loadsheddingStage: 'Stage 2',
    loadsheddingTime: '16:00 - 18:30',
    waterStatus: 'Normal Flow',
    waterReservoir: 'Braamfontein Tower OK',
    gridZone: 'City Power Zone 4B',
    emergencyNumber: '011 717 4444',
    campusSecurityPost: 'Senate House / Great Hall Security'
  },
  uct: {
    loadsheddingStage: 'No Loadshedding',
    loadsheddingTime: 'City Protected Grid',
    waterStatus: 'Level 1 Wise Usage',
    waterReservoir: 'Table Mountain Catchment Normal',
    gridZone: 'Cape Town Area 7',
    emergencyNumber: '021 650 2222',
    campusSecurityPost: 'Burnage House / Jammie Plaza CPS'
  },
  up: {
    loadsheddingStage: 'Stage 1',
    loadsheddingTime: '18:00 - 20:30',
    waterStatus: 'Normal Pressure',
    waterReservoir: 'Hatfield Reservoir 88%',
    gridZone: 'Tshwane Substation Group 2',
    emergencyNumber: '012 420 2310',
    campusSecurityPost: 'Hatfield Prospect Street 24/7 Desk'
  },
  tut: {
    loadsheddingStage: 'Stage 2',
    loadsheddingTime: '12:00 - 14:30',
    waterStatus: 'Normal Flow',
    waterReservoir: 'Pretoria West Supply OK',
    gridZone: 'Tshwane West Grid',
    emergencyNumber: '012 382 5000',
    campusSecurityPost: 'Main Gate 1 Control Room'
  },
  su: {
    loadsheddingStage: 'No Loadshedding',
    loadsheddingTime: 'Solar Farm Co-generation Active',
    waterStatus: 'Normal Pressure',
    waterReservoir: 'Idas Valley Supply Normal',
    gridZone: 'Stellenbosch Municipality Zone 1',
    emergencyNumber: '021 808 2333',
    campusSecurityPost: 'Kroonspan / Neelsie Security Desk'
  },
  uj: {
    loadsheddingStage: 'Stage 2',
    loadsheddingTime: '14:00 - 16:30',
    waterStatus: 'Tankers on Standby',
    waterReservoir: 'Kingsway Reservoir Stable',
    gridZone: 'City Power Auckland Park',
    emergencyNumber: '011 559 2555',
    campusSecurityPost: 'Kingsway Campus Main Entrance Gate'
  },
  dut: {
    loadsheddingStage: 'Stage 1',
    loadsheddingTime: '20:00 - 22:30',
    waterStatus: 'Normal Pressure',
    waterReservoir: 'eThekwini Berea Reservoir OK',
    gridZone: 'eThekwini Area 14',
    emergencyNumber: '031 373 2222',
    campusSecurityPost: 'Steve Biko Campus Gate 3'
  },
  ukzn: {
    loadsheddingStage: 'Stage 1',
    loadsheddingTime: '16:00 - 18:30',
    waterStatus: 'Normal Pressure',
    waterReservoir: 'Howard College Tanks 91%',
    gridZone: 'eThekwini Sector 9',
    emergencyNumber: '031 260 7777',
    campusSecurityPost: 'Denis Shepstone Control Room'
  },
  cput: {
    loadsheddingStage: 'No Loadshedding',
    loadsheddingTime: 'City Protected Grid',
    waterStatus: 'Normal Flow',
    waterReservoir: 'Bellville Reservoirs Stable',
    gridZone: 'Cape Town Bellville 2',
    emergencyNumber: '021 959 6555',
    campusSecurityPost: 'Admin Building Security Lobby'
  },
  coastal: {
    loadsheddingStage: 'Stage 2',
    loadsheddingTime: '10:00 - 12:30',
    waterStatus: 'Normal Flow',
    waterReservoir: 'Local Municipal Tanks OK',
    gridZone: 'eThekwini South',
    emergencyNumber: '031 905 7000',
    campusSecurityPost: 'Swinton Campus Main Gate'
  },
  unizulu: {
    loadsheddingStage: 'Stage 2',
    loadsheddingTime: '14:00 - 16:30',
    waterStatus: 'Normal Flow',
    waterReservoir: 'KwaDlangezwa Campus Borehole Active',
    gridZone: 'King Cetshwayo Grid 5',
    emergencyNumber: '035 902 6599',
    campusSecurityPost: 'Main Admin Security Post'
  },
  mut: {
    loadsheddingStage: 'Stage 2',
    loadsheddingTime: '12:00 - 14:30',
    waterStatus: 'Normal Pressure',
    waterReservoir: 'Umlazi Regional Tank 85%',
    gridZone: 'Umlazi V-Section Grid',
    emergencyNumber: '031 907 7100',
    campusSecurityPost: 'Tower Block Security Desk'
  },
  nmu: {
    loadsheddingStage: 'Stage 1',
    loadsheddingTime: '18:00 - 20:30',
    waterStatus: 'Normal Pressure',
    waterReservoir: 'Summerstrand Reservoirs 89%',
    gridZone: 'Nelson Mandela Bay Area 8',
    emergencyNumber: '041 504 2490',
    campusSecurityPost: 'South Campus Kraal Security Hub'
  }
};

export const SMART_TOOLS_CATALOG: SmartTool[] = [
  // AI Writers & Thinkers
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT (OpenAI)',
    category: 'AI Writers & Thinkers',
    description: 'Brainstorm essay outlines, debug computer code, explain tricky syllabus concepts, and summarize lecture slides.',
    icon: 'Bot',
    url: 'https://chatgpt.com',
    tags: ['Brainstorming', 'Code Debug', 'Writing', 'Free Tier'],
    pricing: 'Free & Plus',
    keyFeature: 'Conversational reasoning & step-by-step concept explanations'
  },
  {
    id: 'tool-copilot',
    name: 'Microsoft Copilot',
    category: 'AI Writers & Thinkers',
    description: 'Integrated campus search with live web citations, Word document polishing, and PowerPoint draft outlines.',
    icon: 'Sparkles',
    url: 'https://copilot.microsoft.com',
    tags: ['Web Grounding', 'Office 365', 'Citations', 'Free with Student Email'],
    pricing: 'Free with .ac.za',
    keyFeature: 'Direct integration with Word & live web search grounding'
  },
  {
    id: 'tool-grammarly',
    name: 'Grammarly Academic',
    category: 'AI Writers & Thinkers',
    description: 'Tone consistency, thesis clarity, academic grammar verification, and anti-plagiarism phrasing suggestions.',
    icon: 'FileCheck',
    url: 'https://www.grammarly.com',
    tags: ['Grammar', 'Academic Tone', 'Thesis Polish', 'Browser Extension'],
    pricing: 'Freemium',
    keyFeature: 'Fixes passive voice and grammatical errors in real time'
  },
  {
    id: 'tool-claude',
    name: 'Claude (Anthropic)',
    category: 'AI Writers & Thinkers',
    description: 'Exceptional long-context document analysis. Upload complete 50-page PDF course readers for instant syntheses.',
    icon: 'FileText',
    url: 'https://claude.ai',
    tags: ['Long PDF Analysis', 'Nuanced Writing', 'Ethics'],
    pricing: 'Free & Pro',
    keyFeature: 'Processes entire textbook chapters and case studies in one prompt'
  },

  // Deep Research
  {
    id: 'tool-perplexity',
    name: 'Perplexity AI',
    category: 'Deep Research',
    description: 'Academic search engine that generates detailed answers backed by exact numbered citations and links to original sources.',
    icon: 'Search',
    url: 'https://www.perplexity.ai',
    tags: ['Verified Sources', 'Literature Review', 'Inline Citations'],
    pricing: 'Free & Pro',
    keyFeature: 'Finds and cites peer-reviewed journals with direct links'
  },
  {
    id: 'tool-google-scholar',
    name: 'Google Scholar',
    category: 'Deep Research',
    description: 'Search across articles, theses, dissertations, preprints, abstracts, and court opinions across all academic disciplines.',
    icon: 'GraduationCap',
    url: 'https://scholar.google.com',
    tags: ['Journal Articles', 'Harvard / APA BibTeX', 'Free Access'],
    pricing: '100% Free',
    keyFeature: 'Export citations in Harvard, APA, and IEEE formats with one click'
  },
  {
    id: 'tool-research-rabbit',
    name: 'ResearchRabbit',
    category: 'Deep Research',
    description: 'The "Spotify for academic papers". Visualizes citation networks, co-authorship graphs, and suggests related papers automatically.',
    icon: 'Network',
    url: 'https://www.researchrabbit.ai',
    tags: ['Interactive Graph', 'Literature Mapping', 'Zotero Sync'],
    pricing: '100% Free for Students',
    keyFeature: 'Visual graph that reveals hidden connections between research papers'
  },
  {
    id: 'tool-scispace',
    name: 'SciSpace (Typeset)',
    category: 'Deep Research',
    description: 'Read research papers 10x faster. Highlight any confusing formula or table to get an instant plain-English breakdown.',
    icon: 'BookOpen',
    url: 'https://typeset.io',
    tags: ['Paper Explainer', 'Formula Decoding', 'Literature Search'],
    pricing: 'Freemium',
    keyFeature: 'Simplifies complex math formulas, graphs, and academic jargon'
  },

  // Textbook Finders
  {
    id: 'tool-vanschaik',
    name: 'Van Schaik Bookstore',
    category: 'Textbook Finders',
    description: 'South Africa’s premier campus academic supplier. Buy physical textbooks or eBooks, redeem NSFAS allowances, and check syllabus lists.',
    icon: 'ShoppingBag',
    url: 'https://www.vanschaik.com',
    tags: ['NSAS Accepted', 'Official Syllabi', 'Nationwide Branches'],
    pricing: 'Retail & NSFAS Approved',
    keyFeature: 'Prescribed textbook search by university faculty and course code'
  },
  {
    id: 'tool-protea',
    name: 'Protea Boekwinkel',
    category: 'Textbook Finders',
    description: 'Renowned academic bookstore with extensive collections in Law, Humanities, Education, Languages, and Natural Sciences.',
    icon: 'Building',
    url: 'https://proteaboekwinkel.com',
    tags: ['Law & Humanities', 'Academic Presses', 'Physical Stores'],
    pricing: 'Retail & Student Discounts',
    keyFeature: 'Curated South African law journals and tertiary literature'
  },
  {
    id: 'tool-snapplify',
    name: 'Snapplify Reader & Store',
    category: 'Textbook Finders',
    description: 'Digital e-textbooks for South African higher education. Read offline on laptops and mobile devices, make highlights and study flashcards.',
    icon: 'Tablet',
    url: 'https://snapplify.com',
    tags: ['eBooks', 'Offline Reading', 'Interactive Highlighting'],
    pricing: 'Pay-per-book or Library',
    keyFeature: 'Zero mobile data consumption for offline textbook viewing'
  },
  {
    id: 'tool-bookdash',
    name: 'Campus Book Exchange SA',
    category: 'Textbook Finders',
    description: 'Peer-to-peer textbook barter and second-hand trading portal. Save up to 70% compared to brand-new bookstore shelf prices.',
    icon: 'Repeat',
    url: 'https://bookdash.org',
    tags: ['2nd Hand Books', 'Peer Exchange', 'Save up to 70%'],
    pricing: 'Student-to-Student Deals',
    keyFeature: 'Connect directly with senior students selling last year’s modules'
  }
];

export const INITIAL_STUDENT_GIGS: Record<UniversityId, StudentGig[]> = {
  nwu: [
    {
      id: 'gig-nwu-1',
      universityId: 'nwu',
      title: 'CMPG 211 / 311 Object-Oriented Programming Peer Tutor',
      payRate: 'R180 / hour',
      category: 'Tutoring',
      description: 'Looking for a senior BSc IT student to help me prep for the C# and Java semester test. 2 sessions per week at the library cubicles.',
      location: 'Ferdinand Postma Library / Lab 4',
      duration: '4 weeks (test prep)',
      posterName: 'Tshepo Mokoena',
      posterAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      posterContact: 'tshepo.m@mynwu.ac.za',
      createdAt: '3 hrs ago',
      applicantsCount: 4
    },
    {
      id: 'gig-nwu-2',
      universityId: 'nwu',
      title: 'Res Room End-of-Semester Cleanout & Moving Assistance',
      payRate: 'R280 flat',
      category: 'Moving & Res',
      description: 'Need help carrying 4 storage boxes and a bar fridge down 2 flights of stairs to my bakkie at Veritas Men’s Hall.',
      location: 'Veritas Residence, Potch Campus',
      duration: 'Approx 1.5 hours',
      posterName: 'Christo Venter',
      posterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      posterContact: 'christo.v@mynwu.ac.za',
      createdAt: '5 hrs ago',
      applicantsCount: 2
    },
    {
      id: 'gig-nwu-3',
      universityId: 'nwu',
      title: 'Varsity Cup Social Media Content Creator & Video Reel Editor',
      payRate: 'R350 / match event',
      category: 'Creative & Media',
      description: 'Capture TikTok & Instagram reels for the residence cheer squad during Monday night home rugby matches at Fanie du Toit.',
      location: 'Fanie du Toit Sports Grounds',
      duration: 'Monday evenings 18:00 - 20:30',
      posterName: 'Anri Coetzee',
      posterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      posterContact: 'anri.c@mynwu.ac.za',
      createdAt: '1 day ago',
      applicantsCount: 7
    },
    {
      id: 'gig-nwu-4',
      universityId: 'nwu',
      title: 'Bult Cafeteria Flyer Handout & Student Survey Collector',
      payRate: 'R120 / hour',
      category: 'Delivery & Chores',
      description: 'Hand out marketing flyers for a new student coffee spot on the Bult strip between 11:00 and 13:00 during class intervals.',
      location: 'Bult Strip & Student Centre Walkway',
      duration: '2 hours today',
      posterName: 'Kagiso Moloi',
      posterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      posterContact: 'kmoloi@mynwu.ac.za',
      createdAt: '2 days ago',
      applicantsCount: 5
    }
  ],
  wits: [
    {
      id: 'gig-wits-1',
      universityId: 'wits',
      title: 'Calculus & Linear Algebra (MATH 1014) Tutor',
      payRate: 'R200 / hour',
      category: 'Tutoring',
      description: 'First year engineering student needing assistance with integration techniques and matrix transformations.',
      location: 'Wartenweiler Library, East Campus',
      duration: 'Weekly sessions',
      posterName: 'Naledi Sithole',
      posterAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      posterContact: 'naledi@students.wits.ac.za',
      createdAt: '4 hrs ago',
      applicantsCount: 6
    },
    {
      id: 'gig-wits-2',
      universityId: 'wits',
      title: 'Braamfontein Student Apartment Moving Helper',
      payRate: 'R300 flat',
      category: 'Moving & Res',
      description: 'Need assistance loading furniture and boxes into an elevator and moving van on Juta Street.',
      location: 'South Point Hall, Braamfontein',
      duration: '2 hours',
      posterName: 'Farhan Patel',
      posterAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      posterContact: 'farhan@students.wits.ac.za',
      createdAt: '1 day ago',
      applicantsCount: 3
    }
  ],
  uct: [
    {
      id: 'gig-uct-1',
      universityId: 'uct',
      title: 'Economics 1010 Macroeconomics Revision Assistant',
      payRate: 'R190 / hour',
      category: 'Tutoring',
      description: 'Prep session for the upcoming micro and macro tests. Senior commerce tutor preferred.',
      location: 'Chancellor Oppenheimer Library, Upper Campus',
      duration: '3 hours over weekend',
      posterName: 'Liam Fitzpatrick',
      posterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      posterContact: 'liam@myuct.ac.za',
      createdAt: '2 hrs ago',
      applicantsCount: 5
    }
  ],
  up: [
    {
      id: 'gig-up-1',
      universityId: 'up',
      title: 'Hatfield Residence Braai DJ (House & Amapiano)',
      payRate: 'R650 flat',
      category: 'Creative & Media',
      description: 'Need a student DJ with controller and sound setup for Friday evening house social braai.',
      location: 'Kollege Res Clubhouse, Hatfield',
      duration: '18:00 - 22:00',
      posterName: 'Zander Du Plessis',
      posterAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      posterContact: 'zander@tuks.co.za',
      createdAt: '6 hrs ago',
      applicantsCount: 8
    }
  ],
  tut: [],
  su: [],
  uj: [],
  dut: [],
  ukzn: [],
  cput: [],
  coastal: [],
  unizulu: [],
  mut: [],
  nmu: []
};

export const INITIAL_SPOTTED_POSTS: Record<UniversityId, CampusSpottedPost[]> = {
  nwu: [
    {
      id: 'spotted-nwu-1',
      universityId: 'nwu',
      anonymousTag: '#Spotted_NWU_741',
      category: 'Crush',
      text: 'To the guy wearing the olive green vintage hoodie at Level 3 of Ferdinand Postma library studying mechanical engineering: your calm focus during test week is the only thing keeping my sanity alive! Hope you aced today’s test ☕️',
      timestamp: '45 mins ago',
      likes: 42,
      commentsCount: 9
    },
    {
      id: 'spotted-nwu-2',
      universityId: 'nwu',
      anonymousTag: '#Spotted_NWU_739',
      category: 'Shoutout',
      text: 'Huge shoutout to the cafeteria chef at the Student Centre who slipped me an extra hash brown and chocolate muffin when my student card tapped for the last R15! Campus angels are real ❤️',
      timestamp: '2 hrs ago',
      likes: 88,
      commentsCount: 14
    },
    {
      id: 'spotted-nwu-3',
      universityId: 'nwu',
      anonymousTag: '#Spotted_NWU_735',
      category: 'Lecture',
      text: 'Whoever decided to test the fire alarm speaker system right in the middle of Professor Botha’s stats revision lecture... the entire lecture hall collective sigh was deafening 😂',
      timestamp: '5 hrs ago',
      likes: 61,
      commentsCount: 11
    },
    {
      id: 'spotted-nwu-4',
      universityId: 'nwu',
      anonymousTag: '#Spotted_NWU_728',
      category: 'ResLife',
      text: 'Heimat & Veritas residence amapiano session outside the quad on Friday was legendary. If you heard the trumpet solo from three blocks away, yes that was us 🎺🔥',
      timestamp: '1 day ago',
      likes: 115,
      commentsCount: 23
    }
  ],
  wits: [
    {
      id: 'spotted-wits-1',
      universityId: 'wits',
      anonymousTag: '#Spotted_Wits_392',
      category: 'Library',
      text: 'The 24-hour computer lab at Wartenweiler during exam prep is a whole spiritual experience. We are all living on energy drinks, instant noodles, and prayer.',
      timestamp: '1 hr ago',
      likes: 74,
      commentsCount: 16
    }
  ],
  uct: [
    {
      id: 'spotted-uct-1',
      universityId: 'uct',
      anonymousTag: '#Spotted_UCT_519',
      category: 'ResLife',
      text: 'To whoever returned my lost student card to the Jammie Shuttle lost-and-found desk this morning: thank you so much! You saved me R150 replacement fee!',
      timestamp: '3 hrs ago',
      likes: 92,
      commentsCount: 8
    }
  ],
  up: [
    {
      id: 'spotted-up-1',
      universityId: 'up',
      anonymousTag: '#Spotted_Tuks_804',
      category: 'Crush',
      text: 'The blonde girl studying veterinary sciences with the golden retriever plushie on her backpack at Hatfield library lawn: you have the brightest smile in Pretoria ☀️',
      timestamp: '2 hrs ago',
      likes: 56,
      commentsCount: 12
    }
  ],
  tut: [],
  su: [],
  uj: [],
  dut: [],
  ukzn: [],
  cput: [],
  coastal: [],
  unizulu: [],
  mut: [],
  nmu: []
};

export const INITIAL_CONVERSATIONS: Record<UniversityId, DirectConversation[]> = {
  nwu: [
    {
      id: 'dm-dewald',
      universityId: 'nwu',
      participantName: 'Dewald Van Der Merwe',
      participantAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      participantRes: 'House Aster',
      participantDegree: 'BEng Mechanical 3rd Year',
      lastMessage: 'Sure! I can meet you at the library entrance with the Casio calculator.',
      lastTimestamp: '10:24 AM',
      unreadCount: 1,
      messages: [
        {
          id: 'msg-d-1',
          senderId: 'user',
          senderName: 'You',
          senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
          text: 'Hi Dewald! Is your Casio engineering calculator still available?',
          timestamp: '10:15 AM',
          isUser: true
        },
        {
          id: 'msg-d-2',
          senderId: 'dewald',
          senderName: 'Dewald Van Der Merwe',
          senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
          text: 'Hey! Yes it is. Mint condition, still has the battery cover and formula guide.',
          timestamp: '10:18 AM',
          isUser: false
        },
        {
          id: 'msg-d-3',
          senderId: 'dewald',
          senderName: 'Dewald Van Der Merwe',
          senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
          text: 'Here is a quick snapshot of the display running the equation matrix test:',
          timestamp: '10:20 AM',
          isUser: false,
          attachment: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=600&auto=format&fit=crop&q=80',
            name: 'calculator_screen_test.jpg'
          }
        },
        {
          id: 'msg-d-4',
          senderId: 'dewald',
          senderName: 'Dewald Van Der Merwe',
          senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
          text: 'Sure! I can meet you at the library entrance with the Casio calculator.',
          timestamp: '10:24 AM',
          isUser: false
        }
      ]
    },
    {
      id: 'dm-anri',
      universityId: 'nwu',
      participantName: 'Anri Coetzee',
      participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      participantRes: 'Veritas Res Area',
      participantDegree: 'BSc Mathematical Sciences (Hons)',
      lastMessage: 'Attached the test summary notes PDF for you!',
      lastTimestamp: 'Yesterday',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-a-1',
          senderId: 'user',
          senderName: 'You',
          senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
          text: 'Hi Anri, would love to book a 1-on-1 prep slot for Maths 111.',
          timestamp: 'Yesterday 14:10',
          isUser: true
        },
        {
          id: 'msg-a-2',
          senderId: 'anri',
          senderName: 'Anri Coetzee',
          senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
          text: 'Awesome! I have a slot tomorrow at 14:00. Attached the test summary notes PDF for you!',
          timestamp: 'Yesterday 14:35',
          isUser: false,
          attachment: {
            type: 'file',
            name: 'NWU_MATH111_Test2_Prep_Formulae.pdf',
            size: '2.4 MB'
          }
        },
        {
          id: 'msg-a-3',
          senderId: 'anri',
          senderName: 'Anri Coetzee',
          senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
          text: 'Voice note breakdown of the integration trick:',
          timestamp: 'Yesterday 14:36',
          isUser: false,
          attachment: {
            type: 'voice',
            duration: '0:28'
          }
        }
      ]
    },
    {
      id: 'dm-lerato',
      universityId: 'nwu',
      participantName: 'Lerato Khumalo',
      participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      participantRes: 'Karlien Hall',
      participantDegree: 'BCom Economics 2nd Year',
      lastMessage: 'Hey! Loved your icebreaker on Single & Mingle 😊',
      lastTimestamp: '2 days ago',
      unreadCount: 0,
      messages: [
        {
          id: 'msg-l-1',
          senderId: 'lerato',
          senderName: 'Lerato Khumalo',
          senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          text: 'Hey! Loved your icebreaker on Single & Mingle 😊 Coffee at the Bult coffee shop sounds great!',
          timestamp: '2 days ago',
          isUser: false
        }
      ]
    }
  ],
  wits: [],
  uct: [],
  up: [],
  tut: [],
  su: [],
  uj: [],
  dut: [],
  ukzn: [],
  cput: [],
  coastal: [],
  unizulu: [],
  mut: [],
  nmu: []
};

// Common AI Live Support Responses for automated instant resolution
export const AI_SUPPORT_KNOWLEDGE_BASE = [
  {
    keywords: ['book', 'sell', 'textbook', 'marketplace', 'post item'],
    answer: 'To sell a textbook or product: Navigate to the Marketplace tab, tap "Post an Item / Service", enter your module name (e.g. CMPG 211, Campbell Biology), set your price in ZAR (R), and upload a photo flyer. Safety reminder: Always meet buyers in broad daylight in public campus zones (e.g., student centre or library foyer) and confirm bank transfer/cash before handing over materials.'
  },
  {
    keywords: ['safety', 'mingle', 'single', 'dating', 'harassment'],
    answer: 'Single & Mingle Safety Protocol: All student accounts are gated by verified South African university email domains. Always keep initial chats on Varsity Life HUB. When meeting in person, pick crowded public spots (campus dining halls, lawns, or coffee shops), inform a friend, and never share banking details, OTPs, or private room numbers. Report any misconduct using the ⚠️ Report button for immediate campus ban.'
  },
  {
    keywords: ['loadshedding', 'electricity', 'power', 'stage'],
    answer: 'Campus Loadshedding & Power: You can check your campus real-time Loadshedding Stage in our top utility bar. During power cuts, campus libraries and main computer labs are backed up with industrial diesel generators and solar micro-grids to ensure uninterrupted Wi-Fi and power for study sessions.'
  },
  {
    keywords: ['emergency', 'sos', 'security', 'police', 'walk buddy', 'protection'],
    answer: 'Emergency Protocol: Tap the floating 🛡️ Emergency SOS icon in the top header. You can immediately call Campus Protection Services (e.g. 018 299 2211 at NWU) or trigger the live Walk Buddy location-sharing escort to walk safely to your residence after late-night study hours.'
  },
  {
    keywords: ['verify', 'email', 'ac.za', 'account', 'login'],
    answer: 'Account Verification: Varsity Life HUB uses strict institutional domain validation (@mynwu.ac.za, @students.wits.ac.za, @myuct.ac.za, etc.). If you encounter verification delays, confirm your student portal credentials or submit a ticket to your campus student representative team.'
  },
  {
    keywords: ['gig', 'job', 'side hustle', 'earn', 'tutor'],
    answer: 'Student Gigs: Switch to the "Student Gigs / Side Hustles" sub-tab in the Marketplace. You can post gigs (e.g., peer tutoring, res room cleaning, event DJing, flyer distribution) or apply to open student requests. All payments are negotiated directly in ZAR with fellow verified students.'
  }
];
