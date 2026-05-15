import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPayment,
  getUserPayments,
  getPaymentStats
} from '../controllers/paymentController.js';

const paymentRouter = Router();

paymentRouter.post('/', protect, createPayment);
paymentRouter.get('/stats/overview', protect, getPaymentStats);
paymentRouter.get('/', protect, getUserPayments);

export default paymentRouter;
