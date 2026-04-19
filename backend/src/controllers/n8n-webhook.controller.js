import { db } from '../config/database.js';
import { emailService } from '../services/email.service.js';
import { logger } from '../utils/logger.js';
import { JOURNEY_STATUS } from '../utils/constants.js';

export const handleJourneyComplete = async (req, res) => {
  try {
    const { journeyId, userId, status, days, completedAt, metadata } = req.body;

    logger.info(`N8N Webhook: Journey ${journeyId} completion received`);

    if (!journeyId || !userId || !status) {
      return res.status(400).json({ success: false, error: 'Invalid payload: missing required fields' });
    }

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
      logger.info(`Inserted ${days.length} days for journey ${journeyId}`);
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
      }).catch(err => logger.error('Failed to send completion email:', err));
    }

    res.status(200).json({
      success: true,
      message: 'Journey completion processed',
      journeyId,
      daysProcessed: days?.length || 0,
    });
  } catch (error) {
    logger.error('Error handling journey completion webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error', message: error.message });
  }
};

export const handleJourneyError = async (req, res) => {
  try {
    const { journeyId, userId, error: errorMessage, errorDetails } = req.body;

    logger.error(`N8N Webhook: Journey ${journeyId} error received:`, errorMessage);

    await db.execute(
      'UPDATE journeys SET status = ?, journey_data = ? WHERE id = ?',
      [
        JOURNEY_STATUS.ERROR,
        JSON.stringify({ error: errorMessage || 'Unknown error', errorDetails: errorDetails || {}, errorTime: new Date().toISOString() }),
        journeyId,
      ]
    );

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      emailService.sendEmail({
        to: adminEmail,
        subject: `Journey Generation Error - ${journeyId}`,
        html: `<h2>Journey Generation Error</h2>
          <p><strong>Journey ID:</strong> ${journeyId}</p>
          <p><strong>User ID:</strong> ${userId}</p>
          <p><strong>Error:</strong> ${errorMessage}</p>
          <pre>${JSON.stringify(errorDetails, null, 2)}</pre>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>`,
      }).catch(err => logger.error('Failed to send error notification:', err));
    }

    res.status(200).json({ success: true, message: 'Error recorded' });
  } catch (error) {
    logger.error('Error handling journey error webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const handleJourneyProgress = async (req, res) => {
  try {
    const { journeyId, currentDay, totalDays } = req.body;

    logger.info(`N8N Webhook: Journey ${journeyId} progress - Day ${currentDay}/${totalDays}`);

    const [[current]] = await db.execute(
      'SELECT journey_data FROM journeys WHERE id = ?',
      [journeyId]
    );

    if (!current) {
      return res.status(404).json({ success: false, error: 'Journey not found' });
    }

    const existing = typeof current.journey_data === 'string'
      ? JSON.parse(current.journey_data)
      : (current.journey_data || {});

    const updatedData = {
      ...existing,
      currentDay,
      totalDays,
      progress: totalDays > 0 ? Math.round((currentDay / totalDays) * 100) : 0,
    };

    await db.execute(
      'UPDATE journeys SET journey_data = ? WHERE id = ?',
      [JSON.stringify(updatedData), journeyId]
    );

    res.status(200).json({ success: true, message: 'Progress updated' });
  } catch (error) {
    logger.error('Error handling journey progress webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

export const handleAudioReady = async (req, res) => {
  try {
    const { journeyId, dayNumber, audioUrl, durationSeconds } = req.body;

    logger.info(`N8N Webhook: Audio ready for journey ${journeyId}, day ${dayNumber}`);

    await db.execute(
      'UPDATE journey_days SET audio_url = ?, duration_seconds = ? WHERE journey_id = ? AND day_number = ?',
      [audioUrl, durationSeconds || 0, journeyId, dayNumber]
    );

    res.status(200).json({ success: true, message: 'Audio URL updated' });
  } catch (error) {
    logger.error('Error handling audio ready webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
