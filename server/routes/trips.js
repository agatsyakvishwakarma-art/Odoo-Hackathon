const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/auth');
const { requireTripMember, requireOwner } = require('../middleware/tripMembership');

const router = express.Router();

const TRIP_SELECT = `
  t.id,
  t.name,
  to_char(t.start_date, 'YYYY-MM-DD') AS "startDate",
  to_char(t.end_date, 'YYYY-MM-DD') AS "endDate",
  t.description,
  t.created_by AS "createdBy"
`;

function formatTrip(row, role) {
  const trip = {
    id: row.id,
    name: row.name,
    startDate: row.startDate,
    endDate: row.endDate,
    description: row.description,
    createdBy: row.createdBy,
  };
  if (role !== undefined) {
    trip.role = role;
  }
  return trip;
}

router.use(authenticate);

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${TRIP_SELECT}, tm.role
       FROM trips t
       JOIN trip_members tm ON tm.trip_id = t.id
       WHERE tm.user_id = $1
       ORDER BY t.created_at DESC`,
      [req.user.id]
    );

    res.json({ trips: rows.map((row) => formatTrip(row, row.role)) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

router.post('/', async (req, res) => {
  const { name, startDate, endDate, description } = req.body;

  if (!name || !startDate || !endDate) {
    return res.status(400).json({ error: 'name, startDate, and endDate are required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const tripResult = await client.query(
      `INSERT INTO trips (name, start_date, end_date, description, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name,
         to_char(start_date, 'YYYY-MM-DD') AS "startDate",
         to_char(end_date, 'YYYY-MM-DD') AS "endDate",
         description,
         created_by AS "createdBy"`,
      [name, startDate, endDate, description ?? null, req.user.id]
    );

    const tripRow = tripResult.rows[0];

    await client.query(
      'INSERT INTO trip_members (trip_id, user_id, role) VALUES ($1, $2, $3)',
      [tripRow.id, req.user.id, 'owner']
    );

    await client.query('COMMIT');
    res.status(201).json({ trip: formatTrip(tripRow) });
  } catch (err) {
    await client.query('ROLLBACK');
    if (err.code === '23514') {
      return res.status(400).json({ error: 'endDate must be on or after startDate' });
    }
    return res.status(500).json({ error: 'Failed to create trip' });
  } finally {
    client.release();
  }
});

router.get('/:tripId', requireTripMember, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${TRIP_SELECT} FROM trips t WHERE t.id = $1`,
      [req.params.tripId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ trip: formatTrip(rows[0], req.tripRole) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
});

router.put('/:tripId', requireTripMember, async (req, res) => {
  const { name, startDate, endDate, description } = req.body;

  if (!name || !startDate || !endDate) {
    return res.status(400).json({ error: 'name, startDate, and endDate are required' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE trips
       SET name = $1, start_date = $2, end_date = $3, description = $4
       WHERE id = $5
       RETURNING id, name,
         to_char(start_date, 'YYYY-MM-DD') AS "startDate",
         to_char(end_date, 'YYYY-MM-DD') AS "endDate",
         description,
         created_by AS "createdBy"`,
      [name, startDate, endDate, description ?? null, req.params.tripId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ trip: formatTrip(rows[0], req.tripRole) });
  } catch (err) {
    if (err.code === '23514') {
      return res.status(400).json({ error: 'endDate must be on or after startDate' });
    }
    return res.status(500).json({ error: 'Failed to update trip' });
  }
});

router.delete('/:tripId', requireTripMember, requireOwner, async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM trips WHERE id = $1', [
      req.params.tripId,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
});

module.exports = router;
