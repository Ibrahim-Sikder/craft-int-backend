/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { metaController } from './meta.controller';

const router = express.Router();

router.get('/', metaController.getAllMeta)
router.get("/accounting-report", metaController.getAccountingReport);



export const metaroute = router;
