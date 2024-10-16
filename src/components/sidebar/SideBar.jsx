import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Coinlogo from "../../assets/images/dashboard/Coinlogo.jpg";
import { LayoutDashboard, LockKeyhole, LogOut } from "lucide-react";
import { handleLogout } from "@/services/auth";

function SideBar() {
  const [select, setSelect] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith("/test")) {
      setSelect("test");
    } else if (location.pathname === "/Profile") {
      setSelect("Profile");
    } else {
      setSelect("dashboard");
    }
  }, [location]);

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen lg:block hidden">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-between">
        <div>
          <div className="bg-[#fcfcfc] min-h-[10vh] py-5 p-14 flex items-center">
            <Link to="/">
              <img
                src={Coinlogo}
                alt="logo"
                className="max-w-[200px] w-full"
                width={0}
                height={40}
              />
            </Link>
          </div>
          <div className="flex flex-col p-8 w-full">
            <button
              onClick={() => navigate("/")}
              className={`p-6 rounded-xl cursor-pointer w-full ${
                select === "dashboard"
                  ? "bg-primary text-white"
                  : "text-[#748297]"
              } flex items-center`}
            >
              <LayoutDashboard />
              <span className="ml-2 text-base font-medium">
                Admin Dashboard
              </span>
            </button>
            <button
              onClick={() => navigate("/Profile")}
              className={`p-6 rounded-xl cursor-pointer w-full ${
                select === "Profile"
                  ? "bg-primary text-white"
                  : "text-[#748297]"
              } flex items-center`}
            >
              <LockKeyhole />
              <span className="ml-3 text-base font-medium">
                Change Password
              </span>
            </button>
          </div>
        </div>
        <div className="p-8">
          <button
            onClick={() => handleLogout()}
            className={`p-6 rounded-xl cursor-pointer w-full text-[#748297] hover:text-white hover:bg-primary flex items-center`}
          >
            <LogOut />
            <span className="ml-3 text-base font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
