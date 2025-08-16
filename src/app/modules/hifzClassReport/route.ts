import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { HifzClassReportValidations } from './validation';
import { hifzClassReportControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(HifzClassReportValidations.createHifzClassReportValidation),
  hifzClassReportControllers.createHifzClassReport
);

router.get('/', hifzClassReportControllers.getAllHifzClassReports);
router.get('/:id', hifzClassReportControllers.getSingleHifzClassReport);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(HifzClassReportValidations.updateHifzClassReportValidation),
  hifzClassReportControllers.updateHifzClassReport
);

router.delete('/:id', auth('admin', 'super_admin'), hifzClassReportControllers.deleteHifzClassReport);

export const hifzClassReportRoutes = router;
