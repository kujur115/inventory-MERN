import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ItemCreateForm = (props) => {
  const [invoice, setInvoice] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [maxInvoice, setMaxInvoice] = useState("");
  const { setItems, items } = props;
  useEffect(() => {
    fetch("http://localhost:8000/api/inventory/getMaxInvoices")
      .then((response) => response.json())
      .then((data) => setMaxInvoice(data))
      .catch((err) => {
        setMaxInvoice("INV000");
        // console.error("Error fetching maxInvoices: " + err);
      });

    let max = 0;
    const currentNo = parseInt(maxInvoice.substring(3), 10);
    max = currentNo > max ? currentNo : max;

    // Increment the invoice number
    const noInvoice = max + 1;

    // Format the new invoice number
    const charInvoice = "INV";
    const newInvoice = charInvoice + noInvoice.toString().padStart(3, "0");

    setInvoice(newInvoice);
  }, [maxInvoice, setInvoice]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const itemObject = {
      invoice,
      name,
      price,
      supplier,
      qty,
      category,
    };
    const itemResponse = await fetch(
      "http://localhost:8000/api/inventory/add",
      {
        method: "POST",
        body: JSON.stringify(itemObject),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (itemResponse.status === 200) {
      const inventoryData = await itemResponse.json().data();
      setItems([inventoryData, ...items]);
    }
  };

  return (
    <div>
      <h1>Add Inventory Item</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="invoice" className="form-label">
            Invoice:
          </label>
          <input
            type="text"
            id="invoice"
            value={invoice}
            onChange={(event) => setInvoice(event.target.value)}
            disabled
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            className="form-control"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="qty" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            id="qty"
            value={qty}
            onChange={(event) => setQty(event.target.value)}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="form-control"
          />
        </div>
        <div>
          <label htmlFor="supplier" className="form-label">
            Supplier:
          </label>
          <input
            type="text"
            id="supplier"
            value={supplier}
            onChange={(event) => setSupplier(event.target.value)}
            className="form-control"
          />
        </div>
      </form>
    </div>
  );
};
export default ItemCreateForm;
