import PropTypes from "prop-types";

function Tagline({ text }) {
  return (
    <div className=" text-center text-md mb-8 text-slate-400"> {text}</div>
  );
}

Tagline.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tagline;
