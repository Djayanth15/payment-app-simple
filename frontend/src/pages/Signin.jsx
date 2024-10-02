import { useState } from "react";
import BtnTagline from "../components/BtnTagline";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Tagline from "../components/Tagline";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/signin",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      const data = response.data.data;

      navigate(`/dashboard?name=${data.firstName}`);
    } catch (error) {
      console.log("Error in logging the user", error);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="bg-white w-1/3 h-3/5 m-24 rounded-md">
        <Heading text="Sign In" />
        <Tagline text="Enter your credentials to access your account" />
        <InputBox
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@gmail.com"
        />
        <InputBox
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="123456"
          type="password"
        />
        <Button onClick={handleSignin} label="Sign In" />
        <BtnTagline
          text="Don't have an account? "
          btnText="Sign Up"
          to="/signup"
        />
      </div>
    </div>
  );
}

export default Signin;
