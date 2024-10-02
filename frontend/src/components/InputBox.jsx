import PropTypes from "prop-types";
import { forwardRef } from "react";

const InputBox = forwardRef(
  (
    { label, placeholder, onChange, onClick, onKeyDown, type = "text", value },
    ref
  ) => {
    return (
      <div className=" px-8 mb-5">
        <div className="mb-1 font-semibold">
          <label htmlFor={label}>{label}</label>
        </div>
        <div>
          <input
            className="w-full p-2 border-2 text-lg text-gray-700 placeholder-slate-400 rounded-md focus:outline-none  focus:border-blue-500 transition duration-200 ease-in-out"
            id={label}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onClick={onClick}
            onKeyDown={onKeyDown}
            value={value}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

InputBox.displayName = "InputBox";

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
};

export default InputBox;
