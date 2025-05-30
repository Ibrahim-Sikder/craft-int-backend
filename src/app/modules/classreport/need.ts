// const getAllClassReports = async (query: any) => {
//   const {
//     page = 1,
//     limit = 10,
//     searchTerm,
//     teachers,
//     classes,
//     subjects,
//     hour,
//     date,
//   } = query;

//   const numericPage = Number(page);
//   const numericLimit = Number(limit);
//   const skip = (numericPage - 1) * numericLimit;

//   const redisKey = `classReports:${JSON.stringify(query)}`;
//   const cachedData = await redisClient.get(redisKey);

//   if (cachedData) {
//     return JSON.parse(cachedData);
//   }

//   const andConditions: any[] = [];

//   if (searchTerm) {
//     andConditions.push({
//       $text: {
//         $search: searchTerm,
//       },
//     });
//   }

//   if (teachers) andConditions.push({ teachers });
//   if (classes) andConditions.push({ classes });
//   if (subjects) andConditions.push({ subjects });
//   if (hour) andConditions.push({ hour });

//   if (date) {
//     const parsedDate = new Date(date);
//     parsedDate.setUTCHours(0, 0, 0, 0);
//     const nextDate = new Date(parsedDate);
//     nextDate.setUTCDate(parsedDate.getUTCDate() + 1);
//     andConditions.push({
//       date: {
//         $gte: parsedDate,
//         $lt: nextDate,
//       },
//     });
//   }

//   const filterCondition = andConditions.length > 0 ? { $and: andConditions } : {};

//   const start = Date.now();

//   const [data, total] = await Promise.all([
//     ClassReport.find(filterCondition)
//       .select('-__v')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(numericLimit)
//       .lean(),
//     ClassReport.countDocuments(filterCondition),
//   ]);

//   const end = Date.now();

//   const response = {
//     meta: {
//       page: numericPage,
//       limit: numericLimit,
//       total,
//       executionTimeMs: end - start,
//     },
//     data,
//   };

//   await redisClient.setEx(redisKey, 60, JSON.stringify(response)); // cache for 60s

//   return response;
// };