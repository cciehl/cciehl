import { Task } from '../models/task';
import { JobLog } from '../models/jobLog';
import { generateContent } from './openai';

export async function executeTask(id: string) {
  const task = await Task.findById(id);
  if (!task) return;

  const prompt = task.promptTemplate || '';
  const runAt = new Date();
  try {
    const output = await generateContent(prompt);
    await JobLog.create({
      taskId: task.id,
      runAt,
      status: 'success',
      outputSnippet: output.slice(0, 200),
    });
  } catch (err: any) {
    await JobLog.create({
      taskId: task.id,
      runAt,
      status: 'failed',
      errorMessage: err.message,
    });
  }
}
