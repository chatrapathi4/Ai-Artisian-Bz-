import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getWeeklySummary,
  getMonthlySummary
} from '../controllers/reportController.js';

const reportRouter = Router();

reportRouter.get('/weekly', protect, getWeeklySummary);
reportRouter.get('/monthly', protect, getMonthlySummary);

export default reportRouter;
