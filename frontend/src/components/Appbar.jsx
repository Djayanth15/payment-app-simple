import PropTypes from "prop-types";

function Appbar({ firstName }) {
  return (
    <div className="flex justify-between p-5 shadow">
      <div className="flex justify-center items-center ">
        <div className=" text-lg font-semibold">Payments App </div>
      </div>
      <div className="flex gap-2 justify-end items-center">
        <div>Hello {firstName}</div>
        <div className="  bg-slate-400 h-10 w-10 rounded-full flex justify-center ">
          <button className=" ">{firstName[0]}</button>
        </div>
      </div>
    </div>
  );
}

Appbar.propTypes = {
  firstName: PropTypes.string.isRequired,
};

export default Appbar;
