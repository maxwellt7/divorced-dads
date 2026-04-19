import { db } from '../config/database.js';
import { AuthorizationError } from '../utils/errors.js';

export const requireSubscriptionForWeek = async (req, res, next) => {
  try {
    const weekNumber = parseInt(req.query.week || req.body?.week || req.params?.week || '1', 10);

    if (weekNumber <= 1) return next();

    if (!req.userId) throw new AuthorizationError('Authentication required');

    const [[sub]] = await db.execute(
      'SELECT plan_type, status FROM subscriptions WHERE user_id = ?',
      [req.userId]
    );

    const hasAccess =
      sub?.plan_type === 'lifetime' ||
      (sub?.plan_type === 'monthly' && (sub?.status === 'active' || sub?.status === 'trialing'));

    if (!hasAccess) {
      return res.status(402).json({
        success: false,
        error: 'Subscription required',
        code: 'SUBSCRIPTION_REQUIRED',
        message: 'Access to weeks 2-16 requires an active subscription.',
        upgradeUrl: '/pricing',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const attachSubscription = async (req, res, next) => {
  try {
    if (!req.userId || !db) {
      req.subscription = { plan: 'free', status: 'inactive', hasFullAccess: false };
      return next();
    }

    const [[sub]] = await db.execute(
      'SELECT plan_type, status, current_period_end FROM subscriptions WHERE user_id = ?',
      [req.userId]
    );

    req.subscription = {
      plan: sub?.plan_type || 'free',
      status: sub?.status || 'inactive',
      currentPeriodEnd: sub?.current_period_end || null,
      hasFullAccess:
        sub?.plan_type === 'lifetime' ||
        (sub?.plan_type === 'monthly' && (sub?.status === 'active' || sub?.status === 'trialing')),
    };

    next();
  } catch {
    req.subscription = { plan: 'free', status: 'inactive', hasFullAccess: false };
    next();
  }
};
