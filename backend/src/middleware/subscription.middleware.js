import { supabase } from '../config/supabase.js';
import { AuthorizationError } from '../utils/errors.js';

/**
 * Checks if the authenticated user has an active paid subscription.
 * Free tier: week 1 only (current_week === 1).
 * Paid tier: all 16 weeks.
 *
 * Usage: apply to routes that require full access (e.g. tasks beyond week 1).
 * Passes through if user is on week 1 or has active/lifetime subscription.
 */
export const requireSubscriptionForWeek = async (req, res, next) => {
  try {
    const weekNumber = parseInt(req.query.week || req.body?.week || req.params?.week || '1', 10);

    // Week 1 is always free — no subscription check needed
    if (weekNumber <= 1) {
      return next();
    }

    if (!req.userId) {
      throw new AuthorizationError('Authentication required');
    }

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan, status')
      .eq('user_id', req.userId)
      .single();

    const hasAccess =
      sub?.plan === 'lifetime' ||
      (sub?.plan === 'monthly' && (sub?.status === 'active' || sub?.status === 'trialing'));

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

/**
 * Soft gate: attaches subscription status to req.subscription.
 * Does not block — lets the route decide what to do.
 */
export const attachSubscription = async (req, res, next) => {
  try {
    if (!req.userId) {
      req.subscription = { plan: 'free', status: 'inactive', hasFullAccess: false };
      return next();
    }

    const { data: sub } = await supabase
      .from('subscriptions')
      .select('plan, status, current_period_end')
      .eq('user_id', req.userId)
      .single();

    req.subscription = {
      plan: sub?.plan || 'free',
      status: sub?.status || 'inactive',
      currentPeriodEnd: sub?.current_period_end || null,
      hasFullAccess:
        sub?.plan === 'lifetime' ||
        (sub?.plan === 'monthly' && (sub?.status === 'active' || sub?.status === 'trialing')),
    };

    next();
  } catch {
    req.subscription = { plan: 'free', status: 'inactive', hasFullAccess: false };
    next();
  }
};
