import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const DemoVideo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin, content, updateContent } = useAdmin();
  
  const videoIdKey = 'demo_video_id';
  const videoId = content[videoIdKey] || 'I7bIiB_sSSA';
  
  const changeVideoId = () => {
    const newId = prompt("Entrez l'ID de la vidéo YouTube (ex: I7bIiB_sSSA) :", videoId);
    if (newId && newId !== videoId) {
      updateContent(videoIdKey, newId);
    }
  };

  return (
    <section id="demo" className="py-24 px-6 bg-bg-900 border-t border-bg-800 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand uppercase tracking-[0.2em] text-sm font-bold mb-4">Démo</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-light italic">
            Extrait Vidéo
          </h2>
        </div>
        
        {/* Video Player Container */}
        <div 
          className="relative aspect-video bg-bg-800 border border-bg-700 group cursor-pointer overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Thumbnail/Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-900 via-transparent to-transparent z-10"></div>
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              // Fallback if thumbnail not available
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 rounded-full bg-brand/90 flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Play size={32} fill="white" className="text-white ml-2" />
            </div>
          </div>
          
          {/* Label */}
          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-white font-serif text-xl">Démo Jeu</span>
          </div>
        </div>
        
        {isAdmin && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={changeVideoId}
              className="bg-black/60 text-brand border border-brand px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-brand hover:text-bg-900 transition-colors"
            >
              Changer ID Vidéo
            </button>
          </div>
        )}
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-brand transition-colors"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Demo Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default DemoVideo;
