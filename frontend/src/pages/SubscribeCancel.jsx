import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function SubscribeCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-gray-700/40 p-5">
            <XCircle className="h-14 w-14 text-gray-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">No problem.</h1>
        <p className="text-gray-300 mb-8">
          Your Week 1 free access is still waiting. Come back when you're ready to commit to the full journey.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/pricing">
            <Button variant="gradient" size="lg" className="w-full">
              See pricing options
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="w-full text-gray-300 border-gray-600">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
