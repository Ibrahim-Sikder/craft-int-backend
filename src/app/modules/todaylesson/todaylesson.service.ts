import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { ITodayLesson } from './todaylesson.interface';
import { TodayLesson } from './todaylesson.model';

const createTodayLesson = async (payload: ITodayLesson) => {
  return await TodayLesson.create(payload);
};

const getAllTodayLessons = async () => {
  return await TodayLesson.find();
};

const getSingleTodayLesson = async (id: string) => {
  const result = await TodayLesson.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Today\'s lesson not found');
  }
  return result;
};

const updateTodayLesson = async (id: string, payload: Partial<ITodayLesson>) => {
  const result = await TodayLesson.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update today\'s lesson');
  }
  return result;
};

const deleteTodayLesson = async (id: string) => {
  const result = await TodayLesson.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Today\'s lesson not found or already deleted');
  }
  return result;
};

export const todayLessonServices = {
  createTodayLesson,
  getAllTodayLessons,
  getSingleTodayLesson,
  updateTodayLesson,
  deleteTodayLesson,
};
