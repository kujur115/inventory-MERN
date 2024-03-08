import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/animation/Loader";
import ProductForm from "../../components/product/ProductForm";
import { createProduct, selectIsLoading } from "../../redux/features/product";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};
const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const generateInvoice = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const invoice = letter + "/" + number;
    return invoice;
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (!name || !quantity || !price || !category) {
      return toast.error("Please fill all fields!");
    }
    formData.append("name", name);
    formData.append("category", category);
    formData.append("invoice", generateInvoice(category));
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    console.log(...formData);
    await dispatch(createProduct(formData));
    navigate("/dashboard");
  };
  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        image={image}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
