import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IHomeTask } from './hometask.interface';
import { HomeTask } from './hometask.model';


const createHomeTask = async (payload: IHomeTask) => {
  if (!payload.title || !payload.description) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Title and description are required');
  }

  const result = await HomeTask.create(payload);
  return result;
};

const getAllHomeTasks = async () => {
  const result = await HomeTask.find();
  return result;
};

const getSingleHomeTask = async (id: string) => {
  const result = await HomeTask.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Home task not found');
  }
  return result;
};

const updateHomeTask = async (id: string, payload: Partial<IHomeTask>) => {
  const result = await HomeTask.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update home task');
  }
  return result;
};

const deleteHomeTask = async (id: string) => {
  const result = await HomeTask.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Home task not found or already deleted');
  }
  return result;
};

export const homeTaskServices = {
  createHomeTask,
  getAllHomeTasks,
  getSingleHomeTask,
  updateHomeTask,
  deleteHomeTask,
};
