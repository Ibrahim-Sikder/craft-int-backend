import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { TransactionValidations } from './validation';
import { transactionControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(TransactionValidations.createTransactionValidation),
  transactionControllers.createTransaction
);

router.get('/', transactionControllers.getAllTransactions);
router.get('/:id', transactionControllers.getSingleTransaction);

router.patch(
  '/:id',
  validateRequest(TransactionValidations.updateTransactionValidation),
  transactionControllers.updateTransaction
);

router.delete('/:id', transactionControllers.deleteTransaction);

export const transactionRoutes = router;
