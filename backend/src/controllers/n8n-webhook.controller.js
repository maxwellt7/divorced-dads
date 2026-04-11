/**
 * N8N Webhook Controller
 * Handles webhook callbacks from n8n workflow
 */

import { supabase } from '../config/supabase.js';
import { emailService } from '../services/email.service.js';
import { logger } from '../utils/logger.js';
import { JOURNEY_STATUS } from '../utils/constants.js';

/**
 * Handle journey completion webhook from n8n
 * POST /api/webhooks/n8n/journey-complete
 */
export const handleJourneyComplete = async (req, res) => {
  try {
    const { journeyId, userId, status, days, completedAt, metadata } = req.body;

    logger.info(`N8N Webhook: Journey ${journeyId} completion received`);

    if (!journeyId || !userId || !status) {
      logger.error('Invalid webhook payload:', req.body);
      return res.status(400).json({
        success: false,
        error: 'Invalid payload: missing required fields',
      });
    }

    // Update journey status in Supabase
    const { error: updateError } = await supabase
      .from('journeys')
      .update({
        status: JOURNEY_STATUS.READY,
        journey_data: metadata || {},
        updated_at: new Date().toISOString(),
      })
      .eq('id', journeyId);

    if (updateError) {
      logger.error(`Failed to update journey ${journeyId}:`, updateError);
      return res.status(500).json({ success: false, error: 'Failed to update journey' });
    }

    logger.info(`Journey ${journeyId} updated successfully`);

    // Store day data if provided
    if (days && Array.isArray(days)) {
      for (const day of days) {
        await supabase.from('journey_days').insert({
          journey_id: journeyId,
          day_number: day.dayNumber,
          title: day.title,
          description: day.description,
          script_text: day.scriptText || '',
          audio_url: day.audioUrl || '',
          duration_seconds: day.durationSeconds || 0,
        });
      }
      logger.info(`Inserted ${days.length} days for journey ${journeyId}`);
    }

    // Get user data for email notification
    const { data: user } = await supabase
      .from('users')
      .select('email, name')
      .eq('id', userId)
      .single();

    if (user) {
      emailService.sendJourneyReadyEmail(user.email, {
        name: user.name,
        journeyId,
        goal: metadata?.goal || 'your goal',
      }).catch(err => {
        logger.error('Failed to send completion email:', err);
      });
    }

    res.status(200).json({
      success: true,
      message: 'Journey completion processed',
      journeyId,
      daysProcessed: days?.length || 0,
    });

  } catch (error) {
    logger.error('Error handling journey completion webhook:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
};

/**
 * Handle journey error webhook from n8n
 * POST /api/webhooks/n8n/journey-error  (also /error for legacy)
 */
export const handleJourneyError = async (req, res) => {
  try {
    const { journeyId, userId, error: errorMessage, errorDetails } = req.body;

    logger.error(`N8N Webhook: Journey ${journeyId} error received:`, errorMessage);

    const { error: updateError } = await supabase
      .from('journeys')
      .update({
        status: JOURNEY_STATUS.ERROR,
        journey_data: {
          error: errorMessage || 'Unknown error',
          errorDetails: errorDetails || {},
          errorTime: new Date().toISOString(),
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', journeyId);

    if (updateError) {
      logger.error(`Failed to update journey error status ${journeyId}:`, updateError);
    }

    // Notify admin about error
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
      }).catch(err => {
        logger.error('Failed to send error notification:', err);
      });
    }

    res.status(200).json({ success: true, message: 'Error recorded' });

  } catch (error) {
    logger.error('Error handling journey error webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

/**
 * Handle journey progress update webhook from n8n
 * POST /api/webhooks/n8n/journey-progress
 */
export const handleJourneyProgress = async (req, res) => {
  try {
    const { journeyId, currentDay, totalDays } = req.body;

    logger.info(`N8N Webhook: Journey ${journeyId} progress - Day ${currentDay}/${totalDays}`);

    // Fetch current journey_data then merge progress fields
    const { data: current, error: fetchError } = await supabase
      .from('journeys')
      .select('journey_data')
      .eq('id', journeyId)
      .single();

    if (fetchError) {
      logger.error(`Failed to fetch journey ${journeyId}:`, fetchError);
      return res.status(500).json({ success: false, error: 'Failed to fetch journey' });
    }

    const updatedJourneyData = {
      ...(current?.journey_data || {}),
      currentDay,
      totalDays,
      progress: totalDays > 0 ? Math.round((currentDay / totalDays) * 100) : 0,
    };

    await supabase
      .from('journeys')
      .update({ journey_data: updatedJourneyData, updated_at: new Date().toISOString() })
      .eq('id', journeyId);

    res.status(200).json({ success: true, message: 'Progress updated' });

  } catch (error) {
    logger.error('Error handling journey progress webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

/**
 * Handle audio ready webhook from n8n
 * POST /api/webhooks/n8n/audio-ready
 */
export const handleAudioReady = async (req, res) => {
  try {
    const { journeyId, dayNumber, audioUrl, durationSeconds } = req.body;

    logger.info(`N8N Webhook: Audio ready for journey ${journeyId}, day ${dayNumber}`);

    await supabase
      .from('journey_days')
      .update({
        audio_url: audioUrl,
        duration_seconds: durationSeconds || 0,
      })
      .eq('journey_id', journeyId)
      .eq('day_number', dayNumber);

    res.status(200).json({ success: true, message: 'Audio URL updated' });

  } catch (error) {
    logger.error('Error handling audio ready webhook:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
