export const onRequestGet: PagesFunction = async () => {
  const html = '<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><script>location.replace("/#admin")</script></head><body>Redirection vers l\'administration...</body></html>';
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
};
