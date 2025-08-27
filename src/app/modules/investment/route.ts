import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { InvestmentValidations } from './validation';
import { investmentControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(InvestmentValidations.createInvestmentValidation),
  investmentControllers.createInvestment
);

router.get('/', investmentControllers.getAllInvestments);
router.get('/:id', investmentControllers.getSingleInvestment);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(InvestmentValidations.updateInvestmentValidation),
  investmentControllers.updateInvestment
);

router.delete('/:id', auth('admin', 'super_admin'), investmentControllers.deleteInvestment);

export const investmentRoutes = router;
