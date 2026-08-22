require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRouter = require('./routes/auth');
const tripsRouter = require('./routes/trips');
const stopsRouter = require('./routes/stops');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/trips', tripsRouter);
app.use('/trips/:tripId/stops', stopsRouter);

app.listen(PORT, () => {
  console.log(`GlobeTrotter API listening on http://localhost:${PORT}`);
});
