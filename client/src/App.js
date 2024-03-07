// import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

import Navbar from "./components/Navbar";
import { Login, Signup } from "./pages/auth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AddProduct, EditProduct, ProductDetail } from "./pages/products";
import Sidebar from "./components/sidebar";
import { EditProfile, UserProfile } from "./pages/profile";

const App = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Signup /> },
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
      <ToastContainer>
        <RouterProvider router={browserRouter} />
      </ToastContainer>
    </div>
  );
};

export default App;
