import React, { useState } from 'react';
import { ADMIN_CONFIG } from './config';
import { LogIn } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_CONFIG.password) {
      onLogin(password);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-bg-900 z-[100] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-bg-800 border border-bg-700 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-4">
              <LogIn size={28} className="text-brand" />
            </div>
            <h1 className="text-brand-light font-bold text-lg">{ADMIN_CONFIG.adminTitle}</h1>
            <p className="text-gray-500 text-sm mt-1">{ADMIN_CONFIG.siteTitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-gray-500 font-bold block mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                className="w-full bg-bg-900 border border-bg-700 rounded-xl p-3 text-gray-100 text-sm focus:outline-none focus:border-brand transition-colors"
                placeholder="Entrez le mot de passe"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs bg-red-900/20 border border-red-900/40 rounded-lg px-3 py-2">
                Mot de passe incorrect
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-brand text-bg-900 font-bold rounded-xl hover:bg-brand-light transition-colors text-sm"
            >
              Accéder à l'administration
            </button>
          </form>

          <a
            href="/"
            className="block text-center mt-6 text-gray-600 hover:text-brand text-sm transition-colors"
          >
            ← Retour au portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
