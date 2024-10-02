import Heading from "../components/Heading";
import Tagline from "../components/Tagline";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BtnTagline from "../components/BtnTagline";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/signup",
      {
        email,
        firstName,
        lastName,
        password,
      }
    );
    const data = response.data;
    console.log(data);
  };
  return (
    <div className="bg-slate-300 h-full flex justify-center pb-4">
      <div className="bg-white w-1/3 m-24 rounded-md">
        <Heading text="Sign Up" />
        <Tagline text="Enter your information to create an account" />
        <InputBox
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="John"
        />
        <InputBox
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
        />
        <InputBox
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@gmail.com"
        />
        <InputBox
          label="Password"
          placeholder="123456"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button onClick={handleSignup} label="Sign Up" />
        <BtnTagline
          className="mb-2"
          text="Already have an account? "
          btnText="Sign In"
          to="/signin"
        />
      </div>
    </div>
  );
}

export default Signup;
