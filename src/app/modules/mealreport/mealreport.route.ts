import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { MealReportValidations } from './mealreport.validation';
import { mealReportControllers } from './mealreport.controller';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin'),
  validateRequest(MealReportValidations.createMealReportValidation),
  mealReportControllers.createMealReport
);

router.get('/', mealReportControllers.getAllMealReports);

router.get('/:id', mealReportControllers.getSingleMealReport);

router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  mealReportControllers.deleteMealReport
);

router.patch(
  '/:id',
  // auth('admin', 'super_admin', 'teacher'),
  validateRequest(MealReportValidations.updateMealReportValidation),
  mealReportControllers.updateMealReport
);

export const mealReportRoutes = router;
