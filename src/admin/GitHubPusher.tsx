import React, { useState } from 'react';
import { ADMIN_CONFIG } from './config';
import type { SiteContent } from '../data/types';
import { Globe, Loader, Save } from 'lucide-react';

interface GitHubPusherProps {
  content: SiteContent;
  password: string;
  onDeploy: () => void;
}

const GitHubPusher: React.FC<GitHubPusherProps> = ({ content, password, onDeploy }) => {
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const deploy = async () => {
    setStatus('deploying');
    setMessage('Publication en cours...');
    try {
      const res = await fetch('/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        let errMsg: string;
        try { errMsg = JSON.parse(text).error || text; } catch { errMsg = text || `HTTP ${res.status}`; }
        throw new Error(errMsg);
      }

      const data = await res.json();
      setStatus('success');
      setMessage(data.message || 'Contenu publié en direct !');
      onDeploy();
    } catch (err) {
      setStatus('error');
      setMessage(`Erreur : ${err instanceof Error ? err.message : 'Inconnue'}`);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-bg-800/50 rounded-lg px-4 py-2 text-xs text-gray-500 flex items-center gap-2 border border-bg-700">
          <Globe size={14} className="text-emerald-400" />
          <span>Publier en direct sur <strong className="text-gray-400">{ADMIN_CONFIG.siteTitle}</strong></span>
        </div>
        <button
          onClick={deploy}
          disabled={status === 'deploying'}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm flex-shrink-0"
        >
          {status === 'deploying' ? (
            <><Loader size={18} className="animate-spin" /> Publication...</>
          ) : (
            <><Save size={18} /> Publier en direct</>
          )}
        </button>
      </div>

      {message && (
        <div className={`text-sm px-3 py-2 rounded-lg ${
          status === 'success' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800' :
          status === 'error' ? 'bg-red-900/30 text-red-400 border border-red-800' :
          'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default GitHubPusher;
