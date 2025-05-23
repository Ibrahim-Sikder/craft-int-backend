import httpStatus from 'http-status';
import { catchAsync } from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {

  const result = await UserServices.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});
const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User are retrived successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
})
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserServices.updateUser(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
export const UserController = {
  createUser,
  getAllUser,
  deleteUser,
  getSingleUser,
  updateUser
};
