import React from 'react';
import { ACTOR_PROFILE } from '../constants';
import { ChevronDown, Play, Download } from 'lucide-react';
import { FlowerCorner } from './FloralPatterns';
import EditableText from './cms/EditableText';

const HeroBackground: React.FC = () => {
  const videoId = 'I7bIiB_sSSA';

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-bg-900">
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <iframe
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-screen grayscale-[30%]"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&enablejsapi=1`}
          title="Hero Background"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        
        <div className="absolute inset-0 bg-gradient-to-r from-bg-900 via-bg-900/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-900 via-transparent to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="absolute top-0 right-0 z-20 text-brand pointer-events-none">
         <FlowerCorner className="w-64 h-64 md:w-96 md:h-96 opacity-60 transform rotate-90" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          
          <div className="md:col-span-8 animate-fade-in-up">
            <p className="text-brand tracking-[0.3em] text-sm md:text-base font-sans uppercase mb-6 font-bold flex items-center gap-4">
              <span className="w-12 h-[1px] bg-brand"></span>
              Portfolio Artistique
            </p>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-brand-light mb-8">
              <EditableText id="hero_name_first" defaultText="Catherine" /> <br/>
              <span className="italic font-light text-brand/80">
                <EditableText id="hero_name_last" defaultText="St-Germain" />
              </span>
            </h1>
            <div className="max-w-xl text-lg md:text-xl text-gray-300 font-light leading-relaxed border-l-2 border-brand pl-6">
              <EditableText 
                id="hero_tagline" 
                defaultText={ACTOR_PROFILE.tagline} 
                tag="p"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
             <a 
              href="/resume.pdf"
              download
              className="group flex items-center gap-4 text-bg-900 bg-brand hover:bg-brand-light px-6 py-3 transition-all duration-300 mb-2 w-full md:w-auto justify-center md:justify-end"
            >
              <span className="uppercase tracking-widest text-sm font-bold">Télécharger CV</span>
              <Download size={20} />
            </a>

             <a 
              href="#resume"
              className="group flex items-center gap-4 text-brand-light hover:text-brand transition-all duration-300"
            >
              <span className="uppercase tracking-widest text-sm">Voir l'expérience</span>
              <div className="w-12 h-12 rounded-full border border-brand/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                <ChevronDown size={20} className="group-hover:text-bg-900" />
              </div>
            </a>
            
            <a 
              href="#demo"
              className="group flex items-center gap-4 text-brand-light hover:text-brand transition-all duration-300"
            >
              <span className="uppercase tracking-widest text-sm">Démo Jeu</span>
              <div className="w-12 h-12 rounded-full border border-brand/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                <Play size={18} fill="currentColor" className="group-hover:text-bg-900 ml-1" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
