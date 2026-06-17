interface Env {
  GITHUB_TOKEN?: string;
  ADMIN_PASSWORD?: string;
}

const REPO_OWNER = 'Expresscreate';
const REPO_NAME = 'catherinestgermain';
const FILE_PATH = 'src/data/content.json';
const COMMIT_MESSAGE = 'Mise à jour du contenu via admin panel';
const DEFAULT_PASSWORD = 'catherineadmin2026';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  try {
    const body: Record<string, unknown> = await context.request.json();
    const password = body.password as string;
    const content = body.content as Record<string, unknown>;
    const owner = (body.owner as string) || REPO_OWNER;
    const repo = (body.repo as string) || REPO_NAME;
    const filePath = (body.filePath as string) || FILE_PATH;
    const branch = (body.branch as string) || 'main';

    const adminPassword = context.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401, headers });
    }

    const token = context.env.GITHUB_TOKEN;
    if (!token) {
      return new Response(JSON.stringify({ error: 'Token GitHub non configuré' }), { status: 500, headers });
    }

    const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;

    const getRes = await fetch(`${baseUrl}?ref=${branch}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
    });

    let sha: string | undefined;
    if (getRes.ok) {
      const data = await getRes.json() as { sha?: string };
      sha = data.sha;
    } else if (getRes.status !== 404) {
      throw new Error(`GitHub GET failed: ${getRes.status}`);
    }

    const encoder = new TextEncoder();
    const bytes = encoder.encode(JSON.stringify(content, null, 2));
    const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join('');
    const base64Content = btoa(binary);

    const putBody: Record<string, unknown> = {
      message: COMMIT_MESSAGE,
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
};
