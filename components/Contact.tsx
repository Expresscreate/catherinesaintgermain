import React, { useState } from 'react';
import type { ContactContent, FooterContent } from '../src/data/types';
import { Instagram, Youtube, Facebook, Music2, X, Send } from 'lucide-react';
import { FlowerCorner } from './FloralPatterns';

interface ContactProps {
  contact: ContactContent;
  footer: FooterContent;
}

const Contact: React.FC<ContactProps> = ({ contact, footer }) => {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch(contact.formAction, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const { instagram, youtube, facebook, tiktok } = contact.social;

  return (
    <section id="contact" className="py-32 px-6 bg-bg-900 border-t border-bg-800 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 text-brand opacity-20">
         <FlowerCorner className="w-96 h-96 transform -rotate-90" />
      </div>
      <div className="absolute bottom-0 right-0 text-brand opacity-20">
         <FlowerCorner className="w-64 h-64 transform rotate-180" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <p className="text-brand uppercase tracking-[0.2em] text-sm font-bold mb-8">{contact.label}</p>
        <h2 className="font-serif text-5xl md:text-7xl text-brand-light mb-12 italic">{contact.headline}</h2>

        <div className="inline-flex flex-col items-center gap-2 mb-20 group cursor-pointer">
            <span className="text-gray-500 text-sm tracking-widest uppercase">{contact.joinPrompt}</span>
            <div className="text-2xl md:text-3xl text-white hover:text-brand transition-colors border-b border-bg-700 hover:border-brand pb-2">
                {contact.email}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-bg-700 border border-bg-700 max-w-4xl mx-auto">
             <div className="bg-bg-900 p-10 flex flex-col items-center hover:bg-bg-800 transition-colors">
                <span className="text-brand text-xs uppercase tracking-widest mb-4">{contact.phoneLabel}</span>
                <span className="text-gray-300 font-serif text-lg">{contact.phone}</span>
             </div>
             <div className="bg-bg-900 p-10 flex flex-col items-center hover:bg-bg-800 transition-colors">
                <span className="text-brand text-xs uppercase tracking-widest mb-4">{contact.locationLabel}</span>
                <span className="text-gray-300 font-serif text-lg">{contact.location}</span>
             </div>
             <div className="bg-bg-900 p-10 flex flex-col items-center hover:bg-bg-800 transition-colors">
                <span className="text-brand text-xs uppercase tracking-widest mb-4">{contact.socialLabel}</span>
                <div className="flex gap-4">
                    {instagram && <a href={instagram} target="_blank" rel="noreferrer" className="text-white hover:text-brand transition-colors"><Instagram strokeWidth={1.5} /></a>}
                    {youtube && <a href={youtube} target="_blank" rel="noreferrer" className="text-white hover:text-brand transition-colors"><Youtube strokeWidth={1.5} /></a>}
                    {facebook && <a href={facebook} target="_blank" rel="noreferrer" className="text-white hover:text-brand transition-colors"><Facebook strokeWidth={1.5} /></a>}
                    {tiktok && <a href={tiktok} target="_blank" rel="noreferrer" className="text-white hover:text-brand transition-colors"><Music2 strokeWidth={1.5} /></a>}
                </div>
             </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto border border-bg-700">
          <form onSubmit={handleSubmit} className="bg-bg-900 p-8 space-y-6">
            <input type="hidden" name="_subject" value={contact.formSubject} />
            <input type="text" name="_honey" style={{display: 'none'}} />
            <input type="hidden" name="_captcha" value="false" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{contact.form.name}</label>
                <input type="text" id="name" name="name" required
                  className="w-full bg-bg-800 border border-bg-700 text-white px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                  placeholder={contact.form.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{contact.form.email}</label>
                <input type="email" id="email" name="email" required
                  className="w-full bg-bg-800 border border-bg-700 text-white px-4 py-3 focus:outline-none focus:border-brand transition-colors"
                  placeholder={contact.form.emailPlaceholder}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{contact.form.message}</label>
              <textarea id="message" name="message" required rows={5}
                className="w-full bg-bg-800 border border-bg-700 text-white px-4 py-3 focus:outline-none focus:border-brand transition-colors resize-none"
                placeholder={contact.form.messagePlaceholder}
              />
            </div>

            <div className="text-center">
              <button type="submit" disabled={formStatus === 'submitting'}
                className="group flex items-center gap-3 bg-brand text-bg-900 px-8 py-3 mx-auto uppercase tracking-widest text-sm font-bold hover:bg-brand-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {formStatus === 'submitting' ? 'Envoi...' : contact.form.submit}
              </button>
            </div>

            {formStatus === 'success' && <p className="text-green-500 text-center">Message envoyé avec succès !</p>}
            {formStatus === 'error' && <p className="text-red-500 text-center">Erreur lors de l'envoi. Veuillez réessayer.</p>}
          </form>
        </div>

        <footer className="mt-24 flex flex-col md:flex-row justify-between items-center text-bg-700 text-xs uppercase tracking-widest gap-4">
            <span>{footer.copyright}</span>
            <div className="flex items-center gap-4">
                {footer.legalLinks.map((link, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="w-1 h-1 rounded-full bg-bg-700"></span>}
                    <button
                      onClick={() => setModalIndex(idx)}
                      className="hover:text-brand transition-colors cursor-pointer"
                    >
                      {link.name}
                    </button>
                  </React.Fragment>
                ))}
            </div>
        </footer>

        {modalIndex !== null && footer.legalLinks[modalIndex] && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModalIndex(null)}>
            <div className="bg-bg-900 border border-bg-700 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-end mb-4">
                <button onClick={() => setModalIndex(null)} className="text-gray-400 hover:text-brand transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="text-left text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: footer.legalLinks[modalIndex].content }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
