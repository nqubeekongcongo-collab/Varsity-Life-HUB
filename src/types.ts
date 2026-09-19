export type UniversityId = string;

export interface University {
  id: UniversityId;
  name: string;
  shortName: string;
  motto: string;
  town: string;
  domain: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  lightAccent: string;
  gradient: string;
  badgeClass: string;
  tagline: string;
  campuses: string[];
  province?: string;
  institutionType?: 'university' | 'tvet';
}

export interface UserSession {
  email: string;
  universityId: UniversityId;
  studentNumber: string;
  fullName: string;
  degree: string;
  faculty?: string;
  yearOfStudy: string;
  resHall: string;
  avatarUrl: string;
  bio?: string;
  enrolledModules?: string[];
  isLoggedIn: boolean;
}

export type MarketplaceCategory = 'Product' | 'Service';

export interface MarketplaceComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorStudentId?: string;
  authorRes?: string;
  text: string;
  timestamp: string;
}

export interface MarketplaceItem {
  id: string;
  universityId: UniversityId;
  title: string;
  price: number;
  category: MarketplaceCategory;
  subcategory: string;
  description: string;
  condition?: string;
  location: string;
  sellerName: string;
  sellerStudentId: string;
  sellerAvatar: string;
  sellerContact: string;
  createdAt: string;
  imageUrl?: string;
  images?: string[];
  videoUrl?: string;
  videoThumbnail?: string;
  likes: number;
  isLikedByMe?: boolean;
  comments?: MarketplaceComment[];
  createdAtTimestamp?: number;
  expiresAt?: string;
  reportCount?: number;
}

export interface CampusEvent {
  id: string;
  universityId: UniversityId;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Party' | 'Academic' | 'Sports' | 'Career' | 'Arts';
  description: string;
  organizer: string;
  organizerAvatar: string;
  organizerStudentId?: string;
  organizerContact?: string;
  rsvpCount: number;
  isRsvpd: boolean;
  coverImage?: string;
  priceTag?: string;
  termsAccepted?: boolean;
  organizerPledgeAgreed?: boolean;
  organizerLiabilityTimestamp?: string;
}

export interface DirectMessageAttachment {
  type: 'voice' | 'file' | 'image' | 'document';
  url?: string;
  name?: string;
  size?: string;
  duration?: string;
}

export interface ChatMessage {
  id: string;
  universityId: UniversityId;
  channelId: string;
  senderName: string;
  senderAvatar: string;
  senderRes: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  likes?: number;
  attachment?: DirectMessageAttachment;
}

export interface StudyBuddy {
  id: string;
  universityId: UniversityId;
  name: string;
  degree: string;
  year: string;
  faculty: string;
  modules: string[];
  librarySpot: string;
  studyStyle: string;
  bio: string;
  avatar: string;
  availability: string;
  matchScore: number;
  matched?: boolean;
}

export interface Assignment {
  id: string;
  name: string;
  weight: number; // e.g. 20%
  score: number; // e.g. 78
  maxScore: number; // e.g. 100
  dueDate?: string;
}

export interface CourseModule {
  id: string;
  code: string;
  name: string;
  credits: number;
  targetGrade: number;
  assignments: Assignment[];
}

export interface CampusNotice {
  id: string;
  universityId: UniversityId;
  type: 'SRC' | 'Club' | 'Sports';
  title: string;
  author: string;
  authorRole: string;
  date: string;
  content: string;
  badge: string;
  urgent?: boolean;
  likes: number;
}

export interface SingleProfile {
  id: string;
  universityId: UniversityId;
  name: string;
  age: number;
  faculty: string;
  resHall: string;
  photo: string;
  bio: string;
  interests: string[];
  prompts: Array<{
    question: string;
    answer: string;
  }>;
  icebreakerOptions: string[];
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  attachment?: DirectMessageAttachment;
}

export interface DirectConversation {
  id: string;
  universityId: UniversityId;
  participantName: string;
  participantAvatar: string;
  participantRes?: string;
  participantDegree?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  messages: DirectMessage[];
}

export interface StudentGig {
  id: string;
  universityId: UniversityId;
  title: string;
  payRate: string;
  category: 'Tutoring' | 'Moving & Res' | 'Creative & Media' | 'Admin & Research' | 'Delivery & Chores';
  description: string;
  location: string;
  duration: string;
  posterName: string;
  posterAvatar: string;
  posterContact: string;
  createdAt: string;
  applicantsCount: number;
}

export interface CampusSpottedPost {
  id: string;
  universityId: UniversityId;
  anonymousTag: string;
  text: string;
  timestamp: string;
  likes: number;
  commentsCount: number;
  category: 'Library' | 'Crush' | 'ResLife' | 'Lecture' | 'Shoutout';
}

export interface SmartTool {
  id: string;
  name: string;
  category: 'AI Writers & Thinkers' | 'Deep Research' | 'Textbook Finders';
  description: string;
  icon: string;
  url: string;
  tags: string[];
  pricing: string;
  keyFeature: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  routedTo: string;
}

export type ReportReason = 
  | 'Spam or Advertising' 
  | 'Scams / Fraudulent Payment' 
  | 'Inappropriate or Offensive' 
  | 'Harassment or Bullying' 
  | 'Impersonation or False Information' 
  | 'Other';

export type AppFontFamily = 'modern' | 'trendy' | 'academic' | 'elegant';
export type AppFontSize = 'small' | 'medium' | 'large';
export type AppFontStyle = 'regular' | 'italic' | 'bold';
export type AppBackgroundTheme = 'dark' | 'accent' | 'midnight' | 'minimal' | 'forest';

export type AppTabId = 
  | 'marketplace' 
  | 'events' 
  | 'chats' 
  | 'study-buddy' 
  | 'academic' 
  | 'campus-life' 
  | 'single-mingle'
  | 'smart-tools'
  | 'help-support';

