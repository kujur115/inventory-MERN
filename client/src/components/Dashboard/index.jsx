// import { useEffect } from "react";
// import ItemCreateForm from "../ItemCreateForm";
import { useEffect } from "react";
import { useAuth } from "../../hooks";
import InventoryTable from "../InventoryTable";
import { useNavigate } from "react-router-dom";
// import { useData } from "../../hooks";

const Dashboard = () => {
  // useEffect(() => {
  //   fetch("http://localhost:8000/item")
  //     .then((response) => response.json())
  //     .then((data) => setItems(data))
  //     .catch((error) => console.error("Error fetching items data:", error));
  // }, []);

  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  return (
    <div className="container mb-3">
      <button
        className="btn btn-primary m-2"
        onClick={() => navigate("/create")}
      >
        Add Item
      </button>
      <InventoryTable />
    </div>
  );
};

export default Dashboard;
