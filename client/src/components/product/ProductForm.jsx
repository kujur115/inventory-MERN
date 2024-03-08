import React from "react";
import Card from "../card/Card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductForm = ({
  product,
  image,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label htmlFor="image-input">Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png.
            </code>
            <input
              type="file"
              name="image"
              id="image-input"
              onChange={(e) => handleImageChange(e)}
            />
            {imagePreview != null ? (
              <div className="image-preview">
                <img src="{imagePreview}" alt="product" />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product?.name}
            id="product-name"
            onChange={handleInputChange}
          />
          <label htmlFor="product-category">Product Category:</label>
          <input
            type="text"
            name="category"
            placeholder="Product Category"
            value={product?.category}
            id="product-category"
            onChange={handleInputChange}
          />
          <label htmlFor="product-price">Product Price:</label>
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={product?.price}
            id="product-price"
            onChange={handleInputChange}
          />
          <label htmlFor="product-quantity">Product Quantity:</label>
          <input
            type="text"
            name="quantity"
            placeholder="Product Quantity"
            value={product?.quantity}
            id="product-quantity"
            onChange={handleInputChange}
          />
          <label htmlFor="description">Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;
