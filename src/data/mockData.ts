import { UniversityId, MarketplaceItem, CampusEvent, ChatMessage, StudyBuddy, CourseModule, CampusNotice, SingleProfile } from '../types';

export const INITIAL_MARKETPLACE: Record<UniversityId, MarketplaceItem[]> = {
  nwu: [
    {
      id: 'm-nwu-1',
      universityId: 'nwu',
      title: 'TI-Nspire CX II CAS Engineering Calculator',
      price: 1850,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Used for BEng Mechanical Year 1 & 2. Mint condition with original box, cable and case. Tested for exams.',
      condition: 'Like New',
      location: 'House Aster / Fanie du Toit Sports Complex',
      sellerName: 'Dewald Van Der Merwe',
      sellerStudentId: '32918231',
      sellerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'dewald@mynwu.ac.za',
      createdAt: '2 hrs ago',
      likes: 14,
    },
    {
      id: 'm-nwu-2',
      universityId: 'nwu',
      title: 'Campbell Biology (12th SA Edition) + Study Notes',
      price: 650,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Prescribed for Life Sciences & Pharmacy first years. Clean pages, no missing sheets. Includes handwritten summary notes!',
      condition: 'Good',
      location: 'Veritas Men’s Res, Potch',
      sellerName: 'Kagiso Moloi',
      sellerStudentId: '34109924',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'kmoloi@mynwu.ac.za',
      createdAt: '5 hrs ago',
      likes: 9,
    },
    {
      id: 'm-nwu-3',
      universityId: 'nwu',
      title: 'Maths & Stats 111 / 121 Exam Crash-Course Tutoring',
      price: 150,
      category: 'Service',
      subcategory: 'Tutoring',
      description: 'Honours Mathematics student offering 1-on-1 and small group revision sessions before test 2. 92% pass rate for past tutees.',
      location: 'Ferdinand Postma Library Study Cubicles',
      sellerName: 'Anri Coetzee',
      sellerStudentId: '31092842',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'anri.tutoring@mynwu.ac.za',
      createdAt: '1 day ago',
      likes: 31,
    },
    {
      id: 'm-nwu-4',
      universityId: 'nwu',
      title: 'Defy Mini Bar Fridge for Res Room',
      price: 900,
      category: 'Product',
      subcategory: 'Res Essentials',
      description: 'Quiet cooling, fits under standard res desk. Perfect for keeping drinks cold and meal prep fresh during summer semester.',
      condition: 'Fair',
      location: 'Wegbreek Flats, Bult Area',
      sellerName: 'Lize Venter',
      sellerStudentId: '33491823',
      sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'lize.v@mynwu.ac.za',
      createdAt: '2 days ago',
      likes: 18,
    }
  ],
  wits: [
    {
      id: 'm-wits-1',
      universityId: 'wits',
      title: 'Apple iPad Air M1 (64GB) + Apple Pencil 2nd Gen',
      price: 7200,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Used for medical school anatomy note taking. Paperlike screen protector already installed. Selling because upgraded to 256GB.',
      condition: 'Excellent',
      location: 'Parktown Medical School / Wartenweiler Library',
      sellerName: 'Thabo Ndlovu',
      sellerStudentId: '2104928',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'thabo.n@students.wits.ac.za',
      createdAt: '1 hr ago',
      likes: 27,
    },
    {
      id: 'm-wits-2',
      universityId: 'wits',
      title: 'Braamfontein Res Room Steamer & Kettle Bundle',
      price: 350,
      category: 'Product',
      subcategory: 'Res Essentials',
      description: 'Russell Hobbs handheld garment steamer and Russell Hobbs stainless steel kettle. Perfect for South Point or Men’s Res.',
      condition: 'Like New',
      location: 'South Point Central, Braam',
      sellerName: 'Simphiwe Khumalo',
      sellerStudentId: '2291033',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'skhumalo@students.wits.ac.za',
      createdAt: '3 hrs ago',
      likes: 12,
    },
    {
      id: 'm-wits-3',
      universityId: 'wits',
      title: 'BCom Accounting Financial Accounting 2000 Summaries',
      price: 180,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Full semester 1 and 2 past paper breakdowns with lecturer commentary. High distinction guaranteed if you grind these.',
      condition: 'Digital PDF + Hardcopy',
      location: 'Commerce Building / West Campus Law Lawns',
      sellerName: 'Raveen Pillay',
      sellerStudentId: '2093812',
      sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'raveen.p@students.wits.ac.za',
      createdAt: '1 day ago',
      likes: 45,
    }
  ],
  uct: [
    {
      id: 'm-uct-1',
      universityId: 'uct',
      title: 'K-Way Down Jacket (Black, Size M) - Cape Town Wind Proof',
      price: 850,
      category: 'Product',
      subcategory: 'Apparel',
      description: 'A necessity for Upper Campus south-easter gale winds. Packable, ultra-warm, only worn one winter season.',
      condition: 'Like New',
      location: 'Tugwell Hall, Lower Campus',
      sellerName: 'Chloe Sutherland',
      sellerStudentId: 'STHCHL004',
      sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'sthchl004@myuct.ac.za',
      createdAt: '30 mins ago',
      likes: 19,
    },
    {
      id: 'm-uct-2',
      universityId: 'uct',
      title: 'MacBook USB-C Hub (HDMI, SD Card, 3x USB 3.0)',
      price: 320,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Crucial for plugging into Jammie Hall and Leslie Social presentation projectors. Aluminum space grey finish.',
      condition: 'Good',
      location: 'Leslie Social Science Building',
      sellerName: 'Sipho Zulu',
      sellerStudentId: 'ZLUSIP009',
      sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'zlusip009@myuct.ac.za',
      createdAt: '4 hrs ago',
      likes: 15,
    },
    {
      id: 'm-uct-3',
      universityId: 'uct',
      title: 'Eco Carpool: Southern Suburbs to Upper Campus Daily',
      price: 35,
      category: 'Service',
      subcategory: 'Transport',
      description: 'Leaving Claremont / Rondebosch Main Rd every morning at 07:45 direct to North Stop. R35 per trip, beats Jammie shuttle lines.',
      location: 'Upper Campus North Stop',
      sellerName: 'Liam Van Zyl',
      sellerStudentId: 'VZYLI002',
      sellerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'vzyli002@myuct.ac.za',
      createdAt: '1 day ago',
      likes: 22,
    }
  ],
  up: [
    {
      id: 'm-up-1',
      universityId: 'up',
      title: 'Stethoscope Littmann Classic III (Burgundy)',
      price: 1400,
      category: 'Product',
      subcategory: 'Medical',
      description: 'Used for MBChB Clinical rotations at Steve Biko Academic Hospital. Acoustic sensitivity tested, spare earpieces included.',
      condition: 'Like New',
      location: 'Prinshof Campus / Hatfield Res',
      sellerName: 'Francoise Botha',
      sellerStudentId: 'u22019482',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'u22019482@tuks.co.za',
      createdAt: '2 hrs ago',
      likes: 33,
    },
    {
      id: 'm-up-2',
      universityId: 'up',
      title: 'Tuks Rugby Season Ticket + Spring Day VIP Pass',
      price: 450,
      category: 'Product',
      subcategory: 'Tickets',
      description: 'Cannot attend due to my engineering test clash. Genuine student portal transfer.',
      condition: 'Digital Transfer',
      location: 'Hatfield Square / LC de Villiers Sports Grounds',
      sellerName: 'Jacques Meyer',
      sellerStudentId: 'u21938192',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'u21938192@tuks.co.za',
      createdAt: '5 hrs ago',
      likes: 41,
    }
  ],
  tut: [
    {
      id: 'm-tut-1',
      universityId: 'tut',
      title: 'Engineering Drawing Board + T-Square + Stencil Set',
      price: 550,
      category: 'Product',
      subcategory: 'Engineering',
      description: 'Standard A2 drafting board required for National Diploma Mechanical & Electrical. Saves R800 compared to campus shop.',
      condition: 'Good',
      location: 'Pretoria West Main Campus (Building 3)',
      sellerName: 'Blessing Mabena',
      sellerStudentId: '221948190',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'bmabena@tut4life.ac.za',
      createdAt: '1 hr ago',
      likes: 17,
    },
    {
      id: 'm-tut-2',
      universityId: 'tut',
      title: 'Braids, Locs & Cornrows Hair Styling at Res',
      price: 220,
      category: 'Service',
      subcategory: 'Beauty & Grooming',
      description: 'Quick, neat braiding service inside Soshanguve South block. Bring your own extensions or I supply Darling fibers.',
      location: 'Soshanguve South Campus Res 4',
      sellerName: 'Zandile Masondo',
      sellerStudentId: '220391823',
      sellerAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'zmasondo@tut4life.ac.za',
      createdAt: '4 hrs ago',
      likes: 54,
    }
  ],
  su: [
    {
      id: 'm-su-1',
      universityId: 'su',
      title: 'Second-hand Maties Commuter Bicycle + Heavy U-Lock',
      price: 1100,
      category: 'Product',
      subcategory: 'Transport',
      description: 'Single-speed road bike, serviced last month with new brake pads and puncture-resistant tyres. Perfect for Rooiplein & Coetzenburg.',
      condition: 'Good',
      location: 'Helshoogte Men’s Residence, Stellenbosch',
      sellerName: 'Pieter De Villiers',
      sellerStudentId: '23910294',
      sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'pieterdv@sun.ac.za',
      createdAt: '3 hrs ago',
      likes: 21,
    }
  ],
  uj: [
    {
      id: 'm-uj-1',
      universityId: 'uj',
      title: 'Dell 24" Full HD Monitor (IPS, HDMI/VGA)',
      price: 1250,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Great second monitor for programming and coding assignments. Moving out of APK res so need to let it go.',
      condition: 'Like New',
      location: 'Auckland Park Kingsway (APK) Campus',
      sellerName: 'Tshepo Mokoena',
      sellerStudentId: '20210948',
      sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'tshepo@student.uj.ac.za',
      createdAt: '2 hrs ago',
      likes: 19,
    }
  ],
  dut: [
    {
      id: 'm-dut-1',
      universityId: 'dut',
      title: 'Engineering Graphics Drawing Board & Rotary Ruler Set',
      price: 450,
      category: 'Product',
      subcategory: 'Equipment',
      description: 'Standard A3 drawing board with adjustable straightedge and rotary angle ruler. Prescribed for 1st Year Engineering at Ritson & Steve Biko.',
      condition: 'Like New',
      location: 'Ritson Campus / Steve Biko Food Court',
      sellerName: 'Sabelo Khanyile',
      sellerStudentId: '21908432',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'sabelo.k@dut4life.ac.za',
      createdAt: '1 hr ago',
      likes: 16,
    },
    {
      id: 'm-dut-2',
      universityId: 'dut',
      title: 'Nursing Uniform & Littmann Classic Stethoscope',
      price: 650,
      category: 'Product',
      subcategory: 'Equipment',
      description: 'Complete health sciences clinical kit. Clean and tested for hospital rotations.',
      condition: 'Good',
      location: 'Indumiso Campus (PMB)',
      sellerName: 'Nondumiso Ndlovu',
      sellerStudentId: '22019481',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'nndlovu@dut4life.ac.za',
      createdAt: '3 hrs ago',
      likes: 24,
    },
    {
      id: 'm-dut-3',
      universityId: 'dut',
      title: 'Calculus for Technologists & Past Paper Solution Guide',
      price: 130,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Comprehensive worked solutions for past 4 semester tests. Clear step-by-step breakdown.',
      condition: 'Digital + Print',
      location: 'ML Sultan Library',
      sellerName: 'Mthokozisi Cele',
      sellerStudentId: '22149201',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'mcele@dut4life.ac.za',
      createdAt: '1 day ago',
      likes: 38,
    }
  ],
  ukzn: [
    {
      id: 'm-ukzn-1',
      universityId: 'ukzn',
      title: 'Guyton & Hall Medical Physiology (14th South African Edition)',
      price: 850,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Essential for MBChB 2nd & 3rd year students. No highlights on key chapters, mint binding.',
      condition: 'Like New',
      location: 'Nelson R. Mandela Medical School, Umbilo',
      sellerName: 'Kiara Moodley',
      sellerStudentId: '22084920',
      sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'kmoodley@stu.ukzn.ac.za',
      createdAt: '2 hrs ago',
      likes: 31,
    },
    {
      id: 'm-ukzn-2',
      universityId: 'ukzn',
      title: 'Casio FX-991ZA Plus II Scientific Calculator',
      price: 280,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Official approved calculator for UKZN Science & Engineering tests. Fresh battery installed.',
      condition: 'Excellent',
      location: 'Westville Campus Quad / T-Block',
      sellerName: 'Andile Sithole',
      sellerStudentId: '21948123',
      sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'asithole@stu.ukzn.ac.za',
      createdAt: '4 hrs ago',
      likes: 12,
    },
    {
      id: 'm-ukzn-3',
      universityId: 'ukzn',
      title: 'Howard College LLB Law Summaries: Law of Delict & Property',
      price: 180,
      category: 'Service',
      subcategory: 'Tutoring',
      description: 'Case law breakdowns and model exam answers prepared by Dean’s Commendation law student.',
      location: 'Howard College Dennis Shepstone Building',
      sellerName: 'Bhavik Patel',
      sellerStudentId: '21803921',
      sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'bpatel@stu.ukzn.ac.za',
      createdAt: '1 day ago',
      likes: 42,
    }
  ],
  cput: [
    {
      id: 'm-cput-1',
      universityId: 'cput',
      title: 'CPUT Maritime Navigation Chart Set & Brass Compass Dividers',
      price: 480,
      category: 'Product',
      subcategory: 'Equipment',
      description: 'Used for Maritime Studies at Granger Bay. Includes IMO chart plotter and parallel ruler.',
      condition: 'Like New',
      location: 'Granger Bay Campus (Mouille Point)',
      sellerName: 'Dean Hendricks',
      sellerStudentId: '21940291',
      sellerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'dhendricks@mycput.ac.za',
      createdAt: '2 hrs ago',
      likes: 19,
    },
    {
      id: 'm-cput-2',
      universityId: 'cput',
      title: 'Wacom One Graphics Drawing Tablet for Multimedia Design',
      price: 890,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Pressure-sensitive pen tablet. Great for Photoshop, Illustrator and 3D modeling assignments.',
      condition: 'Excellent',
      location: 'District Six Campus Arts Building',
      sellerName: 'Ayesha Jacobs',
      sellerStudentId: '22104928',
      sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'ajacobs@mycput.ac.za',
      createdAt: '5 hrs ago',
      likes: 27,
    }
  ],
  coastal: [
    {
      id: 'm-coastal-1',
      universityId: 'coastal',
      title: 'Electrical Engineering Apprentice Toolkit & Digital Multimeter',
      price: 600,
      category: 'Product',
      subcategory: 'Equipment',
      description: 'Complete workshop kit with insulated pliers, screwdrivers, crimpers, and auto-ranging multimeter. Certified for NCV workshops.',
      condition: 'Like New',
      location: 'Umlazi V Campus Electrical Workshop',
      sellerName: 'Bongani Mdlalose',
      sellerStudentId: '20230912',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'bmdlalose@coastalkzn.co.za',
      createdAt: '3 hrs ago',
      likes: 22,
    },
    {
      id: 'm-coastal-2',
      universityId: 'coastal',
      title: 'Boilermaking & Welding Steel Toe Safety Boots (Size 8)',
      price: 380,
      category: 'Product',
      subcategory: 'Apparel',
      description: 'Heavy duty SABS approved steel cap work boots. Only worn for 4 workshop practicals.',
      condition: 'Good',
      location: 'Swinton Campus Workshop',
      sellerName: 'Siphesihle Ngcobo',
      sellerStudentId: '20229401',
      sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'sngcobo@coastalkzn.co.za',
      createdAt: '6 hrs ago',
      likes: 14,
    }
  ],
  unizulu: [
    {
      id: 'm-unizulu-1',
      universityId: 'unizulu',
      title: 'BEd Foundation Phase Educational Psychology Study Guide',
      price: 260,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Full semester 1 and 2 notes with teaching methodology templates. Clean with no missing pages.',
      condition: 'Good',
      location: 'KwaDlangezwa (Ongoye) Main Campus',
      sellerName: 'Zandile Buthelezi',
      sellerStudentId: '20219482',
      sellerAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'zbuthelezi@unizulu.ac.za',
      createdAt: '4 hrs ago',
      likes: 18,
    },
    {
      id: 'm-unizulu-2',
      universityId: 'unizulu',
      title: 'Lenovo IdeaPad 15" Laptop (Intel i5, 8GB, 256GB SSD)',
      price: 3400,
      category: 'Product',
      subcategory: 'Electronics',
      description: 'Perfect for assignments, online research, and Zoom classes. Battery lasts 5+ hours during load shedding.',
      condition: 'Excellent',
      location: 'Richards Bay Campus / Library',
      sellerName: 'Lindokuhle Shandu',
      sellerStudentId: '20208194',
      sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'lshandu@unizulu.ac.za',
      createdAt: '1 day ago',
      likes: 33,
    }
  ],
  mut: [
    {
      id: 'm-mut-1',
      universityId: 'mut',
      title: 'Civil Engineering Optical Level & Tripod Measuring Staff',
      price: 520,
      category: 'Product',
      subcategory: 'Equipment',
      description: 'Used for MUT Surveying I & II practical field exercises. Tested and calibrated accurately.',
      condition: 'Good',
      location: 'MUT Umlazi Main Campus Engineering Building',
      sellerName: 'Philani Gwala',
      sellerStudentId: '21948192',
      sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'pgwala@mut.ac.za',
      createdAt: '2 hrs ago',
      likes: 17,
    },
    {
      id: 'm-mut-2',
      universityId: 'mut',
      title: 'Chemical Engineering Fluid Mechanics Problem Workbook',
      price: 150,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Includes solved Navier-Stokes problems and pipeline friction factor charts for tests.',
      condition: 'Like New',
      location: 'MUT Main Campus Dining Hall Area',
      sellerName: 'Nomcebo Mkhize',
      sellerStudentId: '22194012',
      sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'nmkhize@mut.ac.za',
      createdAt: '5 hrs ago',
      likes: 21,
    }
  ],
  nmu: [
    {
      id: 'm-nmu-1',
      universityId: 'nmu',
      title: 'Rip Curl Dawn Patrol 3/2mm Steamer Wetsuit (Size M)',
      price: 950,
      category: 'Product',
      subcategory: 'Sports',
      description: 'Ideal for Ocean Sciences marine biology research and weekend surf sessions at Pollok Beach.',
      condition: 'Like New',
      location: 'Ocean Sciences Campus / South Campus Kraal',
      sellerName: 'Matthew Van Rooyen',
      sellerStudentId: '22019482',
      sellerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'mvanrooyen@mandela.ac.za',
      createdAt: '1 hr ago',
      likes: 29,
    },
    {
      id: 'm-nmu-2',
      universityId: 'nmu',
      title: 'BCom Accounting Financial Accounting 2 Summaries (IFRS 15/16)',
      price: 170,
      category: 'Product',
      subcategory: 'Textbooks',
      description: 'Concise summary charts for consolidation and revenue recognition. Highest mark in test 1.',
      condition: 'Digital PDF',
      location: 'South Campus Library, Summerstrand',
      sellerName: 'Bulelani Goba',
      sellerStudentId: '21948201',
      sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      sellerContact: 'bgoba@mandela.ac.za',
      createdAt: '4 hrs ago',
      likes: 20,
    }
  ]
};

export const INITIAL_EVENTS: Record<UniversityId, CampusEvent[]> = {
  nwu: [
    {
      id: 'e-nwu-1',
      universityId: 'nwu',
      title: 'NWU Potch Campus Neon Rag Festival & Battle of the Bands',
      date: 'This Friday, 26 Sept',
      time: '18:00 - 02:00',
      location: 'Fanie du Toit Amphitheatre & Bult Strip',
      category: 'Party',
      description: 'The biggest annual student celebration in Potchefstroom! Featuring live SA DJs, local campus bands, food trucks, and light shows. Tickets include entry and glow gear.',
      organizer: 'NWU Student RAG Committee',
      organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 842,
      isRsvpd: true,
      priceTag: 'R80 Student Card',
    },
    {
      id: 'e-nwu-2',
      universityId: 'nwu',
      title: 'Varsity Cup Rugby: NWU Eagles vs Maties Derby',
      date: 'Next Monday, 29 Sept',
      time: '19:00 Kickoff',
      location: 'Fanie du Toit Sports Grounds',
      category: 'Sports',
      description: 'Back the boys in purple! Massive derby clash with live SuperSport broadcast, cheerleaders, and halftime prize giveaways. Wear purple!',
      organizer: 'NWU Sports Council',
      organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 1420,
      isRsvpd: false,
      priceTag: 'Free with Student ID',
    },
    {
      id: 'e-nwu-3',
      universityId: 'nwu',
      title: 'Engineering & IT Career Expo: Sasol, BBD & Discovery',
      date: 'Wednesday, 01 Oct',
      time: '10:00 - 15:00',
      location: 'Sanlam Auditorium, Building E7',
      category: 'Career',
      description: 'Meet recruiters from top South African engineering and software companies. Bring printed copies of your CV and academic transcripts.',
      organizer: 'NWU Career Centre',
      organizerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 395,
      isRsvpd: false,
      priceTag: 'Free Entry',
    }
  ],
  wits: [
    {
      id: 'e-wits-1',
      universityId: 'wits',
      title: 'Wits Great Hall Acoustic Night & Poetry Slam',
      date: 'Thursday, 25 Sept',
      time: '18:30 - 21:30',
      location: 'Wits Great Hall Piazza, East Campus',
      category: 'Arts',
      description: 'Showcasing the best lyricists, spoken word poets, and jazz musicians across Wits. Free hot chocolate and koeksisters provided.',
      organizer: 'Wits Arts & Cultural Society',
      organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 420,
      isRsvpd: true,
      priceTag: 'Free with Student Card',
    },
    {
      id: 'e-wits-2',
      universityId: 'wits',
      title: 'Braamfontein Rooftop Sundowners & Tech Mixer',
      date: 'Saturday, 27 Sept',
      time: '16:00 - 22:00',
      location: 'Tshimologong Digital Precinct, Juta St',
      category: 'Party',
      description: 'Network with fellow student founders, engineers, and creatives overlooking the Johannesburg skyline.',
      organizer: 'Wits Developer Community',
      organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 289,
      isRsvpd: false,
      priceTag: 'R50',
    }
  ],
  uct: [
    {
      id: 'e-uct-1',
      universityId: 'uct',
      title: 'Jammie Plaza Spring Jam & Food Fair',
      date: 'Friday, 26 Sept',
      time: '12:00 - 17:00',
      location: 'Sarah Baartman Hall Steps & Jammie Plaza',
      category: 'Party',
      description: 'Spring has arrived at Upper Campus! Enjoy live sets by Cape Town student DJs, artisanal food stalls, and society showcase tables.',
      organizer: 'UCT SRC Social Committee',
      organizerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 915,
      isRsvpd: true,
      priceTag: 'Free Entry',
    },
    {
      id: 'e-uct-2',
      universityId: 'uct',
      title: 'Lion\'s Head Sunrise Hike with UCT Mountain Club',
      date: 'Sunday, 28 Sept',
      time: '05:15 Meetup',
      location: 'Upper Campus North Car Park (Carpool to base)',
      category: 'Sports',
      description: 'Catch the golden sunrise over Table Bay before midterm week. Bring water, headlamp, and good trainers.',
      organizer: 'UCT Mountain & Ski Club',
      organizerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 164,
      isRsvpd: false,
      priceTag: 'Free',
    }
  ],
  up: [
    {
      id: 'e-up-1',
      universityId: 'up',
      title: 'Tuks Spring Day 2026: Hatfield Stadium Music Fest',
      date: 'Saturday, 27 Sept',
      time: '11:00 - 23:00',
      location: 'LC de Villiers Sports Campus',
      category: 'Party',
      description: 'The legendary Pretoria student spring festival! Top national artists, foam party zone, and inter-faculty volleyball tournaments.',
      organizer: 'UP Student Representative Council',
      organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 2310,
      isRsvpd: true,
      priceTag: 'R120 Student Pre-sale',
    }
  ],
  tut: [
    {
      id: 'e-tut-1',
      universityId: 'tut',
      title: 'TUT Tech Innovation Expo & Hackathon 2026',
      date: 'Thursday - Friday, 02 Oct',
      time: '09:00 - 17:00',
      location: 'Building 14 Auditorium, Pretoria West Campus',
      category: 'Academic',
      description: '36-hour hackathon tackling energy, transit, and mobile health solutions for Gauteng communities. Cash prizes sponsored by Telkom and SITA.',
      organizer: 'TUT Faculty of ICT',
      organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 450,
      isRsvpd: false,
      priceTag: 'Free Registration',
    }
  ],
  su: [
    {
      id: 'e-su-1',
      universityId: 'su',
      title: 'Rooiplein Wine Valley Acoustic Evening',
      date: 'Friday, 26 Sept',
      time: '17:30 - 22:00',
      location: 'Rooiplein, Stellenbosch Campus',
      category: 'Arts',
      description: 'Relax under the oak trees with live indie acoustic performances and artisanal Stellenbosch snacks.',
      organizer: 'Maties Culture Committee',
      organizerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 680,
      isRsvpd: true,
      priceTag: 'Free with Student Card',
    }
  ],
  uj: [
    {
      id: 'e-uj-1',
      universityId: 'uj',
      title: 'UJ Orange Army Derby: UJ Football vs TUT',
      date: 'Thursday, 25 Sept',
      time: '18:30',
      location: 'UJ Soweto Campus Stadium',
      category: 'Sports',
      description: 'Varsity Football tournament semifinal showdown. Loud drums, vuvuzelas, and high-stakes football.',
      organizer: 'UJ Sport Bureau',
      organizerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 890,
      isRsvpd: true,
      priceTag: 'Free with Student Card',
    }
  ],
  dut: [
    {
      id: 'e-dut-1',
      universityId: 'dut',
      title: 'DUT Steve Biko Spring Cultural Bash & Maskandi Showcase',
      date: 'Friday, 26 Sept',
      time: '14:00 - 22:00',
      location: 'Steve Biko Campus Sports Centre / Courtyard',
      category: 'Party',
      description: 'The premier student celebration in Durban! Live Maskandi, Afro-house and Amapiano sets, traditional attire contest, and local food stalls.',
      organizer: 'DUT SRC Social Committee',
      organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 1120,
      isRsvpd: true,
      priceTag: 'Free with Student Card',
    },
    {
      id: 'e-dut-2',
      universityId: 'dut',
      title: 'DUT Technology & Engineering Student Project Expo',
      date: 'Wednesday, 01 Oct',
      time: '09:00 - 16:00',
      location: 'Ritson Campus Hotel School Auditorium',
      category: 'Academic',
      description: 'Final year engineering and IT capstone demonstrations with industry recruiters and prize sponsorships.',
      organizer: 'Faculty of Engineering & Built Environment',
      organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 380,
      isRsvpd: false,
      priceTag: 'Free Entry',
    }
  ],
  ukzn: [
    {
      id: 'e-ukzn-1',
      universityId: 'ukzn',
      title: 'UKZN Howard College Sundowners & Spoken Word Poetry',
      date: 'Thursday, 25 Sept',
      time: '17:30 - 21:00',
      location: 'Howard College Amphitheatre & Tower Steps',
      category: 'Arts',
      description: 'An evening of live acoustics, spoken word poetry, and views of Durban harbour at dusk. Hot beverages and snacks provided.',
      organizer: 'UKZN Arts & Culture Society',
      organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 460,
      isRsvpd: true,
      priceTag: 'Free with Student ID',
    },
    {
      id: 'e-ukzn-2',
      universityId: 'ukzn',
      title: 'Westville Campus Science & Robotics Hackathon',
      date: 'Saturday, 27 Sept',
      time: '08:30 - 18:00',
      location: 'T-Block Computer Labs, Westville Campus',
      category: 'Academic',
      description: '24-hour sprint building AI and embedded systems for South African healthcare and education. Mentored by UKZN alumni.',
      organizer: 'UKZN Computer Science Society',
      organizerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 290,
      isRsvpd: false,
      priceTag: 'Free Registration',
    }
  ],
  cput: [
    {
      id: 'e-cput-1',
      universityId: 'cput',
      title: 'CPUT District Six Spring Music & Food Truck Fair',
      date: 'Friday, 26 Sept',
      time: '12:00 - 19:00',
      location: 'District Six Campus Piazza, Cape Town',
      category: 'Party',
      description: 'Enjoy Table Mountain views with live student DJ sets, gourmet food trucks, and society stalls across the D6 quad.',
      organizer: 'CPUT Central SRC',
      organizerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 890,
      isRsvpd: true,
      priceTag: 'Free Entry',
    },
    {
      id: 'e-cput-2',
      universityId: 'cput',
      title: 'CPUT Bellville Drone & Autonomous Vehicle Challenge',
      date: 'Tuesday, 30 Sept',
      time: '11:00 - 15:30',
      location: 'Bellville Campus Sports Stadium',
      category: 'Academic',
      description: 'Watch Mechatronics and Mechanical students race autonomous drones and obstacle course robots.',
      organizer: 'Faculty of Engineering',
      organizerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 340,
      isRsvpd: false,
      priceTag: 'Free Entry',
    }
  ],
  coastal: [
    {
      id: 'e-coastal-1',
      universityId: 'coastal',
      title: 'Coastal KZN TVET Annual Artisan Apprenticeship & Trade Fair',
      date: 'Thursday, 25 Sept',
      time: '09:00 - 15:00',
      location: 'Umlazi V Campus Main Exhibition Hall',
      category: 'Career',
      description: 'Connect directly with Sasol, Transnet, Eskom and automotive employers for apprenticeships and trade test placements.',
      organizer: 'Coastal KZN Work Integrated Learning (WIL)',
      organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 520,
      isRsvpd: true,
      priceTag: 'Free for TVET Students',
    },
    {
      id: 'e-coastal-2',
      universityId: 'coastal',
      title: 'Inter-Campus TVET Soccer Derby: Umlazi V vs Swinton',
      date: 'Saturday, 27 Sept',
      time: '14:00 Kickoff',
      location: 'Umlazi King Zwelithini Stadium Outer Fields',
      category: 'Sports',
      description: 'The biggest TVET football clash of the year! Bring your campus colors and support the teams.',
      organizer: 'Coastal KZN Sports Bureau',
      organizerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 680,
      isRsvpd: false,
      priceTag: 'Free Entry',
    }
  ],
  unizulu: [
    {
      id: 'e-unizulu-1',
      universityId: 'unizulu',
      title: 'UNIZULU Ongoye Cultural Heritage Festival & Indlamu Dance',
      date: 'Friday, 26 Sept',
      time: '10:00 - 18:00',
      location: 'King Bhekuzulu Hall, KwaDlangezwa Campus',
      category: 'Party',
      description: 'Celebrate Zululand heritage, traditional beadwork, music, poetry, and traditional cuisine. Best dressed prize of R2,500.',
      organizer: 'UNIZULU Culture & Heritage Directorate',
      organizerAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 1450,
      isRsvpd: true,
      priceTag: 'Free with Student Card',
    },
    {
      id: 'e-unizulu-2',
      universityId: 'unizulu',
      title: 'Richards Bay Maritime & Ocean Science Symposium',
      date: 'Wednesday, 01 Oct',
      time: '10:00 - 14:00',
      location: 'Richards Bay Campus Main Auditorium',
      category: 'Academic',
      description: 'Keynote speakers from Port of Richards Bay, environmental research bodies, and marine biology professors.',
      organizer: 'Faculty of Science & Agriculture',
      organizerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 310,
      isRsvpd: false,
      priceTag: 'Free Entry',
    }
  ],
  mut: [
    {
      id: 'e-mut-1',
      universityId: 'mut',
      title: 'MUT Engineering & Technology Student Innovation Day',
      date: 'Thursday, 25 Sept',
      time: '09:30 - 16:00',
      location: 'MUT Main Amphitheatre & Exhibition Grounds, Umlazi',
      category: 'Career',
      description: 'Showcasing high-impact civil, chemical, and electrical prototypes. Meet enterprise incubators and investors.',
      organizer: 'MUT Technology Station in Chemicals (TSC)',
      organizerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 620,
      isRsvpd: true,
      priceTag: 'Free Entry',
    },
    {
      id: 'e-mut-2',
      universityId: 'mut',
      title: 'MUT Spring Bash & Campus Braai',
      date: 'Friday, 26 Sept',
      time: '15:00 - 23:00',
      location: 'MUT Student Centre Grounds',
      category: 'Party',
      description: 'End the test week right! Free braai packs for the first 400 students, live DJ sets, and student talent show.',
      organizer: 'MUT SRC Entertainment Bureau',
      organizerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 980,
      isRsvpd: false,
      priceTag: 'R30 Student Card',
    }
  ],
  nmu: [
    {
      id: 'e-nmu-1',
      universityId: 'nmu',
      title: 'NMU Madiba Day Coastal Beach Run & Conservation Fest',
      date: 'Saturday, 27 Sept',
      time: '07:30 - 13:00',
      location: 'Summerstrand South Campus Kraal & Pollok Beach',
      category: 'Sports',
      description: '5km coastal run followed by ocean plastic cleanup and beach volleyball tournament. Refreshments and medals for all finishers.',
      organizer: 'Madibaz Sport Council',
      organizerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 780,
      isRsvpd: true,
      priceTag: 'Free Entry',
    },
    {
      id: 'e-nmu-2',
      universityId: 'nmu',
      title: 'Varsity Shield Rugby: NMU Madibaz vs UFH Blues',
      date: 'Monday, 29 Sept',
      time: '19:00 Kickoff',
      location: 'Madibaz Stadium, South Campus',
      category: 'Sports',
      description: 'Live broadcast Varsity Shield clash under the lights! Wear NMU navy and teal colors to support the Madibaz.',
      organizer: 'NMU Athletics Bureau',
      organizerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rsvpCount: 1350,
      isRsvpd: false,
      priceTag: 'Free with Student Card',
    }
  ]
};

export const INITIAL_CHATS: Record<UniversityId, Record<string, ChatMessage[]>> = {
  nwu: {
    '#ResLife': [
      {
        id: 'c-n-1',
        universityId: 'nwu',
        channelId: '#ResLife',
        senderName: 'Janco Du Plessis',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Heidedal Res',
        text: 'Anyone know what time the dining hall closes tonight with the rugby screening happening?',
        timestamp: '17:42',
        isUser: false,
        likes: 3,
      },
      {
        id: 'c-n-2',
        universityId: 'nwu',
        channelId: '#ResLife',
        senderName: 'Naledi Sithole',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Klawerhof',
        text: 'They extended it till 20:30 because of the match! Also hot chocolate machine is finally fixed on 2nd floor.',
        timestamp: '17:45',
        isUser: false,
        likes: 7,
      },
      {
        id: 'c-n-3',
        universityId: 'nwu',
        channelId: '#ResLife',
        senderName: 'Marnus Botes',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Veritas',
        text: 'Braai stands outside Veritas are already getting lit if anyone wants to join the pre-game fire 🔥🥩',
        timestamp: '17:50',
        isUser: false,
        likes: 12,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-n-4',
        universityId: 'nwu',
        channelId: '#CampusGossip',
        senderName: 'Anonymous Eagle',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Potch Bult',
        text: 'Did anyone see the goose family walking straight through the library security gate this morning?? The security guard checked their student cards 😂',
        timestamp: '14:20',
        isUser: false,
        likes: 29,
      },
      {
        id: 'c-n-5',
        universityId: 'nwu',
        channelId: '#CampusGossip',
        senderName: 'Chantelle V.',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Wegbreek',
        text: 'LMAOO yes, those Potch geese run this campus, we are just paying tuition to exist in their territory.',
        timestamp: '14:22',
        isUser: false,
        likes: 18,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-n-6',
        universityId: 'nwu',
        channelId: '#ExamPrep',
        senderName: 'Tiaan Nel',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Ferdinand Postma Lab',
        text: 'Who has the formula cheat sheet for STTK 111 with Prof. Pretorius? Willing to trade past paper worked solutions!',
        timestamp: '16:05',
        isUser: false,
        likes: 8,
      }
    ],
    '#RideShare': [
      {
        id: 'c-n-7',
        universityId: 'nwu',
        channelId: '#RideShare',
        senderName: 'Luan Van Niekerk',
        senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Cachet Park',
        text: 'Driving to JHB / OR Tambo on Friday after 14:00 classes. 3 spots open in my Polo Vivo. R120 per person for petrol split.',
        timestamp: '13:15',
        isUser: false,
        likes: 5,
      }
    ]
  },
  wits: {
    '#ResLife': [
      {
        id: 'c-w-1',
        universityId: 'wits',
        channelId: '#ResLife',
        senderName: 'Keabetswe',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Sunnyside Hall',
        text: 'Reminder: Inter-res choir rehearsals tonight at the Great Hall steps at 19:00!',
        timestamp: '16:10',
        isUser: false,
        likes: 8,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-w-2',
        universityId: 'wits',
        channelId: '#CampusGossip',
        senderName: 'Braam Secret',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Matrix',
        text: 'The coffee shop at the Matrix is giving out double shot espressos for free if you show you scored over 75% on Test 1 ☕️🔥',
        timestamp: '11:30',
        isUser: false,
        likes: 34,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-w-3',
        universityId: 'wits',
        channelId: '#ExamPrep',
        senderName: 'Farhan Patel',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Wartenweiler 24hr',
        text: 'Calculus II group session at Wartenweiler 4th floor table 6 right now. All welcome!',
        timestamp: '18:00',
        isUser: false,
        likes: 11,
      }
    ],
    '#RideShare': [
      {
        id: 'c-w-4',
        universityId: 'wits',
        channelId: '#RideShare',
        senderName: 'Zinhle M.',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Braamfontein',
        text: 'Anyone taking Gautrain to Rosebank / Pretoria this afternoon around 16:30?',
        timestamp: '15:20',
        isUser: false,
        likes: 2,
      }
    ]
  },
  uct: {
    '#ResLife': [
      {
        id: 'c-u-1',
        universityId: 'uct',
        channelId: '#ResLife',
        senderName: 'Matthew Shaw',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Leo Marquard Hall',
        text: 'Jammie shuttle schedule has updated for the weekend. Check the app so you don’t get stuck at Forest Hill!',
        timestamp: '15:40',
        isUser: false,
        likes: 14,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-u-2',
        universityId: 'uct',
        channelId: '#CampusGossip',
        senderName: 'Upper Campus Watch',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Leslie Social',
        text: 'The mountain fog is rolling in thick over Devil’s Peak right now. Moody library study vibes activated 🌫️📚',
        timestamp: '16:05',
        isUser: false,
        likes: 22,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-u-3',
        universityId: 'uct',
        channelId: '#ExamPrep',
        senderName: 'Amina Adams',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Fuller Hall',
        text: 'Law of Contract study circle meeting at Chancellor Oppenheimer level 4 at 17:00 sharp.',
        timestamp: '14:50',
        isUser: false,
        likes: 9,
      }
    ],
    '#RideShare': [
      {
        id: 'c-u-4',
        universityId: 'uct',
        channelId: '#RideShare',
        senderName: 'David K.',
        senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Rondebosch',
        text: 'Surfing Muizenberg corner tomorrow before 10am lectures. Leaving from Tugwell with 2 board slots.',
        timestamp: '18:10',
        isUser: false,
        likes: 19,
      }
    ]
  },
  up: {
    '#ResLife': [
      {
        id: 'c-p-1',
        universityId: 'up',
        channelId: '#ResLife',
        senderName: 'Ruan Steyn',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Marobale Hall',
        text: 'Jacaranda blossoms are falling all over Hatfield campus walkway. Legend says if one lands on your head you pass your degree! 🌸',
        timestamp: '12:45',
        isUser: false,
        likes: 38,
      }
    ],
    '#CampusGossip': [],
    '#ExamPrep': [],
    '#RideShare': []
  },
  tut: {
    '#ResLife': [
      {
        id: 'c-t-1',
        universityId: 'tut',
        channelId: '#ResLife',
        senderName: 'Kabelo',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Pretoria West Res',
        text: 'Campus WiFi bandwidth was boosted in Building 10 & library today. Downloads running smooth!',
        timestamp: '13:00',
        isUser: false,
        likes: 21,
      }
    ],
    '#CampusGossip': [],
    '#ExamPrep': [],
    '#RideShare': []
  },
  su: {
    '#ResLife': [],
    '#CampusGossip': [],
    '#ExamPrep': [],
    '#RideShare': []
  },
  uj: {
    '#ResLife': [
      {
        id: 'c-uj-1',
        universityId: 'uj',
        channelId: '#ResLife',
        senderName: 'Sipho Zulu',
        senderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Sophiatown APK',
        text: 'Inter-campus shuttle from APK to Kingsway and Soweto campus is running every 15 mins today!',
        timestamp: '11:15',
        isUser: false,
        likes: 15,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-uj-2',
        universityId: 'uj',
        channelId: '#CampusGossip',
        senderName: 'APK Spy',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Auckland Park',
        text: 'Who saw the Orange Army drumming band practicing at the fountain? Energetic vibes! 🥁🔥',
        timestamp: '12:30',
        isUser: false,
        likes: 28,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-uj-3',
        universityId: 'uj',
        channelId: '#ExamPrep',
        senderName: 'Nandi',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        senderRes: 'DFC Res',
        text: 'Financial Accounting 2 study group meeting at APK Library 4th floor at 16:00!',
        timestamp: '14:00',
        isUser: false,
        likes: 9,
      }
    ],
    '#RideShare': [
      {
        id: 'c-uj-4',
        universityId: 'uj',
        channelId: '#RideShare',
        senderName: 'Kagiso',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Bunting Road',
        text: 'Carpooling from Melville to APK campus tomorrow at 07:45. 2 seats open.',
        timestamp: '15:20',
        isUser: false,
        likes: 4,
      }
    ]
  },
  dut: {
    '#ResLife': [
      {
        id: 'c-dut-1',
        universityId: 'dut',
        channelId: '#ResLife',
        senderName: 'Lwazi Mkhize',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Sterling House Res',
        text: 'DUT campus shuttle between Steve Biko and ML Sultan is running smoothly this afternoon.',
        timestamp: '12:10',
        isUser: false,
        likes: 18,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-dut-2',
        universityId: 'dut',
        channelId: '#CampusGossip',
        senderName: 'Biko Insider',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Steve Biko Food Court',
        text: 'The Kota spot right outside Steve Biko campus gate just opened a student discount card! 🍟🥪',
        timestamp: '13:45',
        isUser: false,
        likes: 45,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-dut-3',
        universityId: 'dut',
        channelId: '#ExamPrep',
        senderName: 'Sindi Dlamini',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        senderRes: 'ML Sultan',
        text: 'IT & Software Dev 2 past paper session at ML Sultan Library 3rd floor at 15:30.',
        timestamp: '14:05',
        isUser: false,
        likes: 12,
      }
    ],
    '#RideShare': [
      {
        id: 'c-dut-4',
        universityId: 'dut',
        channelId: '#RideShare',
        senderName: 'Jabulani',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Berea',
        text: 'Leaving Durban campus to PMB Indumiso on Friday at 14:00. 3 seats open in my Polo.',
        timestamp: '16:00',
        isUser: false,
        likes: 7,
      }
    ]
  },
  ukzn: {
    '#ResLife': [
      {
        id: 'c-ukzn-1',
        universityId: 'ukzn',
        channelId: '#ResLife',
        senderName: 'Ntokozo Zuma',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Florence Powell Hall',
        text: 'Howard College inter-res braai is set for Saturday afternoon outside the Tower building! 🔥',
        timestamp: '11:40',
        isUser: false,
        likes: 24,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-ukzn-2',
        universityId: 'ukzn',
        channelId: '#CampusGossip',
        senderName: 'Westville Whisper',
        senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Westville Quad',
        text: 'Walking up the Dennis Shepstone steps in summer is a full cardio workout. No gym needed.',
        timestamp: '13:10',
        isUser: false,
        likes: 56,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-ukzn-3',
        universityId: 'ukzn',
        channelId: '#ExamPrep',
        senderName: 'Pravin Pillay',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Westville Science',
        text: 'Organic Chemistry II past exam review in T-Block 102 from 16:00 to 18:00.',
        timestamp: '14:25',
        isUser: false,
        likes: 19,
      }
    ],
    '#RideShare': [
      {
        id: 'c-ukzn-4',
        universityId: 'ukzn',
        channelId: '#RideShare',
        senderName: 'Thabiso',
        senderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Durban North',
        text: 'Daily lift from Gateway / Umhlanga to Westville campus at 07:30. Petrol split.',
        timestamp: '15:10',
        isUser: false,
        likes: 5,
      }
    ]
  },
  cput: {
    '#ResLife': [
      {
        id: 'c-cput-1',
        universityId: 'cput',
        channelId: '#ResLife',
        senderName: 'Chad Williams',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        senderRes: 'District Six Res',
        text: 'District Six campus laundry tokens are back in stock at the finance office desk.',
        timestamp: '10:30',
        isUser: false,
        likes: 14,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-cput-2',
        universityId: 'cput',
        channelId: '#CampusGossip',
        senderName: 'Cape Tech Voice',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Granger Bay',
        text: 'The ocean breeze at Granger Bay today is blowing everyone’s design sketches into the sea 😂',
        timestamp: '12:40',
        isUser: false,
        likes: 39,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-cput-3',
        universityId: 'cput',
        channelId: '#ExamPrep',
        senderName: 'Ameera Khan',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Bellville Campus',
        text: 'Software Project IV group meeting at Bellville IT Lab 2.3 at 14:00.',
        timestamp: '13:50',
        isUser: false,
        likes: 11,
      }
    ],
    '#RideShare': [
      {
        id: 'c-cput-4',
        universityId: 'cput',
        channelId: '#RideShare',
        senderName: 'Devon',
        senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Southern Suburbs',
        text: 'Driving Wynberg to CPUT District Six every morning at 07:15. Room for 2.',
        timestamp: '16:30',
        isUser: false,
        likes: 8,
      }
    ]
  },
  coastal: {
    '#ResLife': [
      {
        id: 'c-coastal-1',
        universityId: 'coastal',
        channelId: '#ResLife',
        senderName: 'Sipho Bhengu',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Umlazi V Res',
        text: 'Workshop practical safety inspection tomorrow morning at 08:00. Remember steel caps and goggles!',
        timestamp: '12:00',
        isUser: false,
        likes: 22,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-coastal-2',
        universityId: 'coastal',
        channelId: '#CampusGossip',
        senderName: 'TVET Insider',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Swinton Campus',
        text: 'Umlazi V campus vs Swinton campus soccer match this weekend is going to be explosive! ⚽️🏆',
        timestamp: '13:30',
        isUser: false,
        likes: 41,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-coastal-3',
        universityId: 'coastal',
        channelId: '#ExamPrep',
        senderName: 'Phumelela',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Durban Campus',
        text: 'Electrical Trade Theory N4 past questions review session in Room 12 at 14:30.',
        timestamp: '14:00',
        isUser: false,
        likes: 15,
      }
    ],
    '#RideShare': [
      {
        id: 'c-coastal-4',
        universityId: 'coastal',
        channelId: '#RideShare',
        senderName: 'Andile',
        senderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Amanzimtoti',
        text: 'Leaving Amanzimtoti to Umlazi V campus every morning at 07:20. Direct trip.',
        timestamp: '15:45',
        isUser: false,
        likes: 6,
      }
    ]
  },
  unizulu: {
    '#ResLife': [
      {
        id: 'c-unizulu-1',
        universityId: 'unizulu',
        channelId: '#ResLife',
        senderName: 'Khanyisani Zulu',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Ongoye Complex',
        text: 'Dining hall evening meal tickets are being stamped early tonight for the choir rehearsal.',
        timestamp: '11:50',
        isUser: false,
        likes: 17,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-unizulu-2',
        universityId: 'unizulu',
        channelId: '#CampusGossip',
        senderName: 'Ongoye Star',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        senderRes: 'KwaDlangezwa',
        text: 'The traditional dance showdown at King Bhekuzulu hall was so vibrant today! Zululand pride! 👑',
        timestamp: '13:15',
        isUser: false,
        likes: 52,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-unizulu-3',
        universityId: 'unizulu',
        channelId: '#ExamPrep',
        senderName: 'Bongiwe Buthelezi',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Richards Bay',
        text: 'BEd curriculum development study circle at Ongoye Library 2nd floor silent room at 16:00.',
        timestamp: '14:40',
        isUser: false,
        likes: 21,
      }
    ],
    '#RideShare': [
      {
        id: 'c-unizulu-4',
        universityId: 'unizulu',
        channelId: '#RideShare',
        senderName: 'Melusi',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Empangeni',
        text: 'Going from Ongoye campus to Boardwalk Mall Richards Bay on Saturday at 11:00. 3 seats.',
        timestamp: '16:15',
        isUser: false,
        likes: 9,
      }
    ]
  },
  mut: {
    '#ResLife': [
      {
        id: 'c-mut-1',
        universityId: 'mut',
        channelId: '#ResLife',
        senderName: 'Siyabonga Shabalala',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        senderRes: 'MUT Executive Res',
        text: 'Campus clinic has free flu vaccines available for all registered MUT students today!',
        timestamp: '11:20',
        isUser: false,
        likes: 19,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-mut-2',
        universityId: 'mut',
        channelId: '#CampusGossip',
        senderName: 'Umlazi Voice',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        senderRes: 'MUT Student Centre',
        text: 'Who smelled the braai meat by the engineering lawns? They are prepping for Spring bash early! 🥩',
        timestamp: '13:05',
        isUser: false,
        likes: 37,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-mut-3',
        universityId: 'mut',
        channelId: '#ExamPrep',
        senderName: 'Zinhle Mthembu',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Main Library',
        text: 'Civil Engineering surveying exam questions discussion starting at 15:30 in Room E4.',
        timestamp: '14:15',
        isUser: false,
        likes: 14,
      }
    ],
    '#RideShare': [
      {
        id: 'c-mut-4',
        universityId: 'mut',
        channelId: '#RideShare',
        senderName: 'Dumisa',
        senderAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Umlazi W',
        text: 'Leaving MUT to Durban CBD Workshop after 16:30 lectures. 2 spots available.',
        timestamp: '15:50',
        isUser: false,
        likes: 6,
      }
    ]
  },
  nmu: {
    '#ResLife': [
      {
        id: 'c-nmu-1',
        universityId: 'nmu',
        channelId: '#ResLife',
        senderName: 'Dylan Marais',
        senderAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Letaba Res, South Campus',
        text: 'South Campus Kraal open mic acoustic evening is confirmed for tonight! Free hot chocolate.',
        timestamp: '12:15',
        isUser: false,
        likes: 31,
      }
    ],
    '#CampusGossip': [
      {
        id: 'c-nmu-2',
        universityId: 'nmu',
        channelId: '#CampusGossip',
        senderName: 'Madibaz Wave',
        senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Summerstrand',
        text: 'Pod of dolphins spotted right in front of the Ocean Sciences campus during our 10 AM break 🐬🌊',
        timestamp: '13:20',
        isUser: false,
        likes: 64,
      }
    ],
    '#ExamPrep': [
      {
        id: 'c-nmu-3',
        universityId: 'nmu',
        channelId: '#ExamPrep',
        senderName: 'Thando Gxothiwe',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        senderRes: 'South Campus Library',
        text: 'Economics 201 past papers revision in the library collaborative study zone 3rd floor at 16:00.',
        timestamp: '14:30',
        isUser: false,
        likes: 18,
      }
    ],
    '#RideShare': [
      {
        id: 'c-nmu-4',
        universityId: 'nmu',
        channelId: '#RideShare',
        senderName: 'Craig',
        senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        senderRes: 'Summerstrand Beachfront',
        text: 'Driving to George Campus on Friday afternoon at 14:00. Splitting petrol in my Vivo.',
        timestamp: '16:00',
        isUser: false,
        likes: 12,
      }
    ]
  }
};

export const INITIAL_STUDY_BUDDIES: Record<UniversityId, StudyBuddy[]> = {
  nwu: [
    {
      id: 'sb-nwu-1',
      universityId: 'nwu',
      name: 'Carla Van Zyl',
      degree: 'BSc Computer Science & Statistics',
      year: '3rd Year',
      faculty: 'Natural & Agricultural Sciences',
      modules: ['CMPG 311 (Databases)', 'STTK 214', 'CMPG 312'],
      librarySpot: 'Ferdinand Postma Library 3rd Floor Silent Corner',
      studyStyle: 'Pomodoro timer (50/10), whiteboard coding, coffee breaks',
      bio: 'Final year CS student passionate about fullstack web and AI. Looking for a committed study partner for the CMPG 311 group project and semester test prep.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon & Wed after 14:00, Sat mornings',
      matchScore: 96,
    },
    {
      id: 'sb-nwu-2',
      universityId: 'nwu',
      name: 'Kobus Marais',
      degree: 'BEng Mechanical Engineering',
      year: '2nd Year',
      faculty: 'Faculty of Engineering',
      modules: ['INGM 211 (Thermodynamics)', 'WISN 211', 'INGM 222'],
      librarySpot: 'Engineering Complex Lab 12 / Potch Bult Coffee',
      studyStyle: 'Working through past exam papers step-by-step',
      bio: 'Passionate about motorsport engineering and CAD design. Need someone to grind thermodynamics problem sets with before the test!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      availability: 'Tue & Thu 16:00 - 20:00',
      matchScore: 88,
    },
    {
      id: 'sb-nwu-3',
      universityId: 'nwu',
      name: 'Nompumelelo Dlamini',
      degree: 'BCom Chartered Accountancy (CA)',
      year: '2nd Year',
      faculty: 'Economic and Management Sciences',
      modules: ['REKP 211 (Financial Accounting)', 'BELT 211 (Tax)', 'AUDT 211'],
      librarySpot: 'Cachet Park Study Rooms / Library 1st Floor',
      studyStyle: 'Quiz cards, tax legislation debates, detailed ledgers',
      bio: 'Aspiring CA(SA). Let’s master corporate tax and IFRS standards together. Zero procrastination allowed!',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80',
      availability: 'Daily from 17:00 onwards',
      matchScore: 92,
    },
    {
      id: 'sb-nwu-4',
      universityId: 'nwu',
      name: 'Brandon Le Roux',
      degree: 'LLB Law',
      year: '4th Year',
      faculty: 'Faculty of Law',
      modules: ['IURI 411 (Civil Procedure)', 'IURI 412 (Criminal Practice)'],
      librarySpot: 'Law Library Silent Zone, Potch Campus',
      studyStyle: 'Case law debates, moot court preparation',
      bio: 'Final year law student gearing up for board exams. Great at constitutional and commercial litigation summaries.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      availability: 'Weekdays 10:00 - 14:00',
      matchScore: 84,
    }
  ],
  wits: [
    {
      id: 'sb-wits-1',
      universityId: 'wits',
      name: 'Ayanda Mthembu',
      degree: 'MBBCh (Medicine & Surgery)',
      year: '3rd Year',
      faculty: 'Health Sciences',
      modules: ['Systemic Pathology', 'Clinical Pharmacology', 'Microbiology'],
      librarySpot: 'Wits Health Sciences Library, Parktown',
      studyStyle: 'Anki flashcards, clinical diagnostic case walks',
      bio: 'Med student surviving 3rd year hospital rotations. Looking for a study buddy for pharmacology mechanism reviews.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      availability: 'Wed & Fri evenings, Sunday whole day',
      matchScore: 94,
    },
    {
      id: 'sb-wits-2',
      universityId: 'wits',
      name: 'Julian Naidoo',
      degree: 'BSc Computer Science & Applied Maths',
      year: '2nd Year',
      faculty: 'Faculty of Science',
      modules: ['COMS2001 (Data Structures)', 'MATH2007 (Multivariable Calc)'],
      librarySpot: 'Wartenweiler 24hr Computer Lab',
      studyStyle: 'Leetcode practice, peer code review, high energy',
      bio: 'Building apps and grinding algorithms. Let’s tackle asymptotic complexity and graph theory together!',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon to Thu 15:00 - 19:00',
      matchScore: 91,
    }
  ],
  uct: [
    {
      id: 'sb-uct-1',
      universityId: 'uct',
      name: 'Jessica Van Der Byl',
      degree: 'BSc Environmental & Ocean Science',
      year: '2nd Year',
      faculty: 'Faculty of Science',
      modules: ['GEO2014F', 'BIO2015S', 'MAM1000W'],
      librarySpot: 'Chancellor Oppenheimer Library (Level 4 Mountain View)',
      studyStyle: 'Mind maps, environmental GIS mapping, visual summaries',
      bio: 'Passionate about marine conservation and climate data. Love studying with great views and good coffee.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon, Wed, Fri 13:00 - 17:00',
      matchScore: 95,
    },
    {
      id: 'sb-uct-2',
      universityId: 'uct',
      name: 'Tariq Davids',
      degree: 'BCom PPE (Philosophy, Politics & Economics)',
      year: '3rd Year',
      faculty: 'Faculty of Commerce',
      modules: ['ECO3020F (Advanced Macro)', 'POL3029F', 'PHI3005S'],
      librarySpot: 'Leslie Social Science Courtyard / Oppenheimer Level 2',
      studyStyle: 'Socratic dialogue, policy debates, econometric modeling',
      bio: 'Let’s dissect South African fiscal policy and Keynesian vs monetarist models over hot drinks.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
      availability: 'Tue & Thu 14:00 - 18:00',
      matchScore: 89,
    }
  ],
  up: [
    {
      id: 'sb-up-1',
      universityId: 'up',
      name: 'Lethabo Molefe',
      degree: 'BEng Industrial Engineering',
      year: '3rd Year',
      faculty: 'Engineering, Built Environment & IT (EBIT)',
      modules: ['BCS 310 (Business Engineering)', 'BOZ 312 (Operations Research)'],
      librarySpot: 'Merensky 2 Library Study Pods',
      studyStyle: 'Linear programming solvers, process maps, espresso',
      bio: 'Optimizing systems by day, studying engineering economics by night. Tuks EBIT student looking for an OR study partner.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      availability: 'Daily 16:00 - 20:00',
      matchScore: 93,
    }
  ],
  tut: [
    {
      id: 'sb-tut-1',
      universityId: 'tut',
      name: 'Siphamandla Radebe',
      degree: 'Diploma in Information Technology',
      year: '2nd Year',
      faculty: 'Faculty of ICT',
      modules: ['Software Development II', 'Systems Analysis & Design', 'Technical Programming'],
      librarySpot: 'ICT Computer Lab 4, Pretoria West',
      studyStyle: 'Coding together, syntax debugging, GitHub collabs',
      bio: 'Developing mobile and web apps. Need someone serious about building our software engineering semester project.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon - Fri 12:00 - 16:00',
      matchScore: 90,
    }
  ],
  su: [
    {
      id: 'sb-su-1',
      universityId: 'su',
      name: 'Anika Louw',
      degree: 'BSc Food Science & Biotechnology',
      year: '2nd Year',
      faculty: 'AgriSciences',
      modules: ['Food Microbiology', 'Biochemistry 214', 'Genetics 214'],
      librarySpot: 'JS Gericke Library Underground Garden View',
      studyStyle: 'Colour-coded summaries, flashcards, quiet focus',
      bio: 'Second year Matie student. Passionate about food security and biotechnology innovation in Africa.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
      availability: 'Tue & Thu mornings, Sun afternoons',
      matchScore: 92,
    }
  ],
  uj: [
    {
      id: 'sb-uj-1',
      universityId: 'uj',
      name: 'Kagiso Tau',
      degree: 'BCom Finance & Investment Management',
      year: '3rd Year',
      faculty: 'College of Business & Economics',
      modules: ['FNM301 (Financial Analysis)', 'IVM302 (Portfolio Management)'],
      librarySpot: 'APK Sanlam Auditorium Concourse / Library Level 5',
      studyStyle: 'Valuation models, DCF spreadsheets, mock trading',
      bio: 'Future JSE equity analyst. Looking for fellow finance students to analyze balance sheets and study for tests.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon & Wed 14:00 - 18:00',
      matchScore: 89,
    }
  ],
  dut: [
    {
      id: 'sb-dut-1',
      universityId: 'dut',
      name: 'Nqobile Mthembu',
      degree: 'NDip Information Technology (Software Development)',
      year: '3rd Year',
      faculty: 'Accounting & Informatics',
      modules: ['Development Software 3', 'Technical Programming 2'],
      librarySpot: 'ML Sultan Library 4th Floor Tech Lab',
      studyStyle: 'Pair programming, React & Python debugging sessions',
      bio: 'Final year software dev student building mobile apps. Need a project accountability partner for the technical programming assignment.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon & Thu 13:00 - 17:00',
      matchScore: 94,
    }
  ],
  ukzn: [
    {
      id: 'sb-ukzn-1',
      universityId: 'ukzn',
      name: 'Lungelo Cele',
      degree: 'BSc Computer Science & Applied Mathematics',
      year: '2nd Year',
      faculty: 'College of Agriculture, Engineering and Science',
      modules: ['COMP 200 (Data Structures)', 'MATH 212', 'STAT 210'],
      librarySpot: 'Westville Campus Library Level 3 Quiet Study',
      studyStyle: 'Algorithm trace tables, whiteboard math drills',
      bio: 'Enthusiastic about graph algorithms and linear models. Let’s collaborate and ace the data structures test!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      availability: 'Tue & Fri afternoons',
      matchScore: 91,
    }
  ],
  cput: [
    {
      id: 'sb-cput-1',
      universityId: 'cput',
      name: 'Brandon Swarts',
      degree: 'NDip Mechanical Engineering',
      year: '2nd Year',
      faculty: 'Faculty of Engineering & the Built Environment',
      modules: ['Strength of Materials 2', 'Fluid Mechanics 2'],
      librarySpot: 'Bellville Library Study Rooms / CAD Lab',
      studyStyle: 'Formula sheets breakdown and working through past question booklets',
      bio: 'Passionate about structural analysis and CAD design. Looking for a study peer to review stress calculation methods.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon, Wed 15:00 - 19:00',
      matchScore: 88,
    }
  ],
  coastal: [
    {
      id: 'sb-coastal-1',
      universityId: 'coastal',
      name: 'Nkosinathi Bhengu',
      degree: 'NC(V) Electrical Infrastructure Construction',
      year: 'Level 4',
      faculty: 'Engineering Studies',
      modules: ['Electrical Workmanship L4', 'Electronic Control & Digital Electronics'],
      librarySpot: 'Umlazi V Workshop Resource Centre',
      studyStyle: 'Practical circuit schematic tests, wiring diagram analysis',
      bio: 'Training to become a licensed Red Seal artisan. Want a study buddy to review theoretical and safety standards before the trade exam.',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
      availability: 'Daily 14:00 - 16:30',
      matchScore: 93,
    }
  ],
  unizulu: [
    {
      id: 'sb-unizulu-1',
      universityId: 'unizulu',
      name: 'Mvelo Ndwandwe',
      degree: 'BEd Senior & FET Phase (Physical Sciences)',
      year: '3rd Year',
      faculty: 'Faculty of Education',
      modules: ['Physics Methodology 3', 'Curriculum Studies'],
      librarySpot: 'KwaDlangezwa (Ongoye) Main Library 1st Floor',
      studyStyle: 'Micro-teaching simulations and lesson plan peer review',
      bio: 'Future high school physics educator. Let’s practice teaching presentations and exam lesson plans.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
      availability: 'Wed & Sat 10:00 - 14:00',
      matchScore: 90,
    }
  ],
  mut: [
    {
      id: 'sb-mut-1',
      universityId: 'mut',
      name: 'Nhlanhla Sithole',
      degree: 'NDip Civil Engineering',
      year: '2nd Year',
      faculty: 'Faculty of Engineering',
      modules: ['Surveying 2', 'Structural Analysis 2', 'Water Engineering'],
      librarySpot: 'MUT Main Library Quiet Zone, Umlazi',
      studyStyle: 'Field note verification, leveling calculation checks',
      bio: 'Civil engineering enthusiast. Looking for peers to verify survey field readings and structural moments before Friday tests.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      availability: 'Mon & Thu 15:00 - 18:00',
      matchScore: 89,
    }
  ],
  nmu: [
    {
      id: 'sb-nmu-1',
      universityId: 'nmu',
      name: 'Kirsten Meyer',
      degree: 'BSc Marine Biology & Oceanography',
      year: '3rd Year',
      faculty: 'Faculty of Science',
      modules: ['Marine Ecology 301', 'Estuarine Ecosystems 302'],
      librarySpot: 'Ocean Sciences Campus Lab / South Campus Library',
      studyStyle: 'Species taxonomy identification flashcards, research papers',
      bio: 'Ocean lover and scientific diver. Looking for a study partner to master benthic sampling stats and marine food web models.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      availability: 'Tue & Thu 14:00 - 17:30',
      matchScore: 95,
    }
  ]
};

export const INITIAL_COURSES: CourseModule[] = [
  {
    id: 'course-1',
    code: 'CMPG 311',
    name: 'Database Systems & SQL Optimization',
    credits: 16,
    targetGrade: 75,
    assignments: [
      { id: 'a-1', name: 'Practical Lab 1: ER Diagrams', weight: 10, score: 88, maxScore: 100 },
      { id: 'a-2', name: 'Semester Test 1: Relational Algebra', weight: 25, score: 74, maxScore: 100 },
      { id: 'a-3', name: 'Group Project: Web App Schema', weight: 20, score: 82, maxScore: 100 },
      { id: 'a-4', name: 'Semester Test 2: Transactions & ACID', weight: 25, score: 70, maxScore: 100 },
    ]
  },
  {
    id: 'course-2',
    code: 'STTK 214',
    name: 'Applied Statistical Inference',
    credits: 16,
    targetGrade: 70,
    assignments: [
      { id: 'a-5', name: 'Online Assignment 1: Hypothesis Testing', weight: 15, score: 80, maxScore: 100 },
      { id: 'a-6', name: 'Semester Test 1: ANOVA & Regression', weight: 35, score: 68, maxScore: 100 },
      { id: 'a-7', name: 'R Programming Project', weight: 20, score: 85, maxScore: 100 },
    ]
  },
  {
    id: 'course-3',
    code: 'WISN 211',
    name: 'Multivariable Calculus & Linear Algebra',
    credits: 16,
    targetGrade: 65,
    assignments: [
      { id: 'a-8', name: 'Weekly Tutorial Quizzes (Avg)', weight: 15, score: 72, maxScore: 100 },
      { id: 'a-9', name: 'Semester Test 1: Vector Spaces', weight: 35, score: 62, maxScore: 100 },
      { id: 'a-10', name: 'Semester Test 2: Multiple Integrals', weight: 35, score: 67, maxScore: 100 },
    ]
  },
  {
    id: 'course-4',
    code: 'COMM 111',
    name: 'Professional & Academic Communication',
    credits: 12,
    targetGrade: 80,
    assignments: [
      { id: 'a-11', name: 'Executive Summary Essay', weight: 25, score: 84, maxScore: 100 },
      { id: 'a-12', name: 'Oral Presentation & Slide Deck', weight: 35, score: 88, maxScore: 100 },
      { id: 'a-13', name: 'Research Proposal', weight: 40, score: 79, maxScore: 100 },
    ]
  }
];

export const INITIAL_NOTICES: Record<UniversityId, CampusNotice[]> = {
  nwu: [
    {
      id: 'not-nwu-1',
      universityId: 'nwu',
      type: 'SRC',
      title: 'SRC Official Statement: Free Campus Shuttle Extension to Bult & Cachet Park',
      author: 'NWU Institutional SRC Council',
      authorRole: 'Transport & Infrastructure Portfolio',
      date: 'Today, 09:30',
      content: 'Following negotiations with university management, the evening shuttle service will now run until 23:30 from Ferdinand Postma Library to all accredited private residences in the Bult and Cachet Park areas to ensure student safety.',
      badge: 'Official SRC Notice',
      urgent: true,
      likes: 312,
    },
    {
      id: 'not-nwu-2',
      universityId: 'nwu',
      type: 'Sports',
      title: 'Varsity Cup Round 5: Free Supporters Buses to Away Match',
      author: 'NWU Purple Pride Club',
      authorRole: 'Sports Council',
      date: 'Yesterday',
      content: 'Free return buses will be departing from the Fanie du Toit Sports Complex for registered students wearing purple. Student card verification required upon boarding.',
      badge: 'Varsity Cup Rugby',
      urgent: false,
      likes: 184,
    },
    {
      id: 'not-nwu-3',
      universityId: 'nwu',
      type: 'Club',
      title: 'NWU Debating Union & Model United Nations Open Trials',
      author: 'NWU Debating Society',
      authorRole: 'Executive Committee',
      date: '2 days ago',
      content: 'Interested in mastering public speaking and competing in the South African National Universities Debating Championship (SANUDC)? First workshop this Thursday at 17:30 in Building C6.',
      badge: 'Club Auditions',
      urgent: false,
      likes: 95,
    }
  ],
  wits: [
    {
      id: 'not-wits-1',
      universityId: 'wits',
      type: 'SRC',
      title: 'Wits SRC Registration & NSFAS Allowance Distribution Update',
      author: 'Wits Central SRC',
      authorRole: 'President & Treasurer General',
      date: 'Today, 10:15',
      content: 'All direct meal and book allowances for verified NSFAS students have been released. Please check your student bank account or visit the Matrix ground floor helpdesk.',
      badge: 'Official SRC Notice',
      urgent: true,
      likes: 420,
    },
    {
      id: 'not-wits-2',
      universityId: 'wits',
      type: 'Sports',
      title: 'Wits Football Club Qualifies for Gauteng University League Finals',
      author: 'Wits Sport Media',
      authorRole: 'Athletics Department',
      date: 'Yesterday',
      content: 'Wits FC defeated UJ 2-1 in a thrilling derby at Bidvest Stadium! Come pack the stands for the grand final next Wednesday.',
      badge: 'Varsity Football',
      urgent: false,
      likes: 245,
    }
  ],
  uct: [
    {
      id: 'not-uct-1',
      universityId: 'uct',
      type: 'SRC',
      title: 'Extended 24/7 Hours at Chancellor Oppenheimer Library for Midterms',
      author: 'UCT Student Representative Council',
      authorRole: 'Academic Committee',
      date: 'Today, 08:00',
      content: 'Floors 1 through 3 will remain open 24 hours starting this Monday with continuous Jammie Shuttle night routes operating every 20 minutes.',
      badge: 'Library & Academics',
      urgent: true,
      likes: 388,
    },
    {
      id: 'not-uct-2',
      universityId: 'uct',
      type: 'Club',
      title: 'UCT Green Campus Initiative: Tree Planting & Beach Cleanup Drive',
      author: 'GCI Executive',
      authorRole: 'Sustainability Office',
      date: '3 days ago',
      content: 'Join us at Muizenberg Beach this Saturday. Transport provided from North Stop at 09:00. Gloves, bags, and free lunch provided for all volunteers.',
      badge: 'Green Campus',
      urgent: false,
      likes: 132,
    }
  ],
  up: [
    {
      id: 'not-up-1',
      universityId: 'up',
      type: 'SRC',
      title: 'Tuks Spring Day Safety & Wristband Collection Guidelines',
      author: 'UP SRC Hatfield',
      authorRole: 'Events & Safety Bureau',
      date: 'Yesterday',
      content: 'Wristband collection is now open at the Piazza student centre until Friday 16:00. Please present your valid UP student card.',
      badge: 'Spring Day 2026',
      urgent: true,
      likes: 512,
    }
  ],
  tut: [
    {
      id: 'not-tut-1',
      universityId: 'tut',
      type: 'SRC',
      title: 'Campus Free High-Speed WiFi Upgrade across Soshanguve & Pretoria West',
      author: 'TUT Central SRC',
      authorRole: 'Digital Transformation',
      date: '2 days ago',
      content: 'Fiber bandwidth has been upgraded by 10Gbps across all faculty auditoriums and residence study centers.',
      badge: 'Campus Tech',
      urgent: false,
      likes: 290,
    }
  ],
  su: [
    {
      id: 'not-su-1',
      universityId: 'su',
      type: 'SRC',
      title: 'Maties Rooiplein Sustainability & Solar Bicycle Stations Live',
      author: 'SU Student Council',
      authorRole: 'Green Initiative',
      date: 'Yesterday',
      content: 'Charge your electric bikes and laptops directly at the new solar benches on the Rooiplein.',
      badge: 'Campus Life',
      urgent: false,
      likes: 180,
    }
  ],
  uj: [
    {
      id: 'not-uj-1',
      universityId: 'uj',
      type: 'SRC',
      title: 'UJ Orange Carpet Career Fair: Over 60 Multinational Employers',
      author: 'UJ SRC & PsyCaD',
      authorRole: 'Student Development',
      date: 'Today, 11:00',
      content: 'Don’t miss out on graduate programmes and bursary opportunities at the Sanlam Auditorium concourse.',
      badge: 'Career Fair',
      urgent: true,
      likes: 340,
    }
  ],
  dut: [
    {
      id: 'not-dut-1',
      universityId: 'dut',
      type: 'SRC',
      title: 'DUT SRC: Free Inter-Campus Shuttle Timetable & Library Extended Hours',
      author: 'DUT Central SRC',
      authorRole: 'Student Services & Transport',
      date: 'Today, 08:30',
      content: 'Evening shuttle services between Steve Biko, ML Sultan, Brickfield and Ritson will now run until 23:00 to accommodate study sessions.',
      badge: 'Official SRC Notice',
      urgent: true,
      likes: 410,
    }
  ],
  ukzn: [
    {
      id: 'not-ukzn-1',
      universityId: 'ukzn',
      type: 'SRC',
      title: 'UKZN SRC: Free Campus Health & Mental Wellness Clinic Support',
      author: 'UKZN Institutional SRC',
      authorRole: 'Health & Wellness Portfolio',
      date: 'Yesterday',
      content: 'Free confidential counseling and wellness checks available on Howard College, Westville, and Edgewood campuses all this week.',
      badge: 'Student Wellness',
      urgent: false,
      likes: 275,
    }
  ],
  cput: [
    {
      id: 'not-cput-1',
      universityId: 'cput',
      type: 'SRC',
      title: 'CPUT SRC: Free Table Mountain Bus Shuttle for Weekend Study Groups',
      author: 'CPUT Central SRC',
      authorRole: 'Transport Committee',
      date: 'Today, 09:15',
      content: 'Direct transport departing District Six and Bellville campuses every Saturday at 08:30 during the mid-term test period.',
      badge: 'Campus Transport',
      urgent: false,
      likes: 310,
    }
  ],
  coastal: [
    {
      id: 'not-coastal-1',
      universityId: 'coastal',
      type: 'SRC',
      title: 'Coastal KZN TVET College: SETA Apprentice Placement Portal Live',
      author: 'Coastal KZN College Council',
      authorRole: 'Work Integrated Learning (WIL)',
      date: 'Yesterday',
      content: 'NCV Level 4 and N6 diplomates can now submit CVs for manufacturing, engineering, and commerce internship stipends.',
      badge: 'Apprenticeships',
      urgent: true,
      likes: 480,
    }
  ],
  unizulu: [
    {
      id: 'not-unizulu-1',
      universityId: 'unizulu',
      type: 'SRC',
      title: 'UNIZULU SRC: NSFAS Transport & Off-Campus Accommodation Allowance Credited',
      author: 'UNIZULU Central SRC',
      authorRole: 'Finance & Student Welfare',
      date: 'Today, 10:00',
      content: 'Allowances have been disbursed to all verified student accounts. Visit the KwaDlangezwa finance hall for query assistance.',
      badge: 'Financial Aid',
      urgent: true,
      likes: 560,
    }
  ],
  mut: [
    {
      id: 'not-mut-1',
      universityId: 'mut',
      type: 'SRC',
      title: 'MUT SRC: Industrial Placement & Work Integrated Learning Drive',
      author: 'MUT SRC Executive',
      authorRole: 'Academics & WIL Directorate',
      date: 'Yesterday',
      content: 'Representatives from Durban chemicals and engineering firms will be conducting on-campus interview screenings this Thursday.',
      badge: 'Career Placement',
      urgent: false,
      likes: 295,
    }
  ],
  nmu: [
    {
      id: 'not-nmu-1',
      universityId: 'nmu',
      type: 'SRC',
      title: 'NMU SRC: Madibaz Shuttle Schedule Optimization for South & Ocean Campuses',
      author: 'NMU Student Representative Council',
      authorRole: 'Transport & Infrastructure',
      date: 'Today, 08:45',
      content: 'Increased peak hour shuttle frequency between Summerstrand North/South campuses and Missionvale campus to reduce queue times.',
      badge: 'Campus Transport',
      urgent: true,
      likes: 385,
    }
  ]
};

export const INITIAL_SINGLES: Record<UniversityId, SingleProfile[]> = {
  nwu: [
    {
      id: 'sp-nwu-1',
      universityId: 'nwu',
      name: 'Minke',
      age: 21,
      faculty: 'BCom Marketing & Communication',
      resHall: 'Klawerhof Res, Potch',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      bio: 'Loves rugby Saturdays at the Fanie, iced lattes at the Bult, and deep conversations during sunset over the dam 🌅',
      interests: ['Varsity Cup Rugby', 'Potch Coffee Culture', 'Photography', 'Pilates', 'House Music'],
      prompts: [
        {
          question: 'The key to my heart is...',
          answer: 'Bringing me an iced caramel latte to the Ferdinand Postma library when I am cramming.'
        },
        {
          question: 'Unpopular opinion about NWU...',
          answer: 'The geese on campus are actually super cute when they walk with their babies.'
        }
      ],
      icebreakerOptions: [
        '☕️ "Coffee at the Bult before class tomorrow?"',
        '🏉 "Are you going to the NWU Eagles rugby game on Monday?"',
        '📚 "Which floor of the library do you usually study on?"',
        '🍕 "Best pizza in Potch: Mythic or Ocean Basket?"'
      ]
    },
    {
      id: 'sp-nwu-2',
      universityId: 'nwu',
      name: 'Tshepo',
      age: 22,
      faculty: 'BEng Mechatronics',
      resHall: 'Veritas Men\'s Res',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      bio: 'Engineering nerd by day, amateur DJ by night. Can fix your car, your laptop, and your playlist.',
      interests: ['Robotics', 'Amapiano', 'F1 Racing', 'Gym & Calisthenics', 'Braai Master'],
      prompts: [
        {
          question: 'A boundary of mine is...',
          answer: 'Do not talk to me before my first espresso from the engineering cafe.'
        },
        {
          question: 'Two truths and a lie...',
          answer: 'Built my own drone, scored 90% in thermodynamics, never skipped an 08:00 class.'
        }
      ],
      icebreakerOptions: [
        '🎧 "Send me your top 3 Amapiano tracks right now"',
        '🏎️ "Who is your favorite F1 driver this season?"',
        '🥩 "Can you actually braai or do you burn the chops?"',
        '⚡️ "Can you fix my broken headphones?"'
      ]
    },
    {
      id: 'sp-nwu-3',
      universityId: 'nwu',
      name: 'Anika',
      age: 20,
      faculty: 'BSc Dietetics & Nutrition',
      resHall: 'Heide Dameskoshuis',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      bio: 'Active lifestyle, trail running, baking sourdough, and looking for someone to explore North West road trips with.',
      interests: ['Trail Running', 'Healthy Baking', 'Hiking', 'Art Exhibitions', 'Dogs'],
      prompts: [
        {
          question: 'Together we could...',
          answer: 'Wake up early for a Saturday morning run and grab breakfast at Cachet Park.'
        }
      ],
      icebreakerOptions: [
        '🏃‍♀️ "What’s your favorite running route around Potch?"',
        '🥐 "Did someone say homemade sourdough?"',
        '🐕 "Tell me about your pets!"'
      ]
    }
  ],
  wits: [
    {
      id: 'sp-wits-1',
      universityId: 'wits',
      name: 'Lesedi',
      age: 22,
      faculty: 'BA Dramatic Arts & Media',
      resHall: 'South Point Braam',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80',
      bio: 'Living in the heart of Braamfontein. Art gallery lover, indie cinema addict, vintage thrift explorer.',
      interests: ['Indie Cinema', 'Braam Gallery Walks', 'Thrifting', 'Afrobeats', 'Writing'],
      prompts: [
        {
          question: 'My ideal Sunday afternoon...',
          answer: 'Browsing records in Melville or sipping rooibos tea on a Braam rooftop.'
        }
      ],
      icebreakerOptions: [
        '🎬 "What’s your all-time favorite movie?"',
        '☕️ "Let’s grab coffee at Father Coffee in Rosebank"',
        '🎨 "Which exhibition at WAM is worth seeing?"'
      ]
    },
    {
      id: 'sp-wits-2',
      universityId: 'wits',
      name: 'Kavir',
      age: 23,
      faculty: 'BSc Actuarial Science',
      resHall: 'West Campus Hall',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
      bio: 'Math genius calculating the odds of finding someone who loves both statistics and 90s hip-hop.',
      interests: ['Financial Markets', 'Chess', '90s Hip Hop', 'Squash', 'Podcasts'],
      prompts: [
        {
          question: 'We’ll get along if...',
          answer: 'You can beat me at chess or at least teach me your favorite card game.'
        }
      ],
      icebreakerOptions: [
        '♟️ "Challenge accepted for a game of chess!"',
        '📊 "What was the hardest actuarial board exam you took?"',
        '🎵 "Old school Biggie or 2Pac?"'
      ]
    }
  ],
  uct: [
    {
      id: 'sp-uct-1',
      universityId: 'uct',
      name: 'Maya',
      age: 21,
      faculty: 'BSocSci Gender Studies & Politics',
      resHall: 'Tugwell Hall, Lower Campus',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
      bio: 'Hiking Lion’s Head, thrift hunting in Observatory, and advocating for social justice on Jammie Plaza.',
      interests: ['Hiking Table Mountain', 'Observatory Cafes', 'Social Justice', 'Surfing', 'Poetry'],
      prompts: [
        {
          question: 'Best thing about UCT...',
          answer: 'The view of Devil’s Peak from Upper Campus on a crisp winter morning.'
        }
      ],
      icebreakerOptions: [
        '⛰️ "Have you done the India Venster route up Table Mountain?"',
        '☕️ "Coffee at Obz or Kloof Street?"',
        '🌊 "Muizenberg or Clifton for beach days?"'
      ]
    }
  ],
  up: [
    {
      id: 'sp-up-1',
      universityId: 'up',
      name: 'Lize-Marie',
      age: 21,
      faculty: 'BSc Architecture',
      resHall: 'Inca Res, Hatfield',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      bio: 'Drawing buildings, sipping red wine, and dreaming of designing sustainable urban homes.',
      interests: ['Architecture', 'Urban Sketching', 'Spring Day', 'Netball', 'Art'],
      prompts: [
        {
          question: 'My favorite spot in Pretoria...',
          answer: 'The Pretoria National Botanical Garden under the jacarandas.'
        }
      ],
      icebreakerOptions: [
        '🏛️ "What’s your favorite building on Hatfield campus?"',
        '🎨 "Let’s go sketch at the botanical gardens!"',
        '🌸 "Ready for Tuks Spring Day?"'
      ]
    }
  ],
  tut: [
    {
      id: 'sp-tut-1',
      universityId: 'tut',
      name: 'Khanyi',
      age: 22,
      faculty: 'National Diploma Fashion Design & Technology',
      resHall: 'Arts Campus Res, Pretoria',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      bio: 'Pattern maker and future South African runway designer. Bold colors, bold spirit.',
      interests: ['Fashion Design', 'Runway', 'Gauteng Street Style', 'Music Festivals', 'Photography'],
      prompts: [
        {
          question: 'My secret talent...',
          answer: 'I can tailor an entire denim jacket in under three hours!'
        }
      ],
      icebreakerOptions: [
        '👗 "Style tip for my campus wardrobe?"',
        '📸 "Can I model your next collection?"',
        '✨ "What’s the hottest trend in SA street fashion right now?"'
      ]
    }
  ],
  su: [
    {
      id: 'sp-su-1',
      universityId: 'su',
      name: 'Lara',
      age: 20,
      faculty: 'BSc Viticulture & Oenology',
      resHall: 'Monica Dameskoshuis',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      bio: 'Studying wine-making in the most beautiful valley in the world. Cycling through Stellenbosch vineyards.',
      interests: ['Wine Tasting', 'Cycling', 'Maties Cheer', 'Cooking', 'Mountains'],
      prompts: [
        {
          question: 'A perfect day in Stellenbosch...',
          answer: 'A cycle along the Eerste River, lunch under the oaks on Dorp Street.'
        }
      ],
      icebreakerOptions: [
        '🍷 "Red or white wine?"',
        '🚲 "Best cycling route in Stellies?"',
        '🌳 "Picnic on the Rooiplein?"'
      ]
    }
  ],
  uj: [
    {
      id: 'sp-uj-1',
      universityId: 'uj',
      name: 'Zanele',
      age: 21,
      faculty: 'BCom Logistics & Supply Chain',
      resHall: 'Sophiatown Res, APK',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80',
      bio: 'Orange army cheerleader, passionate about commerce and global supply networks.',
      interests: ['Campus Radio', 'Volleyball', 'Public Speaking', 'Soul Music'],
      prompts: [
        {
          question: 'Campus pride means...',
          answer: 'Singing UJ anthems until my voice is gone at the Soweto derby!'
        }
      ],
      icebreakerOptions: [
        '📣 "Are you heading to the UJ football derby?"',
        '📻 "Which campus radio DJ is your favorite?"'
      ]
    }
  ],
  dut: [
    {
      id: 'sp-dut-1',
      universityId: 'dut',
      name: 'Zama',
      age: 21,
      faculty: 'NDip Graphic Design & Digital Arts',
      resHall: 'Sterling House Res, Steve Biko',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      bio: 'Typography enthusiast, Durban beachfront sunsets, and weekend amapiano chill sessions.',
      interests: ['Graphic Design', 'Beach Walks', 'Amapiano', 'Photography', 'Art Galleries'],
      prompts: [
        {
          question: 'Best Durban campus hangout spot...',
          answer: 'Grabbing fresh chips at Steve Biko food court then watching the harbor ships.'
        }
      ],
      icebreakerOptions: [
        '🎨 "What font represents your personality?"',
        '🍟 "Steve Biko food court or Ritson cafeteria?"',
        '🌊 "Morning run on Durban promenade?"'
      ]
    }
  ],
  ukzn: [
    {
      id: 'sp-ukzn-1',
      universityId: 'ukzn',
      name: 'Thandeka',
      age: 22,
      faculty: 'LLB Law',
      resHall: 'Florence Powell Hall, Howard College',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80',
      bio: 'Future human rights advocate. Love moot court debates, ocean breezes, and Durban sunset drives.',
      interests: ['Constitutional Law', 'Debating', 'Coffee Spots', 'Poetry Slams', 'Yoga'],
      prompts: [
        {
          question: 'You can win me over with...',
          answer: 'Debating legal philosophy over an iced Americano at Howard College.'
        }
      ],
      icebreakerOptions: [
        '⚖️ "Favorite constitutional court judgment?"',
        '☕️ "Coffee at Howard College tower steps?"',
        '🌅 "Best sunset view in Durban?"'
      ]
    }
  ],
  cput: [
    {
      id: 'sp-cput-1',
      universityId: 'cput',
      name: 'Kayla',
      age: 21,
      faculty: 'NDip Public Relations & Events Management',
      resHall: 'District Six Campus Res',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
      bio: 'Cape Town lifestyle creator, mountain hikes on Lion’s Head, and indie coffee shops.',
      interests: ['Event Coordination', 'Hiking', 'Kloof Street Cafes', 'Photography', 'Fashion'],
      prompts: [
        {
          question: 'Sunday in Cape Town is reserved for...',
          answer: 'A sunrise hike up Lion’s Head followed by croissants at truth coffee.'
        }
      ],
      icebreakerOptions: [
        '☕️ "What’s your go-to Cape Town coffee roastery?"',
        '⛰️ "Sunset at Signal Hill or Camps Bay?"',
        '🎨 "First Thursday art crawl?"'
      ]
    }
  ],
  coastal: [
    {
      id: 'sp-coastal-1',
      universityId: 'coastal',
      name: 'Minenhle',
      age: 20,
      faculty: 'Management Assistant N6',
      resHall: 'Umlazi Campus Res',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=80',
      bio: 'TVET student leader, ambitious, loves motivational podcasts, gospel choirs, and campus football matches.',
      interests: ['Business Management', 'Choir Singing', 'Netball', 'Leadership', 'Fashion'],
      prompts: [
        {
          question: 'My proudest achievement this year...',
          answer: 'Finishing top of my N5 class and landing my WIL placement!'
        }
      ],
      icebreakerOptions: [
        '⚽️ "Are you coming to the inter-campus TVET derby?"',
        '💼 "What’s your dream company to work for?"',
        '🎵 "Favorite South African gospel choir?"'
      ]
    }
  ],
  unizulu: [
    {
      id: 'sp-unizulu-1',
      universityId: 'unizulu',
      name: 'Nosipho',
      age: 21,
      faculty: 'BSc Hydrology & Water Resources',
      resHall: 'Ongoye Complex, KwaDlangezwa',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      bio: 'Passionate about freshwater conservation in KZN. Love traditional dance, reading under trees, and lake walks.',
      interests: ['Environmental Science', 'Traditional Dance', 'Lake Walks', 'Poetry', 'Travel'],
      prompts: [
        {
          question: 'Best thing about Ongoye campus...',
          answer: 'The natural greenery, birds chirping in the morning, and the warm community spirit.'
        }
      ],
      icebreakerOptions: [
        '👑 "Traditional festival this Friday?"',
        '📚 "Quiet study spot at KwaDlangezwa library?"',
        '🌊 "Weekend trip to Richards Bay waterfront?"'
      ]
    }
  ],
  mut: [
    {
      id: 'sp-mut-1',
      universityId: 'mut',
      name: 'Sbongile',
      age: 21,
      faculty: 'NDip Human Resource Management',
      resHall: 'MUT Umlazi Residence',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      bio: 'People person through and through. Love campus debates, organizing events, and listening to deep soulful house.',
      interests: ['HR & Talent', 'Public Speaking', 'Soulful House', 'Cooking', 'Fitness'],
      prompts: [
        {
          question: 'A quality I admire most...',
          answer: 'Authenticity and someone who is genuinely proud of their campus and roots.'
        }
      ],
      icebreakerOptions: [
        '🥩 "Braai at the student centre?"',
        '🎵 "Favorite deep house DJ?"',
        '☕️ "Study break chat outside the library?"'
      ]
    }
  ],
  nmu: [
    {
      id: 'sp-nmu-1',
      universityId: 'nmu',
      name: 'Asanda',
      age: 21,
      faculty: 'BA Media, Communication & Culture',
      resHall: 'Summerstrand South Campus Kraal',
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
      bio: 'Beach lover, Madibaz rugby fan, podcast host, and coastal sunset watcher in Gqeberha 🌊',
      interests: ['Madibaz Rugby', 'Beach Volleyball', 'Podcasting', 'Surfing', 'Acoustic Music'],
      prompts: [
        {
          question: 'The perfect Friday afternoon in Gqeberha...',
          answer: 'Walking down to Pollok Beach with an ice cream after writing my last test for the week.'
        }
      ],
      icebreakerOptions: [
        '🏉 "Are you heading to Madibaz stadium for rugby on Monday?"',
        '🏖️ "Pollok beach or Kings beach for sunset?"',
        '🎙️ "Have you listened to our campus podcast episode?"'
      ]
    }
  ]
};
