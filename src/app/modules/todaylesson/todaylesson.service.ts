/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TodayLesson } from './todaylesson.model';
import { TTodayLesson } from './todaylesson.interface';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { todayLessonSearchableFields } from './todaylesson.constant';
const validateTodayLessonPayload = (payload: TTodayLesson) => {
  const { lessonContent } = payload;

  if (!lessonContent || typeof lessonContent !== 'string') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Lesson content is required and must be a string',
    );
  }
};

const createTodayLesson = async (payload: TTodayLesson) => {
  validateTodayLessonPayload(payload);

  const trimmedLessonContent = payload.lessonContent.trim();

  const todayLessonData = {
    lessonContent: trimmedLessonContent,
  };

  const newLesson = await TodayLesson.create(todayLessonData);
  return newLesson;
};

const getAllTodayLessons = async (query: Record<string, unknown>) => {
  const todayLessonQuery = new QueryBuilder(TodayLesson.find(), query)
    .search(todayLessonSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await todayLessonQuery.countTotal();

  const todayLessons = await todayLessonQuery.modelQuery;

  return {
    meta,
    todayLessons,
  };
};

const getSingleTodayLesson = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid lesson ID');
  }

  const lesson = await TodayLesson.findById(id);
  if (!lesson) {
    throw new AppError(httpStatus.NOT_FOUND, "Today's lesson not found");
  }

  return lesson;
};

const updateTodayLesson = async (
  id: string,
  payload: Partial<TTodayLesson>,
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid lesson ID');
  }

  const result = await TodayLesson.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update today's lesson");
  }

  return result;
};

const deleteTodayLesson = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid lesson ID');
  }

  const result = await TodayLesson.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Today's lesson not found or already deleted",
    );
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
