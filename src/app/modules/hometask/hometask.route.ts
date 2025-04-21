import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { HomeTaskValidations } from './hometask.validation';
import { homeTaskControllers } from './hometask.controller';


const router = express.Router();

router.post(
  '/',
  auth('admin', 'admin'),
  validateRequest(HomeTaskValidations.createHomeTaskValidation),
  homeTaskControllers.createHomeTask
);

router.get('/', homeTaskControllers.getAllHomeTasks);

router.get('/:id', homeTaskControllers.getSingleHomeTask);

router.patch(
  '/:id',
  auth('admin', 'teacher'),
  validateRequest(HomeTaskValidations.updateHomeTaskValidation),
  homeTaskControllers.updateHomeTask
);

router.delete(
  '/:id',
  auth('admin', 'teacher'),
  homeTaskControllers.deleteHomeTask
);

export const homeTaskRoutes = router;
