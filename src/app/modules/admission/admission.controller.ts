import httpStatus from 'http-status';
import { admissionService } from './admission.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createAdmission = catchAsync(async (req, res, next) => {
  try {
    const result = await admissionService.createAdmission(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllAdmissions = catchAsync(async (req, res, next) => {
  try {
    const result = await admissionService.getAllAdmissions(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admissions retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleAdmission = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await admissionService.getSingleAdmission(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateAdmission = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await admissionService.updateAdmission(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteAdmission = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await admissionService.deleteAdmission(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const admissionController = {
  createAdmission,
  getAllAdmissions,
  getSingleAdmission,
  updateAdmission,
  deleteAdmission,
};
