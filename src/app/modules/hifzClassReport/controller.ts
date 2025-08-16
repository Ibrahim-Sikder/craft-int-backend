import httpStatus from 'http-status';
import { hifzClassReportServices } from './hifzClassReport.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createHifzClassReport = catchAsync(async (req, res) => {
  const result = await hifzClassReportServices.createHifzClassReport(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'HifzClassReport created successfully',
    data: result,
  });
});

const getAllHifzClassReports = catchAsync(async (req, res) => {
  const result = await hifzClassReportServices.getAllHifzClassReports(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClassReports retrieved successfully',
    data: result,
  });
});

const getSingleHifzClassReport = catchAsync(async (req, res) => {
  const result = await hifzClassReportServices.getSingleHifzClassReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClassReport retrieved successfully',
    data: result,
  });
});

const updateHifzClassReport = catchAsync(async (req, res) => {
  const result = await hifzClassReportServices.updateHifzClassReport(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClassReport updated successfully',
    data: result,
  });
});

const deleteHifzClassReport = catchAsync(async (req, res) => {
  const result = await hifzClassReportServices.deleteHifzClassReport(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClassReport deleted successfully',
    data: result,
  });
});

export const hifzClassReportControllers = {
  createHifzClassReport,
  getAllHifzClassReports,
  getSingleHifzClassReport,
  updateHifzClassReport,
  deleteHifzClassReport,
};
