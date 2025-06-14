import { Router } from 'express';
import { User } from '../models/user';

const router = Router();

router.post('/', async (req, res) => {
  const { service, apiKey } = req.body;
  const user = await User.create({ service, apiKeyEncrypted: apiKey });
  res.json({ success: true, id: user.id });
});

export default router;
