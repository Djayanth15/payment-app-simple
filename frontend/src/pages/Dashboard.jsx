import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  useEffect(() => {
    try {
      const getBalance = async () => {
        const response = await axios.get(
          "http://localhost:8000/api/v1/account/balance",
          { withCredentials: true }
        );
        const data = response.data.data.balance;
        setBalance(data);
      };
      getBalance();
    } catch (error) {
      console.log("Error fetching user balance ", error);
    }
  }, []);
  return (
    <div>
      <Appbar firstName={name} />
      <div className="mt-8">
        <Balance balance={balance} />
      </div>
      <Users />
    </div>
  );
}

export default Dashboard;
