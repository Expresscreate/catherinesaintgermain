import React, { useState } from 'react';
import { ACTOR_PROFILE } from '../constants';
import { Instagram, Youtube, X, Send } from 'lucide-react';
import { FlowerCorner } from './FloralPatterns';
import EditableText from './cms/EditableText';

const PolitiqueConfidentialite = () => (
  <div className="space-y-6 text-left">
    <h3 className="font-serif text-2xl text-brand-light mb-6">Politique de Confidentialité</h3>
    
    <div>
      <h4 className="font-bold text-white mb-2">1. Collecte de l'information</h4>
      <p className="text-gray-400">Nous recueillons des informations lorsque vous utilisez notre formulaire de contact. Les informations recueillies incluent votre nom, votre adresse e-mail et votre numéro de téléphone.</p>
    </div>
    
    <div>
      <h4 className="font-bold text-white mb-2">2. Utilisation des informations</h4>
      <p className="text-gray-400 mb-2">Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :</p>
      <ul className="text-gray-400 list-disc list-inside space-y-1">
        <li>Vous contacter par e-mail ou téléphone</li>
        <li>Répondre à vos demandes de casting ou de collaboration</li>
      </ul>
    </div>
    
    <div>
      <h4 className="font-bold text-white mb-2">3. Confidentialité</h4>
      <p className="text-gray-400">Nous sommes les seuls propriétaires des informations recueillies sur ce site. Vos informations personnelles ne seront pas vendues, échangées, transférées, ou données à une autre société pour n'importe quelle raison, sans votre consentement.</p>
    </div>
  </div>
);

const TermesConditions = () => (
  <div className="space-y-6 text-left">
    <h3 className="font-serif text-2xl text-brand-light mb-6">Termes et Conditions</h3>
    
    <div>
      <h4 className="font-bold text-white mb-2">1. Conditions</h4>
      <p className="text-gray-400">En accédant à ce site web, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables.</p>
    </div>
    
    <div>
      <h4 className="font-bold text-white mb-2">2. Droits d'auteur</h4>
      <p className="text-gray-400">Tout le contenu présent sur ce site (images, textes, vidéos) est la propriété intellectuelle de Catherine St-Germain sauf indication contraire. Toute reproduction non autorisée est interdite.</p>
    </div>
    
    <div>
      <h4 className="font-bold text-white mb-2">3. Limitation de responsabilité</h4>
      <p className="text-gray-400">Catherine St-Germain ne pourra être tenue responsable des dommages directs ou indirects causés au matériel de l'utilisateur, lors de l'accès au site.</p>
    </div>
  </div>
);

const Contact: React.FC = () => {
  const [modalContent, setModalContent] = useState<'politique' | 'termes' | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/catherine4812@hotmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };
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
        
        {/* Contact Form */}
        <div className="mt-16 max-w-2xl mx-auto border border-bg-700">
          <form 
            onSubmit={handleSubmit}
            className="bg-bg-900 p-8 space-y-6"
          >
            <input type="hidden" name="_subject" value="Nouveau message - Portfolio Catherine St-Germain" />
            <input type="text" name="_honey" style={{display: 'none'}} />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Nom</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className="w-full bg-bg-800 border border-bg-700 text-white px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full bg-bg-800 border border-bg-700 text-white px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                  placeholder="Votre email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                required
                rows={5}
                className="w-full bg-bg-800 border border-bg-700 text-white px-4 py-3 focus:outline-none focus:border-brand transition-colors resize-none"
                placeholder="Votre message..."
              />
            </div>
            
            <div className="text-center">
              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="group flex items-center gap-3 bg-brand text-bg-900 px-8 py-3 mx-auto uppercase tracking-widest text-sm font-bold hover:bg-brand-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {formStatus === 'submitting' ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
            
            {formStatus === 'success' && (
              <p className="text-green-500 text-center">Message envoyé avec succès !</p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-500 text-center">Erreur lors de l'envoi. Veuillez réessayer.</p>
            )}
          </form>
        </div>
        
        <footer className="mt-24 flex flex-col md:flex-row justify-between items-center text-bg-700 text-xs uppercase tracking-widest gap-4">
            <span>&copy; {new Date().getFullYear()} {ACTOR_PROFILE.name}</span>
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setModalContent('politique')}
                    className="hover:text-brand transition-colors cursor-pointer"
                >
                    Politique de Confidentialité
                </button>
                <span className="w-1 h-1 rounded-full bg-bg-700"></span>
                <button 
                    onClick={() => setModalContent('termes')}
                    className="hover:text-brand transition-colors cursor-pointer"
                >
                    Termes et Conditions
                </button>
            </div>
        </footer>

        {/* Modal */}
        {modalContent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModalContent(null)}>
          <div 
            className="bg-bg-900 border border-bg-700 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setModalContent(null)}
                className="text-gray-400 hover:text-brand transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            {modalContent === 'politique' && <PolitiqueConfidentialite />}
            {modalContent === 'termes' && <TermesConditions />}
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Contact;