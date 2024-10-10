import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Coinlogo from "../../assets/images/dashboard/Coinlogo.jpg";
import UserLogo from "../../assets/images/dashboard/User.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Cookies from "js-cookie";
import { accessTokenCookieName } from "@/lib/constants";
import MobileHeader from "./MobileHeader";
import { useState } from "react";
import { useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove(accessTokenCookieName);
    window.location.href = "/";
  };

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
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full  bg-[#fcfcfc] drop-shadow-[0_1px_0_rgba(0,0,0,0.05)] min-h-[10vh] py-4   flex items-center">
      <div
        className={`w-full mx-auto px-10 max-sm:px-5 flex justify-between ${location.pathname === "/profile" ? "container" : "max-w-7xl"}`}
      >
        {location.pathname === "/profile" ? (
          <Link to="/">
            <img
              src={Coinlogo}
              alt="logo"
              className="max-w-[200px] w-full"
              width={0}
              height={40}
            />
          </Link>
        ) : (
          <div className="lg:block hidden" />
        )}
        <div className="lg:hidden block">
          <MobileHeader />
        </div>
        <div className="flex items-center gap-5">
          <div className="flex justify-center items-center">
            {isAuth ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center outline-none">
                  <div className="mr-3 p-1 border-primary border-[3px] rounded-full">
                    <Avatar className="">
                      <AvatarImage src={UserLogo} />
                      <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                  </div>
                  {user?.name}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="font-bold"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
