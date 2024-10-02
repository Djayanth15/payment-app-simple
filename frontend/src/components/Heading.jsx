import PropTypes from "prop-types";

function Heading({ text }) {
  return (
    <div className=" text-center font-bold mb-2 text-3xl pt-4">{text}</div>
  );
}

export default Heading;

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};
