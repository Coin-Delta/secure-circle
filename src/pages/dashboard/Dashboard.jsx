import { useState, useEffect, useCallback } from 'react';
import DashboardActivity from './DashboardActivity';
import DashboardContainer from './DashboardContainer';
import { toast } from 'sonner';
import { getAllUser } from '@/services/user';
import { useDebounce } from 'use-debounce';

function Dashboard() {
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState({ users: 0, pending: 0, verified: 0 });
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 800);
  const [filter, setFilter] = useState('');

  const fetchData = useCallback(
    async (page = currentPage) => {
      setLoading(true);
      const limit = 30;

      try {
        const response = await getAllUser(
          `page=${page}&limit=${limit}&role=MERCHANT`,
        );
        setData(response?.users);
        const total = {
          users: response?.totalUsers,
          pending: response?.pendingUsers,
          verified: response?.verifiedUsers,
        };

        setTotalPages(response?.totalPages || 1);
        setTotal(total);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    },
    [currentPage],
  );

  const fetchFilterData = async filter => {
    try {
      let queryParams = `page=1&limit=20&role=MERCHANT`;

      if (filter === 'isVerified') {
        queryParams += '&isVerified=true';
      } else if (filter === 'isUnverified') {
        queryParams += '&isVerified=false';
      }

      const response = await getAllUser(queryParams);
      setData(response?.users);
    } catch (error) {
      console.error('Filter failed:', error);
      // You might want to add a toast notification here as well
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      setCurrentPage(1);
    }
    if (filter) {
      fetchFilterData(filter);
      setCurrentPage(1);
    }
  }, [filter, debouncedQuery]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, debouncedQuery]);

  return (
    <div>
      {/* <h1 className="text-3xl text-center my-5">Admin Dashboard</h1> */}
      <DashboardContainer data={total} />
      <div className="w-full my-10">
        <DashboardActivity
          data={data}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          loading={loading}
          fetchUsers={fetchData}
          setQuery={setQuery}
          debouncedQuery={debouncedQuery}
          setFilter={setFilter}
          filter={filter}
          refreshData={() => fetchData(currentPage)}
        />
      </div>
    </div>
  );
}

export default Dashboard;
