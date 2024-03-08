// import { useState } from "react";

import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Login, SignUp } from "./pages/auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddProduct, EditProduct, ProductDetail } from "./pages/products";
import Sidebar from "./components/sidebar";
import { EditProfile, UserProfile } from "./pages/profile";
import Home from "./pages/home/Home";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
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
      <ToastContainer  position={"top-right"} autoClose={5000} hideProgressBar={false} newestOnTop={false}/>
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
