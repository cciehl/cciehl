import mongoose from 'mongoose';

const jobLogSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  runAt: Date,
  status: String,
  outputSnippet: String,
  errorMessage: String,
}, { timestamps: true });

export const JobLog = mongoose.model('JobLog', jobLogSchema);
export type JobLogDocument = mongoose.InferSchemaType<typeof jobLogSchema>;
