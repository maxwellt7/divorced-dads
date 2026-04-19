import { db } from '../config/database.js';
import { n8nService } from './n8n.service.js';
import { pineconeService } from './pinecone.service.js';
import { logger } from '../utils/logger.js';
import { NotFoundError, AuthorizationError } from '../utils/errors.js';
import { JOURNEY_STATUS } from '../utils/constants.js';

export class JourneyService {
  async createJourney(userId, journeyData) {
    const journeyId = (await db.execute(
      `INSERT INTO journeys (id, user_id, goal, intention, status, journey_data)
       VALUES (UUID(), ?, ?, ?, ?, ?)`,
      [
        userId,
        journeyData.goal,
        journeyData.intention,
        JOURNEY_STATUS.CREATING,
        JSON.stringify({ duration: journeyData.duration || 15, preferences: journeyData.preferences || {} }),
      ]
    ))[0].insertId;

    const [[journey]] = await db.execute(
      'SELECT * FROM journeys WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
      [userId]
    );

    const [[profile]] = await db.execute(
      'SELECT * FROM profiles WHERE user_id = ?',
      [userId]
    );

    const userContext = await pineconeService.searchUserInformation(
      userId,
      `${journeyData.goal} ${journeyData.intention}`,
      5
    );

    await n8nService.triggerJourneyCreation({
      journeyId: journey.id,
      userId,
      goal: journeyData.goal,
      intention: journeyData.intention,
      duration: journeyData.duration || profile?.preference_duration || 15,
      userProfile: profile,
      userContext: userContext?.map(m => m.metadata) || [],
    });

    logger.info(`Journey created: ${journey.id} for user: ${userId}`);
    return journey;
  }

  async getJourney(journeyId, userId) {
    const [[journey]] = await db.execute(
      'SELECT * FROM journeys WHERE id = ?',
      [journeyId]
    );
    if (!journey) throw new NotFoundError('Journey');
    if (journey.user_id !== userId) throw new AuthorizationError();

    const [days] = await db.execute(
      `SELECT id, day_number, title, description, audio_url, duration_seconds, completed, completed_at, created_at
       FROM journey_days WHERE journey_id = ? ORDER BY day_number`,
      [journeyId]
    );

    if (journey.journey_data && typeof journey.journey_data === 'string') {
      journey.journey_data = JSON.parse(journey.journey_data);
    }

    return { ...journey, journey_days: days };
  }

  async listJourneys(userId, options = {}) {
    let sql = 'SELECT * FROM journeys WHERE user_id = ?';
    const params = [userId];

    if (options.status) {
      sql += ' AND status = ?';
      params.push(options.status);
    }

    sql += ' ORDER BY created_at DESC';

    if (options.limit) {
      sql += ' LIMIT ?';
      params.push(options.limit);
    }

    const [journeys] = await db.execute(sql, params);

    for (const j of journeys) {
      if (j.journey_data && typeof j.journey_data === 'string') {
        j.journey_data = JSON.parse(j.journey_data);
      }
      const [days] = await db.execute(
        'SELECT id, day_number, completed FROM journey_days WHERE journey_id = ?',
        [j.id]
      );
      j.journey_days = days;
    }

    return journeys;
  }

  async getJourneyDay(journeyId, dayNumber, userId) {
    const [[journey]] = await db.execute(
      'SELECT user_id FROM journeys WHERE id = ?',
      [journeyId]
    );
    if (!journey || journey.user_id !== userId) throw new AuthorizationError();

    const [[day]] = await db.execute(
      'SELECT * FROM journey_days WHERE journey_id = ? AND day_number = ?',
      [journeyId, dayNumber]
    );
    if (!day) throw new NotFoundError('Journey day');

    return day;
  }

  async markDayComplete(journeyId, dayNumber, userId) {
    const [[journey]] = await db.execute(
      'SELECT user_id FROM journeys WHERE id = ?',
      [journeyId]
    );
    if (!journey || journey.user_id !== userId) throw new AuthorizationError();

    const [[day]] = await db.execute(
      'SELECT * FROM journey_days WHERE journey_id = ? AND day_number = ?',
      [journeyId, dayNumber]
    );
    if (!day) throw new NotFoundError('Journey day');

    await db.execute(
      'UPDATE journey_days SET completed = 1, completed_at = NOW() WHERE id = ?',
      [day.id]
    );

    await this.updateUserStats(userId, day.duration_seconds || 0);
    await this.checkJourneyCompletion(journeyId);

    const [[updated]] = await db.execute(
      'SELECT * FROM journey_days WHERE id = ?',
      [day.id]
    );

    logger.info(`Day ${dayNumber} marked complete for journey: ${journeyId}`);
    return updated;
  }

  async updateUserStats(userId, durationSeconds) {
    try {
      const durationMinutes = Math.floor(durationSeconds / 60);
      const today = new Date().toISOString().split('T')[0];

      const [[stats]] = await db.execute(
        'SELECT current_streak, longest_streak, last_session_date, total_minutes_listened, total_sessions FROM user_stats WHERE user_id = ?',
        [userId]
      );
      if (!stats) return;

      let newStreak = stats.current_streak;
      if (stats.last_session_date) {
        const diffDays = Math.floor(
          (new Date(today) - new Date(stats.last_session_date)) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) newStreak += 1;
        else if (diffDays > 1) newStreak = 1;
      } else {
        newStreak = 1;
      }

      await db.execute(
        `UPDATE user_stats SET
          current_streak = ?, longest_streak = ?,
          total_minutes_listened = total_minutes_listened + ?,
          total_sessions = total_sessions + 1,
          last_session_date = ?
         WHERE user_id = ?`,
        [newStreak, Math.max(stats.longest_streak, newStreak), durationMinutes, today, userId]
      );

      logger.info(`Stats updated for user: ${userId}`);
    } catch (error) {
      logger.error('Error updating user stats:', error);
    }
  }

  async checkJourneyCompletion(journeyId) {
    try {
      const [days] = await db.execute(
        'SELECT completed FROM journey_days WHERE journey_id = ?',
        [journeyId]
      );
      if (!days.length) return;

      if (days.every(d => d.completed)) {
        await db.execute(
          "UPDATE journeys SET status = ? WHERE id = ?",
          [JOURNEY_STATUS.COMPLETED, journeyId]
        );
        logger.info(`Journey completed: ${journeyId}`);
      }
    } catch (error) {
      logger.error('Error checking journey completion:', error);
    }
  }

  async deleteJourney(journeyId, userId) {
    const [[journey]] = await db.execute(
      'SELECT user_id FROM journeys WHERE id = ?',
      [journeyId]
    );
    if (!journey || journey.user_id !== userId) throw new AuthorizationError();

    await db.execute('DELETE FROM journeys WHERE id = ?', [journeyId]);
    logger.info(`Journey deleted: ${journeyId}`);
  }
}

export const journeyService = new JourneyService();
export default journeyService;
