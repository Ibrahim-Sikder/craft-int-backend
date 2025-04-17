/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express';
import { authRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { classRoutes } from '../modules/class/class.route';
import { subjectRoutes } from '../modules/subject/subject.route';
import { studentRoutes } from '../modules/student/student.route';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
