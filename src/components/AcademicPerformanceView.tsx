import React, { useState } from 'react';
import { CourseModule, Assignment, University, UserSession } from '../types';
import { 
  GraduationCap, 
  Plus, 
  TrendingUp, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  ChevronDown,
  Trash2,
  Edit2,
  Sliders
} from 'lucide-react';

interface AcademicPerformanceViewProps {
  currentUniversity: University;
  session: UserSession;
  courses: CourseModule[];
  onAddCourse: (course: CourseModule) => void;
  onAddAssignment: (courseId: string, assignment: Assignment) => void;
  onOpenProfileEdit?: () => void;
}

export const AcademicPerformanceView: React.FC<AcademicPerformanceViewProps> = ({
  currentUniversity,
  session,
  courses,
  onAddCourse,
  onAddAssignment,
  onOpenProfileEdit,
}) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(courses[0]?.id || null);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddAssignModal, setShowAddAssignModal] = useState<string | null>(null);

  // New Course Form State
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newCredits, setNewCredits] = useState('16');
  const [newTarget, setNewTarget] = useState('75');

  // New Assignment Form State
  const [assignName, setAssignName] = useState('');
  const [assignWeight, setAssignWeight] = useState('20');
  const [assignScore, setAssignScore] = useState('75');
  const [assignMax, setAssignMax] = useState('100');

  // Calculate Weighted Grades per Course
  const calculateCourseAverage = (course: CourseModule) => {
    if (course.assignments.length === 0) return 0;
    let totalWeight = 0;
    let weightedScoreSum = 0;

    course.assignments.forEach((a) => {
      const percentage = (a.score / a.maxScore) * 100;
      weightedScoreSum += percentage * (a.weight / 100);
      totalWeight += a.weight;
    });

    if (totalWeight === 0) return 0;
    // Normalize to 100% of accumulated assessments
    return Math.round((weightedScoreSum / (totalWeight / 100)) * 10) / 10;
  };

  // Calculate Overall Weighted Degree Average across all courses
  const calculateOverallStats = () => {
    let totalCredits = 0;
    let creditWeightedSum = 0;

    courses.forEach((c) => {
      const avg = calculateCourseAverage(c);
      if (avg > 0) {
        creditWeightedSum += avg * c.credits;
        totalCredits += c.credits;
      }
    });

    const overallAvg = totalCredits > 0 ? Math.round((creditWeightedSum / totalCredits) * 10) / 10 : 0;

    // South African University Degree Classification
    let classification = 'Pass (Third Class)';
    let badgeColor = 'text-blue-400 bg-blue-950/60 border-blue-800';
    let gpa4Scale = '2.5';

    if (overallAvg >= 75) {
      classification = 'Distinction (Cum Laude / First Class)';
      badgeColor = 'text-amber-300 bg-amber-950/60 border-amber-800';
      gpa4Scale = '4.0';
    } else if (overallAvg >= 70) {
      classification = 'Second Class, Division 1 (Upper Second)';
      badgeColor = 'text-emerald-300 bg-emerald-950/60 border-emerald-800';
      gpa4Scale = '3.5';
    } else if (overallAvg >= 60) {
      classification = 'Second Class, Division 2 (Lower Second)';
      badgeColor = 'text-cyan-300 bg-cyan-950/60 border-cyan-800';
      gpa4Scale = '3.0';
    } else if (overallAvg >= 50) {
      classification = 'Pass (Third Class)';
      badgeColor = 'text-neutral-300 bg-neutral-900 border-neutral-700';
      gpa4Scale = '2.0';
    } else {
      classification = 'At Risk / Supplementary Exam';
      badgeColor = 'text-red-400 bg-red-950/60 border-red-800';
      gpa4Scale = '1.0';
    }

    return { overallAvg, totalCredits, classification, badgeColor, gpa4Scale };
  };

  const stats = calculateOverallStats();

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) return;

    onAddCourse({
      id: `course-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      credits: Number(newCredits) || 16,
      targetGrade: Number(newTarget) || 75,
      assignments: [
        {
          id: `a-${Date.now()}-1`,
          name: 'Semester Test 1',
          weight: 30,
          score: 75,
          maxScore: 100,
        }
      ]
    });

    setNewCode('');
    setNewName('');
    setShowAddCourseModal(false);
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddAssignModal || !assignName.trim()) return;

    onAddAssignment(showAddAssignModal, {
      id: `assign-${Date.now()}`,
      name: assignName.trim(),
      weight: Number(assignWeight) || 20,
      score: Number(assignScore) || 75,
      maxScore: Number(assignMax) || 100,
    });

    setAssignName('');
    setShowAddAssignModal(null);
  };

  return (
    <div className="space-y-4 pb-20 text-left">
      {/* Top Banner */}
      <div 
        className="p-4 rounded-2xl border text-white relative overflow-hidden transition-colors shadow-lg"
        style={{ 
          background: `linear-gradient(135deg, ${currentUniversity.primaryColor}dd 0%, #171717 100%)`,
          borderColor: `${currentUniversity.accentColor}44`
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider text-black"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                Private Academic Vault
              </span>
              <span className="text-xs text-neutral-300">• {session.degree}</span>
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">Academic Performance & GPA</h2>
            <p className="text-xs text-neutral-300 max-w-md">
              Track semester test scores, practicals, exams, and simulate your year-end degree classification under {currentUniversity.shortName} standards.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 flex-wrap">
            {onOpenProfileEdit && (
              <button
                id="academic-manage-profile-btn"
                type="button"
                onClick={onOpenProfileEdit}
                className="py-2.5 px-3.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs tracking-wide flex items-center gap-1.5 border border-neutral-700 transition-all cursor-pointer"
                title="Manage bio, profile photo, and full module enrolments"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manage in Profile</span>
              </button>
            )}

            {/* Add Module Button */}
            <button
              id="add-module-button"
              type="button"
              onClick={() => setShowAddCourseModal(true)}
              className="py-2.5 px-4 rounded-xl text-black font-extrabold text-xs tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              style={{ backgroundColor: currentUniversity.accentColor }}
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add Module / Course</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual GPA & Aggregate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Card 1: Aggregate Weighted % Gauge */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-4 shadow-md">
          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-neutral-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeWidth="3.5"
                strokeDasharray={`${stats.overallAvg}, 100`}
                strokeLinecap="round"
                stroke={currentUniversity.accentColor}
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-white">
              {stats.overallAvg}%
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              Weighted Average
            </span>
            <div className="text-base font-extrabold text-white mt-0.5">
              {stats.overallAvg}% Aggregate
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">
              Across {courses.length} modules
            </span>
          </div>
        </div>

        {/* Card 2: South African Degree Classification */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              Current Standing
            </span>
            <div className="text-xs font-bold text-white mt-1 leading-snug">
              {stats.classification}
            </div>
          </div>
          <div className="mt-2">
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border inline-block ${stats.badgeColor}`}>
              {stats.overallAvg >= 75 ? '★ Cum Laude Track' : 'In Good Standing'}
            </span>
          </div>
        </div>

        {/* Card 3: Total Credits & GPA Equivalence */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              NQF Credits & GPA
            </span>
            <div className="text-base font-extrabold text-white mt-0.5 flex items-baseline gap-2">
              <span>{stats.totalCredits} Credits</span>
              <span className="text-xs font-mono text-neutral-400">({stats.gpa4Scale} / 4.0)</span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-400 font-mono mt-2">
            Target: 128 Annual SA Credits
          </p>
        </div>
      </div>

      {/* Modules & Assignment Logger */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            Registered Modules & Assessment Log
          </h3>
          <span className="text-xs text-neutral-500 font-mono">Click module to view/log marks</span>
        </div>

        {courses.map((course) => {
          const avg = calculateCourseAverage(course);
          const isExpanded = expandedCourseId === course.id;
          const isDistinction = avg >= 75;

          return (
            <div
              key={course.id}
              className="bg-neutral-900/90 border border-neutral-800 rounded-2xl overflow-hidden transition-all shadow-md"
            >
              {/* Module Header Bar */}
              <div
                onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-neutral-850 transition-colors select-none"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 text-white"
                    style={{ backgroundColor: `${currentUniversity.primaryColor}cc` }}
                  >
                    {course.code.slice(0, 4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{course.code}</span>
                      <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
                        {course.credits} Credits
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 truncate max-w-[200px] sm:max-w-xs">
                      {course.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-extrabold font-mono text-white">
                      {avg}%
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      Target: {course.targetGrade}%
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Collapsible Assignment Logger */}
              {isExpanded && (
                <div className="p-4 bg-neutral-950/80 border-t border-neutral-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-300">
                      Module Assessment Breakdown ({course.assignments.length} logged)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAddAssignModal(course.id)}
                      className="px-2.5 py-1 rounded-lg text-black font-bold text-[11px] flex items-center gap-1 hover:opacity-90 transition-all cursor-pointer"
                      style={{ backgroundColor: currentUniversity.accentColor }}
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>Log Assessment</span>
                    </button>
                  </div>

                  {course.assignments.length === 0 ? (
                    <div className="p-4 text-center text-xs text-neutral-500">
                      No assignments logged for {course.code} yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {course.assignments.map((a) => {
                        const pct = Math.round((a.score / a.maxScore) * 100);
                        return (
                          <div
                            key={a.id}
                            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="font-semibold text-white">{a.name}</div>
                              <div className="text-[10px] text-neutral-400 font-mono">
                                Weight: {a.weight}% of semester mark
                              </div>
                            </div>

                            <div className="flex items-center gap-3 font-mono">
                              <div className="text-right">
                                <span className="font-bold text-white">{a.score} / {a.maxScore}</span>
                                <span className="text-[10px] text-neutral-400 block">({pct}%)</span>
                              </div>
                              <div 
                                className={`w-2.5 h-2.5 rounded-full ${
                                  pct >= 75 ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-red-400'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ADD MODULE MODAL */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-2xl text-left">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  {currentUniversity.shortName} Curriculum
                </span>
                <h4 className="text-base font-bold text-white">Add Course Module</h4>
              </div>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Module Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. INF 271 or LAW 211"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white uppercase font-mono focus:ring-2 focus:ring-white outline-none"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Informatics Systems Analysis & Design"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Credits (NQF)
                  </label>
                  <input
                    type="number"
                    value={newCredits}
                    onChange={(e) => setNewCredits(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Target Grade %
                  </label>
                  <input
                    type="number"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-black font-extrabold text-xs tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Module to Hub</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LOG ASSESSMENT MODAL */}
      {showAddAssignModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-2xl text-left">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase">
                  Assessment Logger
                </span>
                <h4 className="text-base font-bold text-white">Log Assessment Mark</h4>
              </div>
              <button
                onClick={() => setShowAddAssignModal(null)}
                className="text-neutral-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">
                  Assessment Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Practical Lab 2, or Semester Test 2"
                  value={assignName}
                  onChange={(e) => setAssignName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white focus:ring-2 focus:ring-white outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Weight %
                  </label>
                  <input
                    type="number"
                    value={assignWeight}
                    onChange={(e) => setAssignWeight(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Your Score
                  </label>
                  <input
                    type="number"
                    value={assignScore}
                    onChange={(e) => setAssignScore(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">
                    Max Score
                  </label>
                  <input
                    type="number"
                    value={assignMax}
                    onChange={(e) => setAssignMax(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-2.5 text-xs text-white font-mono focus:ring-2 focus:ring-white outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-black font-extrabold text-xs tracking-wide uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                style={{ backgroundColor: currentUniversity.accentColor }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Append Grade</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
