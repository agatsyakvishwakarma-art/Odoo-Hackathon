const express = require('express');
const pool = require('../db');
const authenticate = require('../middleware/auth');
const { requireTripMember } = require('../middleware/tripMembership');

const router = express.Router({ mergeParams: true });

const STOP_SELECT = `
  s.id,
  s.city,
  to_char(s.arrival_date, 'YYYY-MM-DD') AS "arrivalDate",
  to_char(s.departure_date, 'YYYY-MM-DD') AS "departureDate",
  s.sequence
`;

function formatStop(row) {
  return {
    id: row.id,
    city: row.city,
    arrivalDate: row.arrivalDate,
    departureDate: row.departureDate,
    sequence: row.sequence,
  };
}

router.use(authenticate);
router.use(requireTripMember);

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${STOP_SELECT}
       FROM stops s
       WHERE s.trip_id = $1
       ORDER BY s.sequence ASC`,
      [req.params.tripId]
    );

    res.json({ stops: rows.map(formatStop) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stops' });
  }
});

router.post('/', async (req, res) => {
  const { city, arrivalDate, departureDate, sequence } = req.body;

  if (!city || !arrivalDate || !departureDate || sequence === undefined) {
    return res
      .status(400)
      .json({ error: 'city, arrivalDate, departureDate, and sequence are required' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO stops (trip_id, city, arrival_date, departure_date, sequence)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, city,
         to_char(arrival_date, 'YYYY-MM-DD') AS "arrivalDate",
         to_char(departure_date, 'YYYY-MM-DD') AS "departureDate",
         sequence`,
      [req.params.tripId, city, arrivalDate, departureDate, sequence]
    );

    res.status(201).json({ stop: formatStop(rows[0]) });
  } catch (err) {
    if (err.code === '23514') {
      return res.status(400).json({ error: 'departureDate must be on or after arrivalDate' });
    }
    if (err.code === '23505') {
      return res.status(409).json({ error: 'A stop with this sequence already exists for this trip' });
    }
    return res.status(500).json({ error: 'Failed to create stop' });
  }
});

router.get('/:stopId', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${STOP_SELECT}
       FROM stops s
       WHERE s.id = $1 AND s.trip_id = $2`,
      [req.params.stopId, req.params.tripId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    res.json({ stop: formatStop(rows[0]) });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stop' });
  }
});

router.put('/:stopId', async (req, res) => {
  const { city, arrivalDate, departureDate, sequence } = req.body;

  if (!city || !arrivalDate || !departureDate || sequence === undefined) {
    return res
      .status(400)
      .json({ error: 'city, arrivalDate, departureDate, and sequence are required' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE stops
       SET city = $1, arrival_date = $2, departure_date = $3, sequence = $4
       WHERE id = $5 AND trip_id = $6
       RETURNING id, city,
         to_char(arrival_date, 'YYYY-MM-DD') AS "arrivalDate",
         to_char(departure_date, 'YYYY-MM-DD') AS "departureDate",
         sequence`,
      [city, arrivalDate, departureDate, sequence, req.params.stopId, req.params.tripId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    res.json({ stop: formatStop(rows[0]) });
  } catch (err) {
    if (err.code === '23514') {
      return res.status(400).json({ error: 'departureDate must be on or after arrivalDate' });
    }
    if (err.code === '23505') {
      return res.status(409).json({ error: 'A stop with this sequence already exists for this trip' });
    }
    return res.status(500).json({ error: 'Failed to update stop' });
  }
});

router.delete('/:stopId', async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM stops WHERE id = $1 AND trip_id = $2',
      [req.params.stopId, req.params.tripId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Stop not found' });
    }

    res.json({ message: 'Stop deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete stop' });
  }
});

module.exports = router;
