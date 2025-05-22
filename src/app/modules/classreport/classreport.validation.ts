import { z } from 'zod';

const createClassReportValidation = z.object({
  body: z.object({
    teachers: z.string({ required_error: 'Teacher is  required!' }),
    classes: z.string({ required_error: 'Classes is  required!' }),
    subjects: z.string({ required_error: 'Subject is  required!' }),
    hour: z
      .string({
        required_error: 'Hour is required',
      })
      .min(1, 'Hour must not be empty'),
    date: z
      .string({
        required_error: 'Date is required',
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      }),
    studentEvaluations: z
      .array(
        z.object({
          studentId: z.string({
            required_error: 'Student ID is required',
          }),
          lessonEvaluation: z.enum(
            ["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি", "অনুপস্থিত", "পাঠ নেই"],
            {
              required_error: 'Lesson evaluation is required',
            },
          ),
          handwriting: z.enum(["লিখেছে", "আংশিক লিখেছে", "লিখেনি", "কাজ নেই",'অনুপস্থিত'], {
            required_error: 'Handwriting evaluation is required',
          }),
          attendance: z.enum(['উপস্থিত', 'অনুপস্থিত', 'ছুটি'], {
            required_error: 'Attendance status is required',
          }),
          parentSignature: z.boolean({
            required_error: 'Parent signature is required',
          }),
          comments: z.string().optional(),
        }),
      )
      .min(1, 'At least one student evaluation is required'),
      todayLesson: z.string().nullable().optional(),
      homeTask: z.string().nullable().optional(),
      
  }),
});

const updateClassReportValidation = z.object({
  body: z.object({
    teachers: z.union([z.string(), z.array(z.string())]).optional(),
    classes: z.string({ required_error: 'Classes is  required!' }).optional(),
    subjects: z.string({ required_error: 'Subject is  required!' }).optional(),
    hour: z.string().optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),
    studentEvaluations: z
       .array(
        z.object({
          studentId: z.string({
            required_error: 'Student ID is required',
          }),
          lessonEvaluation: z.enum(
            ["পড়া শিখেছে", "আংশিক শিখেছে", "পড়া শিখেনি", "অনুপস্থিত", "পাঠ নেই"],
            {
              required_error: 'Lesson evaluation is required',
            },
          ),
          handwriting: z.enum(["লিখেছে", "আংশিক লিখেছে", "লিখেনি", "কাজ নেই",'অনুপস্থিত'], {
            required_error: 'Handwriting evaluation is required',
          }),
          attendance: z.enum(['উপস্থিত', 'অনুপস্থিত', 'ছুটি'], {
            required_error: 'Attendance status is required',
          }),
          parentSignature: z.boolean({
            required_error: 'Parent signature is required',
          }),
          comments: z.string().optional(),
        }),
      )
      .optional(),
    todayLesson: z.string().nullable().optional(),
    homeTask: z.string().nullable().optional(),
  }),
});

// const createClassReportValidation = z.object({
//   body: z.object({
//     teacherId: z.string({
//       required_error: 'Teacher ID is required',
//     }),
//     classId: z.string({
//       required_error: 'Class ID is required',
//     }),
//     subjectId: z.string({
//       required_error: 'Subject ID is required',
//     }),
//     hour: z
//       .string({
//         required_error: 'Hour is required',
//       })
//       .min(1, 'Hour must not be empty'),
//     date: z
//       .string({
//         required_error: 'Date is required',
//       })
//       .refine((val) => !isNaN(Date.parse(val)), {
//         message: 'Invalid date format',
//       }),
//     studentEvaluations: z
//       .array(
//         z.object({
//           studentId: z.string({
//             required_error: 'Student ID is required',
//           }),
//           lessonEvaluation: z.enum(
//             ['পড়া শিখেছে', 'আংশিক শিখেছে', 'পড়া শিখেনি'],
//             {
//               required_error: 'Lesson evaluation is required',
//             },
//           ),
//           handwriting: z.enum(['লিখেছে', 'আংশিক লিখেছে', 'লিখেনি'], {
//             required_error: 'Handwriting evaluation is required',
//           }),
//           attendance: z.enum(['উপস্থিত', 'অনুপস্থিত', 'ছুটি'], {
//             required_error: 'Attendance status is required',
//           }),
//           parentSignature: z.boolean({
//             required_error: 'Parent signature is required',
//           }),
//           comments: z.string().optional(),
//         }),
//       )
//       .min(1, 'At least one student evaluation is required'),
//     todayLesson: z.array(
//       z.string({ required_error: 'Today leson id is required!' }),
//     ),
//     homeTask: z.array(z.string({ required_error: 'Todaytask is required!' })),
//   }),
// });

// const updateClassReportValidation = z.object({
//   body: z.object({
//     teacherId: z.string().optional(),
//     classId: z.string().optional(),
//     subjectId: z.string().optional(),
//     hour: z.string().optional(),
//     date: z
//       .string()
//       .refine((val) => !isNaN(Date.parse(val)), {
//         message: 'Invalid date format',
//       })
//       .optional(),
//     studentEvaluations: z
//       .array(
//         z.object({
//           studentId: z.string().optional(),
//           lessonEvaluation: z
//             .enum(['পড়া শিখেছে', 'আংশিক শিখেছে', 'পড়া শিখেনি'])
//             .optional(),
//           handwriting: z.enum(['লিখেছে', 'আংশিক লিখেছে', 'লিখেনি']).optional(),
//           attendance: z.enum(['উপস্থিত', 'অনুপস্থিত', 'ছুটি']).optional(),
//           parentSignature: z.boolean().optional(),
//           comments: z.string().optional(),
//         }),
//       )
//       .optional(),
//     todayLesson: z
//       .array(z.string({ required_error: 'Today leson id is required!' }))
//       .optional(),
//     homeTask: z
//       .array(z.string({ required_error: 'Todaytask is required!' }))
//       .optional(),
//   }),
// });

export const ClassReportValidations = {
  createClassReportValidation,
  updateClassReportValidation,
};
