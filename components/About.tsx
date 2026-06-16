import React from 'react';
import type { AboutContent, AssetsContent } from '../src/data/types';
import { FlowerWatermark } from './FloralPatterns';

interface AboutProps {
  about: AboutContent;
  assets: AssetsContent;
}

const About: React.FC<AboutProps> = ({ about, assets }) => {
  return (
    <section id="about" className="py-32 px-6 bg-bg-900 relative overflow-hidden">
      <div className="absolute top-20 right-0 font-serif text-[15rem] leading-none text-bg-800/50 pointer-events-none select-none -z-10 opacity-50 hidden lg:block">
        Bio
      </div>
      
      <FlowerWatermark className="top-1/4 left-0 w-[500px] h-[500px] text-brand" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-5 relative group">
            <div className="absolute -top-10 -left-10 w-3/4 h-3/4 bg-bg-800 border border-bg-700 z-0 transition-transform duration-700 group-hover:translate-x-4 group-hover:translate-y-4"></div>
            <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-brand/10 z-0"></div>
            
            <img
              src={assets.portrait}
              alt="Catherine St-Germain Portrait"
              className="relative z-10 w-full h-[600px] object-cover filter grayscale contrast-[1.1] group-hover:grayscale-0 transition-all duration-700 ease-in-out shadow-2xl"
            />
            
            <div className="absolute bottom-10 left-[-20px] z-20 bg-brand-light text-bg-900 py-4 px-8 shadow-xl font-serif italic text-xl">
              "{about.quote}"
            </div>
        </div>

        <div className="lg:col-span-7 font-sans">
          <div className="flex items-center gap-4 mb-8">
             <span className="h-[2px] w-12 bg-brand"></span>
             <span className="uppercase tracking-widest text-brand text-sm font-semibold">{about.label}</span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-6xl text-brand-light mb-10 leading-tight">
            {about.headline} <span className="text-brand italic">{about.headlineHighlight}</span> {about.headlineEnd}
          </h2>
          
          <div className="prose prose-lg prose-invert text-gray-400 font-light mb-12">
             <p className="whitespace-pre-line leading-loose">{about.bio}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-bg-700 pt-8">
            <div>
              <span className="text-bg-700 block text-xs uppercase tracking-widest mb-2">{about.stats.heightLabel}</span>
              <span className="text-brand-light font-serif text-2xl">{about.stats.height}</span>
            </div>
            <div>
              <span className="text-bg-700 block text-xs uppercase tracking-widest mb-2">{about.stats.hairLabel}</span>
              <span className="text-brand-light font-serif text-2xl">{about.stats.hair}</span>
            </div>
            <div>
              <span className="text-bg-700 block text-xs uppercase tracking-widest mb-2">{about.stats.eyesLabel}</span>
              <span className="text-brand-light font-serif text-2xl">{about.stats.eyes}</span>
            </div>
             <div>
              <span className="text-bg-700 block text-xs uppercase tracking-widest mb-2">{about.stats.weightLabel}</span>
              <span className="text-brand-light font-serif text-2xl">{about.stats.weight}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
