import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import DemoVideo from './components/DemoVideo';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Marquee from './components/Marquee';
import { AdminProvider } from './contexts/AdminContext';
import AdminBar from './components/cms/AdminBar';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <AdminProvider>
      <div className="bg-bg-900 min-h-screen text-gray-100 selection:bg-brand selection:text-bg-900 overflow-x-hidden">
        {/* Navigation */}
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
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-10 text-xs font-sans tracking-[0.2em] uppercase font-bold text-gray-400">
              <a href="#about" className="hover:text-brand transition-colors">À Propos</a>
              <a href="#gallery" className="hover:text-brand transition-colors">Portfolio</a>
              <a href="#demo" className="hover:text-brand transition-colors">Démo</a>
              <a href="#resume" className="hover:text-brand transition-colors">CV</a>
              <a href="#contact" className="hover:text-brand transition-colors">Contact</a>
            </div>

            {/* Mobile Menu Button */}
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

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-40 bg-bg-900/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className={`flex flex-col items-center justify-center h-full gap-8 transition-all duration-500 delay-100 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <a 
              href="#about" 
              onClick={handleNavClick}
              className="font-serif text-3xl text-gray-200 hover:text-brand transition-colors"
            >
              À Propos
            </a>
            <a 
              href="#gallery" 
              onClick={handleNavClick}
              className="font-serif text-3xl text-gray-200 hover:text-brand transition-colors"
            >
              Portfolio
            </a>
            <a 
              href="#demo" 
              onClick={handleNavClick}
              className="font-serif text-3xl text-gray-200 hover:text-brand transition-colors"
            >
              Démo
            </a>
            <a 
              href="#resume" 
              onClick={handleNavClick}
              className="font-serif text-3xl text-gray-200 hover:text-brand transition-colors"
            >
              CV
            </a>
            <a 
              href="#contact" 
              onClick={handleNavClick}
              className="font-serif text-3xl text-gray-200 hover:text-brand transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Main Content */}
        <main>
          <Hero />
          
          <div className="relative z-30 -mt-12 mb-12 transform -rotate-2">
              <Marquee 
                  text={["ACTRICE", "CRÉATRICE", "PERFORMEUSE", "CINÉMA", "THÉÂTRE", "VOIX"]} 
                  rotate={true}
                  speed={30}
              />
          </div>

          <About />
          <Resume />
          <DemoVideo />
          <Gallery />
          <Contact />
        </main>

        {/* Admin Login & Controls */}
        <AdminBar />
      </div>
    </AdminProvider>
  );
};

export default App;