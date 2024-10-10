import { Search } from 'lucide-react';
import propTypes from 'prop-types';

const SearchBar = ({ onChange, placeholder }) => {
  return (
    <div className="md:block hidden">
      <div className="relative bg-transparent flex  h-12 ">
        <div className="flex text-primary bg-background border border-border rounded-xl pl-5">
          <div className="h-full flex justify-center items-center ">
            <Search className="text-input" />
          </div>

          <input
            type="text"
            onChange={onChange}
            className="w-full h-full  bg-background  outline-none pl-2 text-primary rounded-xl "
            placeholder={placeholder || 'search'}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
SearchBar.propTypes = {
  onChange: propTypes.func,
  placeholder: propTypes.string,
};
