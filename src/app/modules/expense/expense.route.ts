import express from 'express';
import { expenseControllers } from './expense.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { expenseSchema } from './expense.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(expenseSchema),
  expenseControllers.createExpense,
);

router.get('/', expenseControllers.getAllExpenses);
router.get(
  '/total-expense-category',
  expenseControllers.getExpenseTotalsByCategory,
);
router.get('/:id', expenseControllers.getSingleExpense);

router.patch(
  '/:id',

  expenseControllers.updateExpense,
);


router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  expenseControllers.deleteExpense,
);

export const expenseRoutes = router;
