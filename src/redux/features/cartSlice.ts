import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICart } from 'types';

interface IInitialCartState {
  cart: ICart | null;
}

interface IIncrementCartItem {
  cartItemId: string;
}

interface IDecrementCartItem {
  cartItemId: string;
}

interface IDeleteCartItem {
  cartItemId: string;
}

const initialState: IInitialCartState = {
  cart: null,
};

export const cartSlice = createSlice({
  initialState,
  name: 'cartSlice',
  reducers: {
    setCart: (state, action: PayloadAction<ICart>) => {
      state.cart = action.payload;
    },
    incrementCartItem: (state, action: PayloadAction<IIncrementCartItem>) => {
      if (state.cart) {
        const cartItemIndex = state.cart.items.findIndex(
          (cartItem) => cartItem._id === action.payload.cartItemId
        );
        state.cart.items[cartItemIndex].totalProductQuantity++;
      }
    },
    decrementCartItem: (state, action: PayloadAction<IDecrementCartItem>) => {
      if (state.cart) {
        const cartItemIndex = state.cart.items.findIndex(
          (cartItem) => cartItem._id === action.payload.cartItemId
        );
        state.cart.items[cartItemIndex].totalProductQuantity--;
      }
    },
    deleteCartItem: (state, action: PayloadAction<IDeleteCartItem>) => {
      if (state.cart) {
        state.cart.items = state.cart.items.filter(
          (cartItem) => cartItem._id !== action.payload.cartItemId
        );
      }
    },
    removeCart: (state, action: PayloadAction<void>) => initialState,
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
