import { Notification } from './notification.model';
import { INotification } from './notification.interface';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';

const createNotification = async (payload: INotification) => {
  const result = await Notification.create(payload);
  return result;
};

const getAllNotifications = async () => {
  return await Notification.find();
};

const getSingleNotification = async (id: string) => {
  const result = await Notification.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  return result;
};

const updateNotification = async (id: string, payload: Partial<INotification>) => {
  const result = await Notification.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update notification');
  }
  return result;
};

const deleteNotification = async (id: string) => {
  const result = await Notification.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Notification not found or already deleted');
  }
  return result;
};

export const notificationServices = {
  createNotification,
  getAllNotifications,
  getSingleNotification,
  updateNotification,
  deleteNotification,
};
