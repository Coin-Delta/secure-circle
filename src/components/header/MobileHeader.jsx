import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  BriefcaseBusiness,
  UserRoundPlus,
  UserRoundCheck,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Coinlogo from "../../assets/images/dashboard/Coinlogo.jpg";
import { useEffect } from "react";
import { useLocation } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom/dist";
import { useState } from "react";
import Cookies from "js-cookie";
import { accessTokenCookieName } from "@/lib/constants";

function MobileHeader() {
  const [select, setSelect] = useState("verified Businesses");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const handleNavigation = (path, selectedTab) => {
    navigate(path);
    setSelect(selectedTab);
    setIsSheetOpen(false); // Close the sheet on button click
  };

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
    } else {
      setSelect("verified Businesses");
    }
  }, [location]);
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <div className=" flex items-center">
            <AlignJustify />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetDescription className="pt-3 flex gap-5 flex-col">
          <div className="bg-[#fcfcfc] min-h-[10vh] py-5 px-8 flex items-center">
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
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => handleNavigation("/", "verified Businesses")}
                className={`p-5 rounded-xl cursor-pointer w-full ${select === "verified Businesses" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <BriefcaseBusiness />
                <span className="ml-2 text-base font-medium">
                  {" "}
                  Verified Businesses
                </span>
              </button>
              <button
                onClick={() =>
                  handleNavigation("/business-profile", "business-profile")
                }
                className={`p-5 rounded-xl cursor-pointer w-full ${select === "business-profile" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <ShieldCheck />
                <span className="ml-3 text-base font-medium">KYC Details</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={() => handleNavigation("/", "verified Businesses")}
                className={`p-5 rounded-xl cursor-pointer w-full ${select === "verified Businesses" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <BriefcaseBusiness />
                <span className="ml-2 text-base font-medium">
                  {" "}
                  Verified Businesses
                </span>
              </button>
              <button
                onClick={() => handleNavigation("/sign-up", "sign-up")}
                className={`p-5 rounded-xl cursor-pointer w-full ${select === "sign-up" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <UserRoundPlus />
                <span className="ml-3 text-base font-medium">
                  Register Businesses
                </span>
              </button>
              <button
                onClick={() => handleNavigation("/login", "login")}
                className={`p-5 rounded-xl cursor-pointer w-full ${select === "login" ? "bg-primary text-white" : " text-[#748297]"} flex items-center`}
              >
                <UserRoundCheck />
                <span className="ml-3 text-base font-medium">
                  Merchant Log-in
                </span>
              </button>
            </div>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
export default MobileHeader;
