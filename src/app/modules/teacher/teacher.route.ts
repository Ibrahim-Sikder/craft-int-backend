/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { teacherControllers } from './teacher.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { TeacherValidations } from './teacher.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin', 'teacher', 'student'),
  // validateRequest(TeacherValidations.createTeacherValidation),
  teacherControllers.createTeacher,
);

router.get('/', teacherControllers.getAllTeachers);

router.get('/:id', teacherControllers.getSingleTeacher);

router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  teacherControllers.deleteTeacher,
);

router.patch(
  '/:id',
  // auth('admin', 'super_admin', 'teacher'),
  // validateRequest(TeacherValidations.updateTeacherValidation),
  teacherControllers.updateTeacher,
);

export const teacherRoutes = router;
