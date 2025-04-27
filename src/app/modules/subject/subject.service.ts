/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { Subject } from './subject.model';
import { TSubject } from './subject.interface';
import { subjectSearchableFields } from '../subject-assign/subject-assign.constant';
import mongoose from 'mongoose';

const cleanObjectIds = (ids: any[] = []) => {
  return ids.filter((id) => id && mongoose.Types.ObjectId.isValid(id));
};

/**
 * Creates a new subject with proper validation
 */
const createSubject = async (payload: TSubject) => {
  console.log(payload)
  const { name, code, classes, teachers, image, paper, lessons, isOptional } =
    payload;


  if (!name || typeof name !== 'string') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Subject name is required and must be a string',
    );
  }

  if (!code || typeof code !== 'string') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Subject code is required and must be a string',
    );
  }

  const trimmedName = name.trim();
  const trimmedCode = code.trim();


  const existingSubjectByName = await Subject.findOne({ name: trimmedName });
  if (existingSubjectByName) {
    throw new AppError(409, `Subject "${trimmedName}" already exists`);
  }


  const existingSubjectByCode = await Subject.findOne({ code: trimmedCode });
  if (existingSubjectByCode) {
    throw new AppError(
      409,
      `Subject with code "${trimmedCode}" already exists`,
    );
  }


  const cleanedClasses = cleanObjectIds(classes);
  const cleanedTeachers = cleanObjectIds(teachers);


  const subjectData = {
    name: trimmedName,
    code: trimmedCode,
    image: image || '',
    paper: paper || '',
    lessons: lessons || [],
    classes: cleanedClasses,
    teachers: cleanedTeachers,
    isOptional: !!isOptional,
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
    .populate('classes')
    .populate('teachers');

  return {
    meta,
    subjects,
  };
};

const getSingleSubject = async (id: string) => {
  const result = await Subject.findById(id)
    .populate('classes')
    .populate('teachers');
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
