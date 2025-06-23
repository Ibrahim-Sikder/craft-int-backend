import httpStatus from 'http-status';
import { announcementServices } from './announcement.service';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';

const createAnnouncement = catchAsync(async (req, res, next) => {
  try {
    const result = await announcementServices.createAnnouncement(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Announcement created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllAnnouncements = catchAsync(async (req, res, next) => {
  try {
    const result = await announcementServices.getAllAnnouncements(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Announcements retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleAnnouncement = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await announcementServices.getSingleAnnouncement(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Announcement retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateAnnouncement = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await announcementServices.updateAnnouncement(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Announcement updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const deleteAnnouncement = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await announcementServices.deleteAnnouncement(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Announcement deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const announcementControllers = {
  createAnnouncement,
  getAllAnnouncements,
  getSingleAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
