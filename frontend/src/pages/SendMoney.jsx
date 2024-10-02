import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function SendMoney() {
  const [money, setMoney] = useState("0.00");
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get("name");
  const userId = searchParams.get("id");
  const inputRef = useRef(null);
  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/v1/account/transfer",
        {
          to: userId,
          amount: money,
        },
        { withCredentials: true }
      );
      console.log("Transaction Succesfull");
    } catch (error) {
      console.log("Failed to make a transaction", error);
    }
  };

  const handleInputChange = (e) => {
    let input = e.target.value;

    // Clean the input to allow only numbers
    const cleanedValue = input.replace(/\D/g, ""); // Remove non-digits

    // Parse the input as a float and divide by 100
    let amount = parseFloat(cleanedValue) / 100;

    setMoney(amount.toFixed(2));
  };

  // Prevent cursor movement by forcing it to stay at the end
  const handleCursorPosition = (e) => {
    if (inputRef.current) {
      e.preventDefault(); // Prevent default cursor movement
      inputRef.current.setSelectionRange(money.length, money.length); // Set cursor at the end
    }
  };

  // Prevent cursor movement by blocking specific key actions
  const handleKeyDown = (e) => {
    const blockedKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];

    // Prevent the default behavior of the blocked keys
    if (blockedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-1/3 shadow">
        <Heading text="Send Money" />
        <div className="flex justify-start gap-2 ml-8 mt-8 mb-4">
          <div className="bg-slate-400 rounded-full w-8 h-8 flex items-center justify-center">
            {firstName[0].toUpperCase()}
          </div>
          <div className="flex items-center font-semibold mb-4 text-xl">
            {firstName}
          </div>
        </div>
        <InputBox
          value={money}
          type={"number"}
          onChange={handleInputChange}
          onClick={handleCursorPosition} // Prevent user from clicking and changing cursor
          onKeyDown={handleKeyDown} // Prevent user from moving cursor with keyboard
          label="Amount"
          placeholder="$0.00"
        />
        <Button
          onClick={handleSubmit}
          className="mb-4"
          label="Initiate Transfer"
        />
      </div>
    </div>
  );
}

export default SendMoney;
