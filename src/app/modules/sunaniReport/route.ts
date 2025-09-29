import express from 'express';
import { sunaniReportControllers } from './controller';
import { SunaniReportValidation } from './validation';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(SunaniReportValidation),
  sunaniReportControllers.createSunaniReport
);

router.get('/', sunaniReportControllers.getAllSunaniReports);

router.get('/:id', sunaniReportControllers.getSingleSunaniReport);

router.patch(
  '/:id',
  validateRequest(SunaniReportValidation.partial()),
  sunaniReportControllers.updateSunaniReport
);

router.delete('/:id', sunaniReportControllers.deleteSunaniReport);

router.get('/student/:studentName', sunaniReportControllers.getReportsByStudent);

export const sunaniReportRoutes = router;