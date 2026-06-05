import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import appointmentsRouter from './routes/appointments.js';
import historyRouter from './routes/history.js';
import profileRouter from './routes/profile.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'swasth-ai-backend' }));

app.use('/api/appointments', appointmentsRouter);
app.use('/api/history', historyRouter);
app.use('/api/profile', profileRouter);

app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`SwasthAI backend running on http://localhost:${PORT}`);
});
