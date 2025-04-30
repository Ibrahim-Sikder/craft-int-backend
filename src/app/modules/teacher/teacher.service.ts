import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { Teacher } from './teacher.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ITeacher } from './teacher.interface';

import { generateTeacherId } from './teacher.utils';
import { teacherSearchableFields } from './teacher.constant';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const createTeacher = async (payload: Partial<ITeacher>): Promise<ITeacher> => {
  const { email, name } = payload;
  console.log(payload);
  if (!email || !name) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const teacherId = await generateTeacherId();

    const existingTeacher = await Teacher.findOne({ teacherId });
    if (existingTeacher) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Generated Teacher ID already exists. Try again.',
      );
    }

    const teacher = await Teacher.create([{ ...payload, teacherId }], {
      session,
    });

    await User.create(
      [
        {
          email,
          password: 'teacher123',
          name,
          role: 'teacher',
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return teacher[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllTeachers = async (query: Record<string, unknown>) => {
  const teacherQuery = new QueryBuilder(Teacher.find(), query)
    .search(teacherSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await teacherQuery.countTotal();
  const data = await teacherQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleTeacher = async (id: string): Promise<ITeacher> => {
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    throw new AppError(httpStatus.NOT_FOUND, 'Teacher not found');
  }

  return teacher;
};

const updateTeacher = async (
  id: string,
  payload: Partial<ITeacher>,
): Promise<ITeacher> => {
  console.log(payload);
  const updatedTeacher = await Teacher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedTeacher) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update teacher');
  }

  return updatedTeacher;
};

const deleteTeacher = async (id: string): Promise<ITeacher> => {
  const teacher = await Teacher.findByIdAndDelete(id);

  if (!teacher) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Teacher not found or already deleted',
    );
  }

  return teacher;
};

export const teacherServices = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
};
