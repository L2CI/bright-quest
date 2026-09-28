-- Password recovery tokens are purpose-bound and separate from parent PINs.
CREATE TABLE IF NOT EXISTS family_password_recovery (
  token_hash TEXT PRIMARY KEY,
  family_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  claim_nonce TEXT,
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id, family_id) REFERENCES family_users(id, family_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_family_password_recovery_family
  ON family_password_recovery(family_id, expires_at);

CREATE INDEX IF NOT EXISTS idx_family_password_recovery_expiry
  ON family_password_recovery(expires_at);
