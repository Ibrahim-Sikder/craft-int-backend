import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';

import QueryBuilder from '../../builder/QueryBuilder';

import { ITimeSlot } from './timeslot.interface';
import { TimeSlot } from './timeslot.model';
import { timeSlotSearchableFields } from './timeslot.constant';

const createTimeSlot = async (payload: ITimeSlot) => {
  const { startTime, endTime, day } = payload;

  if (!startTime || !endTime || !day) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Required fields are missing');
  }

  const result = await TimeSlot.create(payload);
  return result;
};

const getAllTimeSlots = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(TimeSlot.find(), query)
    .search(timeSlotSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const timeSlots = await queryBuilder.modelQuery;

  return {
    meta,
    timeSlots,
  };
};

const getSingleTimeSlot = async (id: string) => {
  const result = await TimeSlot.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Time slot not found');
  }
  return result;
};

const updateTimeSlot = async (id: string, payload: Partial<ITimeSlot>) => {
  const result = await TimeSlot.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update time slot');
  }
  return result;
};

const deleteTimeSlot = async (id: string) => {
  const result = await TimeSlot.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Time slot not found or already deleted');
  }
  return result;
};

export const timeSlotServices = {
  createTimeSlot,
  getAllTimeSlots,
  getSingleTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
