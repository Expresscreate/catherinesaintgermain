import { ADMIN_CONFIG } from './admin/config';

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  GITHUB_TOKEN?: string;
  ADMIN_PASSWORD?: string;
}

interface GitHubContentResponse {
  sha?: string;
}

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

async function handleDeploy(request: Request, env: Env): Promise<Response> {
  const headers = corsHeaders();

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const body: Record<string, unknown> = await request.json();
    const password = body.password as string;
    const content = body.content as Record<string, unknown>;
    const owner = (body.owner as string) || ADMIN_CONFIG.repoOwner;
    const repo = (body.repo as string) || ADMIN_CONFIG.repoName;
    const filePath = (body.filePath as string) || ADMIN_CONFIG.filePath;
    const branch = (body.branch as string) || ADMIN_CONFIG.branch || 'main';

    const adminPassword = env.ADMIN_PASSWORD || ADMIN_CONFIG.password;
    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401, headers });
    }

    const token = env.GITHUB_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token GitHub non configuré' }), { status: 500, headers });
    }

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    const getRes = await fetch(`${baseUrl}?ref=${branch}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const data: GitHubContentResponse = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      throw new Error(`GitHub GET failed: ${getRes.status}`);
    }

    const encoder = new TextEncoder();
    const bytes = encoder.encode(JSON.stringify(content, null, 2));
    const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
    const base64Content = btoa(binary);

    const putBody: Record<string, unknown> = {
      message: ADMIN_CONFIG.commitMessage,
      content: base64Content,
      branch,
    };
    if (sha) putBody.sha = sha;

    const putRes = await fetch(baseUrl, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(putBody),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      throw new Error(`GitHub PUT failed: ${putRes.status} — ${errText}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'Déploiement GitHub déclenché !' }), { status: 200, headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return new Response(JSON.stringify({ error: message }), { status: 500, headers });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/admin') {
      return new Response(
        '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><script>location.replace("/#admin")</script></head><body>Redirection...</body></html>',
        { headers: { 'Content-Type': 'text/html' } }
      );
    }

    if (pathname === '/api/deploy') {
      return handleDeploy(request, env);
    }

    try {
      return await env.ASSETS.fetch(request);
    } catch {
      return new Response('Not Found', { status: 404 });
    }
  },
};
