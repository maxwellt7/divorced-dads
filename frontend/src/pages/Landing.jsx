import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Brain, Headphones, TrendingUp, CheckCircle } from 'lucide-react';
import { track, Events } from '../utils/analytics';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailCapture = (e) => {
    e.preventDefault();
    if (!email) return;
    track(Events.LANDING_EMAIL_CAPTURE, { email });
    setEmailSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold gradient-text">Sacred Heart</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-4">
            AI-Powered Hypnosis &amp; Personal Development
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Rewire Your Mind in
            <span className="gradient-text"> 7 Days</span>
          </h1>
          <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
            Personalized hypnosis journeys built around your goals — not generic scripts.
            The app listens, adapts, and deepens with every session.
          </p>
          <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
            Backed by proven hypnotherapy frameworks. Built for people who've tried everything else.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-8 py-4 w-full sm:w-auto">
                Start Your Free Journey
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto">
                See How It Works
              </Button>
            </a>
          </div>

          <p className="text-sm text-gray-400 mt-4">No credit card required. Free to start.</p>
        </div>

        {/* Social proof bar */}
        <div className="flex flex-wrap justify-center gap-6 mt-16 text-sm text-gray-500">
          {['Stress & Anxiety', 'Sleep', 'Confidence', 'Focus', 'Habit Change'].map((tag) => (
            <span key={tag} className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-primary-500" />
              {tag}
            </span>
          ))}
        </div>

        {/* Features */}
        <div id="how-it-works" className="grid md:grid-cols-3 gap-8 mt-20">
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="Built Around You"
            description="Answer 20 questions once. Every session is crafted to your goals, voice preferences, and stress profile — not a generic template."
          />
          <FeatureCard
            icon={<Headphones className="h-8 w-8" />}
            title="Studio-Quality Audio"
            description="AI-generated hypnosis scripts delivered in your preferred voice style, with optional binaural beats and nature sounds."
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Tracks Your Progress"
            description="See your journey evolve. Session history, completion streaks, and goal milestones keep you on track and accountable."
          />
        </div>

        {/* How it works steps */}
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Profile Your Mind', desc: 'A short intake questionnaire maps your goals, challenges, and hypnotic receptivity.' },
              { step: '02', title: 'Receive Your Journey', desc: 'AI generates a personalized 7-day hypnosis program with daily audio sessions.' },
              { step: '03', title: 'Listen & Transform', desc: 'Follow your sessions. The program adapts as you progress and provide feedback.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-left">
                <div className="text-4xl font-black gradient-text mb-3">{step}</div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-24 bg-white rounded-2xl shadow-lg p-10 max-w-2xl mx-auto text-center">
          {emailSubmitted ? (
            <div>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">You're on the list.</h3>
              <p className="text-gray-600">We'll send you tips, updates, and early access to new features.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2">Not ready to start yet?</h3>
              <p className="text-gray-600 mb-6">
                Drop your email and we'll send you a free guide: <em>The Science Behind Hypnosis-Based Habit Change</em>.
              </p>
              <form onSubmit={handleEmailCapture} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button type="submit" variant="gradient" className="px-6 py-3 whitespace-nowrap">
                  Send Me the Guide
                </Button>
              </form>
              <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2025 Sacred Heart. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg card-hover">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
