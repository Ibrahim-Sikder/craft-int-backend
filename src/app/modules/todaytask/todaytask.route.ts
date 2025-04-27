import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { todayTaskControllers } from './todaytask.controller';
import { TodayTaskValidations } from './todaytask.validation';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin','teacher'),
  validateRequest(TodayTaskValidations.createTodayTaskValidation),
  todayTaskControllers.createTodayTask
);

router.get('/', todayTaskControllers.getAllTodayTasks);

router.get('/:id', todayTaskControllers.getSingleTodayTask);

router.patch(
  '/:id',
  auth('admin', 'super_admin','teacher'),
  validateRequest(TodayTaskValidations.updateTodayTaskValidation),
  todayTaskControllers.updateTodayTask
);

router.delete(
  '/:id',
  auth('admin', 'super_admin','teacher'),
  todayTaskControllers.deleteTodayTask
);

export const todayTaskRoutes = router;
