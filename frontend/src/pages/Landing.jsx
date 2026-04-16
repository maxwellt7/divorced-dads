import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Shield, Heart, TrendingUp, CheckCircle } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailCapture = (e) => {
    e.preventDefault();
    if (!email) return;
    setEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">Divorced Dads</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient">Start Your Journey</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">
            16-Week Personal Development Program
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Rise. Protect.
            <span className="text-blue-400"> Profit.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            A 16-week guided program built specifically for divorced dads — daily coaching, AI-powered reflection, and hypnosis to help you rebuild stronger than before.
          </p>
          <p className="text-base text-gray-400 mb-10 max-w-xl mx-auto">
            Power. Purpose. Protection. Profit. Four phases. 112 daily tasks. One mission: become the man your kids need.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-4 w-full sm:w-auto">
                Start Week 1 Free
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto text-gray-300 border-gray-600 hover:border-blue-400">
                See the Program
              </Button>
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-4">No credit card required. First week is free.</p>
        </div>

        {/* Phase badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-gray-400">
          {[
            { label: 'Power (Wk 1-4)', color: 'text-red-400' },
            { label: 'Purpose (Wk 5-8)', color: 'text-yellow-400' },
            { label: 'Protection (Wk 9-12)', color: 'text-green-400' },
            { label: 'Profit (Wk 13-16)', color: 'text-blue-400' },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1">
              <CheckCircle className={`h-4 w-4 ${color}`} />
              <span className="text-gray-300">{label}</span>
            </span>
          ))}
        </div>

        {/* Features */}
        <div id="how-it-works" className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            icon={<Heart className="h-8 w-8" />}
            title="Daily Guided Tasks"
            description="One focused task per day. Watch a short video, complete a reflection, then chat with your AI coach — all in under 20 minutes."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Built for Your Situation"
            description="Onboarding that captures your divorce stage, your kids' ages, and your biggest challenges — so every AI response speaks to your reality."
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Tracks Your Progress"
            description="Week-by-week progress, streak tracking, and phase completion milestones keep you accountable and moving forward."
          />
        </div>

        {/* How it works steps */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Tell Us Your Story', desc: 'A short intake covers your divorce stage, your kids, and what you\'re struggling with most.' },
              { step: '02', title: 'Start Week 1', desc: 'Day 1 begins immediately. Watch the intro, complete your first task, talk to your coach.' },
              { step: '03', title: 'Show Up Daily', desc: 'Complete each day to unlock the next. 16 weeks later, you\'re a different man.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-left">
                <div className="text-4xl font-black text-blue-400 mb-3">{step}</div>
                <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-24 bg-slate-800 border border-slate-700 rounded-2xl p-10 max-w-2xl mx-auto text-center">
          {emailSubmitted ? (
            <div>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-white">You're on the list.</h3>
              <p className="text-gray-400">We'll be in touch with early access details.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2 text-white">Not ready to start?</h3>
              <p className="text-gray-400 mb-6">
                Drop your email and we'll send you: <em className="text-gray-300">The Divorced Dad's Playbook — 7 Things That Actually Help in Year One.</em>
              </p>
              <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                />
                <Button type="submit" variant="gradient" className="px-6 py-3 whitespace-nowrap">
                  Send It
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-600 text-sm">
        <p>&copy; 2026 Divorced Dads. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
