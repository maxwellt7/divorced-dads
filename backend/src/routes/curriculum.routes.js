import express from 'express';
import { curriculumController } from '../controllers/curriculum.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// Curriculum is accessible to authenticated users
router.use(authenticate);

// GET /api/curriculum — full 16-week program overview
router.get('/', curriculumController.getProgram);

// GET /api/curriculum/week/:weekNumber — single week with tasks
router.get('/week/:weekNumber', curriculumController.getWeek);

export default router;
