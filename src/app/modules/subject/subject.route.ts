import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { subjectValidation } from './subject.validation';
import { subjectControllers } from './subject.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(subjectValidation.createSubjectSchema),
  subjectControllers.createSubject
);

router.get('/', subjectControllers.getAllSubjects);

router.get('/:id', subjectControllers.getSingleSubject);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(subjectValidation.updateSubjectSchema),
  subjectControllers.updateSubject
);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  subjectControllers.deleteSubject
);

export const subjectRoutes = router;
