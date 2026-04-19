import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/database.js';
import { AuthenticationError, ConflictError } from '../utils/errors.js';
import { logger } from '../utils/logger.js';

export class AuthService {
  async register({ email, password, name, phone }) {
    const [existing] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );
    if (existing.length > 0) throw new ConflictError('User with this email already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    await db.execute(
      'INSERT INTO users (id, email, password_hash, name, phone) VALUES (UUID(), ?, ?, ?, ?)',
      [email, passwordHash, name || null, phone || null]
    );

    const [[user]] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    await db.execute('INSERT INTO profiles (id, user_id) VALUES (UUID(), ?)', [user.id]);
    await db.execute('INSERT INTO user_stats (id, user_id) VALUES (UUID(), ?)', [user.id]);

    const [[profile]] = await db.execute('SELECT * FROM profiles WHERE user_id = ?', [user.id]);

    const token = this.generateToken(user);
    logger.info(`User registered: ${user.email}`);

    return { user: { ...this.sanitizeUser(user), profile: profile || null }, token };
  }

  async login({ email, password }) {
    const [[user]] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) throw new AuthenticationError('Invalid email or password');

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) throw new AuthenticationError('Invalid email or password');

    await db.execute(
      'UPDATE user_stats SET total_sessions = total_sessions + 1, last_active_at = NOW() WHERE user_id = ?',
      [user.id]
    );

    const [[profile]] = await db.execute('SELECT * FROM profiles WHERE user_id = ?', [user.id]);
    const token = this.generateToken(user);
    logger.info(`User logged in: ${user.email}`);

    return { user: { ...this.sanitizeUser(user), profile: profile || null }, token };
  }

  async getMe(userId) {
    const [[user]] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) throw new AuthenticationError('User not found');

    const [[profile]] = await db.execute('SELECT * FROM profiles WHERE user_id = ?', [userId]);
    const [[stats]] = await db.execute('SELECT * FROM user_stats WHERE user_id = ?', [userId]);

    return { ...this.sanitizeUser(user), profile: profile || null, stats: stats || null };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const [[user]] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) throw new AuthenticationError('User not found');

    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) throw new AuthenticationError('Current password is incorrect');

    const newHash = await bcrypt.hash(newPassword, 10);
    await db.execute('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, userId]);
  }

  generateToken(user) {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  sanitizeUser(user) {
    const { password_hash, ...safe } = user;
    return safe;
  }
}

export const authService = new AuthService();
