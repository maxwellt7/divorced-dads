import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * PaywallBanner — shown when a user tries to access week 2+ without a subscription.
 * Displays inline (not a full-page block) so the user can still see week 1.
 */
export default function PaywallBanner({ currentWeek }) {
  return (
    <div className="rounded-xl border border-blue-500/40 bg-blue-950/30 p-6 text-center">
      <div className="flex justify-center mb-3">
        <div className="rounded-full bg-blue-500/20 p-3">
          <Lock className="h-7 w-7 text-blue-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        Week {currentWeek} requires a subscription
      </h3>
      <p className="text-gray-300 text-sm mb-5 max-w-xs mx-auto">
        You've completed Week 1. Unlock the full 16-week journey and keep the momentum going.
      </p>
      <Link to="/pricing">
        <Button variant="gradient" className="mx-auto">
          See plans <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </Link>
    </div>
  );
}
