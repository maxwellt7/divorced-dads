import { db } from '../config/database.js';
import { pineconeService } from '../services/pinecone.service.js';
import { emailService } from '../services/email.service.js';
import { asyncHandler } from '../middleware/error.middleware.js';
import { logger } from '../utils/logger.js';
import { JOURNEY_STATUS } from '../utils/constants.js';

export class WebhookController {
  journeyComplete = asyncHandler(async (req, res) => {
    const { journeyId, userId, days, metadata } = req.body;

    logger.info(`Journey complete webhook received: ${journeyId}`);

    await db.execute(
      'UPDATE journeys SET status = ?, journey_data = ? WHERE id = ?',
      [JOURNEY_STATUS.READY, JSON.stringify(metadata || {}), journeyId]
    );

    if (days && Array.isArray(days)) {
      for (const day of days) {
        await db.execute(
          `INSERT INTO journey_days (id, journey_id, day_number, title, description, script_text, audio_url, duration_seconds)
           VALUES (UUID(), ?, ?, ?, ?, ?, ?, ?)`,
          [journeyId, day.dayNumber, day.title, day.description,
           day.scriptText || '', day.audioUrl || '', day.durationSeconds || 0]
        );
      }
    }

    if (metadata) {
      await pineconeService.upsertCreation(journeyId, {
        userId,
        interest: metadata.interest || 'general',
        goal: metadata.goal,
        intention: metadata.intention,
        duration: metadata.duration || 15,
        rating: metadata.evaluationScore || 0,
        scriptElements: metadata.hypnoticElements || [],
      }).catch(err => logger.error('Failed to store creation in Pinecone:', err));
    }

    const [[user]] = await db.execute(
      'SELECT email, name FROM users WHERE id = ?',
      [userId]
    );

    if (user) {
      emailService.sendJourneyReadyEmail(user.email, {
        name: user.name,
        journeyId,
        goal: metadata?.goal || 'your goal',
      }).catch(err => logger.error('Failed to send journey ready email:', err));
    }

    res.json({ success: true, message: 'Journey completion processed' });
  });

  audioReady = asyncHandler(async (req, res) => {
    const { journeyId, dayNumber, audioUrl, durationSeconds } = req.body;

    logger.info(`Audio ready webhook: journey ${journeyId}, day ${dayNumber}`);

    await db.execute(
      'UPDATE journey_days SET audio_url = ?, duration_seconds = ? WHERE journey_id = ? AND day_number = ?',
      [audioUrl, durationSeconds || 0, journeyId, dayNumber]
    );

    res.json({ success: true, message: 'Audio URL updated' });
  });

  error = asyncHandler(async (req, res) => {
    const { journeyId, error: errorMessage, step } = req.body;

    logger.error(`Journey error webhook: ${journeyId} - ${errorMessage} at step ${step}`);

    await db.execute(
      'UPDATE journeys SET status = ?, journey_data = ? WHERE id = ?',
      [
        JOURNEY_STATUS.ERROR,
        JSON.stringify({ error: errorMessage, errorStep: step, errorTime: new Date().toISOString() }),
        journeyId,
      ]
    );

    res.json({ success: true, message: 'Error recorded' });
  });
}

export const webhookController = new WebhookController();
export default webhookController;
