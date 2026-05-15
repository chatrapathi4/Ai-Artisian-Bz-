import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  analyzePriceRange,
  detectDefects,
  getQualityAdvice
} from '../controllers/aiController.js';

const aiRouter = Router();

aiRouter.post('/price-analysis', protect, analyzePriceRange);
aiRouter.post('/defect-detection', protect, detectDefects);
aiRouter.post('/quality-advice', protect, getQualityAdvice);

export default aiRouter;
