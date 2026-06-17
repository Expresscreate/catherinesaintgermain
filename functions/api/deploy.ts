export async function onRequest(context) {
  if (context.request.method === 'GET') {
    return new Response(JSON.stringify({ status: 'ok', message: 'API deploy prête' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' },
    });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Méthode non autorisée' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body = await context.request.json();
    const password = body.password;
    const content = body.content;
    const owner = body.owner || 'Expresscreate';
    const repo = body.repo || 'catherinestgermain';
    const filePath = body.filePath || 'src/data/content.json';
    const branch = body.branch || 'main';

    const adminPassword = context.env.ADMIN_PASSWORD || 'catherineadmin2026';
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

    let sha;
    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
    } else if (getRes.status !== 404) {
      throw new Error(`GitHub GET failed: ${getRes.status}`);
    }

    const base64Content = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));

    const putBody = {
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
    return new Response(JSON.stringify({ error: err.message || 'Erreur inconnue' }), { status: 500, headers });
  }
}
