CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE trips (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  start_date  DATE         NOT NULL,
  end_date    DATE         NOT NULL,
  description TEXT,
  created_by  INTEGER      NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  CHECK (end_date >= start_date)
);

CREATE TABLE trip_members (
  trip_id  INTEGER     NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  user_id  INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role     VARCHAR(20) NOT NULL CHECK (role IN ('owner', 'editor')),
  PRIMARY KEY (trip_id, user_id)
);

CREATE TABLE stops (
  id              SERIAL PRIMARY KEY,
  trip_id         INTEGER      NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  city            VARCHAR(255) NOT NULL,
  arrival_date    DATE         NOT NULL,
  departure_date  DATE         NOT NULL,
  sequence        INTEGER      NOT NULL,
  CHECK (departure_date >= arrival_date),
  UNIQUE (trip_id, sequence)
);

CREATE TABLE activities (
  id               SERIAL PRIMARY KEY,
  stop_id          INTEGER        NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
  name             VARCHAR(255)   NOT NULL,
  category         VARCHAR(20)    NOT NULL
                     CHECK (category IN ('transport', 'stay', 'activities', 'meals')),
  cost             DECIMAL(10, 2) NOT NULL DEFAULT 0,
  duration_minutes INTEGER,
  notes            TEXT
);

CREATE INDEX idx_trip_members_user_id  ON trip_members (user_id);
CREATE INDEX idx_stops_trip_id         ON stops (trip_id);
CREATE INDEX idx_activities_stop_id    ON activities (stop_id);
CREATE INDEX idx_activities_category   ON activities (category);
