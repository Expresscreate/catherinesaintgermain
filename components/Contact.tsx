import React from 'react';
import { ACTOR_PROFILE } from '../constants';
import { Instagram, Youtube } from 'lucide-react';
import { FlowerCorner } from './FloralPatterns';
import EditableText from './cms/EditableText';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-bg-900 border-t border-bg-800 relative overflow-hidden">
      
      {/* Footer Flowers - Increased opacity */}
      <div className="absolute bottom-0 left-0 text-brand opacity-20">
         <FlowerCorner className="w-96 h-96 transform -rotate-90" />
      </div>
      <div className="absolute bottom-0 right-0 text-brand opacity-20">
         <FlowerCorner className="w-64 h-64 transform rotate-180" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        <p className="text-brand uppercase tracking-[0.2em] text-sm font-bold mb-8">Contact & Réseaux</p>
        
        <h2 className="font-serif text-5xl md:text-7xl text-brand-light mb-12 italic">
          <EditableText id="contact_headline" defaultText="Créons ensemble." />
        </h2>
        
        <div className="inline-flex flex-col items-center gap-2 mb-20 group cursor-pointer">
            <span className="text-gray-500 text-sm tracking-widest uppercase">Pour me joindre</span>
            <div className="text-2xl md:text-3xl text-white hover:text-brand transition-colors border-b border-bg-700 hover:border-brand pb-2">
                <EditableText id="contact_email" defaultText={ACTOR_PROFILE.contact.email} />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg-700 border border-bg-700 max-w-4xl mx-auto">
             <div className="bg-bg-900 p-10 flex flex-col items-center hover:bg-bg-800 transition-colors">
                <span className="text-brand text-xs uppercase tracking-widest mb-4">Téléphone</span>
                <span className="text-gray-300 font-serif text-lg">
                    <EditableText id="contact_phone" defaultText={ACTOR_PROFILE.contact.phone} />
                </span>
             </div>
             
             <div className="bg-bg-900 p-10 flex flex-col items-center hover:bg-bg-800 transition-colors">
                <span className="text-brand text-xs uppercase tracking-widest mb-4">Localisation</span>
                <span className="text-gray-300 font-serif text-lg">
                    <EditableText id="contact_location" defaultText={ACTOR_PROFILE.contact.location} />
                </span>
             </div>

             <div className="bg-bg-900 p-10 flex flex-col items-center hover:bg-bg-800 transition-colors">
                <span className="text-brand text-xs uppercase tracking-widest mb-4">Social</span>
                <div className="flex gap-4">
                    <a href={ACTOR_PROFILE.contact.instagram} target="_blank" rel="noreferrer" className="text-white hover:text-brand transition-colors"><Instagram strokeWidth={1.5} /></a>
                    <a href={ACTOR_PROFILE.contact.youtube} target="_blank" rel="noreferrer" className="text-white hover:text-brand transition-colors"><Youtube strokeWidth={1.5} /></a>
                </div>
             </div>
        </div>
        
        <footer className="mt-24 flex flex-col md:flex-row justify-between items-center text-bg-700 text-xs uppercase tracking-widest gap-4">
            <span>&copy; {new Date().getFullYear()} {ACTOR_PROFILE.name}</span>
            <span className="flex items-center gap-1">Design <span className="w-8 h-px bg-bg-700 inline-block"></span> Gemini</span>
        </footer>
      </div>
    </section>
  );
};

export default Contact;