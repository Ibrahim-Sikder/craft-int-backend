/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { Subject } from './subject.model';
import { TSubject } from './subject.interface';
import { subjectSearchableFields } from '../subject-assign/subject-assign.constant';
const createSubject = async (payload: TSubject) => {
 
  const { name, paper} =
    payload;


  if (!name || typeof name !== 'string') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Subject name is required and must be a string',
    );
  }

  const trimmedName = name.trim()

  // const existingSubjectByName = await Subject.findOne({ name: trimmedName });
  // if (existingSubjectByName) {
  //   throw new AppError(409, `Subject "${trimmedName}" already exists`);
  // }


  const subjectData = {
    name: trimmedName,
    paper: paper || '',
  };

  // Create and return new subject
  const newSubject = await Subject.create(subjectData);
  return newSubject;
};

const getAllSubjects = async (query: Record<string, unknown>) => {
  const subjectQuery = new QueryBuilder(Subject.find(), query)
    .search(subjectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await subjectQuery.countTotal();

  const subjects = await subjectQuery.modelQuery

  return {
    meta,
    subjects,
  };
};

const getSingleSubject = async (id: string) => {
  const result = await Subject.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  return result;
};

const updateSubject = async (id: string, payload: Partial<TSubject>) => {
  console.log(payload)
  const result = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update subject');
  }
  return result;
};

const deleteSubject = async (id: string) => {
  const result = await Subject.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Subject not found or already deleted',
    );
  }
  return result;
};

export const subjectServices = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
