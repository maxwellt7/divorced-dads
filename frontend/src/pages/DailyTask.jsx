import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCurriculumStore } from '../store/curriculumStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import VideoPlayer from '../components/curriculum/VideoPlayer';
import TaskChat from '../components/curriculum/TaskChat';

const phaseColors = {
  power: 'bg-violet-100 text-violet-700',
  purpose: 'bg-blue-100 text-blue-700',
  protection: 'bg-green-100 text-green-700',
  profit: 'bg-amber-100 text-amber-700',
};

export default function DailyTask() {
  const navigate = useNavigate();
  const { dailyTask, currentWeek, isLoading, fetchDailyTask, completeCurrentTask, clearChat } =
    useCurriculumStore();
  const [videoWatched, setVideoWatched] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    fetchDailyTask();
    clearChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = async () => {
    if (!videoWatched) return;
    setCompleting(true);
    try {
      const result = await completeCurrentTask();
      if (result?.weekCompleted) {
        toast.success('Week complete! Great work this week.');
      } else if (result?.programCompleted) {
        toast.success('You completed the entire program! Amazing!');
      } else {
        toast.success("Today's task complete. Keep going!");
      }
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to complete task');
    } finally {
      setCompleting(false);
    }
  };

  if (isLoading || !dailyTask) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const phase = currentWeek?.phase?.toLowerCase() || 'power';
  const phaseBadge = phaseColors[phase] || phaseColors.power;

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-bold text-gray-900 truncate">{dailyTask.title}</h1>
            {currentWeek && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-gray-500">Week {currentWeek.week_number}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${phaseBadge}`}>
                  {phase}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
        {/* Task description */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {dailyTask.description && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Today's Task
                </h2>
                <p className="text-gray-800 leading-relaxed">{dailyTask.description}</p>
              </div>
            )}
            {dailyTask.reflection_prompt && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Reflection Prompt
                </h2>
                <p className="text-gray-700 italic leading-relaxed">"{dailyTask.reflection_prompt}"</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Video */}
        <VideoPlayer
          videoUrl={dailyTask.video_url}
          onWatched={() => setVideoWatched(true)}
          isWatched={videoWatched}
        />

        {/* Chat */}
        <TaskChat
          weekNumber={currentWeek?.week_number}
          phase={currentWeek?.phase}
          systemPrompt={currentWeek?.ai_system_prompt}
          taskGuidance={dailyTask.chat_guidance}
          isUnlocked={videoWatched}
        />
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 z-10">
        <div className="max-w-2xl mx-auto">
          <Button
            size="lg"
            className="w-full"
            onClick={handleComplete}
            disabled={!videoWatched || completing}
          >
            {completing ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Completing…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Complete Today's Task
              </span>
            )}
          </Button>
          {!videoWatched && (
            <p className="text-center text-xs text-gray-400 mt-2">Watch the video to unlock</p>
          )}
        </div>
      </div>
    </div>
  );
}
