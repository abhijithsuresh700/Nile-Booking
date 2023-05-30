import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../utils/config";

function Login() {
  const [errorMessage, setErrormessage] = useState("");
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined,
  });
  const [expired, setExpired] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axiosInstance.post(
        "/auth/login",
        credentials
      );

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("Login Success", { position: toast.POSITION.TOP_RIGHT });
      navigate("/");
    } catch (error) {
      console.log(error, "error111");

      if (error.response) {
        setErrormessage(error.response.data);
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
        toast.error("SignUp failed", { position: toast.POSITION.TOP_RIGHT });
      } else {
        console.log(error, "error2222");
        dispatch({ type: "LOGIN_FAILURE", payload: error.response });
        toast.error("Login Failed.!", { position: toast.POSITION.TOP_RIGHT });
      }
    }
  };

  return (
    <div className="logincontainer">
      <div className="loginwrapper">
        <h1 className="logintitle">Login</h1>
        <h3 className="loginsubtitle">to continue to Nile-Booking</h3>
        <input
          type="text"
          placeholder="username"
          id="userName"
          onChange={handleChange}
          className="logininput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="logininput"
        />
        <button
          className="loginbutton"
          disabled={loading}
          onClick={handleClick}
        >
          Login
        </button>
        <span className="regsiterspan">
          Don't have an account? Register here
        </span>
        <Link to="/register">
          <button className="loginbutton">Register</button>
        </Link>
        <ToastContainer />
        <div className="loginmore">
          English(IND)
          <div className="loginlinks">
            <span className="loginlink">Help</span>
            <span className="loginlink">privacy</span>
            <span className="loginlink">Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
