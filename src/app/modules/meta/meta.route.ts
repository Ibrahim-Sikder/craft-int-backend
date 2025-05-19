/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { metaController } from './meta.controller';

const router = express.Router();

router.get('/', metaController.getAllMeta)
export const metaroute = router;
