import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
// import { Route, Router, Routes } from "react-router-dom";
import { Login, Signup, AdminSignup } from "./pages";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  { path: "/register/admin", element: <AdminSignup /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
]);
// const login = createBrowserRouter([]);
// const adminSignup = createBrowserRouter([]);
// const signup = createBrowserRouter([]);
const App = () => {
  // const [token, setToken] = useState("");

  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
      {/* <RouterProvider router={login} />
      <RouterProvider router={adminSignup} />
      <RouterProvider router={signup} /> */}
      {/* <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/register/admin" element={<AdminSignup />} /> */}
    </div>
  );
};

export default App;
