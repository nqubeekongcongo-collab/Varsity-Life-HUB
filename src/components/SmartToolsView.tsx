import React, { useState } from 'react';
import { University, SmartTool, UserSession } from '../types';
import { SMART_TOOLS_CATALOG } from '../data/extendedData';
import { CampusIsolationBanner } from './CampusIsolationBanner';
import { 
  Search, 
  Bot, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Cpu, 
  GraduationCap, 
  FileText, 
  ShoppingBag, 
  Repeat, 
  Layers,
  Zap
} from 'lucide-react';

interface SmartToolsViewProps {
  currentUniversity: University;
  session?: UserSession;
}

export const SmartToolsView: React.FC<SmartToolsViewProps> = ({ currentUniversity, session }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'AI Writers & Thinkers' | 'Deep Research' | 'Textbook Finders'>('All');

  const categories: Array<'All' | 'AI Writers & Thinkers' | 'Deep Research' | 'Textbook Finders'> = [
    'All',
    'AI Writers & Thinkers',
    'Deep Research',
    'Textbook Finders'
  ];

  const filteredTools = SMART_TOOLS_CATALOG.filter((tool) => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const query = searchTerm.toLowerCase();
    const matchesSearch = 
      !query ||
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keyFeature.toLowerCase().includes(query) ||
      tool.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Writers & Thinkers':
        return <Bot className="w-4 h-4 text-cyan-400" />;
      case 'Deep Research':
        return <GraduationCap className="w-4 h-4 text-amber-400" />;
      case 'Textbook Finders':
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-4 text-left">
      {/* Campus Isolation Banner */}
      <CampusIsolationBanner 
        currentUniversity={currentUniversity} 
        sectionName="Smart Tools" 
        itemCount={filteredTools.length} 
      />

      {/* Header with Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span>Smart Tools & Academic Resources</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Curated AI assistants, research engines, and textbook providers for {currentUniversity.shortName} students.
          </p>
        </div>
        <span 
          className="self-start sm:self-auto text-[10px] font-mono font-bold px-2.5 py-1 rounded text-black shrink-0"
          style={{ backgroundColor: currentUniversity.accentColor }}
        >
          STUDENT DISCOUNT HUBS
        </span>
      </div>

      {/* Top Global Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search academic tools, AI assistants, textbooks, essay helpers (e.g. 'essay', 'citations', 'books')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-800 focus:border-neutral-600 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none shadow-sm"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white border border-neutral-800'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Categorized Resource Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center bg-neutral-900/50 rounded-2xl border border-neutral-800 space-y-2">
          <Search className="w-8 h-8 text-neutral-600 mx-auto" />
          <p className="text-sm font-semibold text-white">No tools found matching "{searchTerm}"</p>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try searching for terms like "grammar", "research", "citations", "textbooks", or "code".
          </p>
          <button
            type="button"
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-2 text-xs text-cyan-400 hover:underline font-bold"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between shadow-sm group text-left"
            >
              <div>
                {/* Card Top: Category and Pricing Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                    {getCategoryIcon(tool.category)}
                    <span>{tool.category}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-emerald-400 border border-neutral-700">
                    {tool.pricing}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{tool.name}</span>
                </h3>

                {/* Description */}
                <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                  {tool.description}
                </p>

                {/* Key feature callout */}
                <div className="mt-2.5 p-2 rounded-xl bg-neutral-950/70 border border-neutral-850 flex items-start gap-2 text-[11px] text-neutral-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-tight">
                    <strong className="text-white">Standout Feature:</strong> {tool.keyFeature}
                  </span>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800 text-[10px] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-mono">
                  Verified for {currentUniversity.shortName}
                </span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Open Tool</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
