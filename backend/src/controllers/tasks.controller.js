import supabase from '../config/supabase.js';
import { stripeService } from '../services/stripe.service.js';

const PROGRAM_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export const tasksController = {
  // GET /api/tasks/:weekNumber/:dayNumber — get a specific task
  async getTask(req, res, next) {
    try {
      const weekNumber = parseInt(req.params.weekNumber, 10);
      const dayNumber = parseInt(req.params.dayNumber, 10);

      if (isNaN(weekNumber) || isNaN(dayNumber)) {
        return res.status(400).json({ error: 'Invalid week or day number' });
      }

      const { data: week, error: wErr } = await supabase
        .from('weeks')
        .select('id, week_number, phase, theme')
        .eq('program_id', PROGRAM_ID)
        .eq('week_number', weekNumber)
        .single();

      if (wErr || !week) return res.status(404).json({ error: 'Week not found' });

      const { data: task, error: tErr } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('week_id', week.id)
        .eq('day_number', dayNumber)
        .single();

      if (tErr || !task) return res.status(404).json({ error: 'Task not found' });

      res.json({ task, week });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/daily-task — get the user's current task based on their progress
  async getDailyTask(req, res, next) {
    try {
      const userId = req.userId;

      const { data: progress, error: pErr } = await supabase
        .from('user_progress')
        .select('current_week, current_day')
        .eq('user_id', userId)
        .eq('program_id', PROGRAM_ID)
        .single();

      if (pErr && pErr.code === 'PGRST116') {
        // No progress yet — return week 1 day 1
        return tasksController._fetchTask(1, 1, res, next);
      }

      if (pErr) throw pErr;

      const currentWeek = progress.current_week;

      // Subscription gate: week 2+ requires active subscription
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
      const { data: week } = await supabase
        .from('weeks')
        .select('id, week_number, phase, theme, description, anchor_video_title, anchor_video_url, ai_system_prompt')
        .eq('program_id', PROGRAM_ID)
        .eq('week_number', weekNumber)
        .single();

      if (!week) return res.status(404).json({ error: 'Week not found' });

      const { data: task } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('week_id', week.id)
        .eq('day_number', dayNumber)
        .single();

      res.json({
        task: task || null,
        week,
        position: { weekNumber, dayNumber },
      });
    } catch (err) {
      next(err);
    }
  },
};
