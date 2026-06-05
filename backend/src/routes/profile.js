import { Router } from 'express';
import { db } from '../config/firebase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const doc = await db.doc(`users/${req.uid}/profile/data`).get();
    if (!doc.exists) return res.json(null);
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    const { name, age, bloodGroup, allergies, emergencyContacts } = req.body;
    const data = {
      name: name || '',
      age: age || '',
      bloodGroup: bloodGroup || '',
      allergies: allergies || '',
      emergencyContacts: emergencyContacts || [],
      phone: req.phone || '',
      updatedAt: new Date().toISOString(),
    };
    await db.doc(`users/${req.uid}/profile/data`).set(data, { merge: true });
    const doc = await db.doc(`users/${req.uid}/profile/data`).get();
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
