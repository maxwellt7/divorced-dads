import supabase from '../config/supabase.js';
import { logger } from '../utils/logger.js';

const PROGRAM_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export const curriculumController = {
  // GET /api/curriculum — full 16-week structure
  async getProgram(req, res, next) {
    try {
      const { data: program, error: pErr } = await supabase
        .from('programs')
        .select('*')
        .eq('id', PROGRAM_ID)
        .single();

      if (pErr) throw pErr;

      const { data: weeks, error: wErr } = await supabase
        .from('weeks')
        .select('id, week_number, phase, theme, description, anchor_video_title, anchor_video_url')
        .eq('program_id', PROGRAM_ID)
        .order('week_number');

      if (wErr) throw wErr;

      res.json({ program, weeks });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/curriculum/week/:weekNumber — single week with all 7 tasks
  async getWeek(req, res, next) {
    try {
      const { weekNumber } = req.params;
      const wn = parseInt(weekNumber, 10);

      if (isNaN(wn) || wn < 1 || wn > 16) {
        return res.status(400).json({ error: 'week_number must be 1-16' });
      }

      const { data: week, error: wErr } = await supabase
        .from('weeks')
        .select('*')
        .eq('program_id', PROGRAM_ID)
        .eq('week_number', wn)
        .single();

      if (wErr || !week) return res.status(404).json({ error: 'Week not found' });

      const { data: tasks, error: tErr } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('week_id', week.id)
        .order('day_number');

      if (tErr) throw tErr;

      res.json({ week, tasks });
    } catch (err) {
      next(err);
    }
  },
};
