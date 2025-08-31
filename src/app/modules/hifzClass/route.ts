import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { HifzClassValidations } from './validation';
import { hifzClassControllers } from './controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(HifzClassValidations.createHifzClassValidation),
  hifzClassControllers.createHifzClass
);

router.get('/', hifzClassControllers.getAllHifzClasss);
router.get('/:id', hifzClassControllers.getSingleHifzClass);

router.patch(
  '/:id',
  validateRequest(HifzClassValidations.updateHifzClassValidation),
  hifzClassControllers.updateHifzClass
);

router.delete('/:id', hifzClassControllers.deleteHifzClass);

export const hifzClassRoutes = router;
