import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProgressRing from '../components/curriculum/ProgressRing';
import WeekProgressBar from '../components/curriculum/WeekProgressBar';
import { Flame, ArrowRight, BookOpen } from 'lucide-react';

const phaseConfig = {
  power: {
    label: 'Power',
    color: 'bg-violet-100 text-violet-700 border-violet-200',
    highlight: 'border-violet-500 bg-violet-50',
    ring: '#7c3aed',
    description: 'Reclaim your identity and strength',
  },
  purpose: {
    label: 'Purpose',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    highlight: 'border-blue-500 bg-blue-50',
    ring: '#2563eb',
    description: 'Define your values and direction',
  },
  protection: {
    label: 'Protection',
    color: 'bg-green-100 text-green-700 border-green-200',
    highlight: 'border-green-500 bg-green-50',
    ring: '#16a34a',
    description: 'Protect what matters most',
  },
  profit: {
    label: 'Profit',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    highlight: 'border-amber-500 bg-amber-50',
    ring: '#d97706',
    description: 'Build financial stability',
  },
};

const allPhases = ['power', 'purpose', 'protection', 'profit'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { progress, dailyTask, currentWeek, isLoading, fetchProgress, fetchDailyTask } =
    useCurriculumStore();

  useEffect(() => {
    fetchProgress();
    fetchDailyTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const currentWeekNum = progress?.current_week ?? 1;
  const currentDay = progress?.current_day ?? 1;
  const streakDays = progress?.streak_days ?? 0;
  const overallProgress = Math.round(((currentWeekNum - 1) / 16) * 100);
  const phase = currentWeek?.phase?.toLowerCase() || 'power';
  const phaseInfo = phaseConfig[phase] || phaseConfig.power;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <span className="text-xl font-bold text-violet-700">Divorced Dads</span>
          <div className="flex items-center gap-1">
            <Link to="/dashboard/profile">
              <Button variant="ghost" size="sm">Profile</Button>
            </Link>
            <Link to="/dashboard/settings">
              <Button variant="ghost" size="sm">Settings</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-5">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Keep showing up. You're doing great.</p>
        </div>

        {/* Streak card */}
        <Card className="border border-orange-200 bg-orange-50">
          <CardContent className="py-4 px-4 flex items-center gap-3">
            <Flame className="w-8 h-8 text-orange-500 shrink-0" />
            <div>
              <p className="text-2xl font-bold text-orange-700">{streakDays} day{streakDays !== 1 ? 's' : ''}</p>
              <p className="text-sm text-orange-600">Current streak</p>
            </div>
          </CardContent>
        </Card>

        {/* Current week card */}
        <Card className={`border-2 ${phaseInfo.highlight}`}>
          <CardContent className="py-5 px-4 flex items-center gap-4">
            <ProgressRing
              progress={overallProgress}
              size={90}
              strokeWidth={8}
              color={phaseInfo.ring}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${phaseInfo.color}`}>
                  {phaseInfo.label} Phase
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900">Week {currentWeekNum}</h2>
              {currentWeek?.theme && (
                <p className="text-sm text-gray-600 truncate">{currentWeek.theme}</p>
              )}
              <p className="text-xs text-gray-400 mt-0.5">{overallProgress}% of program complete</p>
            </div>
          </CardContent>
        </Card>

        {/* Week progress bar */}
        <Card>
          <CardContent className="py-4 px-4">
            <WeekProgressBar currentWeek={currentWeekNum} currentDay={currentDay} />
          </CardContent>
        </Card>

        {/* Daily task card */}
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-600" />
              Today's Task
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {dailyTask ? (
              <>
                <p className="font-semibold text-gray-900">{dailyTask.title}</p>
                {dailyTask.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{dailyTask.description}</p>
                )}
                <Button
                  size="lg"
                  className="w-full mt-1"
                  onClick={() => navigate('/daily-task')}
                >
                  Start Today's Task
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No task found for today.</p>
            )}
          </CardContent>
        </Card>

        {/* Phase overview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Program Phases</h3>
          <div className="grid grid-cols-2 gap-3">
            {allPhases.map((p) => {
              const cfg = phaseConfig[p];
              const isCurrent = p === phase;
              return (
                <div
                  key={p}
                  className={`rounded-xl border p-3 transition-all ${
                    isCurrent ? `border-2 ${cfg.highlight}` : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border capitalize ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <p className="text-xs text-gray-500 mt-1.5 leading-snug">{cfg.description}</p>
                  {isCurrent && (
                    <p className="text-xs font-medium text-violet-600 mt-1">Current</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
