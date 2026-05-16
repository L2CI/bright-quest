CREATE TABLE IF NOT EXISTS app_profiles (
  id TEXT PRIMARY KEY,
  app_id TEXT NOT NULL,
  profile_id TEXT NOT NULL,
  profile_name TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 0,
  payload_json TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_app_profiles_app_id ON app_profiles (app_id);
CREATE INDEX IF NOT EXISTS idx_app_profiles_updated_at ON app_profiles (updated_at);

CREATE TABLE IF NOT EXISTS app_events (
  id TEXT PRIMARY KEY,
  app_id TEXT NOT NULL,
  profile_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_app_events_profile ON app_events (app_id, profile_id, created_at);
