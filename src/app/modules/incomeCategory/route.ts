import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { IncomeCategoryValidations } from './validation';
import { incomeCategoryControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin'),
  validateRequest(IncomeCategoryValidations.createIncomeCategoryValidation),
  incomeCategoryControllers.createIncomeCategory
);

router.get('/', incomeCategoryControllers.getAllIncomeCategorys);
router.get('/:id', incomeCategoryControllers.getSingleIncomeCategory);

router.patch(
  '/:id',
  // auth('admin', 'super_admin'),
  validateRequest(IncomeCategoryValidations.updateIncomeCategoryValidation),
  incomeCategoryControllers.updateIncomeCategory
);

router.delete('/:id', 
  // auth('admin', 'super_admin'), 
incomeCategoryControllers.deleteIncomeCategory);

export const incomeCategoryRoutes = router;
