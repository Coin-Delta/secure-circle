import Dashboard from '@/pages/dashboard/Dashboard';
import Profile from '@/pages/profile/Profile';

export const AdminRoutes = [
  { index: true, path: '/', element: <Dashboard /> },
  { path: '/profile', element: <Profile /> },
  // { path: '/test', element: <Test /> },
  // { path: 'test/quiz', element: <QuizContest /> },
  // { path: '/current-affair', element: <Affair /> },
  // { path: '/job', element: <Jobs /> },
  // { path: '/exam', element: <ExamCategory /> },
  // { path: '/exam/:id', element: <ExamDetail /> },
];
