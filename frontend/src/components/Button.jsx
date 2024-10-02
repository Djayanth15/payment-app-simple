import PropTypes from "prop-types";

function Button({ label, className, onClick }) {
  return (
    <div className="px-8 mb-2 mt-5">
      <button
        onClick={onClick}
        className={`w-full text-white bg-slate-800 p-3 rounded-md font-semibold text-lg ${className}`}
      >
        {label}
      </button>
    </div>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
