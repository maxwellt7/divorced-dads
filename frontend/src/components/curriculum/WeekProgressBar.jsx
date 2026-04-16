const TOTAL_WEEKS = 16;

export default function WeekProgressBar({ currentWeek = 1, currentDay = 1 }) {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Week 1</span>
        <span className="font-medium text-gray-700">Week {currentWeek} of {TOTAL_WEEKS}</span>
        <span>Week {TOTAL_WEEKS}</span>
      </div>
      <div className="flex gap-0.5 w-full">
        {Array.from({ length: TOTAL_WEEKS }, (_, i) => {
          const week = i + 1;
          const isCurrent = week === currentWeek;
          const isCompleted = week < currentWeek;

          return (
            <div
              key={week}
              title={`Week ${week}`}
              className={`flex-1 h-2.5 rounded-sm transition-all duration-300 ${
                isCurrent
                  ? 'bg-violet-600 ring-1 ring-violet-400 ring-offset-1 scale-y-125'
                  : isCompleted
                  ? 'bg-violet-300'
                  : 'bg-gray-200'
              }`}
            />
          );
        })}
      </div>
      <p className="text-xs text-gray-400 text-center">
        Day {currentDay} of 7 this week
      </p>
    </div>
  );
}
