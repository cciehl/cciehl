import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  service: { type: String, required: true },
  apiKeyEncrypted: { type: String, required: true },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export type UserDocument = mongoose.InferSchemaType<typeof userSchema>;
