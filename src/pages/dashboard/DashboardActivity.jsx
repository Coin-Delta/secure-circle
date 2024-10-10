import { useState, useCallback, useEffect } from 'react';
import CustomTable from '@/components/customtable/CustomTable';
import Pagination from '@/components/pagination/Pagination';
import SearchBar from '@/components/searchbar/SeachBar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import propTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import VerificationModel from '@/components/model/VerificationModel';
import { Button } from '@/components/ui/button';

function DashboardActivity({
  currentPage,
  totalPages,
  setCurrentPage,
  data,
  loading,
  setQuery,
  setFilter,
  filter,
  refreshData,
}) {
  const location = useLocation();
  const { pathname } = location;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setRefreshKey(prevKey => prevKey + 1);
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const filtered = data.filter(item =>
      Object.values(item).some(
        value =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    setQuery(e.target.value);
  };

  const handleRowClick = id => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const headers =
    pathname === '/'
      ? [
          {
            key: 'businessName',
            label: 'Business Name',
            className: 'rounded-l-xl',
          },
          {
            key: 'email',
            label: 'Email',
            className: '',
            render: email => (email ? email : '-'),
          },
          {
            key: 'walletAddress',
            label: 'Wallet Address',
            render: address =>
              address && `${address.slice(0, 6)}....${address.slice(-4)}`,
          },
          { key: 'firstName', label: 'Owner' },
          {
            key: 'isEmailVerified',
            label: 'Email Verified',
            render: isEmailVerified => (isEmailVerified ? 'Yes' : 'No'),
          },
          {
            key: 'isVerified',
            label: 'KYC Verified',
            className: 'rounded-r-xl',
            render: isVerified => (isVerified ? 'Yes' : 'No'),
          },
        ]
      : [];

  return (
    <div key={refreshKey}>
      {isModalOpen && (
        <VerificationModel
          isOpenModal={isModalOpen}
          setIsOpenModal={setIsModalOpen}
          ID={selectedId}
          onSuccess={handleModalClose}
        />
      )}
      <div className="w-full">
        <div className="bg-white drop-shadow-md rounded-xl p-5 mt-10 flex justify-between flex-col">
          <div className="flex w-full justify-between md:flex-row flex-col">
            <h1 className="text-3xl text-black md:mb-10 mb-5">
              {pathname === '/' && 'Businesses'}
            </h1>
            <div className="flex justify-evenly items-center w-1/2">
              <Select onValueChange={setFilter} defaultValue={filter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">All</SelectItem>
                  <SelectItem value="isVerified">Kyc Verified</SelectItem>
                  <SelectItem value="isUnverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => {
                  setRefreshKey(prevKey => prevKey + 1);
                  refreshData();
                }}
              >
                Refresh
              </Button>
              <SearchBar
                onChange={handleSearch}
                placeholder="Search by name, email or mobile"
              />
            </div>
          </div>
          <div>
            <CustomTable
              headers={headers}
              data={filteredData}
              loading={loading}
              onRowClick={row => handleRowClick(row._id)}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardActivity.propTypes = {
  data: propTypes.array,
  loading: propTypes.bool,
  currentPage: propTypes.number,
  totalPages: propTypes.number,
  setCurrentPage: propTypes.func,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  select: propTypes.string,
  handleTabChange: propTypes.func,
  updateUserData: propTypes.func,
  setData: propTypes.func,
  setTotalPages: propTypes.func,
  setQuery: propTypes.func,
  setFilter: propTypes.func,
  filter: propTypes.string,
  refreshData: propTypes.func,
};

export default DashboardActivity;
