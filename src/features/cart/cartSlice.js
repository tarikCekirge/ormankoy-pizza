import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice =
          existingItem.quantity * existingItem.unitPrice;
      } else {
        state.cart.push({
          ...item,
          quantity: 1,
          totalPrice: item.unitPrice,
        });
      }
    },

    // removeFromCart: (state, action) => {
    //   const itemId = action.payload;
    //   const index = state.cart.findIndex((i) => i.id === itemId);
    //   if (index !== -1) {
    //     const item = state.cart[index];
    //     if (item.quantity > 1) {
    //       item.quantity -= 1;
    //       item.totalPrice = item.quantity * item.unitPrice;
    //     } else {
    //       state.cart.splice(index, 1);
    //     }
    //   }
    // },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cart.find((i) => i.id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice =
            existingItem.quantity * existingItem.unitPrice;
        } else {
          state.cart = state.cart.filter((i) => i.id !== itemId);
        }
      }
    },

    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemId);
    },

    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { deleteItem, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartTotal = (state) =>
  state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

export const selectCartCount = (state) =>
  state.cart.cart.reduce((count, item) => count + item.quantity, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) => {
  const item = state.cart.cart.find((item) => item.id === id);
  return item ? item.quantity : 0;
};
// export const getCart = (state) =>
//   state.cart.cart.reduce(
//     (acc, item) => {
//       acc.quantity += item.quantity;
//       acc.total += item.totalPrice;
//       return acc;
//     },
//     { quantity: 0, total: 0 }
//   );
