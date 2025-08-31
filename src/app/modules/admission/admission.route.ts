import express from 'express';
import { admissionController } from './admission.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { CreateAdmissionSchema } from './admission.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(CreateAdmissionSchema),
  admissionController.createAdmission
);

router.get('/', admissionController.getAllAdmissions);

router.get('/:id', admissionController.getSingleAdmission);

router.patch(
  '/:id',
  validateRequest(CreateAdmissionSchema),
  admissionController.updateAdmission
);

router.delete(
  '/:id',
  admissionController.deleteAdmission
);

export const admissionRoutes = router;
