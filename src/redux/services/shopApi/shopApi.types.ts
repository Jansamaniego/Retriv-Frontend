import { IResponse, IShop } from 'src/types';

export interface IGetShopsResponse extends IResponse {
  shops: {
    results: IShop[];
    totalPages: number;
  };
}

export interface IGetShopByIdResponse extends IResponse {
  shop: IShop;
}

export interface ICreateShopResponse extends IResponse {
  shop: IShop;
}

export interface ICreateShop extends FormData {
  image: File;
  name: string;
  address: string;
  description: string;
  phone: string;
}

export interface IUpdateShopResponse extends IResponse {
  shop: IShop;
}

export interface IUpdateShop {
  name: string;
  address: string;
  description: string;
  phone: string;
  id: string;
}

export interface IUpdateShopImageResponse extends IResponse {
  shop: IShop;
}

export interface IUpdateShopImage extends FormData {
  id: string;
  image: File;
}

export interface IDeleteShopResponse extends IResponse {
  shop: IShop;
}
