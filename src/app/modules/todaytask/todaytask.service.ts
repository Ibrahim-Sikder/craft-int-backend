/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { AppError } from '../../error/AppError';
import { TodayTask } from './todaytask.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ITodayTask } from './todaytask.interface';
import { todayTaskSearchableFields } from './todaytask.constant';

const validateTodayTaskPayload = (payload: ITodayTask) => {
  const { taskContent, dueDate } = payload;

  if (!taskContent || typeof taskContent !== 'string') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Task content is required and must be a string',
    );
  }
  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Due date is required and must be a valid date',
    );
  }
};

const createTodayTask = async (payload: ITodayTask) => {
  validateTodayTaskPayload(payload);

  const todayTaskData = {
    taskContent: payload.taskContent.trim(),
    dueDate: payload.dueDate,
  };

  const newTask = await TodayTask.create(todayTaskData);
  return newTask;
};

const getAllTodayTasks = async (query: Record<string, unknown>) => {
  const todayTaskQuery = new QueryBuilder(TodayTask.find(), query)
    .search(todayTaskSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await todayTaskQuery.countTotal();
  const todayTasks = await todayTaskQuery.modelQuery;

  return {
    meta,
    todayTasks,
  };
};

const getSingleTodayTask = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid task ID');
  }

  const task = await TodayTask.findById(id);
  if (!task) {
    throw new AppError(httpStatus.NOT_FOUND, "Today's task not found");
  }

  return task;
};

const updateTodayTask = async (id: string, payload: Partial<ITodayTask>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid task ID');
  }

  const result = await TodayTask.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update today's task");
  }

  return result;
};

const deleteTodayTask = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid task ID');
  }

  const result = await TodayTask.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Today's task not found or already deleted",
    );
  }

  return result;
};

export const todayTaskServices = {
  createTodayTask,
  getAllTodayTasks,
  getSingleTodayTask,
  updateTodayTask,
  deleteTodayTask,
};
