import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { Staff } from './staff.model'; // Ensure you have this model
import QueryBuilder from '../../builder/QueryBuilder';
import { IStaff } from './staff.interface'; // Define the IStaff interface accordingly

import { generateStaffId } from './staff.utils'; // You need to create this utility
import { staffSearchableFields } from './staff.constant'; // Define fields to enable search
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const createStaff = async (payload: Partial<IStaff>): Promise<IStaff> => {
  const { email, name } = payload;

  if (!email || !name) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const staffId = await generateStaffId();

    const existingStaff = await Staff.findOne({ staffId });
    if (existingStaff) {
      throw new AppError(
        httpStatus.CONFLICT,
        'Generated Staff ID already exists. Try again.',
      );
    }

    const staff = await Staff.create([{ ...payload, staffId }], { session });

    await User.create(
      [
        {
          email,
          password: 'staff123',
          name,
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return staff[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllStaff = async (query: Record<string, unknown>) => {
  const staffQuery = new QueryBuilder(Staff.find(), query)
    .search(staffSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await staffQuery.countTotal();
  const staffs = await staffQuery.modelQuery;

  return {
    meta,
    staffs,
  };
};

const getSingleStaff = async (id: string): Promise<IStaff> => {
  const staff = await Staff.findById(id);

  if (!staff) {
    throw new AppError(httpStatus.NOT_FOUND, 'Staff not found');
  }

  return staff;
};

const updateStaff = async (
  id: string,
  payload: Partial<IStaff>,
): Promise<IStaff> => {
  const updatedStaff = await Staff.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedStaff) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update staff');
  }

  return updatedStaff;
};

const deleteStaff = async (id: string): Promise<IStaff> => {
  const staff = await Staff.findByIdAndDelete(id);

  if (!staff) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Staff not found or already deleted',
    );
  }

  return staff;
};

export const staffServices = {
  createStaff,
  getAllStaff,
  getSingleStaff,
  updateStaff,
  deleteStaff,
};
