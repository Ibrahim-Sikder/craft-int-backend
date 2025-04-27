import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { TodayLessonValidations } from './todaylesson.validation';
import { todayLessonControllers } from './todaylesson.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin','teacher'),
  validateRequest(TodayLessonValidations.createTodayLessonValidation),
  todayLessonControllers.createTodayLesson
);

router.get('/', todayLessonControllers.getAllTodayLessons);

router.get('/:id', todayLessonControllers.getSingleTodayLesson);

router.patch(
  '/:id',
  auth('admin', 'super_admin','teacher'),
  validateRequest(TodayLessonValidations.updateTodayLessonValidation),
  todayLessonControllers.updateTodayLesson
);

router.delete(
  '/:id',
  auth('admin', 'super_admin','teacher'),
  todayLessonControllers.deleteTodayLesson
);

export const todayLessonRoutes = router;
