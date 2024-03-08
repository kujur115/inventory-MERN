import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../../services/productServices";

const initialState = {
  product: null,
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};
// Create New Product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;
