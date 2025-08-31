import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import QueryBuilder from '../../builder/QueryBuilder';

import { IAnnouncement } from './announcement.interface';
import { Announcement } from './announcement.model';

const createAnnouncement = async (payload: IAnnouncement) => {
  const result = await Announcement.create(payload);
  return result;
};

const getAllAnnouncements = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(Announcement.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await queryBuilder.countTotal();
  const announcements = await queryBuilder.modelQuery;

  return {
    meta,
    announcements,
  };
};

const getSingleAnnouncement = async (id: string) => {
  const result = await Announcement.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Announcement not found');
  }
  return result;
};

const updateAnnouncement = async (id: string, payload: Partial<IAnnouncement>) => {
  const result = await Announcement.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update announcement');
  }

  return result;
};

const deleteAnnouncement = async (id: string) => {
  const result = await Announcement.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Announcement not found or already deleted');
  }
  return result;
};

export const announcementServices = {
  createAnnouncement,
  getAllAnnouncements,
  getSingleAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
