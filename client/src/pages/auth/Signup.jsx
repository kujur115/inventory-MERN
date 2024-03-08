import { useState } from "react";
import styles from "./auth.module.scss";
import Loader from "../../components/animation/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "../../components/card/Card";
import { TiUserAddOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authServices";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/auth";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State for the form inputs and loading state
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { name, email, password, confirmPassword } = formData;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password)
      return toast.error("All fields are required!");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!validateEmail(email)) return toast.error("Please enter a valid email");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    const userData = { name, email, password };
    setLoading(true);
    try {
      const data = await registerUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(`Error creating account: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className={`container ${styles.auth}`}>
      {loading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
              required
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};
export default SignUp;
