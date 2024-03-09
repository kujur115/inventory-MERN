// import { useState } from "react";

import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { SET_LOGIN } from "./redux/features/auth/auth";
import { getLoginStatus } from "./services/authServices";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/navbar/Navbar";
import { Login, SignUp } from "./pages/auth";
import { AddProduct, EditProduct, ProductDetail } from "./pages/products";
import Sidebar from "./components/sidebar";
import { EditProfile, UserProfile } from "./pages/profile";
import Home from "./pages/home/Home";
import axios from "axios";

axios.defaults.withCredentials = true;
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <SignUp /> },
        {
          path: "/dashboard",
          element: <Sidebar />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: "add-product", element: <AddProduct /> },
            { path: "product-details/:id", element: <ProductDetail /> },
            { path: "edit-product/:id", element: <EditProduct /> },
          ],
        },
        {
          path: "/user/profile",
          element: <Sidebar />,
          children: [
            { index: true, element: <UserProfile /> },
            { path: "edit-profile", element: <EditProfile /> },
          ],
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <ToastContainer
        position={"top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
      />
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
