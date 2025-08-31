import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { hifzSubjectServices } from './service';

const createHifzSubject = catchAsync(async (req, res) => {
  const result = await hifzSubjectServices.createHifzSubject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'HifzSubject created successfully',
    data: result,
  });
});

const getAllHifzSubjects = catchAsync(async (req, res) => {
  const result = await hifzSubjectServices.getAllHifzSubjects(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzSubjects retrieved successfully',
    data: result,
  });
});

const getSingleHifzSubject = catchAsync(async (req, res) => {
  const result = await hifzSubjectServices.getSingleHifzSubject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzSubject retrieved successfully',
    data: result,
  });
});

const updateHifzSubject = catchAsync(async (req, res) => {
  const result = await hifzSubjectServices.updateHifzSubject(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzSubject updated successfully',
    data: result,
  });
});

const deleteHifzSubject = catchAsync(async (req, res) => {
  const result = await hifzSubjectServices.deleteHifzSubject(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'HifzSubject deleted successfully',
    data: result,
  });
});

export const hifzSubjectControllers = {
  createHifzSubject,
  getAllHifzSubjects,
  getSingleHifzSubject,
  updateHifzSubject,
  deleteHifzSubject,
};
