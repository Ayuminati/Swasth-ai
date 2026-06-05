import { Router } from 'express';
import { db } from '../config/firebase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const snap = await db
      .collection(`users/${req.uid}/appointments`)
      .orderBy('createdAt', 'desc')
      .get();
    res.json(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { doctorName, facility, date, time, patientName, phone, reason } = req.body;
    if (!doctorName || !date || !time || !patientName || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const ref = await db.collection(`users/${req.uid}/appointments`).add({
      doctorName,
      facility: facility || '',
      date,
      time,
      patientName,
      phone,
      reason: reason || '',
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    });
    const snap = await ref.get();
    res.status(201).json({ id: ref.id, ...snap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db
      .doc(`users/${req.uid}/appointments/${req.params.id}`)
      .update({ status: 'cancelled' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
