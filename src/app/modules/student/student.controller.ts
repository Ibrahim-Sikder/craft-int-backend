import httpStatus from 'http-status';
import { studentServices } from './student.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { Request, Response } from 'express';

// Create new student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const student = await studentServices.createStudent(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully',
    data: student,
  });
});

// Get all students
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const result = await studentServices.getAllStudents(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

// Get student by ID
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await studentServices.getSingleStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: student,
  });
});

// Update student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedStudent = await studentServices.updateStudent(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: updatedStudent,
  });
});

// Delete student
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedStudent = await studentServices.deleteStudent(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent,
  });
});

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
