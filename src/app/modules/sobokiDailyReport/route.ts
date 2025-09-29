import express from 'express';
import { sobokiDailyReportControllers } from './controller';
import { SobokiDailyReportValidation } from './validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  // validateRequest(SobokiDailyReportValidation),
  sobokiDailyReportControllers.createSobokiDailyReport
);

router.get('/', sobokiDailyReportControllers.getAllSobokiDailyReports);

router.get('/:id', sobokiDailyReportControllers.getSingleSobokiDailyReport);

router.patch(
  '/:id',
  validateRequest(SobokiDailyReportValidation.partial()),
  sobokiDailyReportControllers.updateSobokiDailyReport
);

router.delete('/:id', sobokiDailyReportControllers.deleteSobokiDailyReport);

router.get('/student/:studentName', sobokiDailyReportControllers.getReportsByStudent);

export const sobokiDailyReportRoutes = router;