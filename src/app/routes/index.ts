/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { authRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { classRoutes } from '../modules/class/class.route';
import { subjectRoutes } from '../modules/subject/subject.route';
import { studentRoutes } from '../modules/student/student.route';
import { sessionRoutes } from '../modules/session/session.route';
import { sectionRoutes } from '../modules/section/section.route';
import { timeSlotRoutes } from '../modules/timeslot/timeslot.route';
import { roomRoutes } from '../modules/room/room.route';
import { homeTaskRoutes } from '../modules/hometask/hometask.route';
import { todayLessonRoutes } from '../modules/todaylesson/todaylesson.route';
import { classReportRoutes } from '../modules/classreport/classreport.route';
import { mealReportRoutes } from '../modules/mealreport/mealreport.route';
import { teacherRoutes } from '../modules/teacher/teacher.route';
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
    path: '/session',
    route: sessionRoutes,
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
    path: '/todaylesson',
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
