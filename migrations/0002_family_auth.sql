CREATE TABLE IF NOT EXISTS families (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  parent_pin_hash TEXT,
  parent_pin_salt TEXT,
  parent_pin_iterations INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS family_users (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  password_iterations INTEGER NOT NULL,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (id, family_id),
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_family_users_family ON family_users(family_id);

CREATE TABLE IF NOT EXISTS family_sessions (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  active_child_id TEXT,
  parent_unlocked_until TEXT,
  parent_capability_hash TEXT,
  child_capability_hash TEXT,
  child_capability_expires_at TEXT,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  last_seen_at TEXT NOT NULL,
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id, family_id) REFERENCES family_users(id, family_id) ON DELETE CASCADE,
  FOREIGN KEY (active_child_id, family_id) REFERENCES child_profiles(id, family_id)
);

CREATE INDEX IF NOT EXISTS idx_family_sessions_expiry ON family_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_family_sessions_family ON family_sessions(family_id);

CREATE TABLE IF NOT EXISTS child_profiles (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL,
  legacy_profile_id TEXT,
  profile_name TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 0,
  payload_json TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  child_pin_hash TEXT,
  child_pin_salt TEXT,
  child_pin_iterations INTEGER,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  UNIQUE (family_id, legacy_profile_id),
  UNIQUE (id, family_id)
);

CREATE INDEX IF NOT EXISTS idx_child_profiles_family ON child_profiles(family_id, updated_at);

CREATE TABLE IF NOT EXISTS family_profile_events (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL,
  child_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  idempotency_key TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (child_id, family_id) REFERENCES child_profiles(id, family_id) ON DELETE CASCADE,
  UNIQUE (family_id, child_id, idempotency_key)
);

CREATE INDEX IF NOT EXISTS idx_family_profile_events_child
  ON family_profile_events(family_id, child_id, created_at);

CREATE TABLE IF NOT EXISTS profile_migration_log (
  id TEXT PRIMARY KEY,
  family_id TEXT NOT NULL,
  child_id TEXT NOT NULL,
  source_kind TEXT NOT NULL,
  source_id TEXT NOT NULL,
  source_checksum TEXT NOT NULL,
  record_counts_json TEXT NOT NULL,
  migrated_at TEXT NOT NULL,
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (child_id, family_id) REFERENCES child_profiles(id, family_id) ON DELETE CASCADE,
  UNIQUE (source_kind, source_id)
);

CREATE TABLE IF NOT EXISTS auth_rate_limits (
  id TEXT PRIMARY KEY,
  failure_count INTEGER NOT NULL DEFAULT 0,
  window_started_at TEXT NOT NULL,
  locked_until TEXT,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_auth_rate_limits_updated ON auth_rate_limits(updated_at);
