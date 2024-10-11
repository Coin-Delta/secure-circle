import { lazy } from 'react';
import UserDash from '@/pages/dashboard/UserDash';
const LoginPages = lazy(() => import('../pages/Authpages/Login/Login'));
const SignUpPages = lazy(() => import('../pages/Authpages/signup/signup'));
const ForgotPasswordPage = lazy(
  () => import('../pages/Authpages/forgotpassword/VerifyEmail'),
);
const SetPasswordPage = lazy(
  () => import('../pages/Authpages/forgotpassword/SetPassword'),
);
const VerifyOtpPage = lazy(
  () => import('../pages/Authpages/verifyOTP/VerifyOTP'),
);

export const PublicRoutes = [
  { index: true, path: '/*', element: <UserDash /> },
  { path: '/verify-otp', element: <VerifyOtpPage /> },
  { path: '/sign-up', element: <SignUpPages /> },
  { path: '/login', element: <LoginPages /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/set-password', element: <SetPasswordPage /> },
];
