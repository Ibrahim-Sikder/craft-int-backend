import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { hifzClassReportControllers } from './controller';
import { hifzReportValidation } from './validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(hifzReportValidation),
  hifzClassReportControllers.createHifzClassReport
);

router.get('/', hifzClassReportControllers.getAllHifzClassReports);
router.get('/:id', hifzClassReportControllers.getSingleHifzClassReport);

router.patch(
  '/:id',
  hifzClassReportControllers.updateHifzClassReport
);

router.delete('/:id',  hifzClassReportControllers.deleteHifzClassReport);

export const hifzClassReportRoutes = router;
