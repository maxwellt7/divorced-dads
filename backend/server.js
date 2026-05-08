// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
dotenv.config();

// Now import the rest after env vars are loaded
import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { testConnection } from './src/config/database.js';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Required for Railway
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server - bind to 0.0.0.0 for Railway
const server = app.listen(PORT, HOST, async () => {
  logger.info(`🚀 Server running in ${NODE_ENV} mode on ${HOST}:${PORT}`);
  logger.info(`📝 API available at http://localhost:${PORT}`);
  await testConnection();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

export default server;

