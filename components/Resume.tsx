import React, { useState } from 'react';
import { Download } from 'lucide-react';
import type { ResumeContent } from '../src/data/types';

interface ResumeProps {
  resume: ResumeContent;
}

const Resume: React.FC<ResumeProps> = ({ resume }) => {
  const [filter, setFilter] = useState<'Tous' | 'Film' | 'Theater' | 'Formation'>('Tous');

  const filteredCredits = filter === 'Tous'
    ? resume.credits
    : resume.credits.filter(c => c.type === filter);

  const filters = [
    { label: resume.filterTous, value: 'Tous' as const },
    { label: resume.filterFilm, value: 'Film' as const },
    { label: resume.filterTheater, value: 'Theater' as const },
    { label: resume.filterFormation, value: 'Formation' as const },
  ];

  return (
    <section id="resume" className="py-32 px-6 bg-bg-800 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-bg-700 pb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-brand uppercase tracking-[0.2em] text-sm font-bold">{resume.label}</p>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-brand transition-colors uppercase tracking-widest border border-gray-600 rounded-full px-3 py-1 hover:border-brand"
              >
                <Download size={12} />
                <span>PDF</span>
              </a>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl text-brand-light">{resume.title}</h2>
          </div>

          <div className="flex gap-2 mt-8 md:mt-0 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 border ${
                  filter === f.value
                    ? 'bg-brand text-bg-900 border-brand'
                    : 'bg-transparent text-gray-500 border-bg-600 hover:border-brand hover:text-brand'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-8 space-y-8">
            {filteredCredits.map((credit) => (
              <div
                key={credit.id}
                className="group relative pl-8 border-l border-bg-600 hover:border-brand transition-colors duration-300"
              >
                <div className="absolute top-2 -left-[5px] w-[9px] h-[9px] rounded-full bg-bg-600 group-hover:bg-brand transition-colors duration-300"></div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                  <h3 className="font-serif text-2xl text-brand-light group-hover:text-brand transition-colors">{credit.title}</h3>
                  <span className="font-mono text-sm text-gray-500">{credit.year}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-y-1 gap-x-6 text-gray-400 font-light text-sm md:text-base">
                  <span className="text-white font-normal">{credit.role}</span>
                  <span className="hidden md:inline text-bg-600">•</span>
                  <span>{credit.director}</span>
                  {credit.company && (
                    <>
                      <span className="hidden md:inline text-bg-600">•</span>
                      <span className="italic">{credit.company}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-bg-900 p-8 md:p-10 sticky top-24 border border-bg-700">
              <h3 className="font-serif text-3xl text-brand mb-8 italic">{resume.skillsTitle}</h3>
              <div className="space-y-10">
                {resume.skills.map((skillGroup) => (
                  <div key={skillGroup.category}>
                    <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-4 border-b border-bg-700 pb-2">{skillGroup.category}</h4>
                    <ul className="space-y-2">
                      {skillGroup.items.map((item, idx) => (
                        <li key={idx} className="text-gray-400 text-sm font-light flex items-center gap-2">
                          <span className="w-1 h-1 bg-brand rounded-full opacity-50"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
