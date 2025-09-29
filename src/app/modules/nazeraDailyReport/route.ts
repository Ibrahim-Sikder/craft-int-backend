import express from 'express';
import { nazeraDailyReportControllers } from './controller';
import { NazeraReportValidation } from './validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(NazeraReportValidation), 
  nazeraDailyReportControllers.createNazeraDailyReport
);

router.get('/', nazeraDailyReportControllers.getAllNazeraDailyReports);

router.get('/:id', nazeraDailyReportControllers.getSingleNazeraDailyReport);

router.patch(
  '/:id',
  validateRequest(NazeraReportValidation.partial()),
  nazeraDailyReportControllers.updateNazeraDailyReport
);

router.delete('/:id', nazeraDailyReportControllers.deleteNazeraDailyReport);

router.get('/student/:studentName', nazeraDailyReportControllers.getReportsByStudent);

export const nazeraDailyReportRoutes = router;
