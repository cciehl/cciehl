import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.json([
    { code: 'csdn', name: 'CSDN' },
    { code: 'wechat', name: '微信公众号' },
  ]);
});

export default router;
