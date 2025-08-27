import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { LoanValidations } from './validation';
import { loanControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(LoanValidations.createLoanValidation),
  loanControllers.createLoan
);

router.get('/', loanControllers.getAllLoans);
router.get('/:id', loanControllers.getSingleLoan);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(LoanValidations.updateLoanValidation),
  loanControllers.updateLoan
);

router.delete('/:id', auth('admin', 'super_admin'), loanControllers.deleteLoan);

export const loanRoutes = router;
