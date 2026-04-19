import { db } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { NotFoundError } from '../utils/errors.js';

export class StatsService {
  async getUserStats(userId) {
    const [[data]] = await db.execute(
      'SELECT * FROM user_stats WHERE user_id = ?',
      [userId]
    );
    if (!data) throw new NotFoundError('User stats');
    return data;
  }

  async getStreakInfo(userId) {
    const [[stats]] = await db.execute(
      'SELECT current_streak, longest_streak, last_session_date FROM user_stats WHERE user_id = ?',
      [userId]
    );
    if (!stats) throw new NotFoundError('User stats');

    const today = new Date();
    const lastSession = stats.last_session_date ? new Date(stats.last_session_date) : null;
    let daysUntilBreak = null;

    if (lastSession) {
      const tomorrow = new Date(lastSession);
      tomorrow.setDate(tomorrow.getDate() + 2);
      daysUntilBreak = Math.max(0, Math.ceil((tomorrow - today) / (1000 * 60 * 60 * 24)));
    }

    return {
      currentStreak: stats.current_streak,
      longestStreak: stats.longest_streak,
      lastSessionDate: stats.last_session_date,
      daysUntilBreak,
    };
  }

  async getListeningHistory(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [rows] = await db.execute(
      `SELECT jd.completed_at, jd.duration_seconds
       FROM journey_days jd
       INNER JOIN journeys j ON j.id = jd.journey_id
       WHERE j.user_id = ? AND jd.completed = 1 AND jd.completed_at >= ?
       ORDER BY jd.completed_at ASC`,
      [userId, startDate]
    );

    const historyByDate = {};
    rows.forEach(day => {
      const date = new Date(day.completed_at).toISOString().split('T')[0];
      if (!historyByDate[date]) historyByDate[date] = { date, totalMinutes: 0, sessions: 0 };
      historyByDate[date].totalMinutes += Math.floor((day.duration_seconds || 0) / 60);
      historyByDate[date].sessions += 1;
    });

    return Object.values(historyByDate);
  }

  async getJourneyStats(userId) {
    const [journeys] = await db.execute(
      'SELECT id, status FROM journeys WHERE user_id = ?',
      [userId]
    );

    const stats = {
      totalJourneys: journeys.length,
      completedJourneys: 0,
      inProgressJourneys: 0,
      totalDaysCompleted: 0,
      completionRate: 0,
    };

    for (const journey of journeys) {
      const [jdays] = await db.execute(
        'SELECT completed FROM journey_days WHERE journey_id = ?',
        [journey.id]
      );
      const completedDays = jdays.filter(d => d.completed).length;
      stats.totalDaysCompleted += completedDays;
      if (completedDays === jdays.length && jdays.length > 0) {
        stats.completedJourneys += 1;
      } else if (completedDays > 0) {
        stats.inProgressJourneys += 1;
      }
    }

    if (stats.totalJourneys > 0) {
      stats.completionRate = (stats.completedJourneys / stats.totalJourneys * 100).toFixed(1);
    }

    return stats;
  }

  async getTimeOfDayDistribution(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [rows] = await db.execute(
      `SELECT jd.completed_at
       FROM journey_days jd
       INNER JOIN journeys j ON j.id = jd.journey_id
       WHERE j.user_id = ? AND jd.completed = 1 AND jd.completed_at >= ?`,
      [userId, startDate]
    );

    const distribution = { morning: 0, afternoon: 0, evening: 0, night: 0 };
    rows.forEach(day => {
      const hour = new Date(day.completed_at).getHours();
      if (hour >= 6 && hour < 12) distribution.morning += 1;
      else if (hour >= 12 && hour < 18) distribution.afternoon += 1;
      else if (hour >= 18 && hour < 22) distribution.evening += 1;
      else distribution.night += 1;
    });

    return distribution;
  }
}

export const statsService = new StatsService();
export default statsService;
