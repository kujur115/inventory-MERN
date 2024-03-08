import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLoginStatus } from "../services/authServices";
import { SET_LOGIN } from "../redux/features/auth/auth";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));
      if (!isLoggedIn) {
        toast.info(`Session expired, please login again.`);
        navigate("/login");
      } else {
        navigate(path);
      }
      return;
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};
export default useRedirectLoggedOutUser;
