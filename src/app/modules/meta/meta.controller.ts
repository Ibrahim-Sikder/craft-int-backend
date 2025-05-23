
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { metaServices } from "./metService";
import { catchAsync } from "../../../utils/catchAsync";



const getAllMeta = catchAsync(async (req, res,  next) => {
  try {
    const result = await metaServices.getAllMetaFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All customer fetched successfully.',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});


export const metaController = {
  getAllMeta,
};
