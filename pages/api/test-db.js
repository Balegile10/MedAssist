import { getClient } from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    // Debug logs to verify env var visibility at request time (masked)
    try {
      const hasUri = !!process.env.MONGODB_URI;
      const masked = hasUri ? process.env.MONGODB_URI.slice(0, 30) + '...' : 'MISSING';
      console.log('DEBUG: MONGODB_URI present?', hasUri);
      console.log('DEBUG: MONGODB_URI (masked):', masked);
    } catch (logErr) {
      console.error('DEBUG: failed to read MONGODB_URI', logErr);
    }

    const client = await getClient();
    const db = client.db("medassist"); // your DB name
    const collections = await db.listCollections().toArray(); // list all collections
    res.status(200).json({ collections });
  } catch (e) {
    console.error('API /api/test-db error:', e && e.stack ? e.stack : e);
    res.status(500).json({ error: e.message, stack: e.stack });
  }
}
