import { db } from '../config/database.js';
import { stripeService } from '../services/stripe.service.js';

const PROGRAM_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export const tasksController = {
  async getTask(req, res, next) {
    try {
      const weekNumber = parseInt(req.params.weekNumber, 10);
      const dayNumber = parseInt(req.params.dayNumber, 10);

      if (isNaN(weekNumber) || isNaN(dayNumber)) {
        return res.status(400).json({ error: 'Invalid week or day number' });
      }

      const [[week]] = await db.execute(
        'SELECT id, week_number, phase, theme FROM weeks WHERE program_id = ? AND week_number = ?',
        [PROGRAM_ID, weekNumber]
      );
      if (!week) return res.status(404).json({ error: 'Week not found' });

      const [[task]] = await db.execute(
        'SELECT * FROM daily_tasks WHERE week_id = ? AND day_number = ?',
        [week.id, dayNumber]
      );
      if (!task) return res.status(404).json({ error: 'Task not found' });

      res.json({ task, week });
    } catch (err) {
      next(err);
    }
  },

  async getDailyTask(req, res, next) {
    try {
      const userId = req.userId;

      const [[progress]] = await db.execute(
        'SELECT current_week, current_day FROM user_progress WHERE user_id = ? AND program_id = ?',
        [userId, PROGRAM_ID]
      );

      if (!progress) {
        return tasksController._fetchTask(1, 1, res, next);
      }

      const currentWeek = progress.current_week;

      if (currentWeek > 1) {
        const sub = await stripeService.getSubscriptionStatus(userId);
        if (!sub.hasFullAccess) {
          return res.status(402).json({
            success: false,
            error: 'Subscription required',
            code: 'SUBSCRIPTION_REQUIRED',
            message: 'Access to weeks 2-16 requires an active subscription.',
            currentWeek,
          });
        }
      }

      return tasksController._fetchTask(currentWeek, progress.current_day, res, next);
    } catch (err) {
      next(err);
    }
  },

  async _fetchTask(weekNumber, dayNumber, res, next) {
    try {
      const [[week]] = await db.execute(
        'SELECT id, week_number, phase, theme, description, anchor_video_title, anchor_video_url, ai_system_prompt FROM weeks WHERE program_id = ? AND week_number = ?',
        [PROGRAM_ID, weekNumber]
      );
      if (!week) return res.status(404).json({ error: 'Week not found' });

      const [[task]] = await db.execute(
        'SELECT * FROM daily_tasks WHERE week_id = ? AND day_number = ?',
        [week.id, dayNumber]
      );

      res.json({ task: task || null, week, position: { weekNumber, dayNumber } });
    } catch (err) {
      next(err);
    }
  },
};
