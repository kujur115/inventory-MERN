// import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import ItemCreateForm from "./components/ItemCreateForm";
import Navbar from "./components/Navbar";
import { Login, Signup, AdminSignup } from "./pages/auth";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
        { path: "/create", element: <ItemCreateForm /> },
        { path: "/login", element: <Login /> },
        {
          path: "/register",
          children: [
            { index: true, element: <Signup /> },
            { path: "admin", element: <AdminSignup /> },
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
