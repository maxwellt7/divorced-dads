import { db } from '../config/database.js';
import { logger } from '../utils/logger.js';

const PROGRAM_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

function parseProgress(progress) {
  if (!progress) return progress;
  if (typeof progress.completed_task_ids === 'string') {
    progress.completed_task_ids = JSON.parse(progress.completed_task_ids);
  }
  if (typeof progress.onboarding_data === 'string') {
    progress.onboarding_data = JSON.parse(progress.onboarding_data);
  }
  return progress;
}

export const progressController = {
  async get(req, res, next) {
    try {
      const userId = req.userId;

      let [[progress]] = await db.execute(
        'SELECT * FROM user_progress WHERE user_id = ? AND program_id = ?',
        [userId, PROGRAM_ID]
      );

      if (!progress) {
        await db.execute(
          'INSERT IGNORE INTO user_progress (id, user_id, program_id) VALUES (UUID(), ?, ?)',
          [userId, PROGRAM_ID]
        );
        [[progress]] = await db.execute(
          'SELECT * FROM user_progress WHERE user_id = ? AND program_id = ?',
          [userId, PROGRAM_ID]
        );
      }

      res.json(parseProgress(progress));
    } catch (err) {
      next(err);
    }
  },

  async completeTask(req, res, next) {
    try {
      const userId = req.userId;
      const { taskId, weekNumber, dayNumber } = req.body;

      if (!taskId || !weekNumber || !dayNumber) {
        return res.status(400).json({ error: 'taskId, weekNumber, and dayNumber are required' });
      }

      const [[progress]] = await db.execute(
        'SELECT * FROM user_progress WHERE user_id = ? AND program_id = ?',
        [userId, PROGRAM_ID]
      );

      if (!progress) {
        return res.status(404).json({ error: 'Progress record not found' });
      }

      const completedTaskIds = typeof progress.completed_task_ids === 'string'
        ? JSON.parse(progress.completed_task_ids)
        : (progress.completed_task_ids || []);

      const isCurrentOrBehind =
        weekNumber < progress.current_week ||
        (weekNumber === progress.current_week && dayNumber <= progress.current_day);

      if (!isCurrentOrBehind) {
        return res.status(403).json({ error: 'Cannot complete tasks ahead of your current position' });
      }

      if (completedTaskIds.includes(taskId)) {
        return res.json({ progress: { ...progress, completed_task_ids: completedTaskIds }, alreadyCompleted: true });
      }

      let nextWeek = progress.current_week;
      let nextDay = progress.current_day;

      if (weekNumber === progress.current_week && dayNumber === progress.current_day) {
        if (dayNumber < 7) {
          nextDay = dayNumber + 1;
        } else if (weekNumber < 16) {
          nextWeek = weekNumber + 1;
          nextDay = 1;
        }
      }

      const now = new Date();
      const lastCompleted = progress.last_completed_at ? new Date(progress.last_completed_at) : null;
      let streak = progress.streak_days;

      if (lastCompleted) {
        streak = (now - lastCompleted) < 86400000 * 2 ? streak + 1 : 1;
      } else {
        streak = 1;
      }

      const newCompletedTaskIds = [...completedTaskIds, taskId];
      const programCompleted = nextWeek === 16 && nextDay === 7;

      await db.execute(
        `UPDATE user_progress SET
          current_week = ?, current_day = ?, streak_days = ?,
          last_completed_at = ?, completed_task_ids = ?, completed_at = ?
        WHERE user_id = ? AND program_id = ?`,
        [nextWeek, nextDay, streak, now, JSON.stringify(newCompletedTaskIds),
         programCompleted ? now : null, userId, PROGRAM_ID]
      );

      const [[updated]] = await db.execute(
        'SELECT * FROM user_progress WHERE user_id = ? AND program_id = ?',
        [userId, PROGRAM_ID]
      );

      res.json({
        progress: { ...updated, completed_task_ids: newCompletedTaskIds },
        weekCompleted: dayNumber === 7,
        programCompleted,
      });
    } catch (err) {
      next(err);
    }
  },

  async saveOnboarding(req, res, next) {
    try {
      const userId = req.userId;
      const { onboardingData } = req.body;

      await db.execute(
        `INSERT INTO user_progress (id, user_id, program_id, onboarding_data)
         VALUES (UUID(), ?, ?, ?)
         ON DUPLICATE KEY UPDATE onboarding_data = VALUES(onboarding_data)`,
        [userId, PROGRAM_ID, JSON.stringify(onboardingData)]
      );

      const [[updated]] = await db.execute(
        'SELECT * FROM user_progress WHERE user_id = ? AND program_id = ?',
        [userId, PROGRAM_ID]
      );

      res.json(parseProgress(updated));
    } catch (err) {
      next(err);
    }
  },
};
