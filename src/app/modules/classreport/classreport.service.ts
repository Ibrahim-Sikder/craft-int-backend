/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IClassReport, IClassReportQuery, ICommentsStats } from './classreport.interface';
import { ClassReport } from './classreport.model';
import { Student } from '../student/student.model';
import { Types } from 'mongoose';
import Redis from "ioredis"

<<<<<<< HEAD
// Initialize Redis client
=======

>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: 3,
})
const createClassReport = async (payload: IClassReport) => {
  if (!payload.teachers || !payload.classes || !payload.subjects) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Missing required fields');
  }

  const result = await ClassReport.create(payload);
  return result;
};

<<<<<<< HEAD
const getAllClassReports = async (query: any) => {
  const searchTerm = query.searchTerm
  const page = Number.parseInt(query.page) || 1 // Keep 1-based for consistency
  const limit = Number.parseInt(query.limit) || 5 // Default to 5 items per page
  const skip = (page - 1) * limit // Convert to 0-based for database skip

  console.log(`Pagination: page=${page}, limit=${limit}, skip=${skip}`)

  // Create cache key based on all query parameters
=======
const getAllClassReports = async (query: IClassReportQuery) => {
  const searchTerm = query.searchTerm
  const page = Number.parseInt(query.page?.toString() || "1") || 1
  const limit = Number.parseInt(query.limit?.toString() || "5") || 5
  const skip = (page - 1) * limit

  console.log(`Pagination: page=${page}, limit=${limit}, skip=${skip}`)

  // Create cache key based on all query parameters including hasComments
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
  const cacheKey = `class_reports:${JSON.stringify({
    searchTerm,
    page,
    limit,
    className: query.className,
    subject: query.subject,
    teacher: query.teacher,
    date: query.date,
    hour: query.hour,
    lessonEvaluation: query.lessonEvaluation,
    handwriting: query.handwriting,
    startDate: query.startDate,
    endDate: query.endDate,
<<<<<<< HEAD
  })}`

  try {
    // Try to get cached result
=======
    hasComments: query.hasComments,
  })}`

  try {
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
    const cachedResult = await redis.get(cacheKey)
    if (cachedResult) {
      console.log("Returning cached result for class reports")
      return JSON.parse(cachedResult)
    }
  } catch (error) {
    console.error("Redis cache read error:", error)
<<<<<<< HEAD
    // Continue with database query if cache fails
=======
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
  }

  const matchConditions = []

<<<<<<< HEAD
  // If searchTerm is provided and is a string
  if (searchTerm && typeof searchTerm === "string") {
    // First, find matching students by name
=======
  if (searchTerm && typeof searchTerm === "string") {

>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
    const matchingStudents = await Student.find({
      name: { $regex: searchTerm, $options: "i" },
    }).select("_id")

    const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(String(student._id)))

    matchConditions.push({
      $or: [
        { teachers: { $regex: searchTerm, $options: "i" } },
        { classes: { $regex: searchTerm, $options: "i" } },
        { subjects: { $regex: searchTerm, $options: "i" } },
        { hour: { $regex: searchTerm, $options: "i" } },
        {
          "studentEvaluations.studentId": {
            $in: matchingStudentIds,
          },
        },

        {
          "studentEvaluations.comments": { $regex: searchTerm, $options: "i" },
        },
      ],
    })
  }

<<<<<<< HEAD
  // Add additional filter conditions
=======
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
  if (query.className) {
    matchConditions.push({ classes: { $regex: query.className, $options: "i" } })
  }

  if (query.subject) {
    matchConditions.push({ subjects: { $regex: query.subject, $options: "i" } })
  }

  if (query.teacher) {
    matchConditions.push({ teachers: { $regex: query.teacher, $options: "i" } })
  }

  if (query.hour) {
    matchConditions.push({ hour: query.hour })
  }

  if (query.date) {
    matchConditions.push({ date: new Date(query.date) })
  }

<<<<<<< HEAD
  // Date range filter
=======
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
  if (query.startDate && query.endDate) {
    matchConditions.push({
      date: {
        $gte: new Date(query.startDate),
        $lte: new Date(query.endDate),
      },
    })
  }

  // Lesson evaluation and handwriting filters
  if (query.lessonEvaluation) {
    matchConditions.push({
      "studentEvaluations.lessonEvaluation": query.lessonEvaluation,
    })
  }

  if (query.handwriting) {
    matchConditions.push({
      "studentEvaluations.handwriting": query.handwriting,
    })
  }

<<<<<<< HEAD
=======
  // NEW: Comments filter - only show reports with comments
if (query.hasComments === 'true' || query.hasComments === true) {
  matchConditions.push({
    "studentEvaluations.comments": {
      $exists: true,
      $nin: ["", null],
    },
  })
}



>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
  const pipeline: any[] = []

  // Apply search filters if any
  if (matchConditions.length > 0) {
    pipeline.push({
      $match: {
        $and: matchConditions,
      },
    })
  }

  // Populate studentEvaluations.studentId
  pipeline.push(
    {
      $lookup: {
        from: "students",
        localField: "studentEvaluations.studentId",
        foreignField: "_id",
        as: "studentDetails",
      },
    },
    {
      $addFields: {
        studentEvaluations: {
          $map: {
            input: "$studentEvaluations",
            as: "evaluation",
            in: {
              $mergeObjects: [
                "$$evaluation",
                {
                  studentId: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$studentDetails",
                          as: "s",
                          cond: {
                            $eq: ["$$s._id", "$$evaluation.studentId"],
                          },
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
    {
      $project: {
        studentDetails: 0, // remove temp field
      },
    },
  )

  // Populate todayLesson
  pipeline.push({
    $lookup: {
      from: "todaylessons",
      localField: "todayLesson",
      foreignField: "_id",
      as: "todayLesson",
    },
  })
  pipeline.push({
    $unwind: {
      path: "$todayLesson",
      preserveNullAndEmptyArrays: true,
    },
  })

  // Populate homeTask
  pipeline.push({
    $lookup: {
      from: "todaytasks",
      localField: "homeTask",
      foreignField: "_id",
      as: "homeTask",
    },
  })
  pipeline.push({
    $unwind: {
      path: "$homeTask",
      preserveNullAndEmptyArrays: true,
    },
  })

  // Sort by creation date (newest first)
  pipeline.push({ $sort: { createdAt: -1 } })

  // Create a separate pipeline for counting total documents
  const countPipeline: any[] = [...pipeline]

  // Execute count pipeline first
  const countResult = await ClassReport.aggregate([...countPipeline, { $count: "total" }])
  const total = countResult.length > 0 ? countResult[0].total : 0

  // Add pagination to main pipeline
  pipeline.push({ $skip: skip })
  pipeline.push({ $limit: limit })

  try {
    // Execute main pipeline
    const reports = await ClassReport.aggregate(pipeline)

    console.log(`Query results: total=${total}, returned=${reports.length}, page=${page}, limit=${limit}`)

<<<<<<< HEAD
=======
    // Get comments statistics
    const commentsStats = await getCommentsStatistics()

>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
    // Meta information
    const meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
<<<<<<< HEAD
=======
      commentsStats, // Add comments statistics to meta
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
    }

    const result = {
      meta,
      reports,
    }

    // Cache the result for 5 minutes (300 seconds)
    try {
      await redis.setex(cacheKey, 300, JSON.stringify(result))
      console.log("Cached class reports result")
    } catch (error) {
      console.error("Redis cache write error:", error)
      // Continue without caching if Redis fails
    }

    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}

<<<<<<< HEAD
// Helper function to clear cache when data is modified
const clearClassReportsCache = async () => {
  try {
    const keys = await redis.keys("class_reports:*")
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`Cleared ${keys.length} class reports cache entries`)
    }
  } catch (error) {
    console.error("Error clearing class reports cache:", error)
  }
}

// Helper function to clear specific cache patterns
const clearClassReportsCachePattern = async (pattern: any) => {
  try {
    const keys = await redis.keys(`class_reports:*${pattern}*`)
    if (keys.length > 0) {
      await redis.del(...keys)
      console.log(`Cleared ${keys.length} class reports cache entries matching pattern: ${pattern}`)
    }
  } catch (error) {
    console.error("Error clearing class reports cache pattern:", error)
=======
// NEW: Function to get comments statistics
const getCommentsStatistics = async (): Promise<ICommentsStats> => {
  try {
    const pipeline = [
      {
        $unwind: "$studentEvaluations",
      },
      {
        $match: {
          "studentEvaluations.comments": {
            $exists: true,
            $nin: ["", null],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalComments: { $sum: 1 },
          reportsWithComments: { $addToSet: "$_id" },
          studentsWithComments: { $addToSet: "$studentEvaluations.studentId" },
        },
      },
      {
        $project: {
          totalComments: 1,
          reportsWithComments: { $size: "$reportsWithComments" },
          studentsWithComments: { $size: "$studentsWithComments" },
        },
      },
    ]

    const result = await ClassReport.aggregate(pipeline)

    if (result.length > 0) {
      return {
        totalComments: result[0].totalComments,
        reportsWithComments: result[0].reportsWithComments,
        studentsWithComments: result[0].studentsWithComments,
      }
    }

    return {
      totalComments: 0,
      reportsWithComments: 0,
      studentsWithComments: 0,
    }
  } catch (error) {
    console.error("Error getting comments statistics:", error)
    return {
      totalComments: 0,
      reportsWithComments: 0,
      studentsWithComments: 0,
    }
>>>>>>> cf2df89ec0061879ce01fdf5c2774a1dc8d85b03
  }
}


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

export const classReportServices = {
  createClassReport,
  getAllClassReports,
  getSingleClassReport,
  updateClassReport,
  deleteClassReport,
};