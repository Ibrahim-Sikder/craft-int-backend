import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";
import { qaidaDailyReportServices } from "./service";
import { createQaidaDailyReportSchema, updateQaidaDailyReportSchema } from "./validation";
import { validateRequest } from "../../middlewares/validateRequest";

const createQaidaDailyReport = catchAsync(async (req, res) => {
  const result = await qaidaDailyReportServices.createQaidaDailyReport(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "QaidaDailyReport created successfully",
    data: result,
  });
});

const getAllQaidaDailyReports = catchAsync(async (req, res) => {
  const result = await qaidaDailyReportServices.getAllQaidaDailyReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "QaidaDailyReports retrieved successfully",
    data: result,
  });
});

const getSingleQaidaDailyReport = catchAsync(async (req, res) => {
  const result = await qaidaDailyReportServices.getSingleQaidaDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "QaidaDailyReport retrieved successfully",
    data: result,
  });
});

const updateQaidaDailyReport = catchAsync(async (req, res) => {
  const result = await qaidaDailyReportServices.updateQaidaDailyReport(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "QaidaDailyReport updated successfully",
    data: result,
  });
});

const deleteQaidaDailyReport = catchAsync(async (req, res) => {
  const result = await qaidaDailyReportServices.deleteQaidaDailyReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "QaidaDailyReport deleted successfully",
    data: result,
  });
});

export const qaidaDailyReportControllers = {
  createQaidaDailyReport: [
    validateRequest(createQaidaDailyReportSchema),
    createQaidaDailyReport,
  ],
  getAllQaidaDailyReports,
  getSingleQaidaDailyReport,
  updateQaidaDailyReport: [
    validateRequest(updateQaidaDailyReportSchema),
    updateQaidaDailyReport,
  ],
  deleteQaidaDailyReport,
};