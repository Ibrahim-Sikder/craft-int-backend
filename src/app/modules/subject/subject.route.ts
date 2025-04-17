import express from 'express';
import { subjectControllers } from './subject.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { SubjectValidations } from './subject.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(SubjectValidations.createSubjectValidation),
  subjectControllers.createSubject
);

router.get('/', subjectControllers.getAllSubjects);

router.get('/:id', subjectControllers.getSingleSubject);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(SubjectValidations.updateSubjectValidation),
  subjectControllers.updateSubject
);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  subjectControllers.deleteSubject
);

export const subjectRoutes = router;
