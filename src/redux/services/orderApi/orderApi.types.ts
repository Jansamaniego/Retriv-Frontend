import { IOrder, IResponse } from 'types';

export interface IGetOrdersResponse extends IResponse {
  orders: {
    results: IOrder[];
    totalPages: number;
  };
}

export interface IOrderResponse extends IResponse {
  order: IOrder;
}

export interface ICreateOrder {
  cartId: string;
  paymentMethod: string;
  phone: string;
  shippingAddress: {
    country: string;
    postalCode: string;
    address: string;
  };
  paymentIntent?: string;
}

export interface IUpdateOrderStatus {
  id: string;
  status: string;
}
