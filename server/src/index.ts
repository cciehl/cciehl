import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import configRoutes from './routes/config';
import tasksRoutes from './routes/tasks';
import platformsRoutes from './routes/platforms';
import { loadTasks } from './services/scheduler';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/config', configRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/platforms', platformsRoutes);

const PORT = process.env.PORT || 3000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/automation';

async function start() {
  await mongoose.connect(MONGO);
  await loadTasks();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

start().catch(err => {
  console.error(err);
});
