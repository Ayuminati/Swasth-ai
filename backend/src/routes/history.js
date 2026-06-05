import { Router } from 'express';
import { db } from '../config/firebase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const snap = await db
      .collection(`users/${req.uid}/symptomHistory`)
      .orderBy('date', 'desc')
      .limit(20)
      .get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { symptoms, result, urgency } = req.body;
    if (!symptoms || !result || !urgency) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const ref = await db.collection(`users/${req.uid}/symptomHistory`).add({
      symptoms,
      result,
      urgency,
      date: new Date().toISOString(),
    });
    const snap = await ref.get();
    res.status(201).json({ id: ref.id, ...snap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
