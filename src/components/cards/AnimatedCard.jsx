import { Link } from 'react-router-dom';
import './style.css';
import propTypes from 'prop-types';
function AnimatedCard({ name, description, url, link }) {
  return (
    <div className="featuredPropBox">
      <ul>
        <li
          className="bg-white"
          style={{
            backgroundImage: `url(${url})`,
          }}
        >
          {' '}
          <Link to={link}>
            <div className="fplogo">
              <span className="text-5xl w-full text-white flex text-center ">
                {name}
              </span>
            </div>
            <div className="fptext">
              <p>{description}</p>
            </div>
          </Link>{' '}
        </li>
      </ul>{' '}
    </div>
  );
}

export default AnimatedCard;

AnimatedCard.propTypes = {
  name: propTypes.string,
  description: propTypes.string,
  url: propTypes.string,
  link: propTypes.string,
};
