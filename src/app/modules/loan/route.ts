// loan/routes.ts
import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { LoanValidations } from './validation';
import { loanControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(LoanValidations.createLoanValidation),
  loanControllers.createLoan
);

router.get('/', loanControllers.getAllLoans);
router.get('/:id', loanControllers.getSingleLoan);

router.patch(
  '/:id',
  validateRequest(LoanValidations.updateLoanValidation),
  loanControllers.updateLoan
);

router.delete('/:id', loanControllers.deleteLoan);

// New routes for loan management
router.post(
  '/:id/repayments',
  validateRequest(LoanValidations.addRepaymentValidation),
  loanControllers.addRepayment
);

router.post(
  '/:id/transfer',
  validateRequest(LoanValidations.transferLoanValidation),
  loanControllers.transferLoan
);

router.get(
  '/:id/amortization',
  loanControllers.getAmortization
);

export const loanRoutes = router;