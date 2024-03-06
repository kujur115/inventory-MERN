import React, { useState } from "react";
import styles from "./auth.module.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/animation/Loader";
import Card from "../../components/card/Card";
import { BiLogIn } from "react-icons/bi";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authServices";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/auth";

const initialState = { email: "", password: "" };
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("All fields are required");
    if (!validateEmail(email))
      return toast.error("Please enter a valid email address");
    const userData = { email, password };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#ggg" />
          </div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Don't have an account? &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
