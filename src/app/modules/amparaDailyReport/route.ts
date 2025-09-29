import express from 'express';
import { amparaDailyReportControllers } from './controller';
import { AmparaDailyReportValidation } from './validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(AmparaDailyReportValidation),
  amparaDailyReportControllers.createAmparaDailyReport
);

router.get('/', amparaDailyReportControllers.getAllAmparaDailyReports);

router.get('/:id', amparaDailyReportControllers.getSingleAmparaDailyReport);

router.patch(
  '/:id',
  validateRequest(AmparaDailyReportValidation.partial()),
  amparaDailyReportControllers.updateAmparaDailyReport
);

router.delete('/:id', amparaDailyReportControllers.deleteAmparaDailyReport);

router.get('/student/:studentName', amparaDailyReportControllers.getReportsByStudent);

export const amparaDailyReportRoutes = router;