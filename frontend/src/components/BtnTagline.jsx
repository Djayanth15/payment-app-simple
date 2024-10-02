import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function BtnTagline({ text, to, btnText, className }) {
  return (
    <div className={`flex gap-1 justify-center px-8 mb-2 ${className}`}>
      <div>{text} </div>
      <Link to={to} className="underline">
        {btnText}
      </Link>
    </div>
  );
}

BtnTagline.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default BtnTagline;
