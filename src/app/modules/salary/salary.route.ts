import express from 'express';
import { salaryControllers } from './salary.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { createSalarySchema } from './salary.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createSalarySchema),
  salaryControllers.createSalary
);

router.get('/', salaryControllers.getAllSalaries);

router.get('/:id', salaryControllers.getSingleSalary);

router.patch(
  '/:id',
  salaryControllers.updateSalary
);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  salaryControllers.deleteSalary
);

export const salaryRoutes = router;
