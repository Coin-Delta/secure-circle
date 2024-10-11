// src/components/BookCard.jsx
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import propTypes from 'prop-types';

const BookCard = ({ book }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      // Delete logic here
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img
        src={book.thumbnail}
        alt={book.title}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <h2 className="text-lg font-bold mt-2">{book.title}</h2>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Published: {book.publicationDate}</p>
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-500 flex items-center">
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-500 flex items-center"
        >
          <FaTrashAlt className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;

BookCard.propTypes = {
  book: propTypes.object.isRequired,
};
