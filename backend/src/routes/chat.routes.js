import express from 'express';
import { chatController } from '../controllers/chat.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

// POST /api/chat — AI chat for the daily task flow
router.post('/', chatController.chat);

export default router;
