import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import type { DemoVideoContent } from '../src/data/types';

interface DemoVideoProps {
  demo: DemoVideoContent;
}

const DemoVideo: React.FC<DemoVideoProps> = ({ demo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="demo" className="py-24 px-6 bg-bg-900 border-t border-bg-800 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-brand uppercase tracking-[0.2em] text-sm font-bold mb-4">{demo.label}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-light italic">{demo.title}</h2>
        </div>

        <div
          className="relative aspect-video bg-bg-800 border border-bg-700 group cursor-pointer overflow-hidden"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-bg-900 via-transparent to-transparent z-10"></div>
          <img
            src={`https://img.youtube.com/vi/${demo.videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${demo.videoId}/hqdefault.jpg`;
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-20 h-20 rounded-full bg-brand/90 flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-sm">
              <Play size={32} fill="white" className="text-white ml-2" />
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-20">
            <span className="text-white font-serif text-xl">{demo.overlay}</span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-brand transition-colors"
            >
              <X size={32} />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${demo.videoId}?autoplay=1&rel=0`}
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
