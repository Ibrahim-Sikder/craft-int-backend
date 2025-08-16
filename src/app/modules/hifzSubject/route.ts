import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { auth } from '../../middlewares/auth';
import { HifzSubjectValidations } from './validation';
import { hifzSubjectControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  auth('admin', 'super_admin'),
  validateRequest(HifzSubjectValidations.createHifzSubjectValidation),
  hifzSubjectControllers.createHifzSubject
);

router.get('/', hifzSubjectControllers.getAllHifzSubjects);
router.get('/:id', hifzSubjectControllers.getSingleHifzSubject);

router.patch(
  '/:id',
  auth('admin', 'super_admin'),
  validateRequest(HifzSubjectValidations.updateHifzSubjectValidation),
  hifzSubjectControllers.updateHifzSubject
);

router.delete('/:id', auth('admin', 'super_admin'), hifzSubjectControllers.deleteHifzSubject);

export const hifzSubjectRoutes = router;
