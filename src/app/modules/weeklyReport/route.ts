import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { weeklyReportControllers } from './controller';
import { WeeklyReportValidations } from './validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(WeeklyReportValidations.createWeeklyReportValidation),
  weeklyReportControllers.createWeeklyReport
);

router.get('/', weeklyReportControllers.getAllWeeklyReports);

router.get('/:id', weeklyReportControllers.getSingleWeeklyReport);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(WeeklyReportValidations.updateWeeklyReportValidation),
  weeklyReportControllers.updateWeeklyReport
);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  weeklyReportControllers.deleteWeeklyReport
);

export const weeklyReportRoutes = router;
