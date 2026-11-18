// Cloudflare Pages Function — GET /api/instagram
// Unified Login system-user tokens use the Facebook Graph API.
const GRAPH_API = 'https://graph.facebook.com/v25.0';
const HEADERS = { 'Cache-Control': 'public, max-age=300, s-maxage=300' };

export async function onRequestGet({ request, env }) {
  const token = env.INSTAGRAM_ACCESS_TOKEN;
  const userId = env.INSTAGRAM_USER_ID;
  if (!token || !userId) {
    return Response.json({ configured: false, posts: [], nextCursor: null }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const cursor = new URL(request.url).searchParams.get('after');
  if (cursor && (cursor.length > 2048 || !/^[\w=-]+$/.test(cursor))) {
    return Response.json({ error: 'Invalid pagination cursor.' }, { status: 400 });
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{media_type,media_url,thumbnail_url}';
  const url = new URL(`${GRAPH_API}/${encodeURIComponent(userId)}/media`);
  url.searchParams.set('fields', fields);
  url.searchParams.set('limit', '24');
  if (cursor) url.searchParams.set('after', cursor);

  try {
    const upstream = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!upstream.ok) {
      // Never log tokens, upstream URLs or response bodies.
      console.error('Instagram Graph API request failed:', upstream.status);
      return Response.json({ configured: true, posts: [], error: 'Instagram feed unavailable.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }
    const data = await upstream.json();
    const posts = (Array.isArray(data.data) ? data.data : []).map(post => {
      const child = post.children?.data?.[0];
      const image = post.media_type === 'VIDEO'
        ? post.thumbnail_url || null
        : post.media_url || child?.thumbnail_url || child?.media_url || null;
      return { id: post.id, image, caption: post.caption || '', permalink: post.permalink || '', timestamp: post.timestamp || '' };
    }).filter(post => post.id && post.image && post.permalink);

    return Response.json({ configured: true, posts, nextCursor: data.paging?.next ? (data.paging?.cursors?.after || null) : null }, { headers: HEADERS });
  } catch (error) {
    console.error('Instagram feed fetch failed:', error?.name || 'unknown');
    return Response.json({ configured: true, posts: [], error: 'Instagram feed unavailable.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
