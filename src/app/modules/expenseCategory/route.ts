import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { ExpenseCategoryValidations } from './validation';
import { expenseCategoryControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(ExpenseCategoryValidations.createExpenseCategoryValidation),
  expenseCategoryControllers.createExpenseCategory
);

router.get('/', expenseCategoryControllers.getAllExpenseCategorys);
router.get('/:id', expenseCategoryControllers.getSingleExpenseCategory);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(ExpenseCategoryValidations.updateExpenseCategoryValidation),
  expenseCategoryControllers.updateExpenseCategory
);

router.delete('/:id', auth('admin', 'super_admin'), expenseCategoryControllers.deleteExpenseCategory);

export const expenseCategoryRoutes = router;
