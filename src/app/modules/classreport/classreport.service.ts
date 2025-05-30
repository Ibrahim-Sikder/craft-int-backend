/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IClassReport } from './classreport.interface';
import { ClassReport } from './classreport.model';
import { Student } from '../student/student.model';
import  { Types } from 'mongoose';
import puppeteer from 'puppeteer';
import { join } from 'path';
import ejs from 'ejs';
import { acquireLock, releaseLock } from '../../../utils/lockManager';
import { classReportQueue } from '../../../queue/queue';
import redisClient from '../../../utils/redisClient';
import crypto from 'crypto';
const createClassReport = async (payload: IClassReport) => {
  if (!payload.teachers || !payload.classes || !payload.subjects || !payload.date || !payload.studentEvaluations) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Missing required fields');
  }

  const date = new Date(payload.date);
  if (isNaN(date.getTime())) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid date format');
  }

  // Instead of direct DB insert, add to queue
  await classReportQueue.add('create-class-report', {
    ...payload,
    date,
  });

  return {
    success: true,
    message: 'Report has been queued and will be processed shortly.',
  };
};

export const getAllClassReports = async (query: Record<string, any>) => {
  const cacheKey = `classReports:${crypto.createHash('md5').update(JSON.stringify(query)).digest('hex')}`;

  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    console.log('✅ Cache hit');
    return JSON.parse(cachedData);
  }

  console.log('⏳ Cache miss, querying DB...');

  const searchTerm = query.searchTerm;
  const matchConditions: any[] = [];
  let studentNameFilter: string | null = null;

  if (searchTerm && typeof searchTerm === 'string') {
    studentNameFilter = searchTerm;
    const matchingStudents = await Student.find({
      name: { $regex: searchTerm, $options: 'i' },
    }).select('_id');

    const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(String(student._id)));

    matchConditions.push({
      $or: [
        { teachers: { $regex: searchTerm, $options: 'i' } },
        { classes: { $regex: searchTerm, $options: 'i' } },
        { subjects: { $regex: searchTerm, $options: 'i' } },
        { hour: { $regex: searchTerm, $options: 'i' } },
        { date: { $regex: searchTerm, $options: 'i' } },
        { 'studentEvaluations.studentId': { $in: matchingStudentIds } },
      ],
    });
  }

  if (query.studentName && typeof query.studentName === 'string') {
    studentNameFilter = query.studentName;

    const matchingStudents = await Student.find({
      name: { $regex: query.studentName, $options: 'i' },
    }).select('_id');

    const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(String(student._id)));

    matchConditions.push({
      'studentEvaluations.studentId': { $in: matchingStudentIds },
    });
  }

  const paramToFieldMap: Record<string, string> = {
    className: 'classes',
    subject: 'subjects',
    teacher: 'teachers',
    hour: 'hour',
    lessonEvaluation: 'studentEvaluations.lessonEvaluation',
    handwriting: 'studentEvaluations.handwriting',
  };

  for (const [param, field] of Object.entries(paramToFieldMap)) {
    if (query[param]) {
      matchConditions.push({ [field]: query[param] });
    }
  }

  if (query.startDate || query.endDate) {
    const dateFilter: any = {};
    if (query.startDate) {
      const startDate = new Date(query.startDate);
      startDate.setHours(0, 0, 0, 0);
      dateFilter.$gte = startDate;
    }
    if (query.endDate) {
      const endDate = new Date(query.endDate);
      endDate.setHours(23, 59, 59, 999);
      dateFilter.$lte = endDate;
    }
    if (Object.keys(dateFilter).length > 0) {
      matchConditions.push({ date: dateFilter });
    }
  }

  if (query.date && !query.startDate && !query.endDate) {
    const startDate = new Date(query.date);
    const endDate = new Date(query.date);
    endDate.setDate(endDate.getDate() + 1);
    matchConditions.push({ date: { $gte: startDate, $lt: endDate } });
  }

  const pipeline: any[] = [];

  if (matchConditions.length > 0) {
    pipeline.push({ $match: { $and: matchConditions } });
  }

  pipeline.push(
    {
      $lookup: {
        from: 'students',
        localField: 'studentEvaluations.studentId',
        foreignField: '_id',
        as: 'studentDetails',
      },
    },
    {
      $addFields: {
        studentEvaluations: {
          $map: {
            input: '$studentEvaluations',
            as: 'evaluation',
            in: {
              $mergeObjects: [
                '$$evaluation',
                {
                  studentId: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$studentDetails',
                          as: 's',
                          cond: { $eq: ['$$s._id', '$$evaluation.studentId'] },
                        },
                      },
                      0,
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
    { $project: { studentDetails: 0 } },
    {
      $lookup: {
        from: 'todaylessons',
        localField: 'todayLesson',
        foreignField: '_id',
        as: 'todayLesson',
      },
    },
    { $unwind: { path: '$todayLesson', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'todaytasks',
        localField: 'homeTask',
        foreignField: '_id',
        as: 'homeTask',
      },
    },
    { $unwind: { path: '$homeTask', preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } }
  );

  const reports = await ClassReport.aggregate(pipeline);

  let processedReports = reports;

  const {
    handwriting,
    lessonEvaluation,
    studentName,
    className,
    subject,
    teacher,
    date,
    hour,
    startDate,
    endDate,
  } = query;

  const studentNameFilterLower = studentNameFilter?.toLowerCase();

  if (
    studentNameFilter ||
    handwriting ||
    lessonEvaluation ||
    className ||
    subject ||
    teacher ||
    date ||
    hour ||
    startDate ||
    endDate
  ) {
    processedReports = reports.map((report) => {
      const filteredReport = { ...report };
      if (Array.isArray(report.studentEvaluations)) {
        filteredReport.studentEvaluations = report.studentEvaluations.filter((evaluation: any) => {
          const matchesStudentName = studentNameFilterLower
            ? evaluation.studentId?.name?.toLowerCase().includes(studentNameFilterLower)
            : true;
          const matchesHandwriting = handwriting ? evaluation.handwriting === handwriting : true;
          const matchesLessonEvaluation = lessonEvaluation
            ? evaluation.lessonEvaluation === lessonEvaluation
            : true;
          const matchesClass = className ? report.classes === className : true;
          const matchesSubject = subject ? report.subjects === subject : true;
          const matchesTeacher = teacher ? report.teachers === teacher : true;
          const matchesHour = hour ? report.hour === hour : true;

          const matchesDate =
            startDate || endDate
              ? (() => {
                  const reportDate = new Date(report.date);
                  let matchesStart = true;
                  let matchesEnd = true;

                  if (startDate) {
                    const startDateObj = new Date(startDate);
                    startDateObj.setHours(0, 0, 0, 0);
                    matchesStart = reportDate >= startDateObj;
                  }

                  if (endDate) {
                    const endDateObj = new Date(endDate);
                    endDateObj.setHours(23, 59, 59, 999);
                    matchesEnd = reportDate <= endDateObj;
                  }

                  return matchesStart && matchesEnd;
                })()
              : date
              ? (() => {
                  const queryDate = new Date(date);
                  const reportDate = new Date(report.date);
                  return (
                    queryDate.getFullYear() === reportDate.getFullYear() &&
                    queryDate.getMonth() === reportDate.getMonth() &&
                    queryDate.getDate() === reportDate.getDate()
                  );
                })()
              : true;

          return (
            matchesStudentName &&
            matchesHandwriting &&
            matchesLessonEvaluation &&
            matchesClass &&
            matchesSubject &&
            matchesTeacher &&
            matchesHour &&
            matchesDate
          );
        });
      }

      return filteredReport;
    });

    processedReports = processedReports.filter(
      (report) => report.studentEvaluations && report.studentEvaluations.length > 0
    );
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const paginatedReports = processedReports.slice(skip, skip + limit);

  const result = {
    meta: {
      total: processedReports.length,
      page,
      limit,
      totalPages: Math.ceil(processedReports.length / limit),
    },
    reports: paginatedReports,
  };

  await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 });

  return result;
};


const getSingleClassReport = async (id: string) => {
  const result = await ClassReport.findById(id)
    .populate('subjects')
    .populate('teachers')
    .populate('todayLesson')
    .populate('classes')
    .populate('homeTask')
    .populate('studentEvaluations.studentId');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Class report not found');
  }

  return result;
};

const updateClassReport = async (
  id: string,
  payload: Partial<IClassReport>,
) => {
  const result = await ClassReport.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update class report');
  }
  return result;
};

const deleteClassReport = async (id: string) => {
  console.log(id)
  const result = await ClassReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Class report not found or already deleted',
    );
  }
  return result;
};

const generateClassReportPdf = async (
  id: string,
  imageUrl: string,
): Promise<Buffer> => {
  const classReport = await ClassReport.findById(id).populate(
    'studentEvaluations.studentId',
  );

  console.log(JSON.stringify(classReport, null, 2));

  if (!classReport) {
    console.error(`ClassReport not found for id: ${id}`);
    throw new Error('Class report not found');
  }

  let logoBase64 = '';
  try {
    const logoUrl = `${imageUrl}/images/logo.png`;
    const logoResponse = await fetch(logoUrl);
    const logoBuffer = await logoResponse.arrayBuffer();
    logoBase64 = Buffer.from(logoBuffer).toString('base64');
  } catch (error) {
    console.warn('Failed to load logo:', error);
  }

  const filePath = join(__dirname, '../../templates/classreport.ejs');

  const html = await new Promise<string>((resolve, reject) => {
    ejs.renderFile(
      filePath,
      {
        classReport,
        imageUrl,
        logoBase64,
      },
      (err, str) => {
        if (err) return reject(err);
        resolve(str);
      },
    );
  });

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('PDF generation failed');
  }
};

export const classReportServices = {
  createClassReport,
  getAllClassReports,
  getSingleClassReport,
  updateClassReport,
  deleteClassReport,
  generateClassReportPdf,
};
