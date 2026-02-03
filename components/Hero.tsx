import React from 'react';
import { ACTOR_PROFILE } from '../constants';
import { ChevronDown, Play, Download, Video, Image as ImageIcon } from 'lucide-react';
import { FlowerCorner } from './FloralPatterns';
import EditableText from './cms/EditableText';
import { useAdmin } from '../contexts/AdminContext';

// Helper component for the background media (Video or Image)
const HeroBackground: React.FC = () => {
  const { isAdmin, content, updateContent } = useAdmin();
  
  // State keys
  const typeKey = 'hero_bg_type'; // 'video' | 'image'
  const videoKey = 'hero_video_id';
  const imageKey = 'hero_bg_image';

  // Current values with defaults
  const type = content[typeKey] || 'video';
  const videoId = content[videoKey] || 'I7bIiB_sSSA';
  // Default image matches the aesthetic
  const imageUrl = content[imageKey] || 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=2938&auto=format&fit=crop'; 

  const toggleType = () => {
    updateContent(typeKey, type === 'video' ? 'image' : 'video');
  };

  const changeVideoId = () => {
    const newId = prompt("Entrez l'ID de la vidéo YouTube (ex: I7bIiB_sSSA) :", videoId);
    if (newId && newId !== videoId) {
      updateContent(videoKey, newId);
    }
  };

  const changeImageUrl = () => {
    const newUrl = prompt("Entrez l'URL de l'image de fond :", imageUrl);
    if (newUrl && newUrl !== imageUrl) {
      updateContent(imageKey, newUrl);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-bg-900">
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {type === 'video' ? (
          /* YouTube Iframe Wrapper */
          /* We use scale-[3.0] (300%) to zoom in and hide potential black bars/controls, simulating object-cover */
          <iframe
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 opacity-50 mix-blend-screen grayscale-[30%]"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&enablejsapi=1`}
            title="Hero Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          /* Static Image Background */
          <img 
            src={imageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 mix-blend-screen grayscale-[30%]"
          />
        )}
      </div>
      
      {isAdmin && (
        <div className="absolute top-24 left-6 z-50 flex flex-col gap-2 items-start">
          {/* Toggle Type Button */}
          <button
            onClick={toggleType}
            className="bg-black/60 text-brand border border-brand px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-bg-900 transition-colors backdrop-blur-md flex items-center gap-2 w-48 justify-center"
          >
            {type === 'video' ? <ImageIcon size={14} /> : <Video size={14} />}
            {type === 'video' ? "Passer en Image" : "Passer en Vidéo"}
          </button>

          {/* Edit Content Button */}
          {type === 'video' ? (
            <button
              onClick={changeVideoId}
              className="bg-black/60 text-brand border border-brand px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-bg-900 transition-colors backdrop-blur-md flex items-center gap-2 w-48 justify-center"
            >
              <Video size={14} />
              Changer ID Vidéo
            </button>
          ) : (
            <button
              onClick={changeImageUrl}
              className="bg-black/60 text-brand border border-brand px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-bg-900 transition-colors backdrop-blur-md flex items-center gap-2 w-48 justify-center"
            >
              <ImageIcon size={14} />
              Changer Image
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center">
      {/* Dynamic Background (Video or Image) */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        
        {/* Gradients/Overlays to ensure text readability - pointer-events-none allows clicks to pass through if needed */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-900 via-bg-900/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-900 via-transparent to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Floral Decoration Top Right - Increased opacity/contrast */}
      <div className="absolute top-0 right-0 z-20 text-brand pointer-events-none">
         <FlowerCorner className="w-64 h-64 md:w-96 md:h-96 opacity-60 transform rotate-90" />
      </div>

      {/* Editorial Content Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          
          {/* Main Titles */}
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

          {/* Social / Action Side */}
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
             {/* Download Resume Button */}
             <a 
              href="/resume.pdf" // This needs to be replaced with the actual file path
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
              href={ACTOR_PROFILE.contact.youtube} 
              target="_blank" 
              rel="noreferrer"
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