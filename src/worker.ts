interface Env {
  ASSETS: Fetcher;
  GITHUB_TOKEN?: string;
  ADMIN_PASSWORD?: string;
}

const ADMIN_PWD = 'catherineadmin2026';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/deploy' && request.method === 'POST') {
      return handleDeploy(request, env);
    }

    if (url.pathname === '/admin') {
      return Response.redirect(`${url.origin}/#admin`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleDeploy(request: Request, env: Env): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body: Record<string, unknown> = await request.json();
    const password = body.password as string;
    const content = body.content as Record<string, unknown>;
    const owner = (body.owner as string) || 'Expresscreate';
    const repo = (body.repo as string) || 'catherinesaintgermain';
    const filePath = (body.filePath as string) || 'src/data/content.json';
    const branch = (body.branch as string) || 'main';

    const adminPassword = env.ADMIN_PASSWORD || ADMIN_PWD;
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
      const data: { sha?: string } = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      throw new Error(`GitHub GET failed: ${getRes.status}`);
    }

    const base64Content = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));

    const putBody: Record<string, unknown> = {
      message: 'Mise à jour du contenu via admin panel',
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
