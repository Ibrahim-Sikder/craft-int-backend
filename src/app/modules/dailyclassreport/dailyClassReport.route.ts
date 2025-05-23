import express from 'express';
import { dailyClassReportControllers } from './dailyClassReport.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { DailyClassReportValidations } from './dailyClassReport.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'teacher', 'super_admin'),
  validateRequest(DailyClassReportValidations.createReportValidation),
  dailyClassReportControllers.createDailyClassReport
);

router.get('/', dailyClassReportControllers.getAllDailyClassReports);

router.get('/:id', dailyClassReportControllers.getSingleDailyClassReport);

router.patch(
  '/:id',
  auth('admin', 'teacher', 'super_admin'),
  validateRequest(DailyClassReportValidations.updateReportValidation),
  dailyClassReportControllers.updateDailyClassReport
);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  dailyClassReportControllers.deleteDailyClassReport
);

export const dailyClassReportRoutes = router;
