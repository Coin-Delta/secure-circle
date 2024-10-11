import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/profile/Profile";

export const AdminRoutes = [
  { index: true, path: "/", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
];
