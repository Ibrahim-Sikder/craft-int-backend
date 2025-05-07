import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { ClassReportValidations } from './classreport.validation';
import { classReportControllers } from './classreport.controller';

const router = express.Router();
router.post(
  '/',
  auth('admin', 'super_admin','teacher', 'class_teacher'),
  validateRequest(ClassReportValidations.createClassReportValidation),
  classReportControllers.createClassReport,
);

router.get('/', classReportControllers.getAllClassReports);
router.get('/:id', classReportControllers.getSingleClassReport);

router.patch(
  '/:id',
  auth('admin', 'super_admin','teacher','class_teacher'),
  validateRequest(ClassReportValidations.updateClassReportValidation),
  classReportControllers.updateClassReport,
);
router.delete(
  '/:id',
  auth('admin', 'super_admin','teacher','class_teacher'),
  classReportControllers.deleteClassReport,
);

export const classReportRoutes = router;
