# Content Automation Server

This directory contains a minimal Node.js + Express backend implementing the API described in the requirements document. It includes MongoDB models, task scheduling with node-schedule and basic OpenAI integration.

To run in development:

```bash
npm install
npm run dev
```

Environment variables:

- `OPENAI_API_KEY` – API key for OpenAI
- `MONGO_URI` – MongoDB connection string (defaults to local instance)
- `PORT` – HTTP port (default 3000)
```
