import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { hifzClassServices } from './service';

const createHifzClass = catchAsync(async (req, res) => {
  const result = await hifzClassServices.createHifzClass(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'HifzClass created successfully',
    data: result,
  });
});

const getAllHifzClasss = catchAsync(async (req, res) => {
  const result = await hifzClassServices.getAllHifzClasss(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClasss retrieved successfully',
    data: result,
  });
});

const getSingleHifzClass = catchAsync(async (req, res) => {
  const result = await hifzClassServices.getSingleHifzClass(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClass retrieved successfully',
    data: result,
  });
});

const updateHifzClass = catchAsync(async (req, res) => {
  const result = await hifzClassServices.updateHifzClass(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClass updated successfully',
    data: result,
  });
});

const deleteHifzClass = catchAsync(async (req, res) => {
  const result = await hifzClassServices.deleteHifzClass(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzClass deleted successfully',
    data: result,
  });
});

export const hifzClassControllers = {
  createHifzClass,
  getAllHifzClasss,
  getSingleHifzClass,
  updateHifzClass,
  deleteHifzClass,
};
