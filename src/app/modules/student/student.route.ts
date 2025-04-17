import express from 'express';
import { studentControllers } from './student.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(StudentValidations.createStudentValidation),
  studentControllers.createStudent,
);

router.get('/', studentControllers.getAllStudents);

router.get('/:id', studentControllers.getSingleStudent);

router.delete(
  '/:id',
  auth('admin', 'super_admin'),
  studentControllers.deleteStudent,
);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(StudentValidations.updateStudentValidation),
  studentControllers.updateStudent,
);

export const studentRoutes = router;
