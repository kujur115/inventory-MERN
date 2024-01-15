import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { redirect } from "react-router-dom";
import Loader from "../components/animation/Loader";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggedIn(true);
    if (!username || !password) {
      setLoggedIn(false);
      return;
    }
    const loggingObject = { username, password };
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      body: JSON.stringify(loggingObject),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      setError(true);
      setErrorMessage(response.message);
    }
    if (token) {
      return redirect("/");
    }
  };

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      {error && (
        <div class="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      )}
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </div>
      <div class="input-group">
        <span class="input-group-text" id="basic-addon1">
          @
        </span>
        <input
          type="password"
          class="form-control"
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
          disabled={loggedIn}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Login;