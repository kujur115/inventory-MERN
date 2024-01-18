// import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ItemCreateForm from "./components/ItemCreateForm";
import Navbar from "./components/Navbar";
import { Login, Signup, AdminSignup } from "./pages";

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
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
