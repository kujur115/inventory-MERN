import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";


const App = () => {
  const [token,setToken]=useState('');
  
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default App;
