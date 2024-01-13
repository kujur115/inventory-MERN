const ItemCreateForm = () => {
  const [invoice, setInvoice] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");

  return (
    <div>
      <h1>Add Inventory Item</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="invoice">Invoice:</label>
          <input
            type="text"
            id="invoice"
            value={invoice}
            onChange={(event) => setInvoice(event.target.value)}
            disabled
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="qty">Quantity:</label>
          <input
            type="number"
            id="qty"
            value={qty}
            onChange={(event) => setQty(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="supplier">Supplier:</label>
          <input
            type="text"
            id="supplier"
            value={supplier}
            onChange={(event) => setSupplier(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
export default ItemCreateForm;
