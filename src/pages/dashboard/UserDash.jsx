import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import SearchBar from "@/components/searchbar/SeachBar";
import BusinessDetailsModal from "@/components/model/BusinessDetailModel";
import Pagination from "@/components/pagination/Pagination";
import { LoaderIcon } from "lucide-react";
import { getAllUser } from "@/services/user";
import Card from "@/components/ui/card";

function UserDash() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (page = 1) => {
    setLoading(true);
    setError(null);
    const limit = 10;

    try {
      const response = await getAllUser(
        `page=${page}&limit=${limit}&isVerified=true&&role=MERCHANT`
      );
      setData(response.users || []);
      setFilteredData(response.users || []);
      setCurrentPage(page);
      setTotalPages(response.totalPages);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRowClick = (businessId) => {
    setSelectedBusinessId(businessId);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white drop-shadow-md rounded-xl p-5 mt-5 flex justify-between flex-col">
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl text-black">Verified Businesses</h1>
          <SearchBar
            placeholder={"search for businesses"}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredData.map((business) => (
                <Card
                  key={business._id}
                  business={business}
                  onClick={handleRowClick}
                />
              ))}
            </div>
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
