import PropTypes from "prop-types";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function User({ firstName, lastName, userId }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="bg-slate-400 rounded-full w-8 h-8 flex items-center justify-center">
          {firstName[0]}
        </div>
        <div className=" font-medium text-md">
          {firstName} {lastName}
        </div>
      </div>
      <div className="flex items-center w-[200px] h-[50px]">
        <Button
          className="text-sm"
          onClick={() => navigate(`/send?id=${userId}&name=${firstName}`)}
          label="Send Money"
        />
      </div>
    </div>
  );
}

User.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default User;
