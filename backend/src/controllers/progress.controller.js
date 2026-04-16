import supabase from '../config/supabase.js';
import { logger } from '../utils/logger.js';

const PROGRAM_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export const progressController = {
  // GET /api/progress — get or create user's progress record
  async get(req, res, next) {
    try {
      const userId = req.user.id;

      let { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('program_id', PROGRAM_ID)
        .single();

      if (error && error.code === 'PGRST116') {
        // No record yet — create it
        const { data: created, error: cErr } = await supabase
          .from('user_progress')
          .insert({ user_id: userId, program_id: PROGRAM_ID })
          .select()
          .single();

        if (cErr) throw cErr;
        return res.json(created);
      }

      if (error) throw error;
      res.json(data);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/progress/complete-task — mark a task done, advance position
  async completeTask(req, res, next) {
    try {
      const userId = req.user.id;
      const { taskId, weekNumber, dayNumber } = req.body;

      if (!taskId || !weekNumber || !dayNumber) {
        return res.status(400).json({ error: 'taskId, weekNumber, and dayNumber are required' });
      }

      const { data: progress, error: pErr } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('program_id', PROGRAM_ID)
        .single();

      if (pErr) throw pErr;

      // Don't allow completing tasks ahead of current position
      const isCurrentOrBehind =
        weekNumber < progress.current_week ||
        (weekNumber === progress.current_week && dayNumber <= progress.current_day);

      if (!isCurrentOrBehind) {
        return res.status(403).json({ error: 'Cannot complete tasks ahead of your current position' });
      }

      // Already completed?
      if (progress.completed_task_ids.includes(taskId)) {
        return res.json({ progress, alreadyCompleted: true });
      }

      // Calculate next position
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

      // Update streak
      const now = new Date();
      const lastCompleted = progress.last_completed_at ? new Date(progress.last_completed_at) : null;
      const oneDayMs = 86400000;
      let streak = progress.streak_days;

      if (lastCompleted) {
        const diffMs = now - lastCompleted;
        if (diffMs < oneDayMs * 2) {
          streak += 1;
        } else {
          streak = 1;
        }
      } else {
        streak = 1;
      }

      const { data: updated, error: uErr } = await supabase
        .from('user_progress')
        .update({
          current_week: nextWeek,
          current_day: nextDay,
          streak_days: streak,
          last_completed_at: now.toISOString(),
          completed_task_ids: [...progress.completed_task_ids, taskId],
          completed_at: nextWeek === 16 && nextDay === 7 ? now.toISOString() : null,
        })
        .eq('user_id', userId)
        .eq('program_id', PROGRAM_ID)
        .select()
        .single();

      if (uErr) throw uErr;

      res.json({ progress: updated, weekCompleted: dayNumber === 7, programCompleted: nextWeek === 16 && nextDay === 7 });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /api/progress/onboarding — save onboarding answers
  async saveOnboarding(req, res, next) {
    try {
      const userId = req.user.id;
      const { onboardingData } = req.body;

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({ user_id: userId, program_id: PROGRAM_ID, onboarding_data: onboardingData })
        .select()
        .single();

      if (error) throw error;
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
};
