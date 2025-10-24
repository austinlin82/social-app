import { Router } from 'express';
import { getProfile, getUsers } from '../services/userService';

const router = Router();

router.get('/profile', async (req, res) => {
  try {
    const user = await getProfile();
    res.json(user);
  } catch (err: any) {
    res.status(502).json({ error: err?.message || 'Upstream error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const page = parseInt(String(req.query.page || '1'), 10) || 1;
    const results = parseInt(String(req.query.results || '20'), 10) || 20;
    const data = await getUsers(page, results);
    res.json(data);
  } catch (err: any) {
    res.status(502).json({ error: err?.message || 'Upstream error' });
  }
});

export default router;
