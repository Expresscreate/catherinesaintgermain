import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import SectionEditor from './SectionEditor';
import GitHubPusher from './GitHubPusher';
import AdminLogin from './AdminLogin';
import { ADMIN_CONFIG } from './config';
import {
  Home, User, BookOpen, Film, Award, Image, Mail,
  Menu, Laptop2, FileText, LogOut, Eye, Save, ChevronLeft,
} from 'lucide-react';

const SECTIONS = [
  { key: 'hero', label: 'Hero', icon: Home },
  { key: 'about', label: 'À Propos', icon: User },
  { key: 'resume', label: 'CV & Compétences', icon: BookOpen },
  { key: 'demoVideo', label: 'Vidéo Démo', icon: Film },
  { key: 'gallery', label: 'Galerie', icon: Image },
  { key: 'contact', label: 'Contact', icon: Mail },
  { key: 'navbar', label: 'Navigation', icon: Menu },
  { key: 'footer', label: 'Pied de page', icon: FileText },
  { key: 'assets', label: 'Images & Fichiers', icon: Laptop2 },
];

const AdminDashboard: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [previewToast, setPreviewToast] = useState(false);
  const [deployToast, setDeployToast] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { content, updateContent, savePreview, resetToDefault, hasOverrides } = useContent();

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />;
  }

  const handleSavePreview = () => {
    savePreview();
    setPreviewToast(true);
    setTimeout(() => setPreviewToast(false), 3000);
  };

  const handleDeploy = () => {
    setDeployToast(true);
    setTimeout(() => setDeployToast(false), 4000);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleViewSite = () => {
    window.open(window.location.origin, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-bg-900 z-[100] flex flex-col overflow-hidden">
      {showSettings && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" />
      )}

      <div className="flex flex-1 min-h-0 relative z-10">
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-bg-800 border-r border-bg-700 flex-shrink-0 transition-all duration-300 overflow-hidden ${showSettings ? 'pointer-events-none opacity-40' : ''}`}>
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-bg-700 flex items-center justify-between">
              <div>
                <h1 className="text-brand-light font-bold text-sm">Administration</h1>
                <p className="text-gray-600 text-[10px]">{ADMIN_CONFIG.siteTitle}</p>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="text-gray-500 hover:text-brand-light transition-colors p-1">
                <ChevronLeft size={18} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-2">
              {SECTIONS.map(sec => {
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.key}
                    onClick={() => setActiveSection(sec.key)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      activeSection === sec.key
                        ? 'bg-brand/10 text-brand border-r-2 border-brand'
                        : 'text-gray-400 hover:text-brand-light hover:bg-bg-800/50'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-3 border-t border-bg-700 space-y-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-brand-light hover:bg-bg-800/50 rounded-lg transition-colors"
              >
                <LogOut size={14} /> Déconnexion
              </button>
            </div>
          </div>
        </aside>

        <div className={`flex-1 flex flex-col min-w-0 ${showSettings ? 'pointer-events-none opacity-40' : ''}`}>
          <header className="bg-bg-800/80 backdrop-blur-md border-b border-bg-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-brand-light transition-colors p-1">
                  <Menu size={20} />
                </button>
              )}
              <div>
                <h2 className="text-brand-light font-bold text-base">
                  {SECTIONS.find(s => s.key === activeSection)?.label || activeSection}
                </h2>
                <p className="text-gray-600 text-[11px]">
                  {hasOverrides ? 'Aperçu local actif' : 'Données du fichier source'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {hasOverrides && (
                <span className="text-[10px] bg-amber-900/40 text-amber-400 px-2 py-1 rounded-full border border-amber-800">Aperçu</span>
              )}
              <button
                onClick={handleViewSite}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-500 hover:text-brand-light transition-colors text-xs"
              >
                <Eye size={14} /> Voir le site
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <SectionEditor
              sectionKey={activeSection}
              content={content}
              onChange={updateContent}
            />
          </main>
        </div>
      </div>

      <footer className="bg-bg-800/90 backdrop-blur-md border-t border-bg-700 px-4 py-3 flex-shrink-0 relative z-40">
        <div className="max-w-4xl mx-auto space-y-2">
          <GitHubPusher content={content} onDeploy={handleDeploy} settingsOpen={showSettings} onToggleSettings={setShowSettings} />
          <div className="flex items-center gap-3">
            <button
              onClick={handleSavePreview}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-brand text-bg-900 font-semibold rounded-lg hover:bg-brand-light transition-colors text-sm"
            >
              <Save size={18} /> Sauvegarder l'aperçu
            </button>
            <button
              onClick={resetToDefault}
              className="px-4 py-3 border border-gray-700 text-gray-400 rounded-lg hover:border-red-500 hover:text-red-400 transition-colors text-sm"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </footer>

      {previewToast && (
        <div className="fixed top-6 right-6 z-[200] bg-emerald-900/80 backdrop-blur-md border border-emerald-700 text-emerald-300 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slide-in">
          Aperçu sauvegardé ! Rafraîchissez le site pour voir les changements.
        </div>
      )}
      {deployToast && (
        <div className="fixed top-6 right-6 z-[200] bg-indigo-900/80 backdrop-blur-md border border-indigo-700 text-indigo-300 px-5 py-3 rounded-xl shadow-2xl text-sm font-medium animate-slide-in">
          Déploiement GitHub déclenché ! Le site sera mis à jour sous 1-2 min.
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
