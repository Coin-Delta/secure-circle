import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import CustomTable from '@/components/customtable/CustomTable';
import { getAllUser } from '@/services/user';
import SearchBar from '@/components/searchbar/SeachBar';
import BusinessDetailsModal from '@/components/model/BusinessDetailModel';
import Pagination from '@/components/pagination/Pagination';

function UserDash() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  const headers =
    pathname === '/'
      ? [
          { key: 'businessName', label: 'Business', className: 'rounded-l-xl' },
          {
            key: 'email',
            label: 'Email',
            className: '',
            render: email => email || '-',
          },
          { key: 'firstName', label: 'Owner', className: '' },
          { key: 'walletAddress', label: 'Wallet Address' },
        ]
      : [];

  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);
    const limit = 10;

    try {
      const response = await getAllUser(
        `page=${page}&limit=${limit}&isVerified=true&&role=MERCHANT`,
      );

      setData(response?.users || []);
      setFilteredData(response?.users || []);
      setCurrentPage(page);
      setTotalPages(response?.totalPages);
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

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
  };

  const handleRowClick = businessId => {
    console.log(businessId);
    setSelectedBusinessId(businessId);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col">
      {/* <h1 className="text-3xl text-center">
        All the Verified Businesses using USDC in your nearby Area
      </h1> */}
      <div className="bg-white drop-shadow-md rounded-xl p-5 mt-5 flex justify-between flex-col">
        <div className="flex justify-between">
          {' '}
          <h1 className="text-3xl text-black mb-7">Verified Businesses</h1>
          <SearchBar
            placeholder={'search for businesses'}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
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
          </>
        )}
      </div>
      <BusinessDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        businessId={selectedBusinessId}
      />
    </div>
  );
}

export default UserDash;
