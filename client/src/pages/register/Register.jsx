import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from "../../utils/config";

function Register() {
  const [errorMessage, setErrormessage] = useState("");
  const [credentials, setCredentials] = useState({
    name: undefined,
    userName: undefined,
    email: undefined,
    password: undefined,
  });
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(
        "/auth/register",
        credentials
      );
      if(res.status === 200) {
        toast.success("SignUp success. Please login",{position: toast.POSITION.TOP_RIGHT})
        navigate("/login");
      }
    } catch (error) {
      console.log(error, "register failed");
      toast.error("SignUp failed",{position: toast.POSITION.TOP_RIGHT})
    }
  };

  return (
    <div className="registercontainer">
      <div className="registerwrapper">
        <h1 className="registertitle">Register</h1>
        <h3 className="registersubtitle">to continue to Nile-Booking</h3>
        <input
          type="text"
          placeholder="name"
          className="registerinput"
          onChange={handleChange}
          id="name"
        />
        <input
          type="text"
          placeholder="username"
          className="registerinput"
          onChange={handleChange}
          id="userName"
        />
        <input
          type="email"
          placeholder="email"
          className="registerinput"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="registerinput"
          onChange={handleChange}
          id="password"
        />
        <input
          type="number"
          placeholder="phone number"
          className="registerinput"
          onChange={handleChange}
          id="phone"
        />
        <input
          type="text"
          placeholder="city"
          className="registerinput"
          onChange={handleChange}
          id="city"
        />
        <input
          type="text"
          placeholder="country"
          className="registerinput"
          onChange={handleChange}
          id="country"
        />
        <button className="registerbutton" onClick={handleRegister}>
          Register
        </button>
        <ToastContainer />
        <div className="registermore">
          English(IND)
          <div className="registerlinks">
            <span className="registerlink">Help</span>
            <span className="registerlink">privacy</span>
            <span className="registerlink">Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
