import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, Zap, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuthStore } from '../store/authStore';
import { useSubscriptionStore } from '../store/subscriptionStore';

const MONTHLY_PRICE_ID = import.meta.env.VITE_STRIPE_PRICE_ID_MONTHLY;
const LIFETIME_PRICE_ID = import.meta.env.VITE_STRIPE_PRICE_ID_LIFETIME;

export default function Pricing() {
  const { isAuthenticated } = useAuthStore();
  const { checkout } = useSubscriptionStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const handleSubscribe = async (priceId, planName) => {
    if (!isAuthenticated) {
      navigate('/register?redirect=pricing');
      return;
    }
    setLoading(planName);
    try {
      await checkout(priceId);
    } catch (err) {
      console.error('Checkout error:', err);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-7 w-7 text-blue-400" />
            <Link to="/" className="text-xl font-bold text-white">Divorced Dads</Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Invest in the man<br />
            <span className="text-blue-400">your kids need you to become</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Start for free. Upgrade when you're ready to commit to the full 16-week journey.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {/* Free */}
          <div className="rounded-2xl border border-gray-700 bg-slate-800/40 p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Free</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$0</span>
              </div>
              <p className="text-gray-400 text-sm">Week 1 — forever free</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-300">
              {[
                'Full Week 1 access (7 days)',
                'Daily tasks + AI coaching',
                'Onboarding assessment',
                'Progress tracking',
              ].map(f => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            {isAuthenticated ? (
              <Button variant="outline" className="w-full text-gray-300 border-gray-600" disabled>
                Current plan
              </Button>
            ) : (
              <Link to="/register">
                <Button variant="outline" className="w-full text-gray-300 border-gray-600">
                  Start free
                </Button>
              </Link>
            )}
          </div>

          {/* Monthly — most popular */}
          <div className="rounded-2xl border-2 border-blue-500 bg-blue-950/40 p-8 flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Monthly</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$97</span>
                <span className="text-gray-400 text-sm mb-1">/month</span>
              </div>
              <p className="text-gray-400 text-sm">Cancel anytime</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-300">
              {[
                'Full 16-week program access',
                'All 112 daily tasks',
                'AI coaching chat (unlimited)',
                'Custom hypnosis audio',
                'Phase-by-phase unlocking',
                'Priority support',
              ].map(f => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant="gradient"
              className="w-full"
              disabled={loading === 'monthly'}
              onClick={() => handleSubscribe(MONTHLY_PRICE_ID, 'monthly')}
            >
              {loading === 'monthly' ? 'Loading…' : 'Start full program'}
            </Button>
          </div>

          {/* Lifetime */}
          <div className="rounded-2xl border border-yellow-600/50 bg-yellow-950/20 p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">Lifetime</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold text-white">$297</span>
              </div>
              <p className="text-gray-400 text-sm">One-time — yours forever</p>
            </div>
            <ul className="space-y-3 mb-8 flex-1 text-sm text-gray-300">
              {[
                'Everything in Monthly',
                'Run the program as many times as you want',
                'All future content updates included',
                'Founding member status',
              ].map(f => (
                <li key={f} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="w-full text-yellow-300 border-yellow-600/60 hover:border-yellow-400"
              disabled={loading === 'lifetime'}
              onClick={() => handleSubscribe(LIFETIME_PRICE_ID, 'lifetime')}
            >
              {loading === 'lifetime' ? 'Loading…' : 'Get lifetime access'}
            </Button>
          </div>
        </div>

        {/* Trust signals */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1"><Lock className="h-3 w-3" /> Secure checkout via Stripe</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3" /> Instant access after payment</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
}
