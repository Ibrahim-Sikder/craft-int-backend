import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ClassReportValidations } from './classreport.validation';
import { classReportControllers } from './classreport.controller';

const router = express.Router();
router.post(
  '/',
  validateRequest(ClassReportValidations.createClassReportValidation),
  classReportControllers.createClassReport,
);
// router.get(
//   '/classreport/:classreportid',
//   classReportControllers.generateClassReportPdf,
// );

router.get('/', classReportControllers.getAllClassReports);
router.get('/:id', classReportControllers.getSingleClassReport);

router.patch('/update-has-comments/all', classReportControllers.updateHasCommentsForAllReports);
router.patch(
  '/:id',
  validateRequest(ClassReportValidations.updateClassReportValidation),
  classReportControllers.updateClassReport,
);
router.delete('/:id', classReportControllers.deleteClassReport);


export const classReportRoutes = router;
