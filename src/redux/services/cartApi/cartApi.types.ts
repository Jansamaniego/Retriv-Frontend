import { ICart, IResponse } from 'types';

export interface ICartResponse extends IResponse {
  cart: ICart;
}

export interface IAddProductToCart {
  quantity: number;
  productId: string;
}

export interface IRemoveCartItem {
  productId: string;
  cartItemIndex: number;
}
