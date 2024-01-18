import "bootstrap/dist/css/bootstrap.min.css";
import { useData } from "../hooks";

const InventoryTable = () => {
  const { items } = useData();
  return (
    <div>
      <table className="table table-primary table-striped table-hover">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Mfg Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <th>{item.invoice}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>{item.category}</td>
              <td>{item.supplier}</td>
              <td>{item.mfgDate}</td>
              <td>{item.status}</td>
              <td>
                <button>view</button>
                <button>edit</button>
                <button>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default InventoryTable;
