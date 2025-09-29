import express from 'express';
import { nazeraDailyReportControllers } from './controller';
import { NazeraDailyReportValidation } from './validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(NazeraDailyReportValidation),
  nazeraDailyReportControllers.createNazeraDailyReport
);

router.get('/', nazeraDailyReportControllers.getAllNazeraDailyReports);

router.get('/:id', nazeraDailyReportControllers.getSingleNazeraDailyReport);

router.patch(
  '/:id',
  validateRequest(NazeraDailyReportValidation.partial()),
  nazeraDailyReportControllers.updateNazeraDailyReport
);

router.delete('/:id', nazeraDailyReportControllers.deleteNazeraDailyReport);

router.get('/student/:studentName', nazeraDailyReportControllers.getReportsByStudent);

export const nazeraDailyReportRoutes = router;