import { useEffect, useState } from "react";
import Coinlogo from "../../assets/images/dashboard/Coinlogo.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserRoundPlus,
  UserRoundCheck,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import Cookies from "js-cookie";
import { accessTokenCookieName } from "@/lib/constants";
import { handleLogout } from "@/services/auth";

function SideBarUser() {
  const [select, setSelect] = useState("verified Businesses");
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get(accessTokenCookieName);
    if (token) {
      setIsAuth(true);
    }

    if (!token) {
      setIsAuth(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setSelect("verified Businesses");
    } else if (location.pathname === "/login") {
      setSelect("login");
    } else if (location.pathname === "/sign-up") {
      setSelect("sign-up");
    } else if (location.pathname === "/business-profile") {
      setSelect("business-profile");
    } else if (location.pathname === "/update-profile") {
      setSelect("business-profile");
    } else {
      setSelect("verified Businesses");
    }
  }, [location]);

  return (
    <div className="w-full bg-[#fcfcfc] min-h-[100%] lg:block hidden">
      <div className="sticky top-0 w-full flex flex-col justify-between h-screen">
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
          {isAuth ? (
            <div className="flex flex-col p-8 w-full">
              <button
                onClick={() => navigate("/")}
                className={`p-6 rounded-xl cursor-pointer w-full ${select === "verified Businesses" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <BriefcaseBusiness />
                <span className="ml-2 text-base font-medium">
                  Verified Businesses
                </span>
              </button>
              <button
                onClick={() => navigate("/business-profile")}
                className={`p-6 rounded-xl cursor-pointer w-full ${select === "business-profile" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <ShieldCheck />
                <span className="ml-3 text-base font-medium">KYC Details</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col p-8 w-full">
              <button
                onClick={() => navigate("/")}
                className={`p-6 rounded-xl cursor-pointer w-full ${select === "verified Businesses" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <BriefcaseBusiness />
                <span className="ml-2 text-base font-medium">
                  Verified Businesses
                </span>
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className={`p-6 rounded-xl cursor-pointer w-full ${select === "sign-up" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <UserRoundPlus />
                <span className="ml-3 text-base font-medium">
                  Register Businesses
                </span>
              </button>
              <button
                onClick={() => navigate("/login")}
                className={`p-6 rounded-xl cursor-pointer w-full ${select === "login" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <UserRoundCheck />
                <span className="ml-3 text-base font-medium">
                  Merchant Log-in
                </span>
              </button>
            </div>
          )}
        </div>
        {isAuth && (
          <div className="p-8">
            <button
              onClick={() => {
                setIsAuth(false);
                handleLogout();
              }}
              className={`p-6 rounded-xl cursor-pointer w-full text-[#748297] hover:text-white hover:bg-primary flex items-center`}
            >
              <LogOut />
              <span className="ml-3 text-base font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBarUser;
