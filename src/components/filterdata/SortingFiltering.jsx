// src/components/SortingFiltering.jsx
import { useState } from 'react';
import propTypes from 'prop-types';

const SortingFiltering = ({ books, setFilteredBooks }) => {
  const [sortType, setSortType] = useState('title');

  const handleSortChange = e => {
    setSortType(e.target.value);
    // Implement sorting logic here
  };

  const handleFilterChange = e => {
    const keyword = e.target.value.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(keyword),
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="flex justify-between mb-4">
      {/* Sorting */}
      <select
        value={sortType}
        onChange={handleSortChange}
        className="border p-2 rounded"
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="date">Sort by Publication Date</option>
      </select>

      {/* Filtering */}
      <input
        type="text"
        placeholder="Search by keyword..."
        onChange={handleFilterChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default SortingFiltering;

SortingFiltering.propTypes = {
  books: propTypes.array.isRequired,
  setFilteredBooks: propTypes.func.isRequired,
};
