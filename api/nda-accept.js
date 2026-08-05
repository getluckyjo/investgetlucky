/* Records an NDA acceptance and issues the signed cookie the middleware checks.
   The record is what makes the "we keep a record of who accepted" claim true —
   it is logged server-side, not left in the visitor's own localStorage. */
import crypto from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const secret = process.env.NDA_SECRET;
  if (!secret) return res.status(503).json({ error: 'Not configured' });

  const { name, email, company } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  /* Audit record. Wire this to a store (Vercel KV, Sheets, email) before launch —
     until it is wired, acceptances are only in the platform request log. */
  console.log(JSON.stringify({
    event: 'nda_accepted', name, email, company: company || null,
    ip: req.headers['x-forwarded-for'] || null,
    userAgent: req.headers['user-agent'] || null,
    at: new Date().toISOString()
  }));

  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex');

  res.setHeader('Set-Cookie', [
    `gl_nda=${payload}.${sig}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`
  ]);
  return res.status(200).json({ ok: true });
}
