/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import { sectionServices } from './section.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createSection = catchAsync(async (req, res, next) => {
  const result = await sectionServices.createSection(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Section created successfully',
    data: result,
  });
});

const getAllSections = catchAsync(async (req, res, next) => {
  const result = await sectionServices.getAllSections(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sections retrieved successfully',
    data: result,
  });
});

const getSingleSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await sectionServices.getSingleSection(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section retrieved successfully',
    data: result,
  });
});

const updateSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await sectionServices.updateSection(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section updated successfully',
    data: result,
  });
});

const deleteSection = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await sectionServices.deleteSection(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Section deleted successfully',
    data: result,
  });
});

export const sectionControllers = {
  createSection,
  getAllSections,
  getSingleSection,
  updateSection,
  deleteSection,
};
