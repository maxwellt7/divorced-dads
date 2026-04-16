import express from 'express';
import { progressController } from '../controllers/progress.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

// GET /api/progress
router.get('/', progressController.get);

// POST /api/progress/complete-task
router.post('/complete-task', progressController.completeTask);

// PATCH /api/progress/onboarding
router.patch('/onboarding', progressController.saveOnboarding);

export default router;
