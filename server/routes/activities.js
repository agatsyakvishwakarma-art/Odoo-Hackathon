const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/auth');
const { requireTripMember } = require('../middleware/tripMembership');

const router = express.Router({ mergeParams: true });

const ACTIVITY_CATEGORIES = ['transport', 'stay', 'activities', 'meals'];

function formatActivity(row) {
  return {
    id: row.id,
    stopId: row.stopId,
    name: row.name,
    category: row.category,
    cost: Number(row.cost),
    durationMinutes: row.durationMinutes,
    notes: row.notes,
  };
}

router.use(authenticate);
router.use(requireTripMember);

async function requireStopOnTrip(req, res) {
  const stopId = Number(req.params.stopId);
  const tripId = Number(req.params.tripId);
  const { rows } = await pool.query(
    'SELECT id FROM stops WHERE id = $1 AND trip_id = $2',
    [stopId, tripId]
  );
  if (rows.length === 0) {
    res.status(404).json({ error: 'Stop not found' });
    return null;
  }
  return stopId;
}

router.get('/', async (req, res) => {
  try {
    const stopId = await requireStopOnTrip(req, res);
    if (stopId === null) return;

    const { rows } = await pool.query(
      `SELECT id, stop_id AS "stopId", name, category, cost,
              duration_minutes AS "durationMinutes", notes
       FROM activities
       WHERE stop_id = $1
       ORDER BY id ASC`,
      [stopId]
    );

    res.json({ activities: rows.map(formatActivity) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

router.post('/', async (req, res) => {
  const { name, category, cost, durationMinutes, notes } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'name and category are required' });
  }
  if (!ACTIVITY_CATEGORIES.includes(category)) {
    return res.status(400).json({
      error: 'category must be one of: transport, stay, activities, meals',
    });
  }

  try {
    const stopId = await requireStopOnTrip(req, res);
    if (stopId === null) return;

    const { rows } = await pool.query(
      `INSERT INTO activities (stop_id, name, category, cost, duration_minutes, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, stop_id AS "stopId", name, category, cost,
                 duration_minutes AS "durationMinutes", notes`,
      [
        stopId,
        name,
        category,
        cost === undefined || cost === '' ? 0 : Number(cost),
        durationMinutes === undefined || durationMinutes === '' ? null : Number(durationMinutes),
        notes ?? null,
      ]
    );

    res.status(201).json({ activity: formatActivity(rows[0]) });
  } catch {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

module.exports = router;
