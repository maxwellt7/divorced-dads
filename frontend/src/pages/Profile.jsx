import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCurriculumStore } from '../store/curriculumStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ArrowLeft, User, Flame, BookOpen, Calendar } from 'lucide-react';

export default function Profile() {
  const { user } = useAuthStore();
  const { progress, isLoading, fetchProgress } = useCurriculumStore();

  useEffect(() => {
    if (!progress) fetchProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentWeek = progress?.current_week ?? '-';
  const currentDay = progress?.current_day ?? '-';
  const streakDays = progress?.streak_days ?? 0;
  const completedCount = progress?.completed_task_ids?.length ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3 max-w-2xl mx-auto">
          <Link to="/dashboard" className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Profile</h1>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-5">
        {/* User info */}
        <Card>
          <CardContent className="py-6 px-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
              <User className="w-7 h-7 text-violet-600" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 text-lg truncate">{user?.name || 'Dad'}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Progress stats */}
        {isLoading && !progress ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="md" />
          </div>
        ) : (
          <Card>
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-base text-gray-700">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 grid grid-cols-2 gap-3">
              <div className="bg-violet-50 rounded-xl p-4 flex flex-col items-center text-center">
                <Calendar className="w-5 h-5 text-violet-500 mb-1" />
                <p className="text-2xl font-bold text-violet-700">{currentWeek}</p>
                <p className="text-xs text-gray-500">Current Week</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center text-center">
                <BookOpen className="w-5 h-5 text-blue-500 mb-1" />
                <p className="text-2xl font-bold text-blue-700">{currentDay}</p>
                <p className="text-xs text-gray-500">Current Day</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 flex flex-col items-center text-center">
                <Flame className="w-5 h-5 text-orange-500 mb-1" />
                <p className="text-2xl font-bold text-orange-600">{streakDays}</p>
                <p className="text-xs text-gray-500">Day Streak</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center text-center">
                <span className="text-green-500 text-lg mb-1">✓</span>
                <p className="text-2xl font-bold text-green-700">{completedCount}</p>
                <p className="text-xs text-gray-500">Tasks Done</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reset progress (UI only) */}
        <Card>
          <CardContent className="py-5 px-4 space-y-2">
            <h3 className="font-semibold text-gray-700">Reset Progress</h3>
            <p className="text-sm text-gray-400">Restart the program from week 1.</p>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="text-gray-400 border-gray-200 cursor-not-allowed"
              title="Coming soon"
            >
              Reset Progress (coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
