import express from 'express';
import { tasksController } from '../controllers/tasks.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

// GET /api/tasks/:weekNumber/:dayNumber
router.get('/:weekNumber/:dayNumber', tasksController.getTask);

export default router;
