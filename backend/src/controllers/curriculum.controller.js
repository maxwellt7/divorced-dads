import { db } from '../config/database.js';

const PROGRAM_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export const curriculumController = {
  async getProgram(req, res, next) {
    try {
      const [[program]] = await db.execute(
        'SELECT * FROM programs WHERE id = ?',
        [PROGRAM_ID]
      );
      if (!program) return res.status(404).json({ error: 'Program not found' });

      const [weeks] = await db.execute(
        'SELECT id, week_number, phase, theme, description, anchor_video_title, anchor_video_url FROM weeks WHERE program_id = ? ORDER BY week_number',
        [PROGRAM_ID]
      );

      res.json({ program, weeks });
    } catch (err) {
      next(err);
    }
  },

  async getWeek(req, res, next) {
    try {
      const wn = parseInt(req.params.weekNumber, 10);
      if (isNaN(wn) || wn < 1 || wn > 16) {
        return res.status(400).json({ error: 'week_number must be 1-16' });
      }

      const [[week]] = await db.execute(
        'SELECT * FROM weeks WHERE program_id = ? AND week_number = ?',
        [PROGRAM_ID, wn]
      );
      if (!week) return res.status(404).json({ error: 'Week not found' });

      const [tasks] = await db.execute(
        'SELECT * FROM daily_tasks WHERE week_id = ? ORDER BY day_number',
        [week.id]
      );

      res.json({ week, tasks });
    } catch (err) {
      next(err);
    }
  },
};
