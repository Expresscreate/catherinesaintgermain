import React, { useState, useMemo } from 'react';
import { ADMIN_CONFIG } from './config';
import type { SiteContent } from '../data/types';
import { Github, Settings, Loader, RefreshCw, AlertTriangle, Info, Calendar } from 'lucide-react';

interface GitHubPusherProps {
  content: SiteContent;
  onDeploy: () => void;
  settingsOpen: boolean;
  onToggleSettings: (open: boolean) => void;
}

const REPO_STORAGE_KEY = 'catherine-github-config';
const MAX_TOKEN_DAYS = 365;

interface RepoConfig {
  token: string;
  owner: string;
  repo: string;
  filePath: string;
  branch: string;
  tokenSavedAt: string | null;
}

function nowISO(): string {
  return new Date().toISOString();
}

function loadRepoConfig(): RepoConfig {
  try {
    const saved = localStorage.getItem(REPO_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.token) return parsed;
    }
  } catch {}
  return {
    token: ADMIN_CONFIG.repoToken,
    owner: ADMIN_CONFIG.repoOwner,
    repo: ADMIN_CONFIG.repoName,
    filePath: ADMIN_CONFIG.filePath,
    branch: ADMIN_CONFIG.branch || 'main',
    tokenSavedAt: ADMIN_CONFIG.repoToken ? nowISO() : null,
  };
}

function saveRepoConfig(config: RepoConfig) {
  localStorage.setItem(REPO_STORAGE_KEY, JSON.stringify(config));
}

interface ExpiryInfo {
  level: 'ok' | 'warning' | 'critical' | 'expired';
  daysRemaining: number;
  message: string;
}

function getExpiryInfo(tokenSavedAt: string | null): ExpiryInfo | null {
  if (!tokenSavedAt) return null;
  const saved = new Date(tokenSavedAt);
  const expires = new Date(saved.getTime() + MAX_TOKEN_DAYS * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffMs = expires.getTime() - now.getTime();
  const daysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (daysRemaining < 0) {
    return { level: 'expired', daysRemaining, message: 'Token expiré — contactez le développeur pour le renouveler.' };
  }
  if (daysRemaining <= 30) {
    return { level: 'critical', daysRemaining, message: `Token expire dans ${daysRemaining} jour${daysRemaining > 1 ? 's' : ''}.` };
  }
  if (daysRemaining <= 60) {
    return { level: 'warning', daysRemaining, message: `Token expire dans ${daysRemaining} jours (dans environ 2 mois).` };
  }
  return { level: 'ok', daysRemaining, message: `Token valide encore ${daysRemaining} jours.` };
}

const GitHubPusher: React.FC<GitHubPusherProps> = ({ content, onDeploy, settingsOpen, onToggleSettings }) => {
  const [config, setConfig] = useState<RepoConfig>(loadRepoConfig);
  const [status, setStatus] = useState<'idle' | 'testing' | 'deploying' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const expiryInfo = useMemo(() => getExpiryInfo(config.tokenSavedAt), [config.tokenSavedAt]);

  const testConnection = async () => {
    setStatus('testing');
    setMessage('');
    try {
      const res = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, {
        headers: { Authorization: `Bearer ${config.token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const repoInfo = await res.json();
      const defaultBranch = repoInfo.default_branch || ADMIN_CONFIG.branch || 'main';
      const updated = { ...config, branch: defaultBranch };
      setConfig(updated);
      saveRepoConfig(updated);
      setStatus('success');
      setMessage(`Connexion GitHub réussie (branche: ${defaultBranch})`);
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 3000);
    } catch {
      setStatus('error');
      setMessage('Échec de connexion — le token est peut-être expiré');
    }
  };

  const deployToGitHub = async () => {
    setStatus('deploying');
    setMessage('Connexion à GitHub...');
    try {
      const baseUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.filePath}`;
      const getUrl = `${baseUrl}?ref=${config.branch}`;
      const getRes = await fetch(getUrl, {
        headers: { Authorization: `Bearer ${config.token}`, Accept: 'application/vnd.github.v3+json' },
      });

      let sha: string | undefined;
      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      } else if (getRes.status !== 404) {
        throw new Error(`GET failed: ${getRes.status}`);
      }

      setMessage(sha ? 'Envoi des modifications...' : 'Création du fichier...');

      const encoder = new TextEncoder();
      const bytes = encoder.encode(JSON.stringify(content, null, 2));
      const binary = Array.from(bytes, b => String.fromCharCode(b)).join('');
      const base64Content = btoa(binary);

      const putBody: Record<string, unknown> = {
        message: ADMIN_CONFIG.commitMessage,
        content: base64Content,
        branch: config.branch,
      };
      if (sha) putBody.sha = sha;

      const putRes = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(putBody),
      });
      if (!putRes.ok) throw new Error(`PUT failed: ${putRes.status}`);

      setStatus('success');
      setMessage('Déploiement déclenché ! Le site sera mis à jour dans 1-2 minutes.');
      onDeploy();
    } catch (err) {
      setStatus('error');
      setMessage(`Erreur : ${err instanceof Error ? err.message : 'Inconnue'}`);
    }
  };

  const isConfigured = config.token.length > 0 && config.owner && config.repo;

  const expiryColors: Record<string, string> = {
    ok: 'bg-emerald-900/30 text-emerald-400 border-emerald-800',
    warning: 'bg-blue-900/30 text-blue-400 border-blue-800',
    critical: 'bg-amber-900/30 text-amber-400 border-amber-800',
    expired: 'bg-red-900/30 text-red-400 border-red-800',
  };

  const expiryIcons: Record<string, React.ReactNode> = {
    ok: <Info size={14} />,
    warning: <Info size={14} />,
    critical: <AlertTriangle size={14} />,
    expired: <AlertTriangle size={14} />,
  };

  return (
    <div className="space-y-3">
      {expiryInfo && expiryInfo.level !== 'ok' && (
        <div className={`text-xs px-3 py-2 rounded-lg border flex items-center gap-2 ${expiryColors[expiryInfo.level]}`}>
          {expiryIcons[expiryInfo.level]}
          <span>{expiryInfo.message}</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={deployToGitHub}
          disabled={!isConfigured || status === 'deploying'}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {status === 'deploying' ? (
            <><Loader size={18} className="animate-spin" /> Publication en cours...</>
          ) : (
            <><Github size={18} /> Confirmer & Publier</>
          )}
        </button>
        <button
          onClick={testConnection}
          disabled={!isConfigured || status === 'testing'}
          className="px-3 py-3 border border-gray-700 text-gray-400 rounded-lg hover:border-gray-500 hover:text-brand-light disabled:opacity-40 transition-colors"
          title="Tester la connexion"
        >
          {status === 'testing' ? <Loader size={18} className="animate-spin" /> : <RefreshCw size={18} />}
        </button>
        <button
          onClick={() => onToggleSettings(!settingsOpen)}
          className={`px-3 py-3 border rounded-lg transition-colors ${settingsOpen ? 'border-indigo-500 text-indigo-400' : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-brand-light'}`}
          title="Paramètres GitHub"
        >
          <Settings size={18} />
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

      {expiryInfo && expiryInfo.level === 'ok' && !settingsOpen && (
        <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
          <Calendar size={12} />
          <span>{expiryInfo.message}</span>
        </div>
      )}

      {settingsOpen && (
        <div className="bg-bg-800/50 border border-gray-700 rounded-xl p-4 space-y-3">
          <h4 className="text-brand-light font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <Github size={16} /> Configuration GitHub
          </h4>

          <div className="space-y-2">
            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Token GitHub</label>
            <input
              type="password"
              value={config.token}
              onChange={e => {
                const next = { ...config, token: e.target.value, tokenSavedAt: e.target.value ? nowISO() : null };
                setConfig(next);
                saveRepoConfig(next);
              }}
              className="w-full bg-bg-900 border border-gray-700 rounded-lg p-2.5 text-gray-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Pré-configuré"
            />
            <p className="text-[10px] text-gray-600">
              Déjà pré-configuré. Modifiez seulement si le token a expiré.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Owner</label>
              <input value={config.owner} readOnly className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-400 text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Repo</label>
              <input value={config.repo} readOnly className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-400 text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Branche</label>
              <input value={config.branch} readOnly className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-400 text-sm cursor-not-allowed" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Chemin</label>
              <input value={config.filePath} readOnly className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-gray-400 text-sm cursor-not-allowed" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubPusher;
