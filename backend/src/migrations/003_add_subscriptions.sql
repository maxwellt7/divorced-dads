-- ============================================================
-- Divorced Dads — Migration: Subscriptions (MySQL)
-- ============================================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id                    VARCHAR(36)  NOT NULL DEFAULT (UUID()),
  user_id               VARCHAR(36)  NOT NULL,
  stripe_customer_id    VARCHAR(255) NOT NULL,
  stripe_subscription_id VARCHAR(255) NULL,
  stripe_price_id       VARCHAR(255) NULL,
  plan_type             ENUM('free','monthly','lifetime') NOT NULL DEFAULT 'monthly',
  status                ENUM('active','inactive','past_due','canceled','trialing') NOT NULL DEFAULT 'inactive',
  current_period_start  DATETIME(3)  NULL,
  current_period_end    DATETIME(3)  NULL,
  cancel_at_period_end  TINYINT(1)   NOT NULL DEFAULT 0,
  created_at            DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at            DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uq_subscriptions_user (user_id),
  UNIQUE KEY uq_subscriptions_stripe_customer (stripe_customer_id),
  KEY idx_subscriptions_stripe_sub (stripe_subscription_id),
  CONSTRAINT fk_subscriptions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
