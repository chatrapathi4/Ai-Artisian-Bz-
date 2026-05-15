import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createProduction,
  getUserProductions,
  getProductionById,
  updateProduction,
  deleteProduction
} from '../controllers/productionController.js';

const productionRouter = Router();

productionRouter.post('/', protect, createProduction);
productionRouter.get('/:id', protect, getProductionById);
productionRouter.put('/:id', protect, updateProduction);
productionRouter.delete('/:id', protect, deleteProduction);
productionRouter.get('/', protect, getUserProductions);

export default productionRouter;
