-- ============================================================
-- Divorced Dads — Base Schema (MySQL)
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id            VARCHAR(36)   NOT NULL DEFAULT (UUID()),
  email         VARCHAR(255)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,
  name          VARCHAR(255)  NULL,
  phone         VARCHAR(50)   NULL,
  created_at    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at    DATETIME(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS profiles (
  id                       VARCHAR(36)  NOT NULL DEFAULT (UUID()),
  user_id                  VARCHAR(36)  NOT NULL,
  display_name             VARCHAR(255) NULL,
  bio                      TEXT         NULL,
  avatar_url               VARCHAR(500) NULL,
  timezone                 VARCHAR(100) NULL,
  notification_preferences JSON         NULL,
  onboarding_completed     TINYINT(1)   NOT NULL DEFAULT 0,
  onboarding_data          JSON         NULL,
  created_at               DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at               DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_profiles_user (user_id),
  CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_stats (
  id                    VARCHAR(36) NOT NULL DEFAULT (UUID()),
  user_id               VARCHAR(36) NOT NULL,
  current_streak        INT         NOT NULL DEFAULT 0,
  longest_streak        INT         NOT NULL DEFAULT 0,
  last_session_date     DATE        NULL,
  last_active_at        DATETIME(3) NULL,
  total_minutes_listened INT        NOT NULL DEFAULT 0,
  total_sessions        INT         NOT NULL DEFAULT 0,
  created_at            DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at            DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_user_stats_user (user_id),
  CONSTRAINT fk_user_stats_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS programs (
  id          VARCHAR(36)  NOT NULL,
  name        VARCHAR(255) NOT NULL,
  description TEXT         NULL,
  total_weeks INT          NOT NULL DEFAULT 16,
  created_at  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS weeks (
  id                  VARCHAR(36)  NOT NULL DEFAULT (UUID()),
  program_id          VARCHAR(36)  NOT NULL,
  week_number         TINYINT      NOT NULL,
  phase               VARCHAR(100) NULL,
  theme               VARCHAR(255) NULL,
  description         TEXT         NULL,
  anchor_video_title  VARCHAR(255) NULL,
  anchor_video_url    VARCHAR(500) NULL,
  ai_system_prompt    TEXT         NULL,
  created_at          DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_weeks_program_week (program_id, week_number),
  CONSTRAINT fk_weeks_program FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS daily_tasks (
  id                VARCHAR(36)  NOT NULL DEFAULT (UUID()),
  week_id           VARCHAR(36)  NOT NULL,
  day_number        TINYINT      NOT NULL,
  title             VARCHAR(255) NOT NULL DEFAULT '',
  description       LONGTEXT     NULL,
  reflection_prompt TEXT         NULL,
  chat_guidance     TEXT         NULL,
  task_order        INT          NOT NULL DEFAULT 0,
  created_at        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_daily_tasks_week_day (week_id, day_number),
  CONSTRAINT fk_daily_tasks_week FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_progress (
  id                VARCHAR(36)  NOT NULL DEFAULT (UUID()),
  user_id           VARCHAR(36)  NOT NULL,
  program_id        VARCHAR(36)  NOT NULL,
  current_week      INT          NOT NULL DEFAULT 1,
  current_day       INT          NOT NULL DEFAULT 1,
  streak_days       INT          NOT NULL DEFAULT 0,
  last_completed_at DATETIME(3)  NULL,
  completed_task_ids JSON        NOT NULL DEFAULT ('[]'),
  onboarding_data   JSON         NULL,
  completed_at      DATETIME(3)  NULL,
  created_at        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_user_progress (user_id, program_id),
  CONSTRAINT fk_user_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_progress_program FOREIGN KEY (program_id) REFERENCES programs(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Seed: Divorced Dads 16-week program
-- ============================================================

INSERT IGNORE INTO programs (id, name, description, total_weeks)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Divorced Dads: From Pain to Power',
  'A 16-week journey from the pain of divorce to the freedom and abundance of being the man you have been called to be.',
  16
);

INSERT IGNORE INTO weeks (id, program_id, week_number, phase, theme, description, ai_system_prompt) VALUES
('w01-0000-0000-0000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1,  'Power',      'Find the Gap',                  'Identify the gap between where you are and where you want to be.',     'You are a compassionate guide helping a divorced dad in Week 1. Focus on honest self-assessment and finding their gap. Be warm, grounded, and avoid jumping to solutions.'),
('w02-0000-0000-0000-000000000002', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2,  'Power',      'Connect with Your Inner Child',  'Heal the wounds that fuel reactivity by connecting to your inner child.','You are a compassionate guide helping a divorced dad in Week 2. Focus on inner child work. Be gentle, nurturing, and patient.'),
('w03-0000-0000-0000-000000000003', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3,  'Power',      'Build Your Daily Ritual',        'Create a morning ritual that grounds and empowers you.',                'You are a compassionate guide helping a divorced dad in Week 3. Focus on daily routines and habits. Be practical and encouraging.'),
('w04-0000-0000-0000-000000000004', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4,  'Power',      'Expand Your Vessel',             'Grow your capacity to hold more joy, love, and possibility.',           'You are a compassionate guide helping a divorced dad in Week 4. Focus on expanding capacity and vision. Be inspiring and expansive.'),
('w05-0000-0000-0000-000000000005', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5,  'Purpose',    'Body',                           'Commit to your physical health as the foundation of fatherhood.',       'You are a compassionate guide helping a divorced dad in Week 5. Focus on physical health and body transformation. Be motivating and realistic.'),
('w06-0000-0000-0000-000000000006', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6,  'Purpose',    'Being',                          'Discover your soul purpose and internal design.',                       'You are a compassionate guide helping a divorced dad in Week 6. Focus on identity, soul purpose, and what lights them on fire. Be deep and exploratory.'),
('w07-0000-0000-0000-000000000007', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7,  'Purpose',    'Balance',                        'Rebuild and strengthen your most important relationships.',             'You are a compassionate guide helping a divorced dad in Week 7. Focus on relationships — friends, family, kids, co-parent. Be relational and practical.'),
('w08-0000-0000-0000-000000000008', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 8,  'Purpose',    'Business',                       'Step into leadership in your career and finances.',                     'You are a compassionate guide helping a divorced dad in Week 8. Focus on business and becoming a leader. Be ambitious and grounded.'),
('w09-0000-0000-0000-000000000009', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 9,  'Protection', 'Protect Yourself',               'Build the resolve to never go back. Protect your inner child.',         'You are a compassionate guide helping a divorced dad in Week 9. Focus on self-protection and commitment to growth. Be firm and compassionate.'),
('w10-0000-0000-0000-000000000010', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 10, 'Protection', 'Protect Your Kids',              'Build emotional resilience in your kids and be the present parent.',    'You are a compassionate guide helping a divorced dad in Week 10. Focus on parenting through divorce. Be child-centered and empowering.'),
('w11-0000-0000-0000-000000000011', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 11, 'Protection', 'Protect Your Assets',            'Safeguard your business, finances, and future from divorce chaos.',     'You are a compassionate guide helping a divorced dad in Week 11. Focus on financial protection and legal strategy. Be practical and strategic.'),
('w12-0000-0000-0000-000000000012', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 12, 'Protection', 'Peace',                          'Navigate custody, legal disputes, and co-parenting with peace.',        'You are a compassionate guide helping a divorced dad in Week 12. Focus on co-parenting peace and legal navigation. Be calm and strategic.'),
('w13-0000-0000-0000-000000000013', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 13, 'Profit',     'Relationships',                  'Enter your next relationship whole, not needy.',                        'You are a compassionate guide helping a divorced dad in Week 13. Focus on healthy new relationships. Be honest about readiness and healing.'),
('w14-0000-0000-0000-000000000014', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 14, 'Profit',     'Money',                          'Build abundance and make more money by becoming more present.',         'You are a compassionate guide helping a divorced dad in Week 14. Focus on financial abundance mindset. Be energizing and practical.'),
('w15-0000-0000-0000-000000000015', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 15, 'Profit',     'Time',                           'Invest your time so well that you have more of it.',                    'You are a compassionate guide helping a divorced dad in Week 15. Focus on time mastery and self-investment. Be disciplined and inspiring.'),
('w16-0000-0000-0000-000000000016', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 16, 'Profit',     'Kids',                           'Build the most amazing relationship with your kids and heal together.', 'You are a compassionate guide helping a divorced dad in Week 16. Focus on the father-child relationship and healing. Be tender and celebratory.');
