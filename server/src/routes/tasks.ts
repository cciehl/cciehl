import { Router } from 'express';
import { Task } from '../models/task';
import { scheduleTask, cancelTask } from '../services/scheduler';
import { executeTask } from '../services/taskRunner';

const router = Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  if (task.enabled && task.freqCron) {
    scheduleTask(task.id.toString(), task.freqCron);
  }
  res.json({ id: task.id });
});

router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.sendStatus(404);
  if (task.enabled && task.freqCron) {
    scheduleTask(task.id.toString(), task.freqCron);
  } else {
    cancelTask(task.id.toString());
  }
  res.json({ success: true });
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  cancelTask(req.params.id);
  res.json({ success: true });
});

router.post('/:id/execute', async (req, res) => {
  await executeTask(req.params.id);
  res.json({ success: true });
});

export default router;
