import mysql from 'mysql2/promise';
import { logger } from '../utils/logger.js';

const DATABASE_URL = process.env.DATABASE_URL;
const MYSQL_URL = process.env.MYSQL_URL || process.env.MYSQL_PRIVATE_URL;

if (!DATABASE_URL && !MYSQL_URL) {
  logger.warn('No DATABASE_URL or MYSQL_URL set — DB routes will be unavailable until configured');
}

const connectionString = DATABASE_URL || MYSQL_URL;

let pool = null;

if (connectionString) {
  pool = mysql.createPool({
    uri: connectionString,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

export const db = pool;
export default pool;

export const testConnection = async () => {
  if (!pool) {
    logger.warn('Database pool not initialized');
    return false;
  }
  try {
    const [rows] = await pool.execute('SELECT 1');
    logger.info('✅ MySQL connection successful');
    return true;
  } catch (err) {
    logger.error('❌ MySQL connection failed:', err.message);
    return false;
  }
};
