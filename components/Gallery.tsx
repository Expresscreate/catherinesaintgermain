import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { X, ArrowRight } from 'lucide-react';
import EditableImage from './cms/EditableImage';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Helper to handle image click for lightbox only if NOT editable mode (or handled by EditableImage logic)
  // Actually, EditableImage handles the "Edit" click. We need to know if we are in admin mode or not to trigger lightbox.
  // For simplicity here, clicking the "Eye" overlay triggers lightbox, clicking the image itself triggers edit in Admin.
  
  return (
    <section id="gallery" className="py-32 bg-bg-900">
       <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
           <div>
               <p className="text-brand uppercase tracking-[0.2em] text-sm font-bold mb-4">Portfolio</p>
               <h2 className="font-serif text-5xl md:text-6xl text-brand-light">En Images</h2>
           </div>
       </div>
       
       <div className="max-w-[1920px] mx-auto px-4 md:px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
             {GALLERY_IMAGES.map((src, index) => (
               <div 
                key={index} 
                className="relative group aspect-[3/4] overflow-hidden"
               >
                 <EditableImage 
                    id={`gallery_img_${index}`}
                    defaultSrc={src} 
                    alt={`Portfolio ${index}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                 />
                
                {/* Minimalist Hover Overlay for Lightbox */}
                <div 
                    className="absolute inset-0 bg-bg-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                    onClick={() => setSelectedImage(src)} // Note: In real app, we'd need to fetch the edited src
                >
                    <div className="border border-brand/50 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-brand-light font-serif italic text-2xl">Voir</span>
                    </div>
                </div>
               </div>
             ))}
           </div>
       </div>

       {/* Lightbox Modal */}
       {selectedImage && (
         <div 
          className="fixed inset-0 z-50 bg-bg-900/98 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
         >
           <button 
            className="absolute top-6 right-6 text-gray-400 hover:text-brand transition-colors z-50"
            onClick={() => setSelectedImage(null)}
           >
             <X size={32} strokeWidth={1} />
           </button>
           <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-[90vh] object-contain shadow-2xl animate-scale-in" 
            onClick={(e) => e.stopPropagation()}
           />
         </div>
       )}
    </section>
  );
};

export default Gallery;