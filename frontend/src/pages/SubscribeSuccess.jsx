import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useSubscriptionStore } from '../store/subscriptionStore';

export default function SubscribeSuccess() {
  const { fetch } = useSubscriptionStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh subscription status after checkout
    fetch();
    // Auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => navigate('/dashboard'), 5000);
    return () => clearTimeout(timer);
  }, [fetch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-500/20 p-5">
            <CheckCircle className="h-14 w-14 text-green-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">You're in.</h1>
        <p className="text-gray-300 mb-8">
          Your subscription is active. All 16 weeks are unlocked. Let's build the man your kids need.
        </p>
        <Link to="/dashboard">
          <Button variant="gradient" size="lg" className="w-full">
            Go to your dashboard <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
        <p className="text-sm text-gray-500 mt-4">Redirecting automatically in 5 seconds…</p>
      </div>
    </div>
  );
}
