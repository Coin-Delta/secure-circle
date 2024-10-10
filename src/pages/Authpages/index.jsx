import { Outlet } from 'react-router-dom';
function AuthPages() {
  return (
    <div className="flex image-container items-center justify-center min-h-screen">
      <div className="flex justify-center w-full rounded-md bg-white max-w-md backdrop-blur-sm p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthPages;
