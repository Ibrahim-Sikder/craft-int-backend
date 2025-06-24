
// export const getAllClassReports = async (query: Record<string, any>) => {
//   const cacheKey = `classReports:${crypto.createHash('md5').update(JSON.stringify(query)).digest('hex')}`;

//   const cachedData = await redisClient.get(cacheKey);
//   if (cachedData) {
//     console.log('✅ Cache hit');
//     return JSON.parse(cachedData);
//   }

//   console.log('⏳ Cache miss, querying DB...');

//   const searchTerm = query.searchTerm;
//   const matchConditions: any[] = [];
//   let studentNameFilter: string | null = null;

//   if (searchTerm && typeof searchTerm === 'string') {
//     studentNameFilter = searchTerm;
//     const matchingStudents = await Student.find({
//       name: { $regex: searchTerm, $options: 'i' },
//     }).select('_id');

//     const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(String(student._id)));

//     matchConditions.push({
//       $or: [
//         { teachers: { $regex: searchTerm, $options: 'i' } },
//         { classes: { $regex: searchTerm, $options: 'i' } },
//         { subjects: { $regex: searchTerm, $options: 'i' } },
//         { hour: { $regex: searchTerm, $options: 'i' } },
//         { date: { $regex: searchTerm, $options: 'i' } },
//         { 'studentEvaluations.studentId': { $in: matchingStudentIds } },
//       ],
//     });
//   }

//   if (query.studentName && typeof query.studentName === 'string') {
//     studentNameFilter = query.studentName;

//     const matchingStudents = await Student.find({
//       name: { $regex: query.studentName, $options: 'i' },
//     }).select('_id');

//     const matchingStudentIds = matchingStudents.map((student) => new Types.ObjectId(String(student._id)));

//     matchConditions.push({
//       'studentEvaluations.studentId': { $in: matchingStudentIds },
//     });
//   }

//   const paramToFieldMap: Record<string, string> = {
//     className: 'classes',
//     subject: 'subjects',
//     teacher: 'teachers',
//     hour: 'hour',
//     lessonEvaluation: 'studentEvaluations.lessonEvaluation',
//     handwriting: 'studentEvaluations.handwriting',
//   };

//   for (const [param, field] of Object.entries(paramToFieldMap)) {
//     if (query[param]) {
//       matchConditions.push({ [field]: query[param] });
//     }
//   }

//   if (query.startDate || query.endDate) {
//     const dateFilter: any = {};
//     if (query.startDate) {
//       const startDate = new Date(query.startDate);
//       startDate.setHours(0, 0, 0, 0);
//       dateFilter.$gte = startDate;
//     }
//     if (query.endDate) {
//       const endDate = new Date(query.endDate);
//       endDate.setHours(23, 59, 59, 999);
//       dateFilter.$lte = endDate;
//     }
//     if (Object.keys(dateFilter).length > 0) {
//       matchConditions.push({ date: dateFilter });
//     }
//   }

//   if (query.date && !query.startDate && !query.endDate) {
//     const startDate = new Date(query.date);
//     const endDate = new Date(query.date);
//     endDate.setDate(endDate.getDate() + 1);
//     matchConditions.push({ date: { $gte: startDate, $lt: endDate } });
//   }

//   const pipeline: any[] = [];

//   if (matchConditions.length > 0) {
//     pipeline.push({ $match: { $and: matchConditions } });
//   }

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
//     {
//       $lookup: {
//         from: 'todaylessons',
//         localField: 'todayLesson',
//         foreignField: '_id',
//         as: 'todayLesson',
//       },
//     },
//     { $unwind: { path: '$todayLesson', preserveNullAndEmptyArrays: true } },
//     {
//       $lookup: {
//         from: 'todaytasks',
//         localField: 'homeTask',
//         foreignField: '_id',
//         as: 'homeTask',
//       },
//     },
//     { $unwind: { path: '$homeTask', preserveNullAndEmptyArrays: true } },
//     { $sort: { createdAt: -1 } }
//   );

//   const reports = await ClassReport.aggregate(pipeline);

//   let processedReports = reports;

//   const {
//     handwriting,
//     lessonEvaluation,
//     studentName,
//     className,
//     subject,
//     teacher,
//     date,
//     hour,
//     startDate,
//     endDate,
//   } = query;

//   const studentNameFilterLower = studentNameFilter?.toLowerCase();

//   if (
//     studentNameFilter ||
//     handwriting ||
//     lessonEvaluation ||
//     className ||
//     subject ||
//     teacher ||
//     date ||
//     hour ||
//     startDate ||
//     endDate
//   ) {
//     processedReports = reports.map((report) => {
//       const filteredReport = { ...report };
//       if (Array.isArray(report.studentEvaluations)) {
//         filteredReport.studentEvaluations = report.studentEvaluations.filter((evaluation: any) => {
//           const matchesStudentName = studentNameFilterLower
//             ? evaluation.studentId?.name?.toLowerCase().includes(studentNameFilterLower)
//             : true;
//           const matchesHandwriting = handwriting ? evaluation.handwriting === handwriting : true;
//           const matchesLessonEvaluation = lessonEvaluation
//             ? evaluation.lessonEvaluation === lessonEvaluation
//             : true;
//           const matchesClass = className ? report.classes === className : true;
//           const matchesSubject = subject ? report.subjects === subject : true;
//           const matchesTeacher = teacher ? report.teachers === teacher : true;
//           const matchesHour = hour ? report.hour === hour : true;

//           const matchesDate =
//             startDate || endDate
//               ? (() => {
//                   const reportDate = new Date(report.date);
//                   let matchesStart = true;
//                   let matchesEnd = true;

//                   if (startDate) {
//                     const startDateObj = new Date(startDate);
//                     startDateObj.setHours(0, 0, 0, 0);
//                     matchesStart = reportDate >= startDateObj;
//                   }

//                   if (endDate) {
//                     const endDateObj = new Date(endDate);
//                     endDateObj.setHours(23, 59, 59, 999);
//                     matchesEnd = reportDate <= endDateObj;
//                   }

//                   return matchesStart && matchesEnd;
//                 })()
//               : date
//               ? (() => {
//                   const queryDate = new Date(date);
//                   const reportDate = new Date(report.date);
//                   return (
//                     queryDate.getFullYear() === reportDate.getFullYear() &&
//                     queryDate.getMonth() === reportDate.getMonth() &&
//                     queryDate.getDate() === reportDate.getDate()
//                   );
//                 })()
//               : true;

//           return (
//             matchesStudentName &&
//             matchesHandwriting &&
//             matchesLessonEvaluation &&
//             matchesClass &&
//             matchesSubject &&
//             matchesTeacher &&
//             matchesHour &&
//             matchesDate
//           );
//         });
//       }

//       return filteredReport;
//     });

//     processedReports = processedReports.filter(
//       (report) => report.studentEvaluations && report.studentEvaluations.length > 0
//     );
//   }

//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;

//   const paginatedReports = processedReports.slice(skip, skip + limit);

//   const result = {
//     meta: {
//       total: processedReports.length,
//       page,
//       limit,
//       totalPages: Math.ceil(processedReports.length / limit),
//     },
//     reports: paginatedReports,
//   };

//   await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 });

//   return result;
// };


