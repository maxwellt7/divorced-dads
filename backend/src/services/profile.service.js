import { db } from '../config/database.js';
import { pineconeService } from './pinecone.service.js';
import { logger } from '../utils/logger.js';
import { NotFoundError } from '../utils/errors.js';

export class ProfileService {
  async getProfile(userId) {
    const [[data]] = await db.execute(
      'SELECT * FROM profiles WHERE user_id = ?',
      [userId]
    );
    if (!data) throw new NotFoundError('Profile');
    return data;
  }

  async updateProfile(userId, updates) {
    const allowed = ['display_name', 'bio', 'avatar_url', 'timezone', 'notification_preferences'];
    const fields = Object.keys(updates).filter(k => allowed.includes(k));
    if (fields.length === 0) return this.getProfile(userId);

    const sets = fields.map(f => `${f} = ?`).join(', ');
    const values = fields.map(f => updates[f]);

    await db.execute(
      `UPDATE profiles SET ${sets} WHERE user_id = ?`,
      [...values, userId]
    );

    logger.info(`Profile updated for user: ${userId}`);
    return this.getProfile(userId);
  }

  async completeOnboarding(userId, onboardingData) {
    await db.execute(
      `UPDATE profiles SET onboarding_completed = 1, onboarding_data = ? WHERE user_id = ?`,
      [JSON.stringify(onboardingData), userId]
    );

    await pineconeService.upsertUserInformation(userId, {
      type: 'onboarding',
      data: onboardingData,
      metadata: { completed_at: new Date().toISOString() },
    });

    logger.info(`Onboarding completed for user: ${userId}`);
    return this.getProfile(userId);
  }

  async getOnboardingData(userId) {
    const [[data]] = await db.execute(
      'SELECT onboarding_data, onboarding_completed FROM profiles WHERE user_id = ?',
      [userId]
    );
    if (!data) throw new NotFoundError('Profile');
    if (data.onboarding_data && typeof data.onboarding_data === 'string') {
      data.onboarding_data = JSON.parse(data.onboarding_data);
    }
    return data;
  }
}

export const profileService = new ProfileService();
export default profileService;
