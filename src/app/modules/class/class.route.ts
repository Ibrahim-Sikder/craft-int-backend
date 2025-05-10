import express from 'express';
import { classControllers } from './class.controller';

import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { ClassValidations } from './class.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin','class_teacher'),
  validateRequest(ClassValidations.createClassValidation),
  classControllers.createClass
);

router.get('/', classControllers.getAllClasses);

router.get('/:id', classControllers.getSingleClass);

router.delete(
  '/:id',
  auth('admin', 'super_admin','class_teacher'),
  classControllers.deleteClass
);

router.patch(
  '/:id',
  auth('admin', 'super_admin','class_teacher'),
  validateRequest(ClassValidations.updateClassValidation),
  classControllers.updateClass
);

export const classRoutes = router;
