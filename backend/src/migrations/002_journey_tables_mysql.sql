-- journeys and journey_days tables for personalized hypnosis journey feature

CREATE TABLE IF NOT EXISTS journeys (
  id            VARCHAR(36)   NOT NULL DEFAULT (UUID()),
  user_id       VARCHAR(36)   NOT NULL,
  goal          TEXT          NOT NULL,
  intention     TEXT          NULL,
  status        VARCHAR(32)   NOT NULL DEFAULT 'creating',
  journey_data  JSON          NOT NULL DEFAULT ('{}'),
  created_at    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  KEY idx_journeys_user_id (user_id),
  CONSTRAINT fk_journeys_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS journey_days (
  id               VARCHAR(36)   NOT NULL DEFAULT (UUID()),
  journey_id       VARCHAR(36)   NOT NULL,
  day_number       TINYINT       NOT NULL,
  title            VARCHAR(255)  NOT NULL DEFAULT '',
  description      TEXT          NULL,
  script_text      LONGTEXT      NULL,
  audio_url        VARCHAR(500)  NULL,
  duration_seconds INT           NOT NULL DEFAULT 0,
  completed        TINYINT(1)    NOT NULL DEFAULT 0,
  completed_at     DATETIME(3)   NULL,
  created_at       DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_journey_day (journey_id, day_number),
  CONSTRAINT fk_journey_days_journey FOREIGN KEY (journey_id) REFERENCES journeys(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
