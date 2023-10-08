import { IResponse, IShop, IUser } from 'src/types';

export interface IShopWithOwnerPickValues {
  _id: string;
  id: string;
  name: string;
  address: string;
  phone: number;
  slug?: string;
  shopImage: string;
  shopImageId: string;
  description: string;
  owner: Pick<
    IUser,
    '_id' | 'username' | 'email' | 'firstName' | 'lastName' | 'profileImage'
  >;
  dateCreated: Date;
  productsQuantity: number;
  totalUnitsSold: number;
  totalSales: number;
  createdAt: Date;
}

export interface IGetShopsResponse extends IResponse {
  shops: {
    results: IShopWithOwnerPickValues[];
    totalPages: number;
  };
}

export interface IGetShopsTransformedResponse {
  results: IShopWithOwnerPickValues[];
  totalPages: number;
}

export interface IGetShopByIdResponse extends IResponse {
  shop: IShopWithOwnerPickValues;
}

export interface ICreateShopResponse extends IResponse {
  shop: IShop;
}

export interface ICreateShop extends FormData {}

export interface IUpdateShopResponse extends IResponse {
  shop: IShopWithOwnerPickValues;
}

export interface IUpdateShop {
  name: string;
  address: string;
  description: string;
  phone: number;
  id: string;
}

export interface IUpdateShopImageResponse extends IResponse {
  shop: IShopWithOwnerPickValues;
}

export interface IUpdateShopImage extends FormData {}

export interface IDeleteShopResponse extends IResponse {
  shop: IShop;
}
