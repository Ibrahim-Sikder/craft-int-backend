import express from 'express';
import { sessionControllers } from './session.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { SessionValidations } from './session.validation';

const router = express.Router();

router.post(
  '/',
  // auth('admin', 'super_admin'),
  validateRequest(SessionValidations.createSessionValidation),
  sessionControllers.createSession
);

router.get('/', sessionControllers.getAllSessions);

router.get('/:id', sessionControllers.getSingleSession);

router.patch(
  '/:id',
  // auth('admin', 'super_admin'),
  validateRequest(SessionValidations.updateSessionValidation),
  sessionControllers.updateSession
);

router.delete(
  '/:id',
  // auth('admin', 'super_admin'),
  sessionControllers.deleteSession
);

export const sessionRoutes = router;
