import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { TransactionValidations } from './validation';
import { transactionControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(TransactionValidations.createTransactionValidation),
  transactionControllers.createTransaction
);

router.get('/', transactionControllers.getAllTransactions);
router.get('/:id', transactionControllers.getSingleTransaction);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(TransactionValidations.updateTransactionValidation),
  transactionControllers.updateTransaction
);

router.delete('/:id', auth('admin', 'super_admin'), transactionControllers.deleteTransaction);

export const transactionRoutes = router;
