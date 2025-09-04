import express from 'express';
import { incomeControllers } from './income.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { incomeSchema } from './income.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(incomeSchema),
  incomeControllers.createIncome
);

router.get('/', incomeControllers.getAllIncomes);
router.get("/total-income-category", incomeControllers.getIncomeTotalsByCategory);

router.get('/:id', incomeControllers.getSingleIncome);

router.patch(
  '/:id',
  incomeControllers.updateIncome
);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  incomeControllers.deleteIncome
);


export const incomeRoutes = router;
