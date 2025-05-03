/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { IClassReport } from './classreport.interface';
import { ClassReport } from './classreport.model';
import { classReportSearchableFields } from './classreport.constant';
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
  const searchTerm = query.searchTerm;

  const matchConditions: any[] = [];

  // If searchTerm is provided and is a string
  if (searchTerm && typeof searchTerm === 'string') {
    // First, find matching students by name
    const matchingStudents = await Student.find({
      name: { $regex: searchTerm, $options: 'i' },
    }).select('_id');

    const matchingStudentIds = matchingStudents.map((student) =>
      new Types.ObjectId(student._id as string)
    );

    matchConditions.push({
      $or: [
        { teachers: { $regex: searchTerm, $options: 'i' } },
        { classes: { $regex: searchTerm, $options: 'i' } },
        { subjects: { $regex: searchTerm, $options: 'i' } },
        { hour: { $regex: searchTerm, $options: 'i' } },
        {
          'studentEvaluations.studentId': {
            $in: matchingStudentIds,
          },
        },
      ],
    });
  }

  const pipeline: any[] = [];

  // Apply search filters if any
  if (matchConditions.length > 0) {
    pipeline.push({
      $match: {
        $and: matchConditions,
      },
    });
  }

  // Populate studentEvaluations.studentId
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
                          cond: {
                            $eq: ['$$s._id', '$$evaluation.studentId'],
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
    }
  );

  // Populate todayLesson
  pipeline.push({
    $lookup: {
      from: 'todaylessons',
      localField: 'todayLesson',
      foreignField: '_id',
      as: 'todayLesson',
    },
  });
  pipeline.push({
    $unwind: {
      path: '$todayLesson',
      preserveNullAndEmptyArrays: true,
    },
  });

  // Populate homeTask
  pipeline.push({
    $lookup: {
      from: 'todaytasks',
      localField: 'homeTask',
      foreignField: '_id',
      as: 'homeTask',
    },
  });
  pipeline.push({
    $unwind: {
      path: '$homeTask',
      preserveNullAndEmptyArrays: true,
    },
  });

  // Sort and paginate if needed
  pipeline.push({ $sort: { createdAt: -1 } });

  // Get data
  const reports = await ClassReport.aggregate(pipeline);

  // Meta
  const meta = {
    total: reports.length,
  };

  return {
    meta,
    reports,
  };
};


export default getAllClassReports;

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
