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
<<<<<<< HEAD
import Redis from "ioredis"
=======
import Redis from 'ioredis';
>>>>>>> dd0855e81ace138525c35a0ab3833180e1fbe85a

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

// export const getAllClassReports = async (query: IClassReportQuery) => {
//   const searchTerm = query.searchTerm
//   console.log("this is search term", searchTerm)
//   const page = Number.parseInt(query.page?.toString() || "1") || 1
//   const limit = Number.parseInt(query.limit?.toString() || "5") || 5
//   const skip = (page - 1) * limit
//   console.log(`Pagination: page=${page}, limit=${limit}, skip=${skip}`)

//   // Create cache key based on all query parameters including hasComments
//   const cacheKey = `class_reports:${JSON.stringify({
//     searchTerm,
//     page,
//     limit,
//     className: query.className,
//     subject: query.subject,
//     teacher: query.teacher,
//     date: query.date,
//     hour: query.hour,
//     lessonEvaluation: query.lessonEvaluation, // Include in cache key
//     handwriting: query.handwriting, // Include in cache key
//     startDate: query.startDate,
//     endDate: query.endDate,
//     hasComments: query.hasComments,
//   })}`

//   try {
//     const cachedResult = await redis.get(cacheKey)
//     if (cachedResult) {
//       console.log("Returning cached result for class reports")
//       return JSON.parse(cachedResult)
//     }
//   } catch (error) {
//     console.error("Redis cache read error:", error)
//   }

//   const matchConditions: any[] = []

//   // Handle searchTerm for top-level fields and student names/comments
//   if (searchTerm && typeof searchTerm === "string") {
//     const matchingStudents = await Student.find({
//       name: { $regex: searchTerm, $options: "i" },
//     }).select("_id")
//     const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(String(student._id)))

//     matchConditions.push({
//       $or: [
//         { teachers: { $regex: searchTerm, $options: "i" } },
//         { classes: { $regex: searchTerm, $options: "i" } },
//         { subjects: { $regex: searchTerm, $options: "i" } },
//         { hour: { $regex: searchTerm, $options: "i" } },
//         {
//           "studentEvaluations.studentId": {
//             $in: matchingStudentIds,
//           },
//         },
//         {
//           "studentEvaluations.comments": { $regex: searchTerm, $options: "i" },
//         },
//       ],
//     })
//   }

//   // Top-level filters
//   if (query.className) {
//     matchConditions.push({ classes: { $regex: query.className, $options: "i" } })
//   }
//   if (query.subject) {
//     matchConditions.push({ subjects: { $regex: query.subject, $options: "i" } })
//   }
//   if (query.teacher) {
//     matchConditions.push({ teachers: { $regex: query.teacher, $options: "i" } })
//   }
//   if (query.hour) {
//     matchConditions.push({ hour: query.hour })
//   }
//   if (query.date) {
//     matchConditions.push({ date: new Date(query.date) })
//   }
//   if (query.startDate && query.endDate) {
//     matchConditions.push({
//       date: {
//         $gte: new Date(query.startDate),
//         $lte: new Date(query.endDate),
//       },
//     })
//   }

//   // Comments filter - only show reports with comments (report-level filter)
//   if (query.hasComments === "true" || query.hasComments === true) {
//     matchConditions.push({
//       "studentEvaluations.comments": {
//         $exists: true,
//         $nin: ["", null],
//       },
//     })
//   }

//   const pipeline: any[] = []

//   // Apply initial report-level match conditions
//   if (matchConditions.length > 0) {
//     pipeline.push({
//       $match: {
//         $and: matchConditions,
//       },
//     })
//   }

//   // Populate studentEvaluations.studentId
//   pipeline.push(
//     {
//       $lookup: {
//         from: "students", // Collection name for students
//         localField: "studentEvaluations.studentId",
//         foreignField: "_id",
//         as: "studentDetails",
//       },
//     },
//     {
//       $addFields: {
//         studentEvaluations: {
//           $map: {
//             input: "$studentEvaluations",
//             as: "evaluation",
//             in: {
//               $mergeObjects: [
//                 "$$evaluation",
//                 {
//                   studentId: {
//                     $arrayElemAt: [
//                       {
//                         $filter: {
//                           input: "$studentDetails",
//                           as: "s",
//                           cond: {
//                             $eq: ["$$s._id", "$$evaluation.studentId"],
//                           },
//                         },
//                       },
//                       0,
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//     {
//       $project: {
//         studentDetails: 0, // Remove temporary studentDetails array
//       },
//     },
//   )

//   // NEW: Filter studentEvaluations array based on lessonEvaluation and handwriting
//   const studentEvaluationFilters: any[] = []
//   if (query.lessonEvaluation) {
//     studentEvaluationFilters.push({
//       $eq: ["$$evaluation.lessonEvaluation", query.lessonEvaluation],
//     })
//   }
//   if (query.handwriting) {
//     studentEvaluationFilters.push({
//       $eq: ["$$evaluation.handwriting", query.handwriting],
//     })
//   }

//   if (studentEvaluationFilters.length > 0) {
//     pipeline.push({
//       $addFields: {
//         studentEvaluations: {
//           $filter: {
//             input: "$studentEvaluations",
//             as: "evaluation",
//             cond: {
//               $and: studentEvaluationFilters,
//             },
//           },
//         },
//       },
//     })

//     // NEW: Match reports that still have student evaluations after filtering
//     // This ensures that reports with no matching student evaluations are excluded
//     pipeline.push({
//       $match: {
//         "studentEvaluations.0": { $exists: true }, // Check if the array is not empty
//       },
//     })
//   }

//   // Populate todayLesson
//   pipeline.push({
//     $lookup: {
//       from: "todaylessons", // Collection name for todaylessons
//       localField: "todayLesson",
//       foreignField: "_id",
//       as: "todayLesson",
//     },
//   })
//   pipeline.push({
//     $unwind: {
//       path: "$todayLesson",
//       preserveNullAndEmptyArrays: true,
//     },
//   })

//   // Populate homeTask
//   pipeline.push({
//     $lookup: {
//       from: "todaytasks", // Collection name for todaytasks
//       localField: "homeTask",
//       foreignField: "_id",
//       as: "homeTask",
//     },
//   })
//   pipeline.push({
//     $unwind: {
//       path: "$homeTask",
//       preserveNullAndEmptyArrays: true,
//     },
//   })

//   // Sort by creation date (newest first)
//   pipeline.push({ $sort: { createdAt: -1 } })

//   // Create a separate pipeline for counting total documents
//   // This count should reflect the number of reports *after* all filtering,
//   // including the studentEvaluation filtering.
//   const countPipeline: any[] = [...pipeline]
//   // Execute count pipeline first
//   const countResult = await ClassReport.aggregate([...countPipeline, { $count: "total" }])
//   const total = countResult.length > 0 ? countResult[0].total : 0

//   // Add pagination to main pipeline
//   pipeline.push({ $skip: skip })
//   pipeline.push({ $limit: limit })

//   try {
//     // Execute main pipeline
//     const reports = await ClassReport.aggregate(pipeline)
//     console.log(`Query results: total=${total}, returned=${reports.length}, page=${page}, limit=${limit}`)

//     // Get comments statistics (global, not filtered by current view)
//     const commentsStats = await getCommentsStatistics()

//     // Meta information
//     const meta = {
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       hasNextPage: page < Math.ceil(total / limit),
//       hasPrevPage: page > 1,
//       commentsStats,
//     }

//     const result = {
//       meta,
//       reports,
//     }

//     // Cache the result for 5 minutes (300 seconds)
//     try {
//       await redis.setex(cacheKey, 300, JSON.stringify(result))
//       console.log("Cached class reports result")
//     } catch (error) {
//       console.error("Redis cache write error:", error)
//       // Continue without caching if Redis fails
//     }

//     return result
//   } catch (error) {
//     console.error("Database query error:", error)
//     throw error
//   }
// }

// export const getAllClassReports = async (query: IClassReportQuery) => {
//   const searchTerm = query.searchTerm?.trim();

//   const page = Number.parseInt(query.page?.toString() || '1') || 1;
//   const limit = Number.parseInt(query.limit?.toString() || '5') || 5;
//   const skip = (page - 1) * limit;

//   const hasCommentsQuery =
//     query.hasComments === 'true' || query.hasComments === true;

//   console.log('this query', query);

//   // Cache key
//   const cacheKey = `class_reports:${JSON.stringify(query)}`;

//   try {
//     const cachedResult = await redis.get(cacheKey);
//     if (cachedResult) {
//       return JSON.parse(cachedResult);
//     }
//   } catch (error) {
//     console.error('Redis cache read error:', error);
//   }

//   const matchConditions: any[] = [];
//   let matchingStudentIds: Types.ObjectId[] = [];

//   // SearchTerm logic for reports and students
//   if (searchTerm) {
//     const matchingStudents = await Student.find({
//       name: { $regex: searchTerm, $options: 'i' },
//     }).select('_id');

//     matchingStudentIds = matchingStudents.map(
//       (student) => new Types.ObjectId(String(student._id)),
//     );

//     matchConditions.push({
//       $or: [
//         { teachers: { $regex: searchTerm, $options: 'i' } },
//         { classes: { $regex: searchTerm, $options: 'i' } },
//         { subjects: { $regex: searchTerm, $options: 'i' } },
//         { hour: { $regex: searchTerm, $options: 'i' } },
//         { 'studentEvaluations.studentId': { $in: matchingStudentIds } },
//         {
//           'studentEvaluations.comments': { $regex: searchTerm, $options: 'i' },
//         },
//       ],
//     });
//   }

//   // Top-level filters
//   if (query.className?.trim()) {
//     matchConditions.push({
//       classes: { $regex: query.className, $options: 'i' },
//     });
//   }
//   if (query.subject?.trim()) {
//     matchConditions.push({
//       subjects: { $regex: query.subject, $options: 'i' },
//     });
//   }
//   if (query.teacher?.trim()) {
//     matchConditions.push({
//       teachers: { $regex: query.teacher, $options: 'i' },
//     });
//   }
//   if (query.hour?.trim()) {
//     matchConditions.push({ hour: query.hour });
//   }
//   if (query.date?.trim()) {
//     matchConditions.push({ date: new Date(query.date) });
//   }
//   if (query.startDate && query.endDate) {
//     matchConditions.push({
//       date: {
//         $gte: new Date(query.startDate),
//         $lte: new Date(query.endDate),
//       },
//     });
//   }

//   // Use hasComments boolean directly at report level
//   if (hasCommentsQuery) {
//     matchConditions.push({ hasComments: true });
//   }

//   const pipeline: any[] = [];

//   if (matchConditions.length > 0) {
//     pipeline.push({ $match: { $and: matchConditions } });
//   }

//   // Populate student details
//   pipeline.push(
//     {
//       $lookup: {
//         from: 'students',
//         localField: 'studentEvaluations.studentId',
//         foreignField: '_id',
//         as: 'studentDetails',
//       },
//     },
//     {
//       $addFields: {
//         studentEvaluations: {
//           $map: {
//             input: '$studentEvaluations',
//             as: 'evaluation',
//             in: {
//               $mergeObjects: [
//                 '$$evaluation',
//                 {
//                   studentId: {
//                     $arrayElemAt: [
//                       {
//                         $filter: {
//                           input: '$studentDetails',
//                           as: 's',
//                           cond: { $eq: ['$$s._id', '$$evaluation.studentId'] },
//                         },
//                       },
//                       0,
//                     ],
//                   },
//                 },
//               ],
//             },
//           },
//         },
//       },
//     },
//     { $project: { studentDetails: 0 } },
//   );

//   // Build studentEvaluation filters:

//   // 1. Search term filters combined with OR
//   const searchTermStudentFilters: any[] = [];
//   if (searchTerm) {
//     if (matchingStudentIds.length > 0) {
//       searchTermStudentFilters.push({
//         $in: ['$$evaluation.studentId._id', matchingStudentIds],
//       });
//     }
//     searchTermStudentFilters.push({
//       $regexMatch: {
//         input: '$$evaluation.comments',
//         regex: searchTerm,
//         options: 'i',
//       },
//     });
//   }

//   // 2. hasComments filter (students who have comments)
//   const hasCommentsFilter = hasCommentsQuery
//     ? {
//         $and: [
//           { $ne: ['$$evaluation.comments', null] },
//           { $ne: ['$$evaluation.comments', ''] },
//         ],
//       }
//     : null;

//   // 3. Other filters like lessonEvaluation, handwriting
//   const otherFilters: any[] = [];
//   if (query.lessonEvaluation?.trim()) {
//     otherFilters.push({
//       $eq: ['$$evaluation.lessonEvaluation', query.lessonEvaluation],
//     });
//   }
//   if (query.handwriting?.trim()) {
//     otherFilters.push({
//       $eq: ['$$evaluation.handwriting', query.handwriting],
//     });
//   }

//   // Combine all studentEvaluation filters logically:
//   let finalCond;

//   if (searchTermStudentFilters.length > 0 && hasCommentsFilter) {
//     // searchTerm inside OR, combined with hasComments and otherFilters using AND
//     finalCond = {
//       $and: [
//         { $or: searchTermStudentFilters },
//         hasCommentsFilter,
//         ...otherFilters,
//       ],
//     };
//   } else if (searchTermStudentFilters.length > 0) {
//     finalCond = {
//       $and: [{ $or: searchTermStudentFilters }, ...otherFilters],
//     };
//   } else if (hasCommentsFilter) {
//     finalCond = {
//       $and: [hasCommentsFilter, ...otherFilters],
//     };
//   } else if (otherFilters.length > 0) {
//     finalCond = {
//       $and: otherFilters,
//     };
//   } else {
//     finalCond = {};
//   }

//   if (Object.keys(finalCond).length > 0) {
//     pipeline.push({
//       $addFields: {
//         studentEvaluations: {
//           $filter: {
//             input: '$studentEvaluations',
//             as: 'evaluation',
//             cond: finalCond,
//           },
//         },
//       },
//     });

//     pipeline.push({
//       $match: { 'studentEvaluations.0': { $exists: true } },
//     });
//   }

//   // Populate todayLesson
//   pipeline.push(
//     {
//       $lookup: {
//         from: 'todaylessons',
//         localField: 'todayLesson',
//         foreignField: '_id',
//         as: 'todayLesson',
//       },
//     },
//     { $unwind: { path: '$todayLesson', preserveNullAndEmptyArrays: true } },
//   );

//   // Populate homeTask
//   pipeline.push(
//     {
//       $lookup: {
//         from: 'todaytasks',
//         localField: 'homeTask',
//         foreignField: '_id',
//         as: 'homeTask',
//       },
//     },
//     { $unwind: { path: '$homeTask', preserveNullAndEmptyArrays: true } },
//   );

//   // Sort newest first
//   pipeline.push({ $sort: { createdAt: -1 } });

//   // Count total documents after filtering
//   const countPipeline: any[] = [...pipeline];
//   const countResult = await ClassReport.aggregate([
//     ...countPipeline,
//     { $count: 'total' },
//   ]);
//   const total = countResult.length > 0 ? countResult[0].total : 0;

//   // Pagination
//   pipeline.push({ $skip: skip }, { $limit: limit });

//   try {
//     const reports = await ClassReport.aggregate(pipeline);
//     const commentsStats = await getCommentsStatistics();

//     const meta = {
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       hasNextPage: page < Math.ceil(total / limit),
//       hasPrevPage: page > 1,
//       commentsStats,
//     };

//     const result = { meta, reports };

//     try {
//       await redis.setex(cacheKey, 300, JSON.stringify(result));
//     } catch (error) {
//       console.error('Redis cache write error:', error);
//     }

//     return result;
//   } catch (error) {
//     console.error('Database query error:', error);
//     throw error;
//   }
// };

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
