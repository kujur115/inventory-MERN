import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./navbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, selectIsLoggedIn } from "../../redux/features/auth/auth";
import { logoutUser } from "../../services/authServices";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <>
      <header className={styles.navbar}>
        <Link to={"/"} className="link">
          <h1>Inventory Management System</h1>
        </Link>
        <div className="--flex-center">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="--btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="--btn --bg-light">
                Login
              </Link>
              <Link to="/register" className="--btn --btn-secondary">
                Sign-up
              </Link>
            </>
          )}
        </div>
      </header>

      <Outlet />
      
    </>
  );
};
export default Navbar;
