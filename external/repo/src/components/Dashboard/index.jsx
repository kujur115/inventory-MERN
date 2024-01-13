import { useState } from "react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [supplier_info, setSupplierInfo] = useState("");
  // const [mfgDate, setMfgDate] = useState("");
  const [items, setItems] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const itemObject = {
      name,
      price,
      supplier_info,
      // mfgDate,
    };
    const itemResponse = await fetch("http://localhost:8000/item/add", {
      method: "POST",
      body: JSON.stringify(itemObject),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (itemResponse.status === 200) {
      const itemData = await itemResponse.json();
      setItems((items) => [itemData.data, ...items]);
      const clearInputs = () => {
        setName("");
        setPrice("");
        setSupplierInfo("");
        // setMfgDate("");
      };
      clearInputs();
    }
  };
  return (
    <div>
      <h1> Add Inventory Item</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name"> Name:-</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price"> Price:-</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="supplierInfo"> Supplier Info:-</label>
          <input
            type="text"
            id="supplierInfo"
            value={supplier_info}
            onChange={(event) => setSupplierInfo(event.target.value)}
          />
        </div>
        {/* <div>
          <label htmlFor="mfgDate"> Mfg Date:-</label>
          <input
            type="date"
            id="mfgDate"
            value={mfgDate}
            onChange={(event) => setMfgDate(event.target.value)}
          />
        </div> */}
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
      <br />
      <h1>Items List:-</h1>
      <ul>
        {items.map((item) => (
          <li> {item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
