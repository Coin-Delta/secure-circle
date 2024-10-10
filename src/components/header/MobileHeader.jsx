import { AlignJustify } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import {
  BriefcaseBusiness,
  Newspaper,
  ClipboardPen,
  NotebookPen,
  LayoutDashboard,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Coinlogo from '../../assets/images/dashboard/Coinlogo.jpg';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom/dist';
import { useState } from 'react';

function MobileHeader() {
  const [select, setSelect] = useState('portfolio');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigation = (path, selectedTab) => {
    navigate(path);
    setSelect(selectedTab);
    setIsSheetOpen(false); // Close the sheet on button click
  };
  useEffect(() => {
    if (location.pathname.startsWith('/test')) {
      setSelect('test');
    } else if (location.pathname === '/books') {
      setSelect('books');
    } else if (location.pathname === '/current-affair') {
      setSelect('current-affair');
    } else if (location.pathname === '/job') {
      setSelect('job');
    } else if (location.pathname.startsWith('/exam')) {
      setSelect('exam');
    } else if (location.pathname === '/payment') {
      setSelect('payment');
    } else {
      setSelect('portfolio');
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
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => handleNavigation('/', 'portfolio')}
              className={`p-5 rounded-xl cursor-pointer w-full ${select === 'portfolio' ? 'bg-primary text-white' : ' text-[#748297]'} flex items-center`}
            >
              <LayoutDashboard />
              <span className="ml-2 text-base font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => handleNavigation('/test', 'test')}
              className={`p-5 rounded-xl cursor-pointer w-full ${select === 'test' ? 'bg-primary text-white' : ' text-[#748297]'} flex items-center`}
            >
              <ClipboardPen />
              <span className="ml-3 text-base font-medium">Manage Tests</span>
            </button>
            <button
              onClick={() =>
                handleNavigation('/current-affair', 'current-affair')
              }
              className={`p-5 rounded-xl cursor-pointer w-full ${select === 'current-affair' ? 'bg-primary text-white' : ' text-[#748297]'} flex items-center`}
            >
              <Newspaper />
              <span className="ml-3 text-base font-medium">Current Affair</span>
            </button>
            <button
              onClick={() => handleNavigation('/job', 'job')}
              className={`p-5 rounded-xl cursor-pointer w-full ${select === 'job' ? 'bg-primary text-white' : ' text-[#748297]'} flex items-center`}
            >
              <BriefcaseBusiness />
              <span className="ml-3 text-base font-medium">Job List</span>
            </button>
            <button
              onClick={() => handleNavigation('/exam', 'exam')}
              className={`p-5 rounded-xl cursor-pointer w-full ${select === 'exam' ? 'bg-primary text-white' : ' text-[#748297]'} flex items-center`}
            >
              <NotebookPen />
              <span className="ml-3 text-base font-medium">Exam Category</span>
            </button>
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
export default MobileHeader;
