import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/animation/Loader";
import { useAuth } from "../hooks";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggedIn(true);
    if (!username || !password) {
      setLoggedIn(false);
      setError(true);
      setErrorMessage("Please enter both username and password");
      return;
    }

    const response = await auth.login(username, password);
    console.log("login component", response);
    if (!response.success) {
      setError(true);
      setErrorMessage(response.message);
      setLoggedIn(false);
      return;
    }
    navigate("/");
  };
  const handleReset = () => {
    setUsername("");
    setPassword("");
    setError(false);
    setErrorMessage("");
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="input-group m-2">
        <span className="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </div>
      <div className="input-group m-2">
        <span className="input-group-text" id="basic-addon1">
          ***
        </span>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </div>
      <div className="container-fluid justify-content-start">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={loggedIn}
        >
          {loggedIn ? <Loader /> : "Log In"}
        </button>
        <button
          type="reset"
          className="btn btn-secondary me-2"
          onClick={handleReset}
          disabled={loggedIn}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Login;
