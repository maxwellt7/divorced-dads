import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Shield, Heart, TrendingUp, CheckCircle, Star, ArrowRight, Users, Clock, Zap } from 'lucide-react';

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
            <Link to="/pricing">
              <Button variant="ghost" className="text-gray-300 hover:text-white">Pricing</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="gradient">Start Week 1 Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-16 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4">
            For Divorced Dads Who Refuse to Disappear
          </p>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
            Your marriage ended.
            <br />
            <span className="text-blue-400">Your role as Dad didn't.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
            The hardest part isn't the divorce — it's showing up for your kids while you're still
            figuring out who you are without the marriage. We built this for that exact moment.
          </p>
          <p className="text-base text-gray-400 mb-10 max-w-xl mx-auto">
            A 16-week guided program: daily tasks, AI coaching, and hypnosis to help you become the
            man your kids need. <strong className="text-gray-300">Week 1 is completely free.</strong>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-10 py-4 w-full sm:w-auto">
                Start Week 1 Free <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Button>
            </Link>
            <a href="#the-journey">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full sm:w-auto text-gray-300 border-gray-600 hover:border-blue-400">
                See the 16-Week Journey
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-500">No credit card required. Start today — see results in week one.</p>
        </div>

        {/* Social proof bar */}
        <div className="flex flex-wrap justify-center gap-8 mt-14 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="h-4 w-4 text-blue-400" />
            <span>Built for divorced dads</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>Under 20 min/day</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Zap className="h-4 w-4 text-blue-400" />
            <span>AI coaching included</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Shield className="h-4 w-4 text-blue-400" />
            <span>Week 1 always free</span>
          </div>
        </div>
      </div>

      {/* Pain → Promise Section */}
      <div className="bg-slate-800/60 border-y border-slate-700/50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              If any of this sounds familiar, keep reading.
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {[
                "You're showing up for drop-off and pick-up, but feeling like a visitor in your kids' lives",
                "You're doing \"fine\" on the outside while barely holding it together inside",
                "You don't know who you are without the identity of husband and full-time dad",
                "You're angry, then guilty about the anger — on repeat",
                "You want to be the strong, grounded dad your kids need, but you have no roadmap",
                "Every self-help book was written for people in completely different situations",
              ].map((pain) => (
                <div key={pain} className="flex items-start gap-3 bg-slate-700/40 rounded-xl p-4">
                  <span className="text-red-400 text-lg mt-0.5">→</span>
                  <p className="text-gray-300 text-sm leading-relaxed">{pain}</p>
                </div>
              ))}
            </div>
            <div className="text-center bg-blue-950/60 border border-blue-500/30 rounded-2xl p-8">
              <p className="text-lg text-gray-200 leading-relaxed">
                <strong className="text-white">Divorced Dads</strong> is the first program built specifically
                for your situation — not generic self-help, but a structured 16-week path designed around
                the real challenges divorced fathers face. Daily. With AI support that actually understands
                your context.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 16-Week Journey Breakdown */}
      <div id="the-journey" className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3">The Program</p>
            <h2 className="text-4xl font-bold text-white mb-4">16 Weeks. Four Phases. One Mission.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Each phase builds on the last. By Week 16, you'll have rebuilt your identity, your routine,
              and your relationship with your kids — from the ground up.
            </p>
          </div>

          <div className="space-y-6">
            <PhaseCard
              phase="Phase 1"
              weeks="Weeks 1–4"
              name="Power"
              color="red"
              tagline="Find the gap. Own your story."
              description="Most divorced dads are running on autopilot — reactive, exhausted, lost. Phase 1 stops the bleeding. You'll identify the exact gap between who you are now and who you need to be, build a daily routine that actually sticks, and reconnect with your inner compass."
              tasks={[
                'Daily task: identity work, gap mapping, morning routines',
                'Week 3: Ice bath protocol + affirmations introduced',
                'AI coach focus: compassionate accountability',
              ]}
            />
            <PhaseCard
              phase="Phase 2"
              weeks="Weeks 5–8"
              name="Purpose"
              color="yellow"
              tagline="Know why you're here. Build the life."
              description="Who are you, separate from being a husband? Phase 2 rebuilds your identity from the inside out. Body. Being. Balance. Business. You'll define what you actually want your life to look like — and start building it."
              tasks={[
                'Daily task: body optimization, belief work, career clarity',
                'Week 6: \"Being\" week — deep identity integration',
                'AI coach focus: motivating, identity-forward',
              ]}
            />
            <PhaseCard
              phase="Phase 3"
              weeks="Weeks 9–12"
              name="Protection"
              color="green"
              tagline="Protect yourself, your kids, your peace."
              description="Now that you're stable, you learn to protect what matters. Legal clarity. Emotional boundaries with your ex. Parenting framework that keeps your kids out of the crossfire. Phase 3 is where dads go from surviving to being truly safe."
              tasks={[
                'Daily task: boundary-setting, co-parenting scripts, legal basics',
                'Week 11: Asset protection + financial foundation',
                'AI coach focus: practical, tactical, empowering',
              ]}
            />
            <PhaseCard
              phase="Phase 4"
              weeks="Weeks 13–16"
              name="Profit"
              color="blue"
              tagline="Relationships. Money. Time. Legacy."
              description="The final phase is about building forward — not recovering from the past. New relationships (with yourself, your kids, potentially others). Money clarity. Time optimization. And what kind of dad you want to be remembered as."
              tasks={[
                'Daily task: relationship design, wealth building, time mastery',
                'Week 16: Legacy letter to your kids',
                'AI coach focus: abundance mindset, forward-looking',
              ]}
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-10 py-4">
                Start Week 1 Free <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-slate-800/40 border-y border-slate-700/50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">20 Minutes a Day Changes Everything</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Watch a Short Video',
                  desc: 'Each week has a focused lesson (under 10 minutes). No fluff — just what you need to know for the week ahead.',
                  color: 'text-red-400',
                },
                {
                  step: '02',
                  title: 'Complete Your Daily Task',
                  desc: 'One task per day. Reflections, exercises, and challenges that are specific to where you are in the program.',
                  color: 'text-yellow-400',
                },
                {
                  step: '03',
                  title: 'Talk to Your AI Coach',
                  desc: 'After each task, your AI coach (who knows your situation) helps you integrate what you just did. No judgment. Just clarity.',
                  color: 'text-blue-400',
                },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="text-left bg-slate-800/60 rounded-xl p-6">
                  <div className={`text-5xl font-black mb-4 ${color}`}>{step}</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Everything You Get</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Heart className="h-8 w-8" />}
              title="112 Daily Tasks"
              description="One focused task per day across 16 weeks. Video watch → task → AI reflection. Under 20 minutes, every day."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8" />}
              title="AI Coach (Context-Aware)"
              description="Your coach knows your divorce stage, your kids' ages, and your biggest struggle. Every response is tailored to your reality."
            />
            <FeatureCard
              icon={<TrendingUp className="h-8 w-8" />}
              title="Progress Tracking"
              description="Streaks, phase completion, weekly milestones. You'll see how far you've come and what's next."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Custom Hypnosis Audio"
              description="At the end of each phase, generate a personalized hypnosis recording based on your specific progress and goals."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Built for Your Situation"
              description="Not generic self-help. Not couples content. 100% designed for divorced dads navigating solo parenting."
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8" />}
              title="Do It On Your Schedule"
              description="No live sessions. No cohorts. Start on any day and move at your pace. Never lose your streak — tasks roll over."
            />
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-slate-800/40 border-y border-slate-700/50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              From Dads Who've Been Where You Are
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                quote="Week 3 changed something in me. The ice bath + affirmation protocol sounds ridiculous until you do it every day for a week. I started showing up differently — for my kids and for myself."
                name="Marcus T."
                detail="Divorced 14 months, 2 kids (ages 7 & 10)"
              />
              <TestimonialCard
                quote="I've done therapy, I've done journaling. This is different because it meets you where you actually are — a divorced dad, not just 'a person going through something hard.' The AI coach gets it."
                name="Derek S."
                detail="Divorced 8 months, 1 kid (age 5)"
                featured
              />
              <TestimonialCard
                quote="By Week 8 I had a morning routine, a financial plan, and a co-parenting agreement that actually worked. This wasn't motivation porn — it was a real roadmap."
                name="James W."
                detail="Divorced 2 years, 3 kids"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing CTA */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-950/80 to-slate-800/80 border border-blue-500/40 rounded-2xl p-12">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-4xl font-bold text-white mb-4">Week 1 is free. Always.</h2>
          <p className="text-gray-300 mb-4 text-lg max-w-xl mx-auto">
            7 days of daily tasks, AI coaching, and progress tracking — no card required.
          </p>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            When you're ready to commit to the full 16-week journey: <strong className="text-white">$97/month</strong> or{' '}
            <strong className="text-yellow-400">$297 lifetime</strong>.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="gradient" className="text-lg px-10 py-4">
                Start Week 1 Free <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 text-gray-300 border-gray-600 hover:border-blue-400">
                See all plans
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-6">Secure checkout via Stripe. Cancel anytime.</p>
        </div>
      </div>

      {/* Email capture */}
      <div className="container mx-auto px-6 pb-20">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 max-w-2xl mx-auto text-center">
          {emailSubmitted ? (
            <div>
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-white">You're on the list.</h3>
              <p className="text-gray-400">Check your inbox — the playbook is on its way.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2 text-white">Not ready to commit yet?</h3>
              <p className="text-gray-400 mb-2">
                Get the free guide:{' '}
                <em className="text-gray-300">The Divorced Dad's Playbook — 7 Things That Actually Help in Year One.</em>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                No sales pitch. Just the real stuff.
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
                  Send It Free
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-600 text-sm border-t border-slate-800">
        <p>&copy; 2026 Divorced Dads. All rights reserved.</p>
      </footer>
    </div>
  );
}

function PhaseCard({ phase, weeks, name, color, tagline, description, tasks }) {
  const colorMap = {
    red: { border: 'border-red-500/30', bg: 'bg-red-950/20', badge: 'bg-red-500/20 text-red-400', check: 'text-red-400' },
    yellow: { border: 'border-yellow-500/30', bg: 'bg-yellow-950/20', badge: 'bg-yellow-500/20 text-yellow-400', check: 'text-yellow-400' },
    green: { border: 'border-green-500/30', bg: 'bg-green-950/20', badge: 'bg-green-500/20 text-green-400', check: 'text-green-400' },
    blue: { border: 'border-blue-500/30', bg: 'bg-blue-950/20', badge: 'bg-blue-500/20 text-blue-400', check: 'text-blue-400' },
  };
  const c = colorMap[color];
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-8`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${c.badge} mb-2`}>
            {phase} · {weeks}
          </span>
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <p className={`text-sm font-medium mt-1 ${c.badge.split(' ')[1]}`}>{tagline}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-5">{description}</p>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm text-gray-400">
            <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${c.check}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, detail, featured = false }) {
  return (
    <div className={`rounded-xl p-6 flex flex-col gap-4 ${featured ? 'bg-blue-950/60 border-2 border-blue-500/50' : 'bg-slate-800/60 border border-slate-700'}`}>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{quote}"</p>
      <div>
        <p className="text-white font-semibold text-sm">{name}</p>
        <p className="text-gray-500 text-xs">{detail}</p>
      </div>
    </div>
  );
}
