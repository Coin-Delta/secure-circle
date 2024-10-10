import './style.css';
import TotalIcon from '@/assets/images/dashboard/Icon1.svg?react';
import PendingIcon from '@/assets/images/dashboard/Icon2.svg?react';
import CompleteIcon from '@/assets/images/dashboard/Icon3.svg?react';
import propTypes from 'prop-types';

function DashboardContainer({ data }) {
  return (
    <div className="w-full drop-shadow-md rounded-xl bg-white text-black ">
      <div className="mt-10 p-5 flex justify-between  max-sm:flex-col">
        <div className="dashboard-image1 md:w-[18.5rem] px-4 py-2 flex flex-col ">
          <TotalIcon width={35} />
          <span className="text-sm  font-medium ">Total Businesses </span>
          <span className="text-2xl font-semibold mb-7">
            {data?.users || 0}
          </span>
        </div>
        <div className="dashboard-image2 md:w-[18.5rem] px-4 py-2 flex flex-col">
          <PendingIcon width={35} />
          <span className="text-sm  font-medium ">Pending Verification</span>
          <span className="text-2xl font-semibold mb-7">
            {data?.pending || 0}
          </span>
        </div>
        <div className="dashboard-image3 md:w-[18.5rem] px-4 py-2 flex flex-col">
          <CompleteIcon width={35} />
          <span className="text-sm  font-medium ">Verified Businesses </span>
          <span className="text-2xl font-semibold mb-7">
            {data?.verified || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;
DashboardContainer.propTypes = {
  data: propTypes.object,
};
