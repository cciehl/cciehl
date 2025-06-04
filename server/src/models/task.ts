import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  code: String,
  config: mongoose.Schema.Types.Mixed,
});

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  type: String,
  freqCron: String,
  promptTemplate: String,
  variables: [String],
  platforms: [platformSchema],
  enabled: { type: Boolean, default: true },
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);
export type TaskDocument = mongoose.InferSchemaType<typeof taskSchema>;
