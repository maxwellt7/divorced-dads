import { Pinecone } from '@pinecone-database/pinecone';
import { logger } from '../utils/logger.js';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;

if (!PINECONE_API_KEY) {
  logger.warn('Pinecone configuration missing — vector search routes will be unavailable until PINECONE_API_KEY is set');
}

// Initialize Pinecone client — null if API key not yet configured
export const pinecone = PINECONE_API_KEY
  ? new Pinecone({
      apiKey: PINECONE_API_KEY,
      environment: PINECONE_ENVIRONMENT,
    })
  : null;

const requirePinecone = () => {
  if (!pinecone) throw new Error('PINECONE_API_KEY is not configured');
  return pinecone;
};

// Get index references
export const getUserInfoIndex = () => requirePinecone().index(process.env.PINECONE_INDEX_USER_INFO || 'user-information');
export const getKnowledgeIndex = () => requirePinecone().index(process.env.PINECONE_INDEX_KNOWLEDGE || 'divorced-dads-knowledge');
export const getCreationsIndex = () => requirePinecone().index(process.env.PINECONE_INDEX_CREATIONS || 'past-creations');
export const getTrendsIndex = () => requirePinecone().index(process.env.PINECONE_INDEX_TRENDS || 'interest-trends');

// Test connection
export const testPineconeConnection = async () => {
  if (!pinecone) { logger.warn('Pinecone not configured, skipping test'); return false; }
  try {
    const indexes = await pinecone.listIndexes();
    logger.info('✅ Pinecone connection successful');
    logger.info(`Found ${indexes.indexes?.length || 0} Pinecone indexes`);
    return true;
  } catch (error) {
    logger.error('❌ Pinecone connection failed:', error.message);
    return false;
  }
};

export default pinecone;

