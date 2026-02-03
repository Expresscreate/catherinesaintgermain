import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Lock, Unlock, Save, LogOut, Download, AlertCircle } from 'lucide-react';

const AdminBar: React.FC = () => {
  const { isAdmin, login, logout, saveChanges, content } = useAdmin();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowLogin(false);
      setPassword('');
    } else {
      alert("Mot de passe incorrect (Essayez 'admin')");
    }
  };

  const handleExport = () => {
    // Save to local storage first
    saveChanges();
    
    // Create a Blob from the content
    const jsonString = JSON.stringify(content, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = "site_content.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Fichier de configuration téléchargé ! Pour appliquer ces changements à tous les visiteurs, commitez ce fichier dans votre dépôt GitHub.");
  };

  if (isAdmin) {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] flex flex-col items-center gap-2 animate-fade-in-up">
        
        <div className="bg-bg-900/95 backdrop-blur border border-brand rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl">
            <span className="text-brand text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Édition
            </span>
            
            <div className="h-4 w-px bg-bg-700"></div>
            
            <button onClick={saveChanges} className="text-gray-300 hover:text-white flex items-center gap-2 text-xs md:text-sm transition-colors" title="Sauvegarder dans le navigateur">
                <Save size={16} /> <span className="hidden md:inline">Local Save</span>
            </button>

            <button onClick={handleExport} className="text-brand hover:text-brand-light flex items-center gap-2 text-xs md:text-sm transition-colors" title="Télécharger le fichier de config pour la prod">
                <Download size={16} /> <span className="hidden md:inline">Exporter Config</span>
            </button>
            
            <div className="h-4 w-px bg-bg-700"></div>

            <button onClick={logout} className="text-red-400 hover:text-red-300 flex items-center gap-2 text-sm transition-colors">
                <LogOut size={16} />
            </button>
        </div>
        
        <div className="bg-black/80 px-3 py-1 rounded text-[10px] text-gray-400 flex items-center gap-1">
            <AlertCircle size={10} />
            Modifications visibles uniquement par vous jusqu'à l'export.
        </div>
      </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setShowLogin(true)}
        className="fixed bottom-6 left-6 z-[60] bg-brand text-bg-900 p-3 rounded-full shadow-lg hover:scale-110 hover:bg-white transition-all duration-300 group"
        title="Admin Login"
      >
        <Lock size={20} className="group-hover:hidden" />
        <Unlock size={20} className="hidden group-hover:block" />
      </button>

      {showLogin && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4">
          <form onSubmit={handleLogin} className="bg-bg-800 border border-brand p-8 rounded-none max-w-sm w-full relative shadow-2xl">
            <button 
                type="button" 
                onClick={() => setShowLogin(false)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
                ✕
            </button>
            <h3 className="font-serif text-2xl text-brand mb-6 text-center">Administration</h3>
            <div className="mb-6 text-xs text-gray-400 text-center leading-relaxed">
                Connectez-vous pour modifier les textes et les images.
                <br/>Mot de passe démo : <strong>admin</strong>
            </div>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full bg-bg-900 border border-bg-700 p-3 text-white mb-4 focus:outline-none focus:border-brand"
                autoFocus
            />
            <button type="submit" className="w-full bg-brand text-bg-900 font-bold py-3 hover:bg-brand-light transition-colors">
                Connexion
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminBar;