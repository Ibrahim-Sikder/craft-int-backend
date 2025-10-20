/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { authRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { classRoutes } from '../modules/class/class.route';
import { subjectAssignRoute } from '../modules/subject-assign/subject-assign.route';
import { studentRoutes } from '../modules/student/student.route';
import { sectionRoutes } from '../modules/section/section.route';
import { timeSlotRoutes } from '../modules/timeslot/timeslot.route';
import { roomRoutes } from '../modules/room/room.route';
import { homeTaskRoutes } from '../modules/hometask/hometask.route';
import { todayLessonRoutes } from '../modules/todaylesson/todaylesson.route';
import { classReportRoutes } from '../modules/classreport/classreport.route';
import { mealReportRoutes } from '../modules/mealreport/mealreport.route';
import { teacherRoutes } from '../modules/teacher/teacher.route';
import { subjectRoutes } from '../modules/subject/subject.route';
import { todayTaskRoutes } from '../modules/todaytask/todaytask.route';
import { dailyClassReportRoutes } from '../modules/dailyclassreport/dailyClassReport.route';
import { staffRoutes } from '../modules/staff/staff.route';
import { metaroute } from '../modules/meta/meta.route';
import { admissionRoutes } from '../modules/admission/admission.route';
import { announcementRoutes } from '../modules/announcement/announcement.route';
import { notificationRoutes } from '../modules/notification/notification.route';
import { complaintRoutes } from '../modules/complaint/complaint.route';
import { feedbackRoutes } from '../modules/feedback/feedback.route';
import { expenseRoutes } from '../modules/expense/expense.route';
import { incomeRoutes } from '../modules/income/income.route';
import { incomeCategoryRoutes } from '../modules/incomeCategory/route';
import { expenseCategoryRoutes } from '../modules/expenseCategory/route';
import { salaryRoutes } from '../modules/salary/salary.route';
import { hifzClassRoutes } from '../modules/hifzClass/route';
import { hifzSubjectRoutes } from '../modules/hifzSubject/route';
import { hifzClassReportRoutes } from '../modules/hifzClassReport/route';
import { investmentRoutes } from '../modules/investment/route';
import { loanRoutes } from '../modules/loan/route';
import { nazeraDailyReportRoutes } from '../modules/nazeraDailyReport/route';
import { QaidaDailyReportRoutes } from '../modules/qaidaDailyReport/route';
import { sunaniReportRoutes } from '../modules/sunaniReport/route';
import { sobokiDailyReportRoutes } from '../modules/sobokiDailyReport/route';
import { amparaDailyReportRoutes } from '../modules/amparaDailyReport/route';
import { weeklyReportRoutes } from '../modules/weeklyReport/route';
const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/class',
    route: classRoutes,
  },
  {
    path: '/subject',
    route: subjectRoutes,
  },
  {
    path: '/student',
    route: studentRoutes,
  },

  {
    path: '/section',
    route: sectionRoutes,
  },
  {
    path: '/timeslot',
    route: timeSlotRoutes,
  },
  {
    path: '/room',
    route: roomRoutes,
  },
  {
    path: '/teacher',
    route: teacherRoutes,
  },
  {
    path: '/hometask',
    route: homeTaskRoutes,
  },
  {
    path: '/today-lesson',
    route: todayLessonRoutes,
  },
  {
    path: '/class-report',
    route: classReportRoutes,
  },
  {
    path: '/meal-report',
    route: mealReportRoutes,
  },
  {
    path: '/today-task',
    route: todayTaskRoutes,
  },
  {
    path: '/daily-class-report',
    route: dailyClassReportRoutes,
  },
  {
    path: '/announcement',
    route: announcementRoutes,
  },
  {
    path: '/staff',
    route: staffRoutes,
  },
  {
    path: '/notification',
    route: notificationRoutes,
  },
  {
    path: '/admission',
    route: admissionRoutes,
  },
  {
    path: '/complaint',
    route: complaintRoutes,
  },
  {
    path: '/feedback',
    route: feedbackRoutes,
  },
  {
    path: '/expense',
    route: expenseRoutes,
  },
  {
    path: '/income',
    route: incomeRoutes,
  },
  {
    path: '/income-category',
    route: incomeCategoryRoutes,
  },
  {
    path: '/expense-category',
    route: expenseCategoryRoutes,
  },
  {
    path: '/salary',
    route: salaryRoutes,
  },
  {
    path: '/hifz-class',
    route: hifzClassRoutes,
  },
  {
    path: '/hifz-subject',
    route: hifzSubjectRoutes,
  },
  {
    path: '/hifz-class-report',
    route: hifzClassReportRoutes,
  },
  {
    path: '/investment',
    route: investmentRoutes,
  },
  {
    path: '/loan',
    route: loanRoutes,
  },
  {
    path: '/nazera-daily-report',
    route: nazeraDailyReportRoutes,
  },
  {
    path: '/qaida-daily-report',
    route: QaidaDailyReportRoutes,
  },
  {
    path: '/sunani-daily-report',
    route: sunaniReportRoutes,
  },
  {
    path: '/soboki-daily-report',
    route: sobokiDailyReportRoutes,
  },
  {
    path: '/ampara-daily-report',
    route: amparaDailyReportRoutes,
  },
  {
    path: '/weekly-report',
    route: weeklyReportRoutes,
  },
  {
    path: '/meta',
    route: metaroute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
