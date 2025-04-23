/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { IMealReport } from './mealreport.interface';
import MealReport from './mealreport.model';
import { mealReportSearchableFields } from './mealreport.constant';

const createMealReport = async (payload: IMealReport) => {
  const { date } = payload;
  console.log(payload)

  if (!date) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Date and meal type are required');
  }

  const existingReport = await MealReport.findOne({
    date,
   
  });

  if (existingReport) {
    throw new AppError(httpStatus.CONFLICT, 'Meal report already exists for this date and type');
  }

  const result = await MealReport.create(payload);
  return result;
};

const getAllMealReports = async (query: Record<string, unknown>) => {
  const reportQuery = new QueryBuilder(MealReport.find(), query)
    .search(mealReportSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await reportQuery.countTotal();
  const mealReports = await reportQuery.modelQuery
  .populate({
    path: 'students.personId',
    model: 'Student',
  })
  .populate({
    path: 'teachers.personId',
    model: 'Teacher', 
  })
  .exec();


  return {
    meta,
    mealReports,
  };
};

const getSingleMealReport = async (id: string) => {
  const result = await MealReport.findById(id).populate('students');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Meal report not found');
  }
  return result;
};

const updateMealReport = async (id: string, payload: Partial<IMealReport>) => {
  console.log(payload)
  const result = await MealReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('students');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update meal report');
  }
  return result;
};

const deleteMealReport = async (id: string) => {
  const result = await MealReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Meal report not found or already deleted');
  }
  return result;
};

export const mealReportServices = {
  createMealReport,
  getAllMealReports,
  getSingleMealReport,
  updateMealReport,
  deleteMealReport,
};
