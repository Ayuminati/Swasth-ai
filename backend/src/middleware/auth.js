import { adminAuth } from '../config/firebase.js';

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing auth token' });
  }
  try {
    const decoded = await adminAuth.verifyIdToken(header.slice(7));
    req.uid = decoded.uid;
    req.phone = decoded.phone_number;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
