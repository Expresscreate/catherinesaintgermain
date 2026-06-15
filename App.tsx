import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useContent } from './src/hooks/useContent';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import DemoVideo from './components/DemoVideo';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Marquee from './components/Marquee';
import { Settings } from 'lucide-react';

const AdminDashboard = lazy(() => import('./src/admin/AdminDashboard'));

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const onHashChange = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  if (isAdmin) {
    return (
      <Suspense fallback={
        <div className="h-screen bg-bg-900 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <AdminDashboard />
      </Suspense>
    );
  }

  return (
    <div className="bg-bg-900 min-h-screen text-gray-100 selection:bg-brand selection:text-bg-900 overflow-x-hidden">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg-900/90 backdrop-blur-md py-4 border-b border-bg-800' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className={`font-serif text-xl md:text-2xl transition-colors duration-300 ${scrolled ? 'text-brand' : 'text-brand-light'}`}>
            <span className="font-bold">C</span>
            <span className="italic">SG</span>
          </a>

          <div className="hidden md:flex gap-10 text-xs font-sans tracking-[0.2em] uppercase font-bold text-gray-400">
            {content.navbar.links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand transition-colors">{link.name}</a>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            aria-label="Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-brand-light transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-brand-light transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-brand-light transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 bg-bg-900/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-500 delay-100 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {content.navbar.links.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}
              className="font-serif text-3xl text-gray-200 hover:text-brand transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      <main>
        <Hero hero={content.hero} demoVideo={content.demoVideo} />

        <div className="relative z-30 -mt-12 mb-12 transform -rotate-2">
            <Marquee
                text={["ACTRICE", "CRÉATRICE", "PERFORMEUSE", "CINÉMA", "THÉÂTRE", "VOIX"]}
                rotate={true}
                speed={30}
            />
        </div>

        <About about={content.about} assets={content.assets} />
        <Resume resume={content.resume} />
        <DemoVideo demo={content.demoVideo} />
        <Gallery gallery={content.gallery} assets={content.assets} />
        <Contact contact={content.contact} footer={content.footer} />
      </main>

      <a
        href="#admin"
        className="fixed bottom-6 left-6 z-50 bg-bg-800/80 backdrop-blur border border-bg-700 p-3 rounded-full shadow-lg hover:border-brand/50 transition-all duration-300 group"
        title="Administration"
      >
        <Settings size={20} className="text-gray-400 group-hover:text-brand transition-colors" />
      </a>
    </div>
  );
};

export default App;
