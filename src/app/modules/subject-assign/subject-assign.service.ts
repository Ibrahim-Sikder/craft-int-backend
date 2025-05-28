
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { SubjectAssign } from './subject-assign.model';
import { TSubjectAssign } from './subject-assign.interface';
import { subjectSearchableFields } from './subject-assign.constant';

const createSubject = async (payload: TSubjectAssign) => {
  const { subjectCode } = payload;
  if (!subjectCode) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subject code is required');
  }

  const existingSubject = await SubjectAssign.findOne({ subjectCode });
  if (existingSubject) {
    throw new AppError(httpStatus.CONFLICT, 'Subject already exists');
  }

  const result = await SubjectAssign.create(payload);
  return result;
};

const getAllSubjects = async (query: Record<string, unknown>) => {
  const subjectQuery = new QueryBuilder(SubjectAssign.find(), query)
    .search(subjectSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await subjectQuery.countTotal();
  const subjects = await subjectQuery.modelQuery;
  return {
    meta,
    subjects,
  };
};

const getSingleSubject = async (id: string) => {
  const result = await SubjectAssign.findById(id).populate('classId').populate('teacherId');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  return result;
};

const updateSubject = async (id: string, payload: Partial<TSubjectAssign>) => {
  const result = await SubjectAssign.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update subject');
  }
  return result;
};

const deleteSubject = async (id: string) => {
  const result = await SubjectAssign.findByIdAndDelete(id);
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
