interface Env {
  ASSETS: Fetcher;
  CONTENT: KVNamespace;
  ADMIN_PASSWORD?: string;
}

const ADMIN_PWD = 'catherineadmin2026';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/content' && request.method === 'GET') {
      return handleGetContent(env);
    }

    if (url.pathname === '/api/deploy' && request.method === 'POST') {
      return handleDeploy(request, env);
    }

    if (url.pathname === '/admin') {
      return Response.redirect(`${url.origin}/#admin`, 302);
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleGetContent(env: Env): Promise<Response> {
  try {
    const stored = await env.CONTENT.get('content', 'text');
    return new Response(stored || JSON.stringify({}), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erreur de lecture KV' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

async function handleDeploy(request: Request, env: Env): Promise<Response> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const body: Record<string, unknown> = await request.json();
    const password = body.password as string;
    const content = body.content as Record<string, unknown>;

    const adminPassword = env.ADMIN_PASSWORD || ADMIN_PWD;
    if (password !== adminPassword) {
      return new Response(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401, headers });
    }

    await env.CONTENT.put('content', JSON.stringify(content));

    return new Response(JSON.stringify({ success: true, message: 'Contenu publié en direct !' }), { status: 200, headers });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur inconnue';
    return new Response(JSON.stringify({ error: message }), { status: 500, headers });
  }
}
