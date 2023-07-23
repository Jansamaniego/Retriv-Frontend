import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: null,
};

export const cartSlice = createSlice({
  initialState,
  name: 'cartSlice',
  reducers: {
    setCart: (state, { payload: cart }) => {
      state.cart = cart;
    },
    incrementCartItem: (state, { payload: cartItemId }) => {
      const cartItemIndex = state.cart.items.findIndex(
        (cartItem) => cartItem._id === cartItemId
      );
      state.cart.items[cartItemIndex].quantity++;
    },
    decrementCartItem: (state, { payload: cartItemId }) => {
      const cartItemIndex = state.cart.items.findIndex(
        (cartItem) => cartItem._id === cartItemId
      );
      state.cart.items[cartItemIndex].quantity--;
    },
    deleteCartItem: (state, { payload: cartItemId }) => {
      state.cart.items = state.cart.items.filter(
        (cartItem) => cartItem._id !== cartItemId
      );
    },
    removeCart: (state) => {
      state = initialState;
    },
  },
});

export default cartSlice.reducer;

export const {
  setCart,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
  removeCart,
} = cartSlice.actions;
