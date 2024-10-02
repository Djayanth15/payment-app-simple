import PropTypes from "prop-types";

function Balance({ balance }) {
  return (
    <div className="flex ml-6">
      <div className=" font-bold text-lg ">Your Balance </div>
      <div className=" font-semibold text-lg ml-4">$ {balance}</div>
    </div>
  );
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
};

export default Balance;
