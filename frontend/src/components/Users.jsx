import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

function Users() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchUsers = async (filter) => {
    setLoading(true);
    try {
      const fetchUsers = await axios.get(
        `http://localhost:8000/api/v1/user/bulk?filter=${filter}`,
        { withCredentials: true }
      );
      setUsers(fetchUsers.data.data);
      console.log(users);
    } catch (error) {
      console.log("error in fetching all the users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //debouncing
    const timeoutId = setTimeout(() => {
      fetchUsers(filter);
    }, 500);

    return () => clearTimeout(timeoutId); //cleanup of the timeout
  }, [filter]);

  return (
    <div className="m-6">
      <div className="font-bold text-xl">Users</div>
      <div className="my-2">
        <input
          className="w-full p-2 rounded-md border-2 text-md placeholder-slate-400 focus:outline-none  focus:border-blue-500 transition duration-200 ease-in-out"
          type="text"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading && <p className=" font-semibold">Loading .....</p>}

      {users.map((user) => (
        <User
          key={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          userId={user._id}
        />
      ))}
    </div>
  );
}

export default Users;
