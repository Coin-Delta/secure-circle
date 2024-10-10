import React from "react";
import PropTypes from "prop-types";

const Card = ({ business, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-between h-full cursor-pointer hover:shadow-lg transition-shadow"
    onClick={() => onClick(business._id)}
  >
    {business.businessLogo ? (
      <img
        src={business.businessLogo}
        alt={`${business.businessName} logo`}
        className="w-24 h-24 object-cover mb-3 rounded-md"
      />
    ) : (
      <div className="w-24 h-24 bg-gray-200 mb-3 rounded-md"></div>
    )}
    <h3 className="text-sm font-medium text-center mb-2">
      {business.businessName}
    </h3>
    <button className="text-sm text-white bg-gray-700 hover:bg-gray-800 py-1 px-3 rounded-md">
      View more
    </button>
  </div>
);

Card.propTypes = {
  business: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
