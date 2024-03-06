import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../hooks";
import Loader from "../../components/animation/Loader";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    console.log("username: " + username);

    if (!username || !email || !password || !confirmPassword) {
      setError(true);
      setErrorMessage("Fill all required fields");
      setSigningUp(false);
      return;
    }
    if (password !== confirmPassword) {
      setError(true);
      setErrorMessage("Make sure password and confirm password matches");
      setSigningUp(false);
      return;
    }
    try {
      await auth.adminSignup(username, password, confirmPassword, email);
      navigate("/");
    } catch (error) {
      setErrorMessage(true);
      setErrorMessage("Invalid username or password");
      setSigningUp(false);
    }
  };
  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  });

  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-warning" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          Username
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
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          Email
        </span>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon1"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
      </div>
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          Password
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
      <div className="input-group">
        <span className="input-group-text" id="basic-addon1">
          Confirm Password
        </span>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          aria-describedby="basic-addon1"
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
        />
      </div>
      <div className="container-fluid justify-content-start">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={signingUp}
        >
          {signingUp ? <Loader /> : "Sign Up"}
        </button>
        <button
          type="reset"
          className="btn btn-secondary me-2"
          disabled={signingUp}
        >
          Reset
        </button>
      </div>
    </form>
  );
};
export default AdminSignup;
