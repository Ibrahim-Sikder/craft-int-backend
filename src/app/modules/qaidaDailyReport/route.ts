import { Router } from "express";
import { qaidaDailyReportControllers } from "./controller";

const router = Router();

router.post(
  "/",
  qaidaDailyReportControllers.createQaidaDailyReport
);

router.get(
  "/",
  qaidaDailyReportControllers.getAllQaidaDailyReports
);

router.get(
  "/:id",
  qaidaDailyReportControllers.getSingleQaidaDailyReport
);

router.patch(
  "/:id",
  qaidaDailyReportControllers.updateQaidaDailyReport
);

router.delete(
  "/:id",
  qaidaDailyReportControllers.deleteQaidaDailyReport
);

export const QaidaDailyReportRoutes = router;