/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { IClassReport } from './classreport.interface';
import { ClassReport } from './classreport.model';
import { Student } from '../student/student.model';
import { Types } from 'mongoose';

const createClassReport = async (payload: IClassReport) => {
  if (!payload.teachers || !payload.classes || !payload.subjects) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Missing required fields');
  }

  const result = await ClassReport.create(payload);
  return result;
};

export const getAllClassReports = async (query: Record<string, any>) => {
  const searchTerm = query.searchTerm
  const matchConditions: any[] = []
  let studentNameFilter: string | null = null

  if (searchTerm && typeof searchTerm === "string") {
    studentNameFilter = searchTerm
    const matchingStudents = await Student.find({
      name: { $regex: searchTerm, $options: "i" },
    }).select("_id")

    const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(student._id as string))

    matchConditions.push({
      $or: [
        { teachers: { $regex: searchTerm, $options: "i" } },
        { classes: { $regex: searchTerm, $options: "i" } },
        { subjects: { $regex: searchTerm, $options: "i" } },
        { hour: { $regex: searchTerm, $options: "i" } },
        { date: { $regex: searchTerm, $options: "i" } },
        {
          "studentEvaluations.studentId": {
            $in: matchingStudentIds,
          },
        },
      ],
    })
  }

  if (query.studentName && typeof query.studentName === "string") {
    studentNameFilter = query.studentName

    const matchingStudents = await Student.find({
      name: { $regex: query.studentName, $options: "i" },
    }).select("_id")

    const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(student._id as string))

    matchConditions.push({
      "studentEvaluations.studentId": {
        $in: matchingStudentIds,
      },
    })
  }

  const paramToFieldMap: Record<string, string> = {
    className: "classes",
    subject: "subjects",
    teacher: "teachers",
    hour: "hour",
    lessonEvaluation: "studentEvaluations.lessonEvaluation",
    handwriting: "studentEvaluations.handwriting",
  }

  for (const [param, field] of Object.entries(paramToFieldMap)) {
    if (query[param]) {
      matchConditions.push({
        [field]: query[param],
      })
    }
  }

  // Handle date range filtering
  if (query.startDate || query.endDate) {
    const dateFilter: any = {}

    if (query.startDate) {
      const startDate = new Date(query.startDate)
      startDate.setHours(0, 0, 0, 0) // Start of day
      dateFilter.$gte = startDate
    }

    if (query.endDate) {
      const endDate = new Date(query.endDate)
      endDate.setHours(23, 59, 59, 999) // End of day
      dateFilter.$lte = endDate
    }

    if (Object.keys(dateFilter).length > 0) {
      matchConditions.push({
        date: dateFilter,
      })
    }
  }

  // Handle single date filter (for backward compatibility)
  if (query.date && !query.startDate && !query.endDate) {
    const startDate = new Date(query.date)
    const endDate = new Date(query.date)
    endDate.setDate(endDate.getDate() + 1)

    matchConditions.push({
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    })
  }

  const pipeline: any[] = []

  if (matchConditions.length > 0) {
    pipeline.push({
      $match: {
        $and: matchConditions,
      },
    })
  }

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
        studentDetails: 0,
      },
    },
  )

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

  pipeline.push({ $sort: { createdAt: -1 } })

  const reports = await ClassReport.aggregate(pipeline)
  console.log(`Found ${reports.length} reports after filtering`)

  let processedReports = reports

  const { handwriting, lessonEvaluation, studentName, className, subject, teacher, date, hour, startDate, endDate } =
    query

  const studentNameFilterLower = studentNameFilter?.toLowerCase()

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
      const filteredReport = { ...report }

      if (Array.isArray(report.studentEvaluations)) {
        filteredReport.studentEvaluations = report.studentEvaluations.filter((evaluation: any) => {
          const matchesStudentName = studentNameFilterLower
            ? evaluation.studentId?.name?.toLowerCase().includes(studentNameFilterLower)
            : true

          const matchesHandwriting = handwriting ? evaluation.handwriting === handwriting : true

          const matchesLessonEvaluation = lessonEvaluation ? evaluation.lessonEvaluation === lessonEvaluation : true

          const matchesClass = className ? report.classes === className : true
          const matchesSubject = subject ? report.subjects === subject : true
          const matchesTeacher = teacher ? report.teachers === teacher : true
          const matchesHour = hour ? report.hour === hour : true

          const matchesDate =
            startDate || endDate
              ? (() => {
                  const reportDate = new Date(report.date)
                  let matchesStart = true
                  let matchesEnd = true

                  if (startDate) {
                    const startDateObj = new Date(startDate)
                    startDateObj.setHours(0, 0, 0, 0)
                    matchesStart = reportDate >= startDateObj
                  }

                  if (endDate) {
                    const endDateObj = new Date(endDate)
                    endDateObj.setHours(23, 59, 59, 999)
                    matchesEnd = reportDate <= endDateObj
                  }

                  return matchesStart && matchesEnd
                })()
              : date
                ? (() => {
                    const queryDate = new Date(date)
                    const reportDate = new Date(report.date)
                    return (
                      queryDate.getFullYear() === reportDate.getFullYear() &&
                      queryDate.getMonth() === reportDate.getMonth() &&
                      queryDate.getDate() === reportDate.getDate()
                    )
                  })()
                : true

          return (
            matchesStudentName &&
            matchesHandwriting &&
            matchesLessonEvaluation &&
            matchesClass &&
            matchesSubject &&
            matchesTeacher &&
            matchesHour &&
            matchesDate
          )
        })
      }

      return filteredReport
    })

    // Remove reports with no matching student evaluations
    processedReports = processedReports.filter(
      (report) => report.studentEvaluations && report.studentEvaluations.length > 0,
    )
  }

  // === PAGINATION ===
  const page = Number.parseInt(query.page as string) || 1
  const limit = Number.parseInt(query.limit as string) || 10
  const skip = (page - 1) * limit

  const paginatedReports = processedReports.slice(skip, skip + limit)

  return {
    meta: {
      total: processedReports.length,
      page,
      limit,
      totalPages: Math.ceil(processedReports.length / limit),
    },
    reports: paginatedReports,
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
