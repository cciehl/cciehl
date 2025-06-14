import schedule from 'node-schedule';
import { Task } from '../models/task';
import { executeTask } from './taskRunner';

const jobs = new Map<string, schedule.Job>();

export async function loadTasks() {
  const tasks = await Task.find({ enabled: true });
  tasks.forEach(t => scheduleTask(t.id.toString(), t.freqCron));
}

export function scheduleTask(id: string, cron: string) {
  cancelTask(id);
  const job = schedule.scheduleJob(cron, () => executeTask(id));
  jobs.set(id, job);
}

export function cancelTask(id: string) {
  const job = jobs.get(id);
  if (job) job.cancel();
  jobs.delete(id);
}
