/* Records an NDA acceptance and emails the founder that someone opened the
   dataroom. Per the founder (2026-08-06) there is no server-side document
   gate any more — the NDA form is a record-and-notify step, not a lock.
   Email goes out via Resend when RESEND_API_KEY is set in Vercel; without
   the key, every acceptance is still visible in the Vercel function logs. */

const NOTIFY_TO = 'johannes@getluckygolfclub.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, company } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const record = {
    event: 'nda_accepted', name, email, company: company || null,
    ip: req.headers['x-forwarded-for'] || null,
    userAgent: req.headers['user-agent'] || null,
    at: new Date().toISOString()
  };
  console.log(JSON.stringify(record));

  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Get Lucky Dataroom <onboarding@resend.dev>',
          to: [NOTIFY_TO],
          subject: `Dataroom opened: ${name}${company ? ' — ' + company : ''}`,
          text: [
            `Someone just accepted the NDA and opened the investor dataroom.`,
            ``,
            `Name:     ${name}`,
            `Email:    ${email}`,
            `Company:  ${company || '—'}`,
            `When:     ${record.at}`,
            `IP:       ${record.ip || 'unknown'}`,
            `Browser:  ${record.userAgent || 'unknown'}`
          ].join('\n')
        })
      });
      if (!r.ok) console.error('notify email failed', r.status, await r.text());
    } catch (err) {
      console.error('notify email failed', err);
    }
  } else {
    console.warn('RESEND_API_KEY not set — dataroom-open email not sent; acceptance is in this log only');
  }

  /* The visitor is never blocked on the notification. */
  return res.status(200).json({ ok: true });
}
