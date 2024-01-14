const InventoryTable = (props) => {
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:8000/item")
  //     .then((response) => response.json())
  //     .then((data) => setItems(data))
  //     .catch((error) => console.error("Error fetching items data:", error));
  // }, []);
  const { items } = props;
  return (
    <div>
      <table>
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
              <td>{item.invoice}</td>
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
