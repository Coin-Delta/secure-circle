import BusinessProfile from '@/pages/profile/BusinessProfile';
import UserDash from '@/pages/dashboard/UserDash';
import EditBusinessProfile from '@/pages/profile/EditBusinessProfile';

export const MerchantRoutes = [
  { index: true, path: '/', element: <UserDash /> },
  { path: '/business-profile', element: <BusinessProfile /> },
  { path: '/update-profile', element: <EditBusinessProfile /> },
];
