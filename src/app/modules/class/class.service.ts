/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { TClass } from './class.interface';
import { Class } from './class.model';
import { classSearch } from './class.constant';

const createClass = async (payload: TClass) => {
  // const { className } = payload;

  // const existingClass = await Class.findOne({ className });
  // if (existingClass) {
  //   throw new AppError(httpStatus.CONFLICT, 'Class already exists');
  // }

  const result = await Class.create(payload);
  return result;
};

const getAllClasses = async (query: Record<string, unknown>) => {
  const classQuery = new QueryBuilder(
    Class.find().populate('sections'), 
    query
  )
    .search(classSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await classQuery.countTotal();
  const classes = await classQuery.modelQuery;

  return {
    meta,
    classes,
  };
};


const getSingleClass = async (id: string) => {
  const result = await Class.findById(id)
    .populate([{ path: 'sections' }]);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class not found');
  }

  return result;
};

const updateClass = async (id: string, payload: Partial<TClass>) => {
  console.log(payload)
  const result = await Class.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update class');
  }
  return result;
};

const deleteClass = async (id: string) => {
  const result = await Class.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Class not found or already deleted',
    );
  }
  return result;
};

export const classServices = {
  createClass,
  getAllClasses,
  getSingleClass,
  updateClass,
  deleteClass,
};
