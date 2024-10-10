import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/Header';
import SideBar from '../sidebar/SideBar';
import SideBarUser from '../sidebar/SideBarUser';

export function Layout() {
  const location = useLocation();
  return (
    <main className=" min-h-screen container-background w-full lg:grid md:grid-cols-5">
      {location?.pathname === '/profile' ? <></> : <SideBar />}
      <div
        className={`flex-col min-h-screen flex w-full bg-[#f1f1f1] ${location?.pathname === '/profile' ? 'col-span-5' : 'col-span-4'}`}
      >
        <Header />
        <div className={`w-full h-full bg-[#f1f1f1] mx-auto px-10 max-sm:px-5`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export function UserLayout() {
  return (
    <main className=" min-h-screen container-background w-full lg:grid md:grid-cols-5">
      <SideBarUser />
      <div
        className={`flex-col min-h-screen flex w-full bg-[#f1f1f1] col-span-4`}
      >
        <Header />
        <div className={`w-full h-full bg-[#f1f1f1] mx-auto p-10 max-sm:px-5`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
