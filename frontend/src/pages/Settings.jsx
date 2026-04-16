import { useEffect, useState } from 'react';
import { CreditCard, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { Link } from 'react-router-dom';

export default function Settings() {
  const { subscription, fetch, openPortal } = useSubscriptionStore();
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    try {
      await openPortal();
    } catch {
      setPortalLoading(false);
    }
  };

  const planLabel = {
    free: 'Free (Week 1)',
    monthly: 'Monthly — Full Program',
    lifetime: 'Lifetime — Full Program',
  }[subscription?.plan] || 'Free';

  const statusColor = subscription?.hasFullAccess ? 'text-green-600' : 'text-gray-500';
  const statusIcon = subscription?.hasFullAccess
    ? <CheckCircle className="h-4 w-4 text-green-500" />
    : <AlertCircle className="h-4 w-4 text-gray-400" />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

        {/* Subscription */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-500" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{planLabel}</p>
                <div className={`flex items-center gap-1 text-sm mt-0.5 ${statusColor}`}>
                  {statusIcon}
                  <span>
                    {subscription?.hasFullAccess
                      ? 'Active — all 16 weeks unlocked'
                      : 'Free tier — Week 1 only'}
                  </span>
                </div>
                {subscription?.currentPeriodEnd && subscription?.plan === 'monthly' && (
                  <p className="text-xs text-gray-400 mt-1">
                    {subscription?.cancelAtPeriodEnd ? 'Cancels' : 'Renews'} on{' '}
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
              {subscription?.plan !== 'free' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                >
                  {portalLoading ? 'Loading…' : (
                    <span className="flex items-center gap-1">
                      Manage billing <ExternalLink className="h-3 w-3" />
                    </span>
                  )}
                </Button>
              ) : (
                <Link to="/pricing">
                  <Button variant="gradient" size="sm">Upgrade</Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
