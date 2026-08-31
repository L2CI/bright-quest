-- Learning evidence is retained in the game snapshot (up to 100 expeditions).
-- Receipts are permanent for the lifetime of the child profile, not an expiring cache.
CREATE TABLE IF NOT EXISTS beacon_brigade_states (
  family_id TEXT NOT NULL,
  child_id TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 0 CHECK (version >= 0),
  state_json TEXT NOT NULL CHECK (json_valid(state_json)),
  last_operation_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (family_id, child_id),
  FOREIGN KEY (child_id, family_id) REFERENCES child_profiles(id, family_id) ON DELETE CASCADE,
  CHECK (json_extract(state_json, '$.version') = version),
  CHECK (json_extract(state_json, '$.profileId') = child_id)
);

CREATE TABLE IF NOT EXISTS beacon_brigade_operations (
  family_id TEXT NOT NULL,
  child_id TEXT NOT NULL,
  operation_id TEXT NOT NULL,
  request_hash TEXT NOT NULL,
  expected_version INTEGER NOT NULL CHECK (expected_version >= 0),
  result_version INTEGER NOT NULL CHECK (result_version = expected_version + 1),
  feedback_json TEXT NOT NULL CHECK (json_valid(feedback_json)),
  created_at TEXT NOT NULL,
  PRIMARY KEY (family_id, child_id, operation_id),
  UNIQUE (family_id, child_id, result_version),
  FOREIGN KEY (family_id, child_id) REFERENCES beacon_brigade_states(family_id, child_id) ON DELETE CASCADE
);
