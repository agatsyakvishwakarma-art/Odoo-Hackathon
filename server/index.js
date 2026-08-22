require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const tripsRouter = require('./routes/trips');
const stopsRouter = require('./routes/stops');

const app = express();
const PORT = process.env.PORT || 3001;

const FRONTEND_ORIGIN = 'http://localhost:5173';

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/ping', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/trips', tripsRouter);
app.use('/trips/:tripId/stops', stopsRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GlobeTrotter API listening on http://0.0.0.0:${PORT}`);
});
