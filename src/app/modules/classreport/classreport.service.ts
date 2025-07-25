/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import {
  IClassReport,
  IClassReportQuery,
  ICommentsStats,
} from './classreport.interface';
import { ClassReport } from './classreport.model';
import { Student } from '../student/student.model';
import { Types } from 'mongoose';
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
});
export const createClassReport = async (payload: IClassReport) => {
  if (!payload.teachers || !payload.classes || !payload.subjects) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Missing required fields');
  }

  // ✅ Automatically set hasComments true if any comments exist
  payload.hasComments =
    payload.studentEvaluations?.some(
      (evaluation) =>
        evaluation.comments && evaluation.comments.trim().length > 0,
    ) || false;

  const newReport = await ClassReport.create(payload);

  return newReport;
};


export const getAllClassReports = async (query: IClassReportQuery) => {
  const searchTerm = query.searchTerm?.trim();

  const page = Number.parseInt(query.page?.toString() || '1') || 1;
  const limit = Number.parseInt(query.limit?.toString() || '5') || 5;
  const skip = (page - 1) * limit;

  const hasCommentsQuery =
    query.hasComments === 'true' || query.hasComments === true;

  console.log('this query', query);

  // Cache key
  const cacheKey = `class_reports:${JSON.stringify(query)}`;

  try {
    const cachedResult = await redis.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }
  } catch (error) {
    console.error('Redis cache read error:', error);
  }

  const matchConditions: any[] = [];
  let matchingStudentIds: Types.ObjectId[] = [];

  // 🔹 SearchTerm logic for reports and students
  if (searchTerm) {
    const matchingStudents = await Student.find({
      name: { $regex: searchTerm, $options: 'i' },
    }).select('_id');

    matchingStudentIds = matchingStudents.map(
      (student) => new Types.ObjectId(String(student._id)),
    );

    matchConditions.push({
      $or: [
        { teachers: { $regex: searchTerm, $options: 'i' } },
        { classes: { $regex: searchTerm, $options: 'i' } },
        { subjects: { $regex: searchTerm, $options: 'i' } },
        { hour: { $regex: searchTerm, $options: 'i' } },
        { 'studentEvaluations.studentId': { $in: matchingStudentIds } },
        {
          'studentEvaluations.comments': { $regex: searchTerm, $options: 'i' },
        },
      ],
    });
  }

  // 🔹 Top-level filters
  if (query.className?.trim()) {
    matchConditions.push({
      classes: { $regex: query.className, $options: 'i' },
    });
  }
  if (query.subject?.trim()) {
    matchConditions.push({
      subjects: { $regex: query.subject, $options: 'i' },
    });
  }
  if (query.teacher?.trim()) {
    matchConditions.push({
      teachers: { $regex: query.teacher, $options: 'i' },
    });
  }
  if (query.hour?.trim()) {
    matchConditions.push({ hour: query.hour });
  }
  if (query.date?.trim()) {
    matchConditions.push({ date: new Date(query.date) });
  }
  if (query.startDate && query.endDate) {
    matchConditions.push({
      date: {
        $gte: new Date(query.startDate),
        $lte: new Date(query.endDate),
      },
    });
  }

  // ❌ Remove old hasComments report-level filter
  // if (hasCommentsQuery) {
  //   matchConditions.push({ hasComments: true });
  // }

  const pipeline: any[] = [];

  if (matchConditions.length > 0) {
    pipeline.push({ $match: { $and: matchConditions } });
  }

  // 🔹 Populate student details
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
  );

  // 🔹 Build studentEvaluation filters

  // 1. Search term filters combined with OR
  const searchTermStudentFilters: any[] = [];
  if (searchTerm) {
    if (matchingStudentIds.length > 0) {
      searchTermStudentFilters.push({
        $in: ['$$evaluation.studentId._id', matchingStudentIds],
      });
    }
    searchTermStudentFilters.push({
      $regexMatch: {
        input: '$$evaluation.comments',
        regex: searchTerm,
        options: 'i',
      },
    });
  }

  // 2. ✅ hasComments filter (students who have comments)
  const hasCommentsFilter = hasCommentsQuery
    ? {
        $and: [
          { $ne: ['$$evaluation.comments', null] },
          { $ne: ['$$evaluation.comments', ''] },
        ],
      }
    : null;

  // 3. Other filters like lessonEvaluation, handwriting
  const otherFilters: any[] = [];
  if (query.lessonEvaluation?.trim()) {
    otherFilters.push({
      $eq: ['$$evaluation.lessonEvaluation', query.lessonEvaluation],
    });
  }
  if (query.handwriting?.trim()) {
    otherFilters.push({
      $eq: ['$$evaluation.handwriting', query.handwriting],
    });
  }

  // 🔹 Combine all studentEvaluation filters logically
  let finalCond: any;

  if (searchTermStudentFilters.length > 0 && hasCommentsFilter) {
    finalCond = {
      $and: [
        { $or: searchTermStudentFilters },
        hasCommentsFilter,
        ...otherFilters,
      ],
    };
  } else if (searchTermStudentFilters.length > 0) {
    finalCond = {
      $and: [{ $or: searchTermStudentFilters }, ...otherFilters],
    };
  } else if (hasCommentsFilter) {
    finalCond = {
      $and: [hasCommentsFilter, ...otherFilters],
    };
  } else if (otherFilters.length > 0) {
    finalCond = {
      $and: otherFilters,
    };
  } else {
    finalCond = {};
  }

  if (Object.keys(finalCond).length > 0) {
    pipeline.push({
      $addFields: {
        studentEvaluations: {
          $filter: {
            input: '$studentEvaluations',
            as: 'evaluation',
            cond: finalCond,
          },
        },
      },
    });

    pipeline.push({
      $match: { 'studentEvaluations.0': { $exists: true } },
    });
  }

  // 🔹 Populate todayLesson
  pipeline.push(
    {
      $lookup: {
        from: 'todaylessons',
        localField: 'todayLesson',
        foreignField: '_id',
        as: 'todayLesson',
      },
    },
    { $unwind: { path: '$todayLesson', preserveNullAndEmptyArrays: true } },
  );

  // 🔹 Populate homeTask
  pipeline.push(
    {
      $lookup: {
        from: 'todaytasks',
        localField: 'homeTask',
        foreignField: '_id',
        as: 'homeTask',
      },
    },
    { $unwind: { path: '$homeTask', preserveNullAndEmptyArrays: true } },
  );

  // 🔹 Sort newest first
  pipeline.push({ $sort: { createdAt: -1 } });

  // 🔹 Count total documents after filtering
  const countPipeline: any[] = [...pipeline];
  const countResult = await ClassReport.aggregate([
    ...countPipeline,
    { $count: 'total' },
  ]);
  const total = countResult.length > 0 ? countResult[0].total : 0;

  // 🔹 Pagination
  pipeline.push({ $skip: skip }, { $limit: limit });

  try {
    const reports = await ClassReport.aggregate(pipeline);
    const commentsStats = await getCommentsStatistics();

    const meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
      commentsStats,
    };

    const result = { meta, reports };

    try {
      await redis.setex(cacheKey, 300, JSON.stringify(result));
    } catch (error) {
      console.error('Redis cache write error:', error);
    }

    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

const getCommentsStatistics = async (): Promise<ICommentsStats> => {
  try {
    const pipeline = [
      {
        $unwind: '$studentEvaluations',
      },
      {
        $match: {
          'studentEvaluations.comments': {
            $exists: true,
            $nin: ['', null],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalComments: { $sum: 1 },
          reportsWithComments: { $addToSet: '$_id' },
          studentsWithComments: { $addToSet: '$studentEvaluations.studentId' },
        },
      },
      {
        $project: {
          totalComments: 1,
          reportsWithComments: { $size: '$reportsWithComments' },
          studentsWithComments: { $size: '$studentsWithComments' },
        },
      },
    ];

    const result = await ClassReport.aggregate(pipeline);

    if (result.length > 0) {
      return {
        totalComments: result[0].totalComments,
        reportsWithComments: result[0].reportsWithComments,
        studentsWithComments: result[0].studentsWithComments,
      };
    }

    return {
      totalComments: 0,
      reportsWithComments: 0,
      studentsWithComments: 0,
    };
  } catch (error) {
    console.error('Error getting comments statistics:', error);
    return {
      totalComments: 0,
      reportsWithComments: 0,
      studentsWithComments: 0,
    };
  }
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
  const result = await ClassReport.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Class report not found or already deleted',
    );
  }
  return result;
};
const updateHasCommentsForAllReports = async () => {
  const classReports = await ClassReport.find({});

  for (const report of classReports) {
    report.studentEvaluations = report.studentEvaluations.map(
      (evaluation: any) => {
        const hasComments =
          evaluation.comments && evaluation.comments.trim() !== '';
        return {
          ...evaluation,
          hasComments: !!hasComments,
        };
      },
    );

    await report.save();
  }

  return { message: '✅ hasComments updated for all student evaluations' };
};

export const classReportServices = {
  createClassReport,
  getAllClassReports,
  getSingleClassReport,
  updateClassReport,
  deleteClassReport,
  updateHasCommentsForAllReports,
};
