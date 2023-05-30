import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";



const Login = () => {
  const [errorMessage, setErrormessage] = useState("")
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined,
  });
  const [expired, setExpired] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value })); 
  };


  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
       const res = await axios.post("http://localhost:8880/api/auth/login", credentials)
       .then(function (response) {
        console.log(response.data,"responseee")
        if(response.data.isAdmin){
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data.details });
           navigate("/")
        }else{
          setErrormessage("You are not an Admin");
          dispatch({ type: "LOGIN_FAILURE", payload: {message: "You are not allowed"} });
        }
      })
       .catch(function (error) {
        if (error.response) {
          setErrormessage(error.response.data)
          dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
        }
      });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="userName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {errorMessage && <span >{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Login;