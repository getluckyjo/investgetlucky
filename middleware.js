/* Vercel Edge Middleware — gates the confidential documents.
   Before this existed the NDA was cosmetic: /assets/docs/* was fetchable at its
   direct URL by anyone, and acceptance was only ever written to the visitor's
   own localStorage, so the company held no record of who signed.
   The gate checks a signed cookie issued by /api/nda-accept. */
export const config = { matcher: '/assets/docs/:path*' };

const enc = new TextEncoder();

async function verify(token, secret) {
  if (!token || !token.includes('.')) return false;
  const [payload, sig] = token.split('.');
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const expected = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const expectedHex = [...new Uint8Array(expected)]
    .map((b) => b.toString(16).padStart(2, '0')).join('');
  if (expectedHex.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= expectedHex.charCodeAt(i) ^ sig.charCodeAt(i);
  if (diff !== 0) return false;
  try {
    const { exp } = JSON.parse(atob(payload));
    return typeof exp === 'number' && Date.now() < exp;
  } catch { return false; }
}

export default async function middleware(request) {
  const secret = process.env.NDA_SECRET;
  if (!secret) {
    /* Fail closed: an unconfigured secret must not silently publish the documents. */
    return new Response('Dataroom access is not configured. Contact johannes@getluckygolfclub.com.', {
      status: 503, headers: { 'content-type': 'text/plain' }
    });
  }
  const token = request.cookies.get('gl_nda')?.value;
  if (await verify(token, secret)) return;
  const url = new URL('/dataroom.html', request.url);
  url.searchParams.set('need-nda', '1');
  return Response.redirect(url, 302);
}
