import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  cartCount: 0, // Added state to track the cart count
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("Adding to cart:", action.payload);
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      state.cartCount += action.payload.quantity; // Increment cart count
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        state.cartCount++; // Increment cart count
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity--;
        state.cartCount--; // Decrement cart count
      }
    },
    deleteItem: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload
      );
      if (item) {
        state.cartCount -= item.quantity; // Reduce cart count by the item's quantity
      }
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
      state.cartCount = 0; // Reset cart count
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
} = orebiSlice.actions;
export default orebiSlice.reducer;
