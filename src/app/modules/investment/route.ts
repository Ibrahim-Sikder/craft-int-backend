// investment/routes.ts
import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { InvestmentValidations } from './validation';
import { investmentControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(InvestmentValidations.createInvestmentValidation),
  investmentControllers.createInvestment
);

router.get('/', investmentControllers.getAllInvestments);
router.get('/:id', investmentControllers.getSingleInvestment);

router.patch(
  '/:id',
  validateRequest(InvestmentValidations.updateInvestmentValidation),
  investmentControllers.updateInvestment
);

router.delete('/:id', investmentControllers.deleteInvestment);

// New routes for investment management
router.post(
  '/:id/returns',
  validateRequest(InvestmentValidations.addReturnValidation),
  investmentControllers.addReturn
);

router.post(
  '/:id/close',
  investmentControllers.closeInvestment
);

router.get(
  '/:id/performance',
  investmentControllers.getPerformance
);

export const investmentRoutes = router;