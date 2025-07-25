/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import sendResponse from '../../../utils/sendResponse';
import { catchAsync } from '../../../utils/catchAsync';
import { classReportServices } from './classreport.service';
import { clearClassReportsCache } from './classreport.utils';

const createClassReport = catchAsync(async (req, res) => {
  const result = await classReportServices.createClassReport(req.body);
     await clearClassReportsCache();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Class report created successfully',
    data: result,
  });
});
const getAllClassReports = catchAsync(async (req, res, next) => {
  try {
    const result = await classReportServices.getAllClassReports(req.query);
console.log('query', req.query )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class reports retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getSingleClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classReportServices.getSingleClassReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const formattedData = { ...req.body };
    if (Array.isArray(formattedData.teachers)) {
      formattedData.teachers = formattedData.teachers[0];
    }

    if (Array.isArray(formattedData.classes)) {
      formattedData.classes = formattedData.classes[0];
    }

    if (Array.isArray(formattedData.subjects)) {
      formattedData.subjects = formattedData.subjects[0];
    }

    const result = await classReportServices.updateClassReport(
      id,
      formattedData,
    );

       await clearClassReportsCache();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
const deleteClassReport = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await classReportServices.deleteClassReport(id);
   await clearClassReportsCache();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Class report deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

// const generateClassReportPdf: RequestHandler = catchAsync(async (req, res) => {
//   const { classreportid } = req.params;

//   const baseUrl = (
//     process.env.NEXT_PUBLIC_IMAGE_BASE_URL || 'http://localhost:5000'
//   ).replace(/\/$/, '');

//   try {
//     const pdfBuffer = await classReportServices.ge(
//       classreportid,
//       baseUrl,
//     );

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename=classreport-${classreportid}.pdf`,
//     );

//     res.send(pdfBuffer);
//   } catch (error: any) {
//     console.error('PDF Generation Error:', error);
//     res.status(500).json({
//       status: 'error',
//       message:
//         error.message || 'An error occurred while generating the class report.',
//     });
//   }
// });


const updateHasCommentsForAllReports = catchAsync(async (req, res, next) => {
  try {
    const result = await classReportServices.updateHasCommentsForAllReports();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All class reports updated successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const classReportControllers = {
  createClassReport,
  getAllClassReports,
  getSingleClassReport,
  updateClassReport,
  deleteClassReport,
  updateHasCommentsForAllReports

};
