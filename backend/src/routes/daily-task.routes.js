import express from 'express';
import { tasksController } from '../controllers/tasks.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

// GET /api/daily-task — returns user's current task based on their progress
router.get('/', tasksController.getDailyTask);

export default router;
