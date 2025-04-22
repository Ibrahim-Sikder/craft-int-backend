import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { Student } from './student.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { IStudent } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { generateStudentId } from './student.utils';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const createStudent = async (payload: Partial<IStudent>): Promise<IStudent> => {
  const {  name, email } = payload;

  // Check if mobile, name, and email are provided
  if (!name || !email) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const studentId = await generateStudentId();

    const exists = await Student.exists({ studentId });
    if (exists) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Generated Student ID already exists. Try again.',
      );
    }

    const student = await Student.create([{ ...payload, studentId }], {
      session,
    });

    await User.create(
      [
        {
          email: email, 
          password: 'student123',
          name: name,
          role: 'student',
        },
      ],
      { session },
    );

    // Commit the transaction
    await session.commitTransaction();
    return student[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


const getAllStudents = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const data = await studentQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent> => {
  const student = await Student.findById(id)
    // .populate('classId')
    // .populate('parentId')
    // .populate('guardianId');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return student;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent> => {
  console.log(payload)
  const student = await Student.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update student');
  }

  return student;
};

const deleteStudent = async (id: string): Promise<IStudent> => {
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student not found or already deleted',
    );
  }

  return student;
};

export const studentServices = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
