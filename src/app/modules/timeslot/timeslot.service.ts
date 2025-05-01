import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';

import QueryBuilder from '../../builder/QueryBuilder';

import { ITimeSlot } from './timeslot.interface';
import { TimeSlot } from './timeslot.model';
import { timeSlotSearchableFields } from './timeslot.constant';
import { format } from 'date-fns';

export const createTimeSlot = async (payload: ITimeSlot) => {
  const { startTime, endTime, day, title } = payload;

  if (!startTime || !endTime || !day) {
    throw new AppError(httpStatus.BAD_REQUEST, "Missing required fields");
  }

  const formattedStart = format(new Date(startTime), "hh:mm a");
  const formattedEnd = format(new Date(endTime), "hh:mm a");

  const result = await TimeSlot.create({
    title,
    day,
    startTime: formattedStart,
    endTime: formattedEnd,
    isActive: payload.isActive ?? true,
  });

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
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Time slot not found or already deleted',
    );
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
