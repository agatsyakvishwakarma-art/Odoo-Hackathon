const pool = require('../db');

async function requireTripMember(req, res, next) {
  const tripId = Number(req.params.tripId);
  if (!Number.isInteger(tripId) || tripId <= 0) {
    return res.status(400).json({ error: 'Invalid trip ID' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT role FROM trip_members WHERE trip_id = $1 AND user_id = $2',
      [tripId, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(403).json({ error: 'You are not a member of this trip' });
    }

    req.tripRole = rows[0].role;
    next();
  } catch {
    return res.status(500).json({ error: 'Failed to verify trip membership' });
  }
}

function requireOwner(req, res, next) {
  if (req.tripRole !== 'owner') {
    return res.status(403).json({ error: 'Owner access required' });
  }
  next();
}

module.exports = { requireTripMember, requireOwner };
